import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiUpload, FiRefreshCw, FiChevronDown } from 'react-icons/fi'
import {
  fetchQualifications, fetchLocations, fetchSkills,
  createCandidateMaster, createCandidateApplication, fileToBase64,
  getOptionLabel, getOptionId,
  type ApiJobDetail, type ConfigOption,
} from '../../services/jobsApi'
import styles from './ApplyModal.module.css'

// ── Props & form state ────────────────────────────────────
interface ApplyModalProps {
  jobTitle:    string
  jobLocation: string
  postId:      number
  detail:      ApiJobDetail | null
  onClose:     () => void
}

interface FormState {
  fullName:      string
  email:         string
  phone:         string
  qualification: string   // display label
  qualId:        number   // API id
  location:      string   // display label
  experience:    'Fresher' | 'Experienced'
  skills:        string   // display label
  skillId:       number   // API id
  resume:        File | null
  captcha:       string
}

function genCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { question: `${a} + ${b}`, answer: String(a + b) }
}

// ── Single-select dropdown component ─────────────────────
interface SelectProps {
  placeholder: string
  options:     ConfigOption[]
  selected:    string
  loading:     boolean
  hasError?:   boolean
  onChange:    (val: string, opt?: ConfigOption) => void
}

function SingleSelect({ placeholder, options, selected, loading, hasError, onChange }: SelectProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <div className={styles.multiSelect} ref={ref}>
      <button
        type="button"
        className={`${styles.multiTrigger} ${hasError ? styles.multiTriggerErr : ''}`}
        onClick={() => setOpen(o => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        <span className={`${styles.multiPlaceholder} ${selected ? styles.multiSelected : ''}`}>
          {selected || placeholder}
        </span>
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <FiChevronDown size={15} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.multiDropdown}
            initial={{ opacity: 0, y: -6, scaleY: 0.95 }}
            animate={{ opacity: 1, y: 0, scaleY: 1 }}
            exit={{ opacity: 0, y: -6, scaleY: 0.95 }}
            transition={{ duration: 0.18 }}
          >
            {loading ? (
              <span className={styles.optsLoading}>Loading…</span>
            ) : options.length > 0 ? (
              options.map(opt => {
                const lbl = getOptionLabel(opt)
                return (
                  <button
                    key={getOptionId(opt)}
                    type="button"
                    className={`${styles.checkItem} ${selected === lbl ? styles.checkItemActive : ''}`}
                    onClick={() => { onChange(lbl, opt); setOpen(false) }}
                  >
                    {lbl}
                  </button>
                )
              })
            ) : (
              <span className={styles.optsLoading}>No options available</span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

// ── Main modal ────────────────────────────────────────────
export default function ApplyModal({ jobTitle, jobLocation, postId, detail, onClose }: ApplyModalProps) {
  const [qualOptions,  setQualOptions]  = useState<ConfigOption[]>([])
  const [locOptions,   setLocOptions]   = useState<ConfigOption[]>([])
  const [skillOptions, setSkillOptions] = useState<ConfigOption[]>([])
  const [optsLoading,  setOptsLoading]  = useState(true)

  useEffect(() => {
    Promise.all([fetchQualifications(), fetchLocations(), fetchSkills()])
      .then(([q, l, s]) => {
        setQualOptions(q)
        const jobLocs = jobLocation.split(/[,$$]+/).map(s => s.trim()).filter(Boolean)
        const filtered = l.filter(opt => {
          const lbl = getOptionLabel(opt).trim()
          return jobLocs.some(jl =>
            lbl.toLowerCase().includes(jl.toLowerCase()) ||
            jl.toLowerCase().includes(lbl.toLowerCase())
          )
        })
        setLocOptions(filtered.length > 0 ? filtered : l)
        setSkillOptions(s)
      })
      .catch(() => {})
      .finally(() => setOptsLoading(false))
  }, [jobLocation])

  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', phone: '',
    qualification: '', qualId: 0,
    location: '', experience: 'Fresher',
    skills: '', skillId: 0,
    resume: null, captcha: '',
  })
  const [errors,     setErrors]     = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted,  setSubmitted]  = useState(false)
  const [submitting, setSubmitting] = useState(false)
  const [apiError,   setApiError]   = useState('')
  const [captcha,    setCaptcha]    = useState(genCaptcha)
  const fileRef = useRef<HTMLInputElement>(null)

  // Close on Escape
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const setField = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm(f => ({ ...f, [key]: value }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}

    // Full Name — letters, spaces, dots, hyphens only; 2–60 chars
    if (!form.fullName.trim()) {
      e.fullName = 'Full name is required'
    } else if (form.fullName.trim().length < 2) {
      e.fullName = 'Name must be at least 2 characters'
    } else if (!/^[a-zA-Z\s.\-']+$/.test(form.fullName.trim())) {
      e.fullName = 'Name can only contain letters, spaces, dots, or hyphens'
    }

    // Email
    if (!form.email.trim()) {
      e.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(form.email.trim())) {
      e.email = 'Enter a valid email address'
    }

    // Phone — 10-digit Indian mobile number
    if (!form.phone.trim()) {
      e.phone = 'Phone number is required'
    } else if (!/^[6-9]\d{9}$/.test(form.phone.trim())) {
      e.phone = 'Enter a valid 10-digit mobile number'
    }

    // Resume — required, PDF only, max 5 MB
    if (!form.resume) {
      e.resume = 'Please upload your resume (PDF only)'
    } else if (!form.resume.name.toLowerCase().endsWith('.pdf')) {
      e.resume = 'Only PDF files are allowed'
    } else if (form.resume.size > 5 * 1024 * 1024) {
      e.resume = 'File size must be under 5 MB'
    }

    // Captcha
    if (!form.captcha.trim()) {
      e.captcha = 'Please solve the captcha'
    } else if (form.captcha.trim() !== captcha.answer) {
      e.captcha = 'Incorrect answer, please try again'
    }

    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return

    setSubmitting(true)
    setApiError('')

    try {
      // Convert resume to base64
      const base64Data = form.resume ? await fileToBase64(form.resume) : ''
      const documentName = form.resume?.name ?? ''

      // Step 1 — Create candidate master
      await createCandidateMaster({
        EmailId:       form.email,
        PhoneNo:       form.phone,
        candidateName: form.fullName,
        postId,
      })

      // Step 2 — Submit application
      await createCandidateApplication({
        AppSourceId:             '3',
        CurrentCtc:              0,
        EmailId:                 form.email,
        IsWhether:               form.experience,
        OverallExp:              0,
        PhoneNo:                 form.phone,
        availabilityForWork:     null,
        base64Data,
        candidateLocations:      form.location ? [form.location] : [],
        candidateName:           form.fullName,
        candidateQualifications: form.qualId ? [form.qualId] : [],
        candidateSkills:         form.skillId ? [form.skillId] : [],
        currentCompany:          '',
        currentJobProfile:       '',
        currentLocation:         '',
        documentName,
        isSaved:                 'N',
        postId,
      })

      setSubmitted(true)
    } catch (err) {
      const msg = (err as Error).message ?? ''
      // Give user-friendly messages for common failure modes
      if (msg.includes('401') || msg.includes('403')) {
        setApiError('Session expired. Please refresh the page and try again.')
      } else if (msg.includes('NetworkError') || msg.includes('Failed to fetch')) {
        setApiError('Network error. Please check your connection and try again.')
      } else {
        setApiError(msg || 'Submission failed. Please try again.')
      }
    } finally {
      setSubmitting(false)
    }
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setField('resume', e.target.files?.[0] ?? null)
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        onClick={onClose} aria-modal="true" role="dialog"
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* ── Header ── */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Job Application for <span className={styles.titleAccent}>{jobTitle}</span>
            </h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <FiX size={20} />
            </button>
          </div>

          {/* ── Success ── */}
          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✅</div>
              <h3>Application Submitted!</h3>
              <p>Thank you for applying. Our HR team will review your profile and reach out within 5 working days.</p>
              <button className={styles.closeBtn2} onClick={onClose}>Close</button>
            </div>
          ) : (

          /* ── Form ── */
          <form className={styles.form} onSubmit={handleSubmit} noValidate>

            {/* Row 1: Full Name + Email */}
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${errors.fullName ? styles.inputErr : ''}`}
                  type="text" placeholder="Enter Full Name"
                  value={form.fullName}
                  onChange={e => setField('fullName', e.target.value)}
                />
                {errors.fullName && <span className={styles.err}>{errors.fullName}</span>}
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Email <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                  type="email" placeholder="Enter Email Id"
                  value={form.email}
                  onChange={e => setField('email', e.target.value)}
                />
                {errors.email && <span className={styles.err}>{errors.email}</span>}
              </div>
            </div>

            {/* Row 2: Phone + Qualification */}
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Phone <span className={styles.req}>*</span></label>
                <input
                  className={`${styles.input} ${errors.phone ? styles.inputErr : ''}`}
                  type="tel" placeholder="Enter 10-digit mobile number"
                  value={form.phone}
                  maxLength={10}
                  onChange={e => setField('phone', e.target.value.replace(/\D/g, ''))}
                  onBlur={() => {
                    if (form.phone && !/^[6-9]\d{9}$/.test(form.phone)) {
                      setErrors(ev => ({ ...ev, phone: 'Enter a valid 10-digit mobile number' }))
                    }
                  }}
                />
                {errors.phone && <span className={styles.err}>{errors.phone}</span>}
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Qualification &amp; Certification</label>
                <SingleSelect
                  placeholder="Select Qualification"
                  options={qualOptions}
                  selected={form.qualification}
                  loading={optsLoading}
                  onChange={(lbl, opt) => setForm(f => ({
                    ...f,
                    qualification: lbl,
                    qualId: opt ? Number(getOptionId(opt)) : 0,
                  }))}
                />
              </div>
            </div>

            {/* Row 3: Location + Whether */}
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Preferred Location</label>
                <SingleSelect
                  placeholder="Select Location"
                  options={locOptions}
                  selected={form.location}
                  loading={optsLoading}
                  onChange={val => setField('location', val)}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Whether? <span className={styles.req}>*</span></label>
                <div className={styles.radioGroup}>
                  <label className={styles.radioItem}>
                    <input type="radio" name="exp" value="Fresher"
                      checked={form.experience === 'Fresher'}
                      onChange={() => setField('experience', 'Fresher')} />
                    Fresher
                  </label>
                  <label className={styles.radioItem}>
                    <input type="radio" name="exp" value="Experienced"
                      checked={form.experience === 'Experienced'}
                      onChange={() => setField('experience', 'Experienced')} />
                    Experienced
                  </label>
                </div>
              </div>
            </div>

            {/* Row 4: Skills + Resume */}
            <div className={styles.row}>
              <div className={styles.group}>
                <label className={styles.label}>Primary Skills</label>
                <SingleSelect
                  placeholder="Select Skill"
                  options={skillOptions}
                  selected={form.skills}
                  loading={optsLoading}
                  onChange={(lbl, opt) => setForm(f => ({
                    ...f,
                    skills:  lbl,
                    skillId: opt ? Number(getOptionId(opt)) : 0,
                  }))}
                />
              </div>
              <div className={styles.group}>
                <label className={styles.label}>Upload Resume <span className={styles.req}>*</span></label>
                <div className={styles.fileWrap}>
                  <button type="button" className={styles.fileBtn}
                    onClick={() => fileRef.current?.click()}>
                    <FiUpload size={13} /> Choose File
                  </button>
                  <span className={styles.fileName}>
                    {form.resume ? form.resume.name : 'No file chosen'}
                  </span>
                  <input ref={fileRef} type="file" accept=".pdf"
                    style={{ display: 'none' }} onChange={handleFile} />
                </div>
                {errors.resume
                  ? <span className={styles.err}>{errors.resume}</span>
                  : <span className={styles.hint}>Please upload your resume (PDF only)</span>}
              </div>
            </div>

            {/* Captcha */}
            <div className={styles.group}>
              <label className={styles.label}>Captcha <span className={styles.req}>*</span></label>
              <div className={styles.captchaWrap}>
                <input
                  className={`${styles.input} ${styles.captchaInput} ${errors.captcha ? styles.inputErr : ''}`}
                  type="text" placeholder="Enter answer"
                  value={form.captcha}
                  onChange={e => setField('captcha', e.target.value)}
                />
                <div className={styles.captchaQuestion}>{captcha.question} = ?</div>
                <button type="button" className={styles.refreshCaptcha}
                  onClick={() => { setCaptcha(genCaptcha()); setField('captcha', '') }}
                  aria-label="Refresh captcha">
                  <FiRefreshCw size={14} />
                </button>
              </div>
              {errors.captcha && <span className={styles.err}>{errors.captcha}</span>}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
              {apiError && <p className={styles.apiErr}>{apiError}</p>}
              <div className={styles.footerBtns}>
                <button
                  type="submit"
                  className={styles.applyBtn}
                  disabled={submitting}
                >
                  {submitting ? (
                    <><span className={styles.btnSpinner} /> Submitting…</>
                  ) : 'Apply'}
                </button>
                <button type="button" className={styles.closeBtn2} onClick={onClose} disabled={submitting}>
                  Close
                </button>
              </div>
            </div>
          </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
