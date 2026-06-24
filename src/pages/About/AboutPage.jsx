import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiInfo, FiAward, FiUsers, FiTrendingUp, FiGlobe, FiHeart,
  FiCheckCircle, FiArrowRight, FiCalendar, FiMapPin, FiMail,
  FiTarget, FiZap, FiShield
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '../../utils/animations'
import styles from './AboutPage.module.css'

const milestones = [
  { year: '1991', icon: FiZap,       title: 'Founded',              desc: 'E-Connect Solutions established in Udaipur, Rajasthan with a vision to transform IT.' },
  { year: '2000', icon: FiGlobe,     title: 'E-Governance Pioneer', desc: 'Launched first government digitization projects, setting the standard for e-governance.' },
  { year: '2010', icon: FiUsers,     title: '100+ Team Members',    desc: 'Grew to a 100+ strong team of engineers, consultants, and domain experts.' },
  { year: '2015', icon: FiAward,     title: 'CMMI Level 5',         desc: 'Achieved CMMI Level 5 certification — the highest process maturity standard.' },
  { year: '2020', icon: FiTrendingUp,'title': 'Digital Acceleration', desc: 'Expanded M-SaaS offerings and cloud-native solutions for post-pandemic digital needs.' },
  { year: '2024', icon: FiShield,    title: '500+ Team & Growing',  desc: 'Over 500 professionals serving 25+ industry verticals across India and globally.' },
]

const values = [
  { icon: FiTarget,  color: '#0057FF', title: 'Innovation First',   desc: 'We constantly push boundaries to deliver cutting-edge solutions that create real business value.' },
  { icon: FiHeart,   color: '#E84393', title: 'Customer Success',   desc: 'Your success is our success. We measure our performance by the outcomes we deliver for you.' },
  { icon: FiShield,  color: '#00B894', title: 'Integrity Always',   desc: 'Transparent communication, honest assessments, and ethical practices in everything we do.' },
  { icon: FiUsers,   color: '#7B61FF', title: 'Team Excellence',    desc: 'Our 500+ intrapreneurs bring passion, expertise, and ownership to every engagement.' },
  { icon: FiGlobe,   color: '#FF6B35', title: 'Global Thinking',    desc: 'Local expertise with global best practices — serving clients across India and worldwide.' },
  { icon: FiZap,     color: '#0EA5E9', title: 'Agile Delivery',     desc: 'Fast, iterative delivery with continuous feedback loops to ensure we always hit the mark.' },
]

const leadership = [
  { initials: 'JP', name: 'Jaimin Patel',     role: 'Chief Business Officer & Founder', color: '#0057FF', quote: 'We are consistently delivering business value to our customers, enabling them to excel in the emerging e-Economy.' },
  { initials: 'MV', name: 'Mukesh Vyas',      role: 'Head of Human Resource',           color: '#7B61FF', quote: 'Working on hundreds of projects has taught us how to quickly master new skill sets and deliver excellence.' },
  { initials: 'RC', name: 'Rajendra Chouhan', role: 'Head of Software Delivery',        color: '#00B894', quote: 'Every organization is unique. We tailor our offering models to match your specific business needs and budget.' },
]

export default function AboutPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiInfo}
        tag="Our Story"
        title="About E-Connect"
        accent="Solutions"
        description="Over 35 years of enabling digital transformation for governments, enterprises, and industries across India and beyond."
        breadcrumb="About"
        gradient="linear-gradient(135deg,#001F6B 0%,#0057FF 60%,#7B61FF 100%)"
      />

      {/* ── Mission & Vision ── */}
      <MissionSection />

      {/* ── Timeline ── */}
      <TimelineSection />

      {/* ── Values ── */}
      <ValuesSection />

      {/* ── Leadership ── */}
      <LeadershipSection />

      {/* ── CTA ── */}
      <AboutCta />
    </motion.div>
  )
}

function MissionSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.missionSection} ref={ref}>
      <div className={styles.container}>
        <div className={styles.missionGrid}>
          <motion.div
            className={styles.missionCard}
            style={{ '--mc': '#0057FF' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.missionIcon}><FiTarget size={28} /></div>
            <h3 className={styles.missionCardTitle}>Our Mission</h3>
            <p className={styles.missionCardDesc}>
              To provide comprehensive end-to-end business and IT solutions that enhance our
              customers' operations — leveraging the best business and IT thinking for clients
              in India and around the globe.
            </p>
          </motion.div>

          <motion.div
            className={styles.missionCard}
            style={{ '--mc': '#00B894' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.missionIcon}><FiGlobe size={28} /></div>
            <h3 className={styles.missionCardTitle}>Our Vision</h3>
            <p className={styles.missionCardDesc}>
              To be the most trusted IT partner for governments and enterprises — enabling
              digital transformation that creates lasting value for citizens, businesses,
              and communities.
            </p>
          </motion.div>

          <motion.div
            className={styles.missionCard}
            style={{ '--mc': '#7B61FF' }}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <div className={styles.missionIcon}><FiAward size={28} /></div>
            <h3 className={styles.missionCardTitle}>Our Promise</h3>
            <p className={styles.missionCardDesc}>
              CMMI Level 5 certified processes, 35+ years of experience, and a team of 500+
              dedicated professionals — ensuring consistent quality, on-time delivery, and
              measurable business outcomes.
            </p>
          </motion.div>
        </div>

        {/* Quick facts */}
        <motion.div
          className={styles.quickFacts}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          {[
            { icon: FiCalendar, val: '1991',  label: 'Founded' },
            { icon: FiMapPin,   val: 'Udaipur', label: 'Headquarters' },
            { icon: FiUsers,    val: '500+',  label: 'Team Members' },
            { icon: FiGlobe,    val: '25+',   label: 'Industry Verticals' },
            { icon: FiAward,    val: 'CMMI 5',label: 'Certification' },
            { icon: FiMail,     val: 'Global', label: 'Reach' },
          ].map(f => {
            const Icon = f.icon
            return (
              <div key={f.label} className={styles.factItem}>
                <Icon size={18} className={styles.factIcon} />
                <span className={styles.factVal}>{f.val}</span>
                <span className={styles.factLabel}>{f.label}</span>
              </div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}

function TimelineSection() {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })
  return (
    <section className={styles.timelineSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Our Journey</span>
          <h2 className={styles.sectionTitle}>35+ Years of <span className={styles.accent}>Innovation</span></h2>
        </motion.div>

        <div className={styles.timeline}>
          <div className={styles.timelineLine} />
          {milestones.map((m, i) => {
            const Icon = m.icon
            const isLeft = i % 2 === 0
            return (
              <motion.div
                key={m.year}
                className={`${styles.timelineItem} ${isLeft ? styles.timelineLeft : styles.timelineRight}`}
                initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.timelineCard}>
                  <div className={styles.timelineIconWrap}>
                    <Icon size={20} />
                  </div>
                  <div className={styles.timelineYear}>{m.year}</div>
                  <h3 className={styles.timelineTitle}>{m.title}</h3>
                  <p className={styles.timelineDesc}>{m.desc}</p>
                </div>
                <div className={styles.timelineDot} />
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ValuesSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.valuesSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>What Drives Us</span>
          <h2 className={styles.sectionTitle}>Our Core <span className={styles.accent}>Values</span></h2>
        </motion.div>

        <div className={styles.valuesGrid}>
          {values.map((v, i) => {
            const Icon = v.icon
            return (
              <motion.div
                key={v.title}
                className={styles.valueCard}
                style={{ '--vc': v.color }}
                initial={{ opacity: 0, y: 40 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.6 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
              >
                <div className={styles.valueIconWrap}><Icon size={22} /></div>
                <h3 className={styles.valueTitle}>{v.title}</h3>
                <p className={styles.valueDesc}>{v.desc}</p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function LeadershipSection() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.leadershipSection} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <span className={styles.tag}>Leadership</span>
          <h2 className={styles.sectionTitle}>The Team Behind <span className={styles.accent}>E-Connect</span></h2>
        </motion.div>

        <div className={styles.leaderGrid}>
          {leadership.map((l, i) => (
            <motion.div
              key={l.name}
              className={styles.leaderCard}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.12, duration: 0.6 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.leaderAvatar} style={{ background: `linear-gradient(135deg,${l.color},var(--accent-cyan))` }}>
                {l.initials}
              </div>
              <h3 className={styles.leaderName}>{l.name}</h3>
              <p className={styles.leaderRole}>{l.role}</p>
              <div className={styles.leaderQuote}>
                <span className={styles.quoteIcon}>"</span>
                <p>{l.quote}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function AboutCta() {
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
            <h2 className={styles.ctaTitle}>Ready to Partner with Us?</h2>
            <p className={styles.ctaDesc}>Join hundreds of organizations that trust E-Connect for their digital transformation journey.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}><FiMail size={16} /> Get in Touch</Link>
              <Link to="/services" className={styles.ctaSecondary}>Our Services <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
