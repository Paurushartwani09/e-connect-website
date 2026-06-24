import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiSettings, FiCloud, FiCode, FiGlobe, FiLink, FiShield,
  FiCheckCircle, FiArrowRight, FiCpu, FiDatabase, FiMonitor,
  FiServer, FiWifi, FiLock, FiSmartphone, FiLayers
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './ServicesPage.module.css'

const services = [
  {
    id: 'it',
    icon: FiServer,
    color: '#0057FF',
    gradient: 'linear-gradient(135deg,#0057FF,#00C2FF)',
    title: 'IT Services',
    subtitle: 'Infrastructure & Operations',
    description: 'Comprehensive IT infrastructure management covering system administration, network operations, server management, and application support for seamless business continuity.',
    features: [
      'System & Network Administration',
      'Server Management & Monitoring',
      'IT Infrastructure Planning',
      'Application Administration',
      'Help Desk & Support',
      'Disaster Recovery Planning',
    ],
    stats: [{ val: '99.9%', label: 'Uptime SLA' }, { val: '24/7', label: 'Support' }, { val: '500+', label: 'Servers Managed' }],
    icons: [FiServer, FiWifi, FiMonitor],
  },
  {
    id: 'msaas',
    icon: FiCloud,
    color: '#00B894',
    gradient: 'linear-gradient(135deg,#00B894,#00CEC9)',
    title: 'M-SaaS Products',
    subtitle: 'Managed Software as a Service',
    description: 'Fully managed SaaS solutions for businesses and enterprises — we handle deployment, maintenance, updates, and scaling so you can focus on your core business.',
    features: [
      'Cloud-hosted Applications',
      'Managed Updates & Patches',
      'Multi-tenant Architecture',
      'Scalable Infrastructure',
      'SLA-backed Performance',
      'Data Backup & Recovery',
    ],
    stats: [{ val: '100+', label: 'SaaS Clients' }, { val: '99.5%', label: 'Availability' }, { val: '3x', label: 'Cost Savings' }],
    icons: [FiCloud, FiDatabase, FiLayers],
  },
  {
    id: 'appdev',
    icon: FiCode,
    color: '#7B61FF',
    gradient: 'linear-gradient(135deg,#7B61FF,#A78BFA)',
    title: 'Application Development',
    subtitle: 'Full SDLC Engineering',
    description: 'End-to-end software development on Microsoft, Java, and Open Source platforms — from requirements to deployment across Cloud, Edge, Desktop, and Mobile.',
    features: [
      'Custom Enterprise Applications',
      'Mobile App Development (iOS/Android)',
      'Web Application Development',
      'API Design & Integration',
      'Legacy System Modernization',
      'DevOps & CI/CD Pipelines',
    ],
    stats: [{ val: '200+', label: 'Apps Built' }, { val: '15+', label: 'Tech Stacks' }, { val: '35+', label: 'Years SDLC' }],
    icons: [FiCode, FiSmartphone, FiCpu],
  },
  {
    id: 'egov',
    icon: FiGlobe,
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg,#FF6B35,#FDCB6E)',
    title: 'E-Governance Solutions',
    subtitle: 'Digital Government Transformation',
    description: 'Comprehensive digital transformation for government bodies — enabling transparent, efficient, and citizen-centric service delivery at scale.',
    features: [
      'Citizen Service Portals',
      'Government ERP Systems',
      'Digital Document Management',
      'Online Payment Gateways',
      'Grievance Redressal Systems',
      'Audit & Compliance Modules',
    ],
    stats: [{ val: '100+', label: 'Gov Projects' }, { val: '1M+', label: 'Citizens Served' }, { val: '50+', label: 'Departments' }],
    icons: [FiGlobe, FiDatabase, FiShield],
  },
  {
    id: 'integration',
    icon: FiLink,
    color: '#E84393',
    gradient: 'linear-gradient(135deg,#E84393,#A855F7)',
    title: 'Systems Integration',
    subtitle: 'IT/OT Convergence',
    description: 'Seamlessly connect your IT and OT systems — bridging shop floor operations with top floor management for complete visibility and control.',
    features: [
      'ERP & Legacy Integration',
      'IoT & OT System Connectivity',
      'API Gateway Management',
      'Real-time Data Pipelines',
      'Third-party Integrations',
      'Middleware Development',
    ],
    stats: [{ val: '300+', label: 'Integrations' }, { val: '50+', label: 'Protocols' }, { val: '99%', label: 'Data Accuracy' }],
    icons: [FiLink, FiCpu, FiDatabase],
  },
  {
    id: 'security',
    icon: FiShield,
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    title: 'IT Security',
    subtitle: 'Enterprise Cybersecurity',
    description: 'Comprehensive security solutions protecting your hardware, software, network, and data — ensuring compliance and resilience against modern threats.',
    features: [
      'Network Security & Firewalls',
      'Endpoint Protection',
      'Security Audits & Assessments',
      'Data Encryption & DLP',
      'Identity & Access Management',
      'Compliance & Governance',
    ],
    stats: [{ val: '0', label: 'Breaches (clients)' }, { val: '100%', label: 'Compliance Rate' }, { val: '24/7', label: 'Monitoring' }],
    icons: [FiShield, FiLock, FiMonitor],
  },
]

const processSteps = [
  { step: '01', icon: FiCpu,          title: 'Discovery',    desc: 'We analyze your business needs, existing systems, and define clear objectives.' },
  { step: '02', icon: FiLayers,       title: 'Design',       desc: 'Architecture planning, technology selection, and solution blueprinting.' },
  { step: '03', icon: FiCode,         title: 'Development',  desc: 'Agile development with regular milestones, reviews, and quality checks.' },
  { step: '04', icon: FiCheckCircle,  title: 'Delivery',     desc: 'Deployment, training, go-live support, and ongoing managed services.' },
]

export default function ServicesPage() {
  const [active, setActive] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiSettings}
        tag="What We Do"
        title="Our Services"
        accent="& Capabilities"
        description="End-to-end IT solutions tailored for enterprises, governments, and industries — from infrastructure to intelligent applications."
        breadcrumb="Services"
      />

      {/* ── Services Grid ── */}
      <section className={styles.section} ref={ref}>
        <div className={styles.container}>
          <motion.div
            className={styles.sectionHeader}
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <motion.span className={styles.tag} variants={fadeUp}>6 Core Service Areas</motion.span>
            <motion.h2 className={styles.sectionTitle} variants={fadeUp}>
              Many Ways to Address Your <span className={styles.accent}>Business Challenge</span>
            </motion.h2>
            <motion.p className={styles.sectionDesc} variants={fadeUp}>
              Project Based · Effort Based · Managed Services · Team Augmentation
            </motion.p>
          </motion.div>

          <div className={styles.servicesGrid}>
            {services.map((svc, i) => (
              <ServiceCard
                key={svc.id}
                svc={svc}
                index={i}
                isActive={active === svc.id}
                onToggle={() => setActive(active === svc.id ? null : svc.id)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Process ── */}
      <ProcessSection />

      {/* ── CTA ── */}
      <CtaBanner />
    </motion.div>
  )
}

function ServiceCard({ svc, index, isActive, onToggle }) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = svc.icon

  return (
    <motion.div
      ref={ref}
      className={`${styles.card} ${isActive ? styles.cardActive : ''}`}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      style={{ '--card-color': svc.color, '--card-gradient': svc.gradient }}
    >
      {/* Top bar */}
      <div className={styles.cardTopBar} />

      {/* Header */}
      <div className={styles.cardHeader}>
        <div className={styles.cardIconWrap}>
          <Icon size={26} />
        </div>
        <div className={styles.cardMeta}>
          <span className={styles.cardSubtitle}>{svc.subtitle}</span>
          <h3 className={styles.cardTitle}>{svc.title}</h3>
        </div>
      </div>

      <p className={styles.cardDesc}>{svc.description}</p>

      {/* Stats row */}
      <div className={styles.statsRow}>
        {svc.stats.map(s => (
          <div key={s.label} className={styles.statItem}>
            <span className={styles.statVal}>{s.val}</span>
            <span className={styles.statLabel}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Features toggle */}
      <button className={styles.toggleBtn} onClick={onToggle} aria-expanded={isActive}>
        {isActive ? 'Hide Details' : 'View Details'}
        <motion.span animate={{ rotate: isActive ? 90 : 0 }} transition={{ duration: 0.2 }}>
          <FiArrowRight size={14} />
        </motion.span>
      </button>

      <motion.div
        className={styles.featuresList}
        initial={false}
        animate={{ height: isActive ? 'auto' : 0, opacity: isActive ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{ overflow: 'hidden' }}
      >
        <div className={styles.featuresInner}>
          {svc.features.map(f => (
            <div key={f} className={styles.featureItem}>
              <FiCheckCircle size={14} className={styles.featureCheck} />
              {f}
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

function ProcessSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.processSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>How We Work</span>
          <h2 className={styles.sectionTitle}>Our <span className={styles.accent}>Delivery Process</span></h2>
        </motion.div>

        <div className={styles.processGrid}>
          {processSteps.map((step, i) => {
            const Icon = step.icon
            return (
              <motion.div
                key={step.step}
                className={styles.processCard}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.processStep}>{step.step}</div>
                <div className={styles.processIconWrap}>
                  <Icon size={24} />
                </div>
                <h3 className={styles.processTitle}>{step.title}</h3>
                <p className={styles.processDesc}>{step.desc}</p>
                {i < processSteps.length - 1 && (
                  <div className={styles.processConnector} aria-hidden="true">
                    <FiArrowRight size={16} />
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function CtaBanner() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.ctaSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.ctaBanner}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className={styles.ctaOrb} aria-hidden="true" />
          <div className={styles.ctaContent}>
            <FiSettings size={40} className={styles.ctaIcon} />
            <h2 className={styles.ctaTitle}>Ready to Transform Your IT?</h2>
            <p className={styles.ctaDesc}>
              Let's discuss your requirements and find the right service model for your business.
            </p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}>
                <FiMail size={16} /> Start a Conversation
              </Link>
              <Link to="/about" className={styles.ctaSecondary}>
                Learn About Us <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

// Need FiMail in scope
import { FiMail } from 'react-icons/fi'
