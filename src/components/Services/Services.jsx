import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Server, Cloud, Code2, Globe, Link2, ShieldCheck,
  ChevronRight, ArrowRight, Cpu, Layers
} from 'lucide-react'
import styles from './Services.module.css'

const services = [
  {
    Icon: Cloud,
    color: '#0057FF',
    gradient: 'linear-gradient(135deg,#0057FF,#00C2FF)',
    title: 'AI-Enhanced Infrastructure Management',
    desc: 'Systems administration, network management, server operations, and end-to-end IT infrastructure — delivered as a managed service so your teams stay focused on outcomes, not operations.',
  },
  {
    Icon: Layers,
    color: '#7B61FF',
    gradient: 'linear-gradient(135deg,#7B61FF,#A78BFA)',
    title: 'Intelligent Enterprise SaaS',
    desc: 'Purpose-built, cloud-ready software for business, institutions, and government — with intelligent automation, workflow recommendations, and AI-assisted processing. Deployed as managed SaaS with flexible tenancy.',
  },
  {
    Icon: Code2,
    color: '#00B894',
    gradient: 'linear-gradient(135deg,#00B894,#00CEC9)',
    title: 'AI-Integrated Custom Applications',
    desc: 'Full-lifecycle software development across Microsoft, Java, and open-source platforms — with AI integration available across every layer: dashboards, OCR pipelines, chatbots, and data intelligence.',
  },
  {
    Icon: Globe,
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg,#FF6B35,#FDCB6E)',
    title: 'E-Governance & Smart Administration',
    desc: 'Integrated digital governance platforms for government departments, PSUs, and state enterprises — featuring AI-powered dashboards, automated document processing, and citizen-facing virtual assistants.',
  },
]

const engagementModels = [
  { label: 'Project-Based', desc: 'Fixed scope, defined timelines, full accountability' },
  { label: 'Effort-Based (T&M)', desc: 'Flexible resourcing for evolving requirements' },
  { label: 'Managed Services', desc: 'SLA-backed operational management with proactive monitoring' },
  { label: 'Team Augmentation', desc: 'On-demand specialists integrated with your teams' },
]

export default function Services() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true })

  return (
    <section id="services" className={styles.section} ref={ref}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.container}>

        {/* ── Top label ── */}
        <motion.div className={styles.topLabel}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <span className={styles.labelDot} />
          Services, We Provide
        </motion.div>

        {/* ── Two-column layout ── */}
        <div className={styles.layout}>

          {/* LEFT: heading + description + engagement models */}
          <motion.div className={styles.leftCol}
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

            <h2 className={styles.heading}>
              Full-Spectrum IT Services —{' '}
              <span className={styles.headingAccent}>Structured Around Your Business Model</span>
            </h2>

            <p className={styles.headingDesc}>
              Whether you need a delivery team, a managed operations partner, or intelligent
              systems built into your existing platforms — we structure our engagement around
              your operational reality.
            </p>

            <div className={styles.engagementBlock}>
              <p className={styles.engagementLabel}>Engagement Models</p>
              <div className={styles.engagementList}>
                {engagementModels.map((m, i) => (
                  <motion.div key={m.label} className={styles.engagementItem}
                    initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.45 }}>
                    <div className={styles.engagementDot} />
                    <div>
                      <span className={styles.engagementName}>{m.label}</span>
                      <span className={styles.engagementDesc}> — {m.desc}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}>
              <Link to="/services" className={styles.ctaLink}>
                Discuss Your Requirements <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: service cards stacked */}
          <div className={styles.rightCol}>
            {services.map((svc, i) => (
              <ServiceCard key={svc.title} svc={svc} index={i} inView={inView} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ServiceCard({ svc, index, inView }) {
  const { Icon, color, gradient, title, desc } = svc
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className={styles.card}
      style={{ '--c': color, '--g': gradient }}
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.15 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className={styles.cardInner}>
        {/* Icon */}
        <div className={styles.cardIconWrap}>
          <Icon size={22} strokeWidth={1.6} />
        </div>

        {/* Text */}
        <div className={styles.cardText}>
          <h3 className={styles.cardTitle}>{title}</h3>
          <p className={styles.cardDesc}>{desc}</p>
        </div>

        {/* Arrow */}
        <motion.div className={styles.cardArrow}
          animate={{ x: hovered ? 4 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronRight size={16} strokeWidth={2.5} />
        </motion.div>
      </div>

      {/* animated left border */}
      <div className={styles.cardBorder} />
    </motion.div>
  )
}
