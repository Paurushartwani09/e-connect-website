import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiBriefcase, FiHome, FiTruck, FiDroplet, FiActivity,
  FiDollarSign, FiShoppingCart, FiZap, FiArrowRight,
  FiCheckCircle, FiUsers, FiGlobe, FiMail, FiLayers
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import styles from './IndustriesPage.module.css'

const industries = [
  {
    id: 'urban', icon: FiHome, color: '#0057FF',
    title: 'Urban Development',
    desc: 'Smart city solutions, municipal management, urban planning systems, and citizen service portals for modern cities.',
    solutions: ['Smart City Platform','Municipal ERP','Property Tax Management','Building Permit System','Urban Analytics'],
    clients: '20+',
  },
  {
    id: 'mines', icon: FiLayers, color: '#FF6B35',
    title: 'Mines & Minerals',
    desc: 'End-to-end mining operations management — from lease tracking to royalty collection and environmental compliance.',
    solutions: ['Mining Lease Management','Royalty Collection System','Environmental Monitoring','Dispatch & Logistics','Compliance Reporting'],
    clients: '15+',
  },
  {
    id: 'liquor', icon: FiDroplet, color: '#7B61FF',
    title: 'Liquor Supply Chain',
    desc: 'Complete supply chain management for excise departments — from distillery to retail with full traceability.',
    solutions: ['Excise Management','Supply Chain Tracking','Retail POS Integration','Revenue Management','Audit & Compliance'],
    clients: '8+',
  },
  {
    id: 'industrial', icon: FiZap, color: '#00B894',
    title: 'Industrial Development',
    desc: 'Industrial estate management, investor facilitation, and single-window clearance systems for industrial bodies.',
    solutions: ['Investor Portal','Single Window Clearance','Land Allotment System','Industrial ERP','Monitoring Dashboard'],
    clients: '12+',
  },
  {
    id: 'nbfc', icon: FiDollarSign, color: '#E84393',
    title: 'NBFC & Finance',
    desc: 'Comprehensive loan management, compliance, and customer management solutions for NBFCs and financial institutions.',
    solutions: ['Loan Origination System','Credit Management','Collections Platform','Regulatory Compliance','Customer Portal'],
    clients: '25+',
  },
  {
    id: 'pf', icon: FiUsers, color: '#0EA5E9',
    title: 'PF Trust',
    desc: 'Provident fund management systems for trusts — member management, contributions, claims, and compliance.',
    solutions: ['Member Management','Contribution Tracking','Claims Processing','Investment Management','Compliance Reports'],
    clients: '10+',
  },
  {
    id: 'retail', icon: FiShoppingCart, color: '#FDCB6E',
    title: 'POS & Retailing',
    desc: 'Modern point-of-sale and retail management solutions for chains, franchises, and government retail outlets.',
    solutions: ['POS System','Inventory Management','Sales Analytics','Loyalty Programs','Multi-store Management'],
    clients: '30+',
  },
  {
    id: 'infra', icon: FiTruck, color: '#A78BFA',
    title: 'Infrastructure Projects',
    desc: 'Project management and monitoring systems for large infrastructure projects — roads, bridges, utilities.',
    solutions: ['Project Monitoring System','Contractor Management','Progress Tracking','Quality Control','Financial Management'],
    clients: '18+',
  },
]

const processes = [
  'Human Resource & Payroll', 'Finance & Accounting', 'Citizen Service Delivery',
  'Customer Support', 'Loan Management', 'Sales & Retailing',
  'Supply Chain & Distribution', 'Inventory & Procurements',
  'Contracts, Works & Projects', 'Administration and Management',
]

export default function IndustriesPage() {
  const [selected, setSelected] = useState(industries[0].id)
  const active = industries.find(i => i.id === selected)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiBriefcase}
        tag="Businesses We Serve"
        title="Industries &"
        accent="Verticals"
        description="Serving governments, enterprises, and state-owned organizations across 25+ industry verticals with 500+ business processes."
        breadcrumb="Industries"
        gradient="linear-gradient(135deg,#001F6B 0%,#FF6B35 60%,#FDCB6E 100%)"
      />

      {/* ── Industry Explorer ── */}
      <section className={styles.explorerSection} ref={ref}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <span className={styles.tag}>25+ Verticals</span>
            <h2 className={styles.sectionTitle}>Industries We <span className={styles.accent}>Serve</span></h2>
          </div>

          <div className={styles.explorer}>
            {/* Grid of industry cards */}
            <div className={styles.industryGrid}>
              {industries.map((ind, i) => {
                const Icon = ind.icon
                return (
                  <motion.button
                    key={ind.id}
                    className={`${styles.industryCard} ${selected === ind.id ? styles.industryActive : ''}`}
                    style={{ '--ic': ind.color }}
                    onClick={() => setSelected(ind.id)}
                    initial={{ opacity: 0, y: 30 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    whileHover={{ y: -4, transition: { duration: 0.15 } }}
                  >
                    <div className={styles.industryCardIcon}><Icon size={22} /></div>
                    <span className={styles.industryCardTitle}>{ind.title}</span>
                    <span className={styles.industryCardClients}>{ind.clients} clients</span>
                  </motion.button>
                )
              })}
            </div>

            {/* Detail */}
            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className={styles.industryDetail}
                style={{ '--ic': active.color }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className={styles.detailIconWrap}>
                  <active.icon size={28} />
                </div>
                <h3 className={styles.detailTitle}>{active.title}</h3>
                <p className={styles.detailDesc}>{active.desc}</p>
                <div className={styles.solutionsList}>
                  <h4 className={styles.solutionsTitle}>Our Solutions</h4>
                  {active.solutions.map(s => (
                    <div key={s} className={styles.solutionItem}>
                      <FiCheckCircle size={14} className={styles.solutionCheck} />
                      {s}
                    </div>
                  ))}
                </div>
                <Link to="/contact" className={styles.detailCta}>
                  <FiMail size={14} /> Discuss Your Needs
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* ── Business Processes ── */}
      <ProcessesSection inView={inView} />

      {/* ── Stats ── */}
      <IndustriesStats inView={inView} />

      {/* ── CTA ── */}
      <IndustriesCta />
    </motion.div>
  )
}

function ProcessesSection({ inView }) {
  return (
    <section className={styles.processSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>Cross-Industry Expertise</span>
          <h2 className={styles.sectionTitle}>500+ <span className={styles.accent}>Business Processes</span></h2>
          <p className={styles.sectionDesc}>Serving across 25+ verticals has given us exposure to hundreds of business processes, enabling cross-industry best practices.</p>
        </div>
        <div className={styles.processGrid}>
          {processes.map((p, i) => (
            <motion.div
              key={p}
              className={styles.processItem}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: i * 0.06, duration: 0.4 }}
              whileHover={{ x: 6, transition: { duration: 0.15 } }}
            >
              <FiCheckCircle size={16} className={styles.processCheck} />
              <span>{p}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function IndustriesStats({ inView }) {
  const stats = [
    { icon: FiGlobe,    val: '25+',  label: 'Industry Verticals' },
    { icon: FiLayers,   val: '500+', label: 'Business Processes' },
    { icon: FiUsers,    val: '300+', label: 'Enterprise Clients' },
    { icon: FiBriefcase,val: '35+',  label: 'Years Experience' },
  ]
  return (
    <section className={styles.statsSection}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {stats.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.div
                key={s.label}
                className={styles.statCard}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.statIcon}><Icon size={24} /></div>
                <div className={styles.statVal}>{s.val}</div>
                <div className={styles.statLabel}>{s.label}</div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function IndustriesCta() {
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
          <div className={styles.ctaOrb} />
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>Don't See Your Industry?</h2>
            <p className={styles.ctaDesc}>We work across many more verticals. Let's talk about your specific domain and requirements.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}><FiMail size={16} /> Talk to an Expert</Link>
              <Link to="/services" className={styles.ctaSecondary}>Our Services <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
