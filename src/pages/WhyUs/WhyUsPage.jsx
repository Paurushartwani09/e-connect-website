import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiStar, FiTarget, FiRefreshCw, FiSliders, FiAward,
  FiZap, FiHeart, FiCheckCircle, FiArrowRight, FiMail,
  FiTrendingUp, FiShield, FiUsers, FiGlobe
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import styles from './WhyUsPage.module.css'

const advantages = [
  { icon: FiTarget,    color: '#0057FF', title: 'Multi-Domain Experience',    desc: 'Serving 25+ industry verticals has exposed us to 500+ business processes, enabling cross-industry best practices that benefit every client.' },
  { icon: FiRefreshCw, color: '#00B894', title: 'End-to-End Solutions',       desc: 'Full spectrum IT — hardware, software, networking, security, and IT/OT integration. One partner for your entire technology landscape.' },
  { icon: FiSliders,   color: '#7B61FF', title: 'Flexible Engagement Models', desc: 'Project Based, Effort Based, Managed Services, or Team Augmentation — we adapt our model to match your budget and business needs.' },
  { icon: FiAward,     color: '#FF6B35', title: 'CMMI Level 5 Certified',     desc: 'The highest process maturity standard. Our endorsed processes ensure consistent quality, predictable delivery, and zero surprises.' },
  { icon: FiZap,       color: '#E84393', title: 'Innovation-First Approach',  desc: 'We bring life to your idea of Digital Transformation — innovating and implementing to see your success in the emerging e-Economy.' },
  { icon: FiHeart,     color: '#0EA5E9', title: 'Trusted Growth Partner',     desc: 'Hundreds of customers trust us for End-to-End IT Solutions. Our happy customers have become our most successful advocates.' },
]

const comparisons = [
  { feature: 'CMMI Level 5 Certified',        us: true,  others: false },
  { feature: '35+ Years of Experience',        us: true,  others: false },
  { feature: 'End-to-End IT Solutions',        us: true,  others: 'partial' },
  { feature: '25+ Industry Verticals',         us: true,  others: false },
  { feature: 'Flexible Engagement Models',     us: true,  others: 'partial' },
  { feature: 'E-Governance Expertise',         us: true,  others: false },
  { feature: '500+ Team Members',              us: true,  others: 'partial' },
  { feature: 'IT/OT Integration',              us: true,  others: false },
  { feature: '24/7 Managed Services',          us: true,  others: 'partial' },
  { feature: 'Government & Enterprise Focus',  us: true,  others: false },
]

const testimonials = [
  { initials: 'JP', name: 'Jaimin Patel', role: 'CBO & Founder', color: '#0057FF', quote: 'We are consistently delivering business value to our customers, enabling them to excel and win in the emerging e-Economy.' },
  { initials: 'MV', name: 'Mukesh Vyas', role: 'Head of HR', color: '#7B61FF', quote: 'Working on hundreds of projects with diverse objectives has taught us how to quickly master new skill sets.' },
  { initials: 'RC', name: 'Rajendra Chouhan', role: 'Head of Delivery', color: '#00B894', quote: 'Resources, budgets, timelines, and people differ in each organization — and so does our tailored solution.' },
]

export default function WhyUsPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiStar}
        tag="Why Choose Us"
        title="The E-Connect"
        accent="Advantage"
        description="35+ years of experience, CMMI Level 5 processes, and 500+ professionals — here's why hundreds of organizations choose us."
        breadcrumb="Why Us"
        gradient="linear-gradient(135deg,#001F6B 0%,#E84393 60%,#7B61FF 100%)"
      />

      {/* ── Advantages ── */}
      <AdvantagesSection />

      {/* ── Comparison ── */}
      <ComparisonSection />

      {/* ── Testimonials ── */}
      <TestimonialsSection />

      {/* ── CTA ── */}
      <WhyUsCta />
    </motion.div>
  )
}

function AdvantagesSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <section className={styles.advantagesSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Our Differentiators</span>
          <h2 className={styles.sectionTitle}>6 Reasons to <span className={styles.accent}>Choose E-Connect</span></h2>
        </motion.div>

        <div className={styles.advantagesGrid}>
          {advantages.map((adv, i) => {
            const Icon = adv.icon
            return (
              <motion.div
                key={adv.title}
                className={styles.advantageCard}
                style={{ '--ac': adv.color }}
                initial={{ opacity: 0, y: 50 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -8, transition: { duration: 0.2 } }}
              >
                <div className={styles.advantageNum}>0{i + 1}</div>
                <div className={styles.advantageIconWrap}><Icon size={24} /></div>
                <h3 className={styles.advantageTitle}>{adv.title}</h3>
                <p className={styles.advantageDesc}>{adv.desc}</p>
                <div className={styles.advantageBar} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ComparisonSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.comparisonSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>How We Compare</span>
          <h2 className={styles.sectionTitle}>E-Connect vs <span className={styles.accent}>The Rest</span></h2>
        </motion.div>

        <motion.div
          className={styles.comparisonTable}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <div className={styles.tableHeader}>
            <div className={styles.tableFeatureCol}>Feature</div>
            <div className={`${styles.tableCol} ${styles.tableColUs}`}>
              <FiZap size={16} /> E-Connect
            </div>
            <div className={styles.tableCol}>Others</div>
          </div>
          {comparisons.map((row, i) => (
            <motion.div
              key={row.feature}
              className={styles.tableRow}
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.05, duration: 0.4 }}
            >
              <div className={styles.tableFeatureCol}>{row.feature}</div>
              <div className={`${styles.tableCol} ${styles.tableColUs}`}>
                <FiCheckCircle size={18} className={styles.checkYes} />
              </div>
              <div className={styles.tableCol}>
                {row.others === true
                  ? <FiCheckCircle size={18} className={styles.checkYes} />
                  : row.others === 'partial'
                  ? <span className={styles.checkPartial}>~</span>
                  : <span className={styles.checkNo}>✕</span>
                }
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

function TestimonialsSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.testimonialsSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Our Team Speaks</span>
          <h2 className={styles.sectionTitle}>Voices from <span className={styles.accent}>Leadership</span></h2>
        </motion.div>

        <div className={styles.testimonialsGrid}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              className={styles.testimonialCard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.quoteIcon}>"</div>
              <p className={styles.quoteText}>{t.quote}</p>
              <div className={styles.quoteAuthor}>
                <div className={styles.authorAvatar} style={{ background: `linear-gradient(135deg,${t.color},var(--accent-cyan))` }}>
                  {t.initials}
                </div>
                <div>
                  <div className={styles.authorName}>{t.name}</div>
                  <div className={styles.authorRole}>{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function WhyUsCta() {
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
            <div className={styles.ctaStats}>
              {[{ val: '500+', label: 'Team' }, { val: '35+', label: 'Years' }, { val: 'CMMI 5', label: 'Certified' }, { val: '25+', label: 'Verticals' }].map(s => (
                <div key={s.label} className={styles.ctaStat}>
                  <span className={styles.ctaStatVal}>{s.val}</span>
                  <span className={styles.ctaStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>
            <h2 className={styles.ctaTitle}>Trust is Built with Consistency</h2>
            <p className={styles.ctaDesc}>Hundreds of customers trust us when it comes to End-to-End IT Solutions.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}><FiMail size={16} /> Let's Connect</Link>
              <Link to="/about" className={styles.ctaSecondary}>About Us <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
