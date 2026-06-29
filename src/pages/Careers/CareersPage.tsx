import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiBriefcase, FiMapPin, FiClock, FiChevronDown, FiArrowRight,
  FiMail, FiUsers, FiStar, FiZap, FiHeart, FiAward,
  FiCode, FiDatabase, FiSettings, FiShield, FiTrendingUp,
  FiMonitor, FiCheckCircle, FiUploadCloud, FiGlobe, FiCoffee,
  FiFilter, FiX,
} from 'react-icons/fi'
import type { IconType } from 'react-icons'
import PageHero from '../../components/PageHero/PageHero'
import styles from './CareersPage.module.css'

interface Opening {
  id: number
  title: string
  dept: string
  icon: IconType
  color: string
  type: string
  location: string
  exp: string
  skills: string[]
  desc: string
  responsibilities: string[]
}

interface Perk {
  icon: IconType
  color: string
  title: string
  desc: string
}

interface ProcessStep {
  step: string
  title: string
  desc: string
}

interface Stat {
  val: string
  label: string
}

const openings: Opening[] = [
  {
    id: 1,
    title: 'Senior React / React Native Developer',
    dept: 'Engineering',
    icon: FiCode,
    color: '#0057FF',
    type: 'Full-time',
    location: 'Udaipur, Rajasthan (On-site)',
    exp: '3–6 Years',
    skills: ['React.js', 'React Native', 'TypeScript', 'REST APIs', 'Git'],
    desc: 'Build and maintain high-performance web and mobile applications for our enterprise clients and government platforms.',
    responsibilities: [
      'Develop responsive React web apps and React Native mobile apps',
      'Collaborate with UI/UX designers to translate mockups to code',
      'Optimise application performance and ensure cross-platform compatibility',
      'Write clean, well-documented, testable code following best practices',
    ],
  },
  {
    id: 2,
    title: 'Java / Spring Boot Backend Developer',
    dept: 'Engineering',
    icon: FiDatabase,
    color: '#7B61FF',
    type: 'Full-time',
    location: 'Udaipur, Rajasthan (On-site)',
    exp: '2–5 Years',
    skills: ['Java', 'Spring Boot', 'Microservices', 'MySQL', 'REST/SOAP'],
    desc: "Design, develop, and maintain scalable backend services and APIs powering our ERP, e-Governance, and M-SaaS platforms.",
    responsibilities: [
      'Develop and maintain RESTful APIs using Spring Boot',
      'Design scalable microservice architectures',
      'Write and optimise complex SQL queries on MySQL / Oracle',
      'Participate in code reviews and ensure code quality standards',
    ],
  },
  {
    id: 3,
    title: 'DevOps / Cloud Infrastructure Engineer',
    dept: 'Infrastructure',
    icon: FiSettings,
    color: '#00B894',
    type: 'Full-time',
    location: 'Udaipur, Rajasthan (Hybrid)',
    exp: '3–7 Years',
    skills: ['AWS / Azure', 'Docker', 'Kubernetes', 'CI/CD', 'Linux'],
    desc: 'Own the CI/CD pipelines, cloud infrastructure, and deployment automation for our SaaS products and government cloud deployments.',
    responsibilities: [
      'Build and manage CI/CD pipelines using Jenkins / GitHub Actions',
      'Manage containerised workloads on Kubernetes / ECS',
      'Monitor infrastructure health and respond to incidents',
      'Drive cloud cost optimisation and security hardening',
    ],
  },
  {
    id: 4,
    title: 'Business Analyst (IT / E-Governance)',
    dept: 'Consulting',
    icon: FiTrendingUp,
    color: '#FF6B35',
    type: 'Full-time',
    location: 'Udaipur / Delhi (Travel Required)',
    exp: '2–5 Years',
    skills: ['Requirements Gathering', 'BRD / SRS', 'UML', 'SQL', 'Agile'],
    desc: 'Bridge the gap between clients and engineering teams to capture requirements and ensure successful delivery.',
    responsibilities: [
      'Conduct stakeholder workshops and gather detailed business requirements',
      'Prepare BRD, FRD, SRS, and use-case documentation',
      'Create wireframes and process flow diagrams',
      'Coordinate with engineering teams throughout the delivery lifecycle',
    ],
  },
  {
    id: 5,
    title: 'Cybersecurity Analyst',
    dept: 'Security',
    icon: FiShield,
    color: '#E84393',
    type: 'Full-time',
    location: 'Udaipur, Rajasthan (On-site)',
    exp: '2–4 Years',
    skills: ['VAPT', 'SIEM', 'ISO 27001', 'Network Security', 'OWASP'],
    desc: "Protect our clients' digital infrastructure through proactive vulnerability assessments, penetration testing, and security monitoring.",
    responsibilities: [
      'Conduct VAPT for web applications and network infrastructure',
      'Monitor SIEM dashboards and respond to security incidents',
      'Prepare security audit reports and remediation plans',
      'Implement and maintain ISO 27001 controls',
    ],
  },
  {
    id: 6,
    title: 'UI/UX Designer',
    dept: 'Design',
    icon: FiMonitor,
    color: '#0EA5E9',
    type: 'Full-time',
    location: 'Udaipur, Rajasthan (On-site / Remote)',
    exp: '2–4 Years',
    skills: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems', 'User Research'],
    desc: 'Create intuitive, beautiful, and accessible user interfaces for our enterprise web and mobile products.',
    responsibilities: [
      'Design high-fidelity UI mockups and interactive prototypes in Figma',
      'Conduct user research and usability testing',
      'Build and maintain a scalable design system',
      'Collaborate with developers to ensure design fidelity',
    ],
  },
]

const perks: Perk[] = [
  { icon: FiAward,   color: '#0057FF', title: 'CMMI Level 5 Culture', desc: 'Work in one of the few CMMI Level 5 certified IT companies in India — processes, quality, and discipline that build world-class engineers.' },
  { icon: FiZap,     color: '#7B61FF', title: 'Fast-Track Growth',     desc: 'Merit-based promotions, quarterly reviews, and personalised learning paths to accelerate your career at every stage.' },
  { icon: FiGlobe,   color: '#FF6B35', title: 'High-Impact Work',      desc: 'Your code serves real government citizens and large enterprises. Ship features that impact 100K+ users across India.' },
  { icon: FiHeart,   color: '#E84393', title: 'Inclusive Workplace',   desc: 'A diverse, respectful, and collaborative environment where every voice matters and innovation is encouraged from day one.' },
  { icon: FiCoffee,  color: '#00B894', title: 'Work-Life Balance',     desc: '5-day work week, flexible timings, hybrid options for select roles, and a team that values personal well-being.' },
  { icon: FiStar,    color: '#0EA5E9', title: 'Continuous Learning',   desc: 'Sponsored certifications (AWS, Azure, PMI, ISTQB), internal knowledge-sharing sessions, and access to premium learning platforms.' },
]

const process: ProcessStep[] = [
  { step: '01', title: 'Apply Online',          desc: 'Submit your resume and cover letter via the application form below.' },
  { step: '02', title: 'Initial Screening',     desc: 'Our HR team reviews your profile and reaches out within 5 working days.' },
  { step: '03', title: 'Technical Assessment',  desc: 'Role-specific test or take-home assignment to evaluate your skills.' },
  { step: '04', title: 'Panel Interview',        desc: 'Technical and cultural fit interview with the engineering/delivery team.' },
  { step: '05', title: 'HR Discussion',          desc: 'Compensation, benefits, joining timeline, and final Q&A.' },
  { step: '06', title: 'Offer & Onboarding',    desc: 'Receive your offer letter and join the E-Connect family.' },
]

const stats: Stat[] = [
  { val: '500+', label: 'Team Members' },
  { val: '35+',  label: 'Years Legacy' },
  { val: '25+',  label: 'Tech Domains' },
  { val: '95%',  label: 'Retention Rate' },
]

export default function CareersPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiBriefcase}
        tag="Join Our Team"
        title="Build Your Career"
        accent="at E-Connect"
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

function StatsStrip() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.statsStrip} ref={ref}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => (
            <motion.div key={s.label} className={styles.statItem}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
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
              <motion.div key={perk.title} className={styles.perkCard} style={{ '--pc': perk.color } as React.CSSProperties}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
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

/* ── Derive filter options from openings data ── */
const allPositions = ['All Positions', ...Array.from(new Set(openings.map(j => j.title)))]
const allLocations = ['All Locations', ...Array.from(new Set(openings.map(j => j.location)))]
const allExperience = ['All Experience', ...Array.from(new Set(openings.map(j => j.exp)))]

interface FilterState {
  position: string
  location: string
  experience: string
}

function OpeningsSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  const [expanded,     setExpanded]     = useState<number | null>(null)
  const [panelOpen,    setPanelOpen]    = useState<boolean>(true)
  const [filters,      setFilters]      = useState<FilterState>({ position: '', location: '', experience: '' })
  const [applied,      setApplied]      = useState<FilterState>({ position: '', location: '', experience: '' })

  const handleApply = () => {
    setApplied({ ...filters })
    setExpanded(null)
  }

  const handleReset = () => {
    const empty = { position: '', location: '', experience: '' }
    setFilters(empty)
    setApplied(empty)
    setExpanded(null)
  }

  const filtered = openings.filter(job => {
    const matchPos = !applied.position || job.title    === applied.position
    const matchLoc = !applied.location || job.location === applied.location
    const matchExp = !applied.experience || job.exp    === applied.experience
    return matchPos && matchLoc && matchExp
  })

  const hasActiveFilter = !!(applied.position || applied.location || applied.experience)

  return (
    <section className={styles.openingsSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className={styles.tag}>Now Hiring</span>
          <h2 className={styles.sectionTitle}>Open <span className={styles.accent}>Positions</span></h2>
          <p className={styles.sectionSub}>{openings.length} open roles across Engineering, Design, Security, and Consulting</p>
        </motion.div>

        {/* ── Filter Criteria Panel ── */}
        <motion.div
          className={styles.filterPanel}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {/* Panel header */}
          <button
            className={styles.filterPanelHeader}
            onClick={() => setPanelOpen(o => !o)}
            aria-expanded={panelOpen}
            aria-controls="filter-body"
          >
            <div className={styles.filterPanelTitle}>
              <FiFilter size={16} className={styles.filterIcon} />
              <span>Filter Criteria</span>
              {hasActiveFilter && (
                <span className={styles.filterActiveBadge}>Active</span>
              )}
            </div>
            <motion.span
              className={styles.filterChevron}
              animate={{ rotate: panelOpen ? 180 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiChevronDown size={18} />
            </motion.span>
          </button>

          {/* Panel body — collapsible */}
          <AnimatePresence initial={false}>
            {panelOpen && (
              <motion.div
                id="filter-body"
                className={styles.filterBody}
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.filterRow}>
                  {/* Job Position */}
                  <div className={styles.filterGroup}>
                    <label htmlFor="filter-position" className={styles.filterLabel}>Job Position</label>
                    <select
                      id="filter-position"
                      className={styles.filterSelect}
                      value={filters.position}
                      onChange={e => setFilters(f => ({ ...f, position: e.target.value }))}
                    >
                      {allPositions.map(p => (
                        <option key={p} value={p === 'All Positions' ? '' : p}>{p}</option>
                      ))}
                    </select>
                  </div>

                  {/* Location */}
                  <div className={styles.filterGroup}>
                    <label htmlFor="filter-location" className={styles.filterLabel}>Location</label>
                    <select
                      id="filter-location"
                      className={styles.filterSelect}
                      value={filters.location}
                      onChange={e => setFilters(f => ({ ...f, location: e.target.value }))}
                    >
                      {allLocations.map(l => (
                        <option key={l} value={l === 'All Locations' ? '' : l}>{l}</option>
                      ))}
                    </select>
                  </div>

                  {/* Experience */}
                  <div className={styles.filterGroup}>
                    <label htmlFor="filter-experience" className={styles.filterLabel}>Experience</label>
                    <select
                      id="filter-experience"
                      className={styles.filterSelect}
                      value={filters.experience}
                      onChange={e => setFilters(f => ({ ...f, experience: e.target.value }))}
                    >
                      {allExperience.map(e => (
                        <option key={e} value={e === 'All Experience' ? '' : e}>{e}</option>
                      ))}
                    </select>
                  </div>

                  {/* Buttons */}
                  <div className={styles.filterBtns}>
                    <button className={styles.filterApplyBtn} onClick={handleApply}>
                      Apply
                    </button>
                    <button className={styles.filterResetBtn} onClick={handleReset}>
                      Reset
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* ── Results count ── */}
        {hasActiveFilter && (
          <motion.div className={styles.filterResults}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <span>Showing <strong>{filtered.length}</strong> of {openings.length} positions</span>
            <button className={styles.filterClearAll} onClick={handleReset}>
              <FiX size={13} /> Clear filters
            </button>
          </motion.div>
        )}

        {/* ── Job cards ── */}
        <div className={styles.openingsList}>
          <AnimatePresence mode="wait">
            {filtered.length === 0 ? (
              <motion.div key="empty" className={styles.noResults}
                initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
                <FiBriefcase size={40} className={styles.noResultsIcon} />
                <p>No positions match your filters.</p>
                <button className={styles.filterResetBtn} onClick={handleReset}>Reset Filters</button>
              </motion.div>
            ) : (
              <motion.div key="list">
                {filtered.map((job, i) => {
                  const Icon = job.icon
                  const isOpen = expanded === job.id
                  return (
                    <motion.div key={job.id} className={`${styles.jobCard} ${isOpen ? styles.jobCardOpen : ''}`}
                      style={{ '--jc': job.color } as React.CSSProperties}
                      initial={{ opacity: 0, y: 30 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: i * 0.07, duration: 0.5 }}>

                      <button className={styles.jobHeader} onClick={() => setExpanded(isOpen ? null : job.id)}
                        aria-expanded={isOpen}>
                        <div className={styles.jobLeft}>
                          <div className={styles.jobIconWrap}><Icon size={20} /></div>
                          <div className={styles.jobInfo}>
                            <h3 className={styles.jobTitle}>{job.title}</h3>
                            <div className={styles.jobMeta}>
                              <span className={styles.jobDept}>{job.dept}</span>
                              <span className={styles.jobMeta2}><FiMapPin size={11} /> {job.location}</span>
                              <span className={styles.jobMeta2}><FiClock size={11} /> {job.exp}</span>
                              <span className={styles.jobType}>{job.type}</span>
                            </div>
                          </div>
                        </div>
                        <motion.div className={styles.jobChevron}
                          animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.25 }}>
                          <FiChevronDown size={18} />
                        </motion.div>
                      </button>

                      <AnimatePresence initial={false}>
                        {isOpen && (
                          <motion.div className={styles.jobBody}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}>
                            <div className={styles.jobBodyInner}>
                              <p className={styles.jobDesc}>{job.desc}</p>
                              <div className={styles.jobTwoCols}>
                                <div>
                                  <h4 className={styles.jobSubTitle}>Key Responsibilities</h4>
                                  <ul className={styles.jobList}>
                                    {job.responsibilities.map(r => (
                                      <li key={r} className={styles.jobListItem}>
                                        <FiCheckCircle size={13} className={styles.jobCheck} />{r}
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                                <div>
                                  <h4 className={styles.jobSubTitle}>Required Skills</h4>
                                  <div className={styles.skillTags}>
                                    {job.skills.map(s => (
                                      <span key={s} className={styles.skillTag}>{s}</span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <Link to="/contact" className={styles.applyBtn}>
                                <FiUploadCloud size={15} /> Apply for this Role
                              </Link>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                })}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  )
}

function ProcessSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.processSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <span className={styles.tag}>How We Hire</span>
          <h2 className={styles.sectionTitle}>Our Hiring <span className={styles.accent}>Process</span></h2>
          <p className={styles.sectionSub}>Simple, transparent, and respectful of your time — 6 clear steps from apply to offer.</p>
        </motion.div>

        <div className={styles.processGrid}>
          {process.map((step, i) => (
            <motion.div key={step.step} className={styles.processCard}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5 }}>
              <div className={styles.processStep}>{step.step}</div>
              <h3 className={styles.processTitle}>{step.title}</h3>
              <p className={styles.processDesc}>{step.desc}</p>
              {i < process.length - 1 && <div className={styles.processConnector} aria-hidden="true" />}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function ApplyCta() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.ctaSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.ctaBanner}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
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
