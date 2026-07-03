import React, { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiX, FiUpload, FiRefreshCw } from 'react-icons/fi'
import {
  fetchQualifications, fetchLocations, fetchSkills, getOptionLabel,
  type ApiJobDetail, type ConfigOption,
} from '../../services/jobsApi'
import styles from './ApplyModal.module.css'

interface ApplyModalProps {
  jobTitle: string
  detail:   ApiJobDetail | null
  onClose:  () => void
}

interface FormState {
  fullName:      string
  email:         string
  phone:         string
  qualification: string[]
  location:      string[]
  experience:    'Fresher' | 'Experienced'
  skills:        string[]
  resume:        File | null
  captcha:       string
}

// Simple math captcha
function genCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1
  const b = Math.floor(Math.random() * 9) + 1
  return { question: `${a} + ${b}`, answer: String(a + b) }
}

export default function ApplyModal({ jobTitle, detail, onClose }: ApplyModalProps) {
  // ── Live dropdown options from API ───────────────────
  const [qualOptions,  setQualOptions]  = useState<ConfigOption[]>([])
  const [locOptions,   setLocOptions]   = useState<ConfigOption[]>([])
  const [skillOptions, setSkillOptions] = useState<ConfigOption[]>([])
  const [optsLoading,  setOptsLoading]  = useState(true)

  useEffect(() => {
    Promise.all([fetchQualifications(), fetchLocations(), fetchSkills()])
      .then(([quals, locs, skills]) => {
        setQualOptions(quals)
        setLocOptions(locs)
        setSkillOptions(skills)
      })
      .catch(() => { /* silently fall back to empty */ })
      .finally(() => setOptsLoading(false))
  }, [])

  const [form, setForm] = useState<FormState>({
    fullName: '', email: '', phone: '',
    qualification: [], location: [], experience: 'Fresher',
    skills: [], resume: null, captcha: '',
  })
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({})
  const [submitted, setSubmitted] = useState(false)
  const [captcha, setCaptcha] = useState(genCaptcha)
  const fileRef = useRef<HTMLInputElement>(null)

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const toggleArr = (key: 'qualification' | 'skills' | 'location', val: string) => {
    setForm(f => ({
      ...f,
      [key]: f[key].includes(val) ? f[key].filter(v => v !== val) : [...f[key], val],
    }))
    setErrors(e => ({ ...e, [key]: '' }))
  }

  const validate = (): boolean => {
    const e: Partial<Record<keyof FormState, string>> = {}
    if (!form.fullName.trim())  e.fullName = 'Full name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.phone.trim())     e.phone = 'Phone is required'
    if (!form.resume)           e.resume = 'Please upload your resume (PDF only)'
    else if (!form.resume.name.endsWith('.pdf')) e.resume = 'Only PDF files are allowed'
    if (form.captcha.trim() !== captcha.answer) e.captcha = 'Incorrect answer'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault()
    if (!validate()) return
    // TODO: wire to actual submit API when available
    setSubmitted(true)
  }

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null
    setForm(f => ({ ...f, resume: file }))
    setErrors(er => ({ ...er, resume: '' }))
  }

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-modal="true"
        role="dialog"
      >
        <motion.div
          className={styles.modal}
          initial={{ opacity: 0, scale: 0.92, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 40 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={e => e.stopPropagation()}
        >
          {/* Header */}
          <div className={styles.header}>
            <h2 className={styles.title}>
              Job Application for <span className={styles.titleAccent}>{jobTitle}</span>
            </h2>
            <button className={styles.closeBtn} onClick={onClose} aria-label="Close">
              <FiX size={20} />
            </button>
          </div>

          {/* Success state */}
          {submitted ? (
            <div className={styles.successState}>
              <div className={styles.successIcon}>✅</div>
              <h3>Application Submitted!</h3>
              <p>Thank you for applying. Our HR team will review your profile and reach out within 5 working days.</p>
              <button className={styles.closeBtn2} onClick={onClose}>Close</button>
            </div>
          ) : (
            <form className={styles.form} onSubmit={handleSubmit} noValidate>
              {/* Row 1: Full Name + Email */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Full Name <span className={styles.req}>*</span></label>
                  <input className={`${styles.input} ${errors.fullName ? styles.inputErr : ''}`}
                    type="text" placeholder="Enter Full Name"
                    value={form.fullName}
                    onChange={e => { setForm(f => ({ ...f, fullName: e.target.value })); setErrors(er => ({ ...er, fullName: '' })) }} />
                  {errors.fullName && <span className={styles.err}>{errors.fullName}</span>}
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Email <span className={styles.req}>*</span></label>
                  <input className={`${styles.input} ${errors.email ? styles.inputErr : ''}`}
                    type="email" placeholder="Enter Email Id"
                    value={form.email}
                    onChange={e => { setForm(f => ({ ...f, email: e.target.value })); setErrors(er => ({ ...er, email: '' })) }} />
                  {errors.email && <span className={styles.err}>{errors.email}</span>}
                </div>
              </div>

              {/* Row 2: Phone + Qualification */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Phone <span className={styles.req}>*</span></label>
                  <input className={`${styles.input} ${errors.phone ? styles.inputErr : ''}`}
                    type="tel" placeholder="Enter Phone No"
                    value={form.phone}
                    onChange={e => { setForm(f => ({ ...f, phone: e.target.value })); setErrors(er => ({ ...er, phone: '' })) }} />
                  {errors.phone && <span className={styles.err}>{errors.phone}</span>}
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Qualification &amp; Certification <span className={styles.req}>*</span></label>
                  <div className={styles.multiSelect}>
                    <span className={styles.multiPlaceholder}>
                      {form.qualification.length ? form.qualification.join(', ') : 'Select All'}
                    </span>
                    <div className={styles.multiDropdown}>
                      {optsLoading ? (
                        <span className={styles.optsLoading}>Loading…</span>
                      ) : qualOptions.length > 0 ? qualOptions.map(q => {
                        const label = getOptionLabel(q)
                        return (
                          <label key={String(q.id)} className={styles.checkItem}>
                            <input type="checkbox" checked={form.qualification.includes(label)}
                              onChange={() => toggleArr('qualification', label)} />
                            {label}
                          </label>
                        )
                      }) : (
                        <label className={styles.checkItem}>
                          <input type="checkbox" checked={form.qualification.includes('Any')}
                            onChange={() => toggleArr('qualification', 'Any')} />
                          Any
                        </label>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Row 3: Preferred Location + Whether */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Preferred Location <span className={styles.req}>*</span></label>
                  <div className={styles.multiSelect}>
                    <span className={styles.multiPlaceholder}>
                      {form.location.length ? form.location.join(', ') : 'Select one or more locations'}
                    </span>
                    <div className={styles.multiDropdown}>
                      {optsLoading ? (
                        <span className={styles.optsLoading}>Loading…</span>
                      ) : locOptions.length > 0 ? locOptions.map(l => {
                        const label = getOptionLabel(l)
                        return (
                          <label key={String(l.id)} className={styles.checkItem}>
                            <input type="checkbox" checked={form.location.includes(label)}
                              onChange={() => toggleArr('location', label)} />
                            {label}
                          </label>
                        )
                      }) : ['Udaipur', 'Jaipur', 'Delhi', 'Remote'].map(l => (
                        <label key={l} className={styles.checkItem}>
                          <input type="checkbox" checked={form.location.includes(l)}
                            onChange={() => toggleArr('location', l)} />
                          {l}
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                <div className={styles.group}>
                  <label className={styles.label}>Whether? <span className={styles.req}>*</span></label>
                  <div className={styles.radioGroup}>
                    <label className={styles.radioItem}>
                      <input type="radio" name="experience" value="Fresher"
                        checked={form.experience === 'Fresher'}
                        onChange={() => setForm(f => ({ ...f, experience: 'Fresher' }))} />
                      Fresher
                    </label>
                    <label className={styles.radioItem}>
                      <input type="radio" name="experience" value="Experienced"
                        checked={form.experience === 'Experienced'}
                        onChange={() => setForm(f => ({ ...f, experience: 'Experienced' }))} />
                      Experienced
                    </label>
                  </div>
                </div>
              </div>

              {/* Row 4: Primary Skills + Upload Resume */}
              <div className={styles.row}>
                <div className={styles.group}>
                  <label className={styles.label}>Primary Skills <span className={styles.req}>*</span></label>
                  <div className={styles.multiSelect}>
                    <span className={styles.multiPlaceholder}>
                      {form.skills.length ? form.skills.join(', ') : 'Select All'}
                    </span>
                    <div className={styles.multiDropdown}>
                      {optsLoading ? (
                        <span className={styles.optsLoading}>Loading…</span>
                      ) : skillOptions.length > 0 ? skillOptions.map(s => {
                        const label = getOptionLabel(s)
                        return (
                          <label key={String(s.id)} className={styles.checkItem}>
                            <input type="checkbox" checked={form.skills.includes(label)}
                              onChange={() => toggleArr('skills', label)} />
                            {label}
                          </label>
                        )
                      }) : (
                        <label className={styles.checkItem}>
                          <input type="checkbox" checked={form.skills.includes('General')}
                            onChange={() => toggleArr('skills', 'General')} />
                          General
                        </label>
                      )}
                    </div>
                  </div>
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
                    : <span className={styles.hint}>Please upload your resume (PDF only)</span>
                  }
                </div>
              </div>

              {/* Captcha */}
              <div className={styles.captchaRow}>
                <div className={styles.group}>
                  <label className={styles.label}>Captcha <span className={styles.req}>*</span></label>
                  <div className={styles.captchaWrap}>
                    <input className={`${styles.input} ${styles.captchaInput} ${errors.captcha ? styles.inputErr : ''}`}
                      type="text" placeholder="Enter answer"
                      value={form.captcha}
                      onChange={e => { setForm(f => ({ ...f, captcha: e.target.value })); setErrors(er => ({ ...er, captcha: '' })) }} />
                    <div className={styles.captchaQuestion}>{captcha.question} = ?</div>
                    <button type="button" className={styles.refreshCaptcha}
                      onClick={() => { setCaptcha(genCaptcha()); setForm(f => ({ ...f, captcha: '' })) }}
                      aria-label="Refresh captcha">
                      <FiRefreshCw size={14} />
                    </button>
                  </div>
                  {errors.captcha && <span className={styles.err}>{errors.captcha}</span>}
                </div>
              </div>

              {/* Footer buttons */}
              <div className={styles.footer}>
                <button type="submit" className={styles.applyBtn}>Apply</button>
                <button type="button" className={styles.closeBtn2} onClick={onClose}>Close</button>
              </div>
            </form>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
