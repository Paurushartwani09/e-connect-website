import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  TargetIcon, RefreshCw, SlidersHorizontal, Award, Rocket, HeartHandshake,
  ArrowRight, Sparkles
} from 'lucide-react'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './WhyUs.module.css'

const advantages = [
  { Icon: TargetIcon,       color: '#0057FF', num: '01', title: 'Multi-Domain Experience',    desc: 'Serving 25+ industry verticals has exposed us to 500+ business processes, enabling cross-industry best practices.' },
  { Icon: RefreshCw,        color: '#00B894', num: '02', title: 'End-to-End Solutions',       desc: 'Full spectrum IT — hardware, software, networking, security, and IT/OT integration. One trusted partner.' },
  { Icon: SlidersHorizontal,color: '#7B61FF', num: '03', title: 'Flexible Engagement',        desc: 'Project Based, Effort Based, Managed Services, or Team Augmentation — tailored to your business needs.' },
  { Icon: Award,            color: '#FF6B35', num: '04', title: 'CMMI Level 5 Certified',     desc: 'Highest process maturity standard — consistent quality, predictable delivery, and zero surprises.' },
  { Icon: Rocket,           color: '#E84393', num: '05', title: 'Innovation First',            desc: 'We bring life to your Digital Transformation idea — innovating and implementing to see your success.' },
  { Icon: HeartHandshake,   color: '#0EA5E9', num: '06', title: 'Trusted Growth Partner',     desc: 'Hundreds of customers trust us for End-to-End IT Solutions. Happy customers become our best advocates.' },
]

export default function WhyUs() {
  const { ref, inView } = useInView({ threshold: 0.08, triggerOnce: true })

  return (
    <section id="why-us" className={styles.section} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header}
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.div className={styles.tagRow} variants={fadeUp}>
            <Sparkles size={13} strokeWidth={2.5} className={styles.tagIcon} />
            <span>Why Choose Us</span>
          </motion.div>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Diversified Experience in
            <span className={styles.accent}> Industry Verticals</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            Serving 25+ verticals has given us exposure to 500+ business processes — to your advantage.
          </motion.p>
        </motion.div>

        {/* Grid */}
        <div className={styles.grid}>
          {advantages.map((adv, i) => (
            <AdvCard key={adv.title} adv={adv} index={i} inView={inView} />
          ))}
        </div>

        {/* Trust Banner */}
        <TrustBanner inView={inView} />
      </div>
    </section>
  )
}

function AdvCard({ adv, index, inView }) {
  const { Icon, color, num, title, desc } = adv
  return (
    <motion.div className={styles.card} style={{ '--c': color }}
      initial={{ opacity: 0, y: 44 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -8, transition: { duration: 0.2 } }}>

      {/* Large number watermark */}
      <div className={styles.watermark}>{num}</div>

      {/* Icon */}
      <div className={styles.iconBox}>
        <div className={styles.iconInner}><Icon size={24} strokeWidth={1.5} /></div>
        <div className={styles.iconRipple} />
      </div>

      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardDesc}>{desc}</p>

      <div className={styles.cardBar} />
    </motion.div>
  )
}

function TrustBanner({ inView }) {
  return (
    <motion.div className={styles.trustBanner}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: 0.72, duration: 0.6 }}>
      <div className={styles.trustOrb} />
      <div className={styles.trustLeft}>
        <div className={styles.trustIconRow}>
          {['🏆','⭐','🌟'].map(e => (
            <span key={e} className={styles.trustEmoji}>{e}</span>
          ))}
        </div>
        <div>
          <h3 className={styles.trustTitle}>Trust is built with consistency</h3>
          <p className={styles.trustDesc}>Hundreds of customers trust us when it comes to End-to-End IT Solutions.</p>
        </div>
      </div>
      <Link to="/contact" className={styles.trustBtn}>
        Let's Connect <ArrowRight size={15} strokeWidth={2.5} />
      </Link>
    </motion.div>
  )
}
