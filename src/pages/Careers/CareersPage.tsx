import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiBriefcase, FiMapPin, FiClock, FiChevronDown, FiArrowRight,
  FiMail, FiUsers, FiStar, FiZap, FiHeart, FiAward,
  FiCode, FiDatabase, FiSettings, FiShield, FiTrendingUp,
  FiMonitor, FiUploadCloud, FiGlobe, FiCoffee,
  FiFilter, FiX, FiRefreshCw, FiAlertCircle,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import PageHero from '../../components/PageHero/PageHero'
import ApplyModal from '../../components/ApplyModal/ApplyModal'
import {
  fetchJobs, fetchJobDetail, fetchLocations, cleanLocation, formatExp, splitTags,
  cleanHtml, getOptionLabel,
  type ApiJob, type ApiJobDetail, type ConfigOption,
} from '../../services/jobsApi'
import styles from './CareersPage.module.css'

// ── Types ────────────────────────────────────────────────
interface Perk  { icon: IconType; color: string; title: string; desc: string }
interface ProcessStep { step: string; title: string; desc: string }
interface Stat  { val: string; label: string }

interface NormJob {
  id:        number
  title:     string
  location:  string
  exp:       string
  publishOn: string
  color:     string
  Icon:      IconType
}

interface FilterState { position: string; location: string; experience: string }

// ── Static data ──────────────────────────────────────────
const perks: Perk[] = [
  { icon: FiAward,  color: '#0057FF', title: 'CMMI Level 5 Culture', desc: 'Work in one of the few CMMI Level 5 certified IT companies in India — processes, quality, and discipline that build world-class engineers.' },
  { icon: FiZap,    color: '#7B61FF', title: 'Fast-Track Growth',     desc: 'Merit-based promotions, quarterly reviews, and personalised learning paths to accelerate your career at every stage.' },
  { icon: FiGlobe,  color: '#FF6B35', title: 'High-Impact Work',      desc: 'Your code serves real government citizens and large enterprises. Ship features that impact 100K+ users across India.' },
  { icon: FiHeart,  color: '#E84393', title: 'Inclusive Workplace',   desc: 'A diverse, respectful, and collaborative environment where every voice matters and innovation is encouraged from day one.' },
  { icon: FiCoffee, color: '#00B894', title: 'Work-Life Balance',     desc: '5-day work week, flexible timings, hybrid options for select roles, and a team that values personal well-being.' },
  { icon: FiStar,   color: '#0EA5E9', title: 'Continuous Learning',   desc: 'Sponsored certifications (AWS, Azure, PMI, ISTQB), internal knowledge-sharing sessions, and access to premium learning platforms.' },
]

const processSteps: ProcessStep[] = [
  { step: '01', title: 'Apply Online',         desc: 'Submit your resume and cover letter via the application form below.' },
  { step: '02', title: 'Initial Screening',    desc: 'Our HR team reviews your profile and reaches out within 5 working days.' },
  { step: '03', title: 'Technical Assessment', desc: 'Role-specific test or take-home assignment to evaluate your skills.' },
  { step: '04', title: 'Panel Interview',       desc: 'Technical and cultural fit interview with the engineering/delivery team.' },
  { step: '05', title: 'HR Discussion',         desc: 'Compensation, benefits, joining timeline, and final Q&A.' },
  { step: '06', title: 'Offer & Onboarding',   desc: 'Receive your offer letter and join the E-Connect family.' },
]

const stats: Stat[] = [
  { val: '500+', label: 'Team Members' },
  { val: '35+',  label: 'Years Legacy' },
  { val: '25+',  label: 'Tech Domains' },
  { val: '95%',  label: 'Retention Rate' },
]

// ── Dept → icon + color ──────────────────────────────────
const DEPT_MAP: Record<string, { color: string; Icon: IconType }> = {
  net:            { color: '#0057FF', Icon: FiCode },
  react:          { color: '#0057FF', Icon: FiCode },
  java:           { color: '#7B61FF', Icon: FiDatabase },
  spring:         { color: '#7B61FF', Icon: FiDatabase },
  devops:         { color: '#00B894', Icon: FiSettings },
  cloud:          { color: '#00B894', Icon: FiSettings },
  infrastructure: { color: '#00B894', Icon: FiSettings },
  security:       { color: '#E84393', Icon: FiShield },
  analyst:        { color: '#FF6B35', Icon: FiTrendingUp },
  business:       { color: '#FF6B35', Icon: FiTrendingUp },
  design:         { color: '#0EA5E9', Icon: FiMonitor },
  ui:             { color: '#0EA5E9', Icon: FiMonitor },
  ux:             { color: '#0EA5E9', Icon: FiMonitor },
  hr:             { color: '#7B61FF', Icon: FiUsers },
  default:        { color: '#7B61FF', Icon: FiDatabase },
}

function getDeptStyle(title: string): { color: string; Icon: IconType } {
  const key = title.toLowerCase()
  for (const [k, v] of Object.entries(DEPT_MAP)) {
    if (key.includes(k)) return v
  }
  return DEPT_MAP.default
}

function normalise(j: ApiJob): NormJob {
  const { color, Icon } = getDeptStyle(j.postName ?? '')
  return {
    id:        j.postId,
    title:     j.postName,
    location:  cleanLocation(j.location),
    exp:       formatExp(j.workExperience),
    publishOn: j.publishOn ?? '',
    color,
    Icon,
  }
}

// ── Page root ─────────────────────────────────────────────
export default function CareersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiBriefcase} tag="Join Our Team" title="Build Your Career" accent="at E-Connect"
        description="Join 500+ professionals driving digital transformation for governments and enterprises across India. CMMI Level 5 · 35+ Years of Excellence."
        breadcrumb="Careers"
        gradient="linear-gradient(135deg,#001F6B 0%,#0057FF 55%,#00C2FF 100%)"
      />
      <StatsStrip />
      <CultureSection />
      <OpeningsSection />
      <ProcessSection />
      <ApplyCta />
    </motion.div>
  )
}

// ── Stats strip ───────────────────────────────────────────
function StatsStrip() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.statsStrip} ref={ref}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <motion.div key={s.label} className={styles.statItem}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}>
              <span className={styles.statVal}>{s.val}</span>
              <span className={styles.statLabel}>{s.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Culture / Perks ───────────────────────────────────────
function CultureSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <section className={styles.cultureSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className={styles.tag}>Life at E-Connect</span>
          <h2 className={styles.sectionTitle}>Why You&apos;ll Love <span className={styles.accent}>Working Here</span></h2>
          <p className={styles.sectionSub}>We don&apos;t just build software — we build careers.</p>
        </motion.div>
        <div className={styles.perksGrid}>
          {perks.map((perk, i) => {
            const Icon = perk.icon
            return (
              <motion.div key={perk.title} className={styles.perkCard}
                style={{ '--pc': perk.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}>
                <div className={styles.perkIconWrap}><Icon size={22} /></div>
                <h3 className={styles.perkTitle}>{perk.title}</h3>
                <p className={styles.perkDesc}>{perk.desc}</p>
                <div className={styles.perkBar} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

// ── JobCard — fetches detail on expand ───────────────────
interface JobCardProps {
  job: NormJob
  index: number
  inView: boolean
  expanded: boolean
  onToggle: () => void
}

function JobCard({ job, index, inView, expanded, onToggle }: JobCardProps) {
  const [detail, setDetail] = useState<ApiJobDetail | null>(null)
  const [detailLoading, setDetailLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)

  // Fetch detail the first time this card is expanded
  useEffect(() => {
    if (!expanded || detail) return
    setDetailLoading(true)
    fetchJobDetail(job.id)
      .then(d => setDetail(d))
      .catch(() => setDetail(null))
      .finally(() => setDetailLoading(false))
  }, [expanded, job.id, detail])

  const Icon = job.Icon
  const skills     = detail ? splitTags(detail.skills)            : []
  const quals      = detail ? splitTags(detail.qualifications)    : []
  const expertise  = detail ? splitTags(detail.technicalExpertise): []

  return (
    <motion.div
      className={`${styles.jobCard} ${expanded ? styles.jobCardOpen : ''}`}
      style={{ '--jc': job.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.06, duration: 0.45 }}
    >
      {/* ── Header row ── */}
      <button className={styles.jobHeader} onClick={onToggle} aria-expanded={expanded}>
        <div className={styles.jobLeft}>
          <div className={styles.jobIconWrap}><Icon size={20} /></div>
          <div className={styles.jobInfo}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <div className={styles.jobMeta}>
              <span className={styles.jobMeta2}><FiMapPin size={11} /> {job.location}</span>
              <span className={styles.jobMeta2}><FiClock size={11} /> {job.exp}</span>
              {job.publishOn && (
                <span className={styles.jobMeta2}>Posted: {job.publishOn}</span>
              )}
              <span className={styles.jobType}>Full-time</span>
            </div>
          </div>
        </div>
        <motion.div className={styles.jobChevron}
          animate={{ rotate: expanded ? 180 : 0 }} transition={{ duration: 0.25 }}>
          <FiChevronDown size={18} />
        </motion.div>
      </button>

      {/* ── Expandable detail body ── */}
      <AnimatePresence initial={false}>
        {expanded && (
          <motion.div className={styles.jobBody}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
            <div className={styles.jobBodyInner}>

              {/* Loading spinner */}
              {detailLoading && (
                <div className={styles.detailLoading}>
                  <div className={styles.detailSpinner} />
                  <span>Loading details…</span>
                </div>
              )}

              {/* Detail content */}
              {!detailLoading && detail && (
                <>
                  {/* About the role — HTML from API */}
                  {detail.candidatedetails && (
                    <div className={styles.jobDetailSection}>
                      <h4 className={styles.jobSubTitle}>About the Role</h4>
                      <div
                        className={styles.jobHtmlContent}
                        dangerouslySetInnerHTML={{ __html: cleanHtml(detail.candidatedetails) }}
                      />
                    </div>
                  )}

                  {/* Responsibilities — HTML from API */}
                  {detail.responsibilities && (
                    <div className={styles.jobDetailSection}>
                      <h4 className={styles.jobSubTitle}>Key Responsibilities</h4>
                      <div
                        className={styles.jobHtmlContent}
                        dangerouslySetInnerHTML={{ __html: cleanHtml(detail.responsibilities) }}
                      />
                    </div>
                  )}

                  <div className={styles.jobTwoCols}>
                    {/* Skills */}
                    {skills.length > 0 && (
                      <div>
                        <h4 className={styles.jobSubTitle}>Required Skills</h4>
                        <div className={styles.skillTags}>
                          {skills.map(s => <span key={s} className={styles.skillTag}>{s}</span>)}
                        </div>
                      </div>
                    )}

                    {/* Technical Expertise */}
                    {expertise.length > 0 && (
                      <div>
                        <h4 className={styles.jobSubTitle}>Technical Expertise</h4>
                        <div className={styles.skillTags}>
                          {expertise.map(t => <span key={t} className={styles.skillTag}>{t}</span>)}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Qualifications */}
                  {quals.length > 0 && (
                    <div className={styles.jobDetailSection}>
                      <h4 className={styles.jobSubTitle}>Qualifications</h4>
                      <div className={styles.skillTags}>
                        {quals.map(q => <span key={q} className={`${styles.skillTag} ${styles.skillTagGreen}`}>{q}</span>)}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Fallback if detail fetch failed */}
              {!detailLoading && !detail && (
                <p className={styles.jobDesc}>Detailed description will be shown here.</p>
              )}

              <button
                type="button"
                className={styles.applyBtn}
                onClick={() => setShowModal(true)}
              >
                <FiUploadCloud size={15} /> Apply for this Role
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Apply modal */}
      {showModal && (
        <ApplyModal
          jobTitle={job.title}
          jobLocation={job.location}
          postId={job.id}
          detail={detail}
          onClose={() => setShowModal(false)}
        />
      )}
    </motion.div>
  )
}

// ── Open Positions section ────────────────────────────────
function OpeningsSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [expanded,  setExpanded]  = useState<number | null>(null)
  const [panelOpen, setPanelOpen] = useState<boolean>(true)
  const [filters,   setFilters]   = useState<FilterState>({ position: '', location: '', experience: '' })
  const [applied,   setApplied]   = useState<FilterState>({ position: '', location: '', experience: '' })
  const [jobs,    setJobs]    = useState<NormJob[]>([])
  const [loading, setLoading] = useState<boolean>(true)
  const [error,   setError]   = useState<string>('')

  // Fetch location options from config API
  const [locOptions, setLocOptions] = useState<ConfigOption[]>([])
  useEffect(() => {
    fetchLocations()
      .then(opts => setLocOptions(opts))
      .catch(() => {})
  }, [])

  const load = () => {
    setLoading(true); setError('')
    fetchJobs()
      .then(raw => setJobs(raw.map(normalise)))
      .catch(err => setError((err as Error).message ?? 'Failed to load'))
      .finally(() => setLoading(false))
  }
  useEffect(() => { load() }, [])

  const allPositions  = ['All Positions',  ...Array.from(new Set(jobs.map(j => j.title)))]
  // Locations from config API — fall back to job-derived list if API returns nothing
  const allLocations  = locOptions.length > 0
    ? ['All Locations', ...locOptions.map(o => getOptionLabel(o)).filter(Boolean)]
    : ['All Locations',  ...Array.from(new Set(jobs.map(j => j.location)))]
  const allExperience = ['All Experience', ...Array.from(new Set(jobs.map(j => j.exp)))]

  const handleApply = () => { setApplied({ ...filters }); setExpanded(null) }
  const handleReset = () => {
    const e = { position: '', location: '', experience: '' }
    setFilters(e); setApplied(e); setExpanded(null)
  }

  const filtered = jobs.filter(j =>
    (!applied.position   || j.title    === applied.position) &&
    (!applied.location   || j.location === applied.location) &&
    (!applied.experience || j.exp      === applied.experience)
  )
  const hasFilter = !!(applied.position || applied.location || applied.experience)

  return (
    <section className={styles.openingsSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className={styles.tag}>Now Hiring</span>
          <h2 className={styles.sectionTitle}>Open <span className={styles.accent}>Positions</span></h2>
          <p className={styles.sectionSub}>
            {loading ? 'Loading positions…' : `${jobs.length} open roles — live from our recruitment portal`}
          </p>
        </motion.div>

        {/* Filter panel */}
        <motion.div className={styles.filterPanel}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}>
          <button className={styles.filterPanelHeader} onClick={() => setPanelOpen(o => !o)} aria-expanded={panelOpen}>
            <div className={styles.filterPanelTitle}>
              <FiFilter size={16} className={styles.filterIcon} />
              <span>Filter Criteria</span>
              {hasFilter && <span className={styles.filterActiveBadge}>Active</span>}
            </div>
            <motion.span className={styles.filterChevron}
              animate={{ rotate: panelOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
              <FiChevronDown size={18} />
            </motion.span>
          </button>
          <AnimatePresence initial={false}>
            {panelOpen && (
              <motion.div className={styles.filterBody}
                initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                <div className={styles.filterRow}>
                  <div className={styles.filterGroup}>
                    <label htmlFor="fp" className={styles.filterLabel}>Job Position</label>
                    <select id="fp" className={styles.filterSelect} value={filters.position}
                      onChange={e => setFilters(f => ({ ...f, position: e.target.value }))}>
                      {allPositions.map(p => <option key={p} value={p === 'All Positions' ? '' : p}>{p}</option>)}
                    </select>
                  </div>
                  <div className={styles.filterGroup}>
                    <label htmlFor="fl" className={styles.filterLabel}>Location</label>
                    <select id="fl" className={styles.filterSelect} value={filters.location}
                      onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}>
                      {allLocations.map(l => <option key={l} value={l === 'All Locations' ? '' : l}>{l}</option>)}
                    </select>
                  </div>
                  <div className={styles.filterGroup}>
                    <label htmlFor="fe" className={styles.filterLabel}>Experience</label>
                    <select id="fe" className={styles.filterSelect} value={filters.experience}
                      onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))}>
                      {allExperience.map(e => <option key={e} value={e === 'All Experience' ? '' : e}>{e}</option>)}
                    </select>
                  </div>
                  <div className={styles.filterBtns}>
                    <button className={styles.filterApplyBtn} onClick={handleApply}>Apply</button>
                    <button className={styles.filterResetBtn} onClick={handleReset}>Reset</button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {hasFilter && (
          <motion.div className={styles.filterResults} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <span>Showing <strong>{filtered.length}</strong> of {jobs.length} positions</span>
            <button className={styles.filterClearAll} onClick={handleReset}><FiX size={13} /> Clear filters</button>
          </motion.div>
        )}

        <div className={styles.openingsList}>
          {/* Loading */}
          {loading && (
            <motion.div className={styles.loadingState} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              {[1, 2, 3].map(i => (
                <div key={i} className={styles.skeletonCard}>
                  <div className={styles.skeletonIcon} />
                  <div className={styles.skeletonLines}>
                    <div className={styles.skeletonLine} style={{ width: '60%' }} />
                    <div className={styles.skeletonLine} style={{ width: '40%' }} />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
          {/* Error */}
          {!loading && error && (
            <motion.div className={styles.errorState} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <FiAlertCircle size={36} className={styles.errorIcon} />
              <p>{error}</p>
              <button className={styles.retryBtn} onClick={load}><FiRefreshCw size={14} /> Retry</button>
            </motion.div>
          )}
          {/* Jobs */}
          {!loading && !error && (
            <AnimatePresence mode="wait">
              {filtered.length === 0 ? (
                <motion.div key="empty" className={styles.noResults}
                  initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
                  <FiBriefcase size={40} className={styles.noResultsIcon} />
                  <p>No positions match your filters.</p>
                  <button className={styles.filterResetBtn} onClick={handleReset}>Reset Filters</button>
                </motion.div>
              ) : (
                <motion.div key="list">
                  {filtered.map((job, i) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      index={i}
                      inView={inView}
                      expanded={expanded === job.id}
                      onToggle={() => setExpanded(expanded === job.id ? null : job.id)}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  )
}

// ── Hiring Process ────────────────────────────────────────
function ProcessSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.processSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className={styles.tag}>How We Hire</span>
          <h2 className={styles.sectionTitle}>Our Hiring <span className={styles.accent}>Process</span></h2>
          <p className={styles.sectionSub}>Simple, transparent — 6 clear steps from apply to offer.</p>
        </motion.div>
        <div className={styles.processGrid}>
          {processSteps.map((step, i) => (
            <motion.div key={step.step} className={styles.processCard}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className={styles.processStep}>{step.step}</div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDesc}>{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

// ── Apply CTA ─────────────────────────────────────────────
function ApplyCta() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.ctaSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.ctaBanner}
          initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}>
          <div className={styles.ctaOrb} />
          <div className={styles.ctaOrb2} />
          <div className={styles.ctaContent}>
            <div className={styles.ctaIconRow}>
              <div className={styles.ctaIconBubble}><FiBriefcase size={22} /></div>
              <div className={styles.ctaIconBubble}><FiUsers size={22} /></div>
              <div className={styles.ctaIconBubble}><FiStar size={22} /></div>
            </div>
            <h2 className={styles.ctaTitle}>Don&apos;t See the Right Role?</h2>
            <p className={styles.ctaDesc}>
              We&apos;re always looking for exceptional talent. Send us your resume and we&apos;ll reach out when the right opportunity opens up.
            </p>
            <div className={styles.ctaBtns}>
              <a href="mailto:hr@e-connectsolutions.com" className={styles.ctaPrimary}>
                <FiMail size={16} /> Send Your Resume
              </a>
              <Link to="/contact" className={styles.ctaSecondary}>
                Talk to HR <FiArrowRight size={14} />
              </Link>
            </div>
            <p className={styles.ctaNote}>📧 hr@e-connectsolutions.com · We respond within 5 working days</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
