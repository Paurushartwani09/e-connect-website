import React, { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Users, Building2, LayoutGrid, CalendarDays, CreditCard, Landmark, Lock } from 'lucide-react'
import styles from './Stats.module.css'

const stats = [
  { Icon: Users,       value: 100,   suffix: 'K+', label: 'Active Users',       desc: 'Using our apps daily',          color: '#00C2FF' },
  { Icon: Building2,   value: 500,   suffix: '+',  label: 'Organizations',       desc: 'Leveraging their potential',    color: '#7B61FF' },
  { Icon: LayoutGrid,  value: 25,    suffix: '+',  label: 'Industry Verticals',  desc: 'Served across domains',         color: '#00B894' },
  { Icon: CalendarDays,value: 35,    suffix: '+',  label: 'Years Experience',    desc: 'Enabling IT since 1991',        color: '#FF6B35' },
]

const highlights = [
  { Icon: CreditCard, text: 'Millions of Transactions Per Month' },
  { Icon: Landmark,   text: 'Millions of Citizens Accessing Services' },
  { Icon: Lock,       text: 'CMMI Level 5 Endorsed Processes' },
]

function CountUp({ target, suffix, active }) {
  const [count, setCount] = useState(0)
  const raf = useRef(null)
  useEffect(() => {
    if (!active) return
    const dur = 2000, start = performance.now()
    const tick = (now) => {
      const t = Math.min((now - start) / dur, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setCount(Math.floor(ease * target))
      if (t < 1) raf.current = requestAnimationFrame(tick)
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [active, target])
  return <>{count}{suffix}</>
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })

  return (
    <section className={styles.section} ref={ref}>
      {/* decorative blobs */}
      <div className={styles.blob1} aria-hidden="true" />
      <div className={styles.blob2} aria-hidden="true" />
      <div className={styles.gridLines} aria-hidden="true" />

      <div className={styles.container}>
        {/* Header */}
        <motion.div className={styles.header}
          initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}>
          <span className={styles.tag}>Our Impact</span>
          <h2 className={styles.title}>Enabling Good Governance</h2>
          <p className={styles.desc}>
            Hundreds of E-Governance projects where millions of citizens use our applications.
          </p>
        </motion.div>

        {/* Stat cards */}
        <div className={styles.grid}>
          {stats.map(({ Icon, value, suffix, label, desc, color }, i) => (
            <motion.div key={label} className={styles.card}
              style={{ '--c': color }}
              initial={{ opacity: 0, y: 40, scale: 0.92 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}>

              {/* Radial glow */}
              <div className={styles.cardGlow} />

              {/* Icon */}
              <div className={styles.cardIconRing}>
                <div className={styles.cardIconInner}>
                  <Icon size={22} strokeWidth={1.5} />
                </div>
              </div>

              <div className={styles.cardNum}>
                <CountUp target={value} suffix={suffix} active={inView} />
              </div>
              <div className={styles.cardLabel}>{label}</div>
              <div className={styles.cardDesc}>{desc}</div>
            </motion.div>
          ))}
        </div>

        {/* Highlights bar */}
        <motion.div className={styles.highlights}
          initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.65, duration: 0.6 }}>
          {highlights.map(({ Icon, text }, i) => (
            <React.Fragment key={text}>
              {i > 0 && <div className={styles.hlDivider} />}
              <div className={styles.hlItem}>
                <div className={styles.hlIcon}><Icon size={18} strokeWidth={1.8} /></div>
                <span>{text}</span>
              </div>
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
