import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Trophy, MapPin, Users, LayoutGrid, BadgeCheck, Globe,
  Quote, ArrowRight, type LucideIcon
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './About.module.css'

interface Highlight {
  Icon: LucideIcon
  color: string
  text: string
}

interface VisualStat {
  value: string
  label: string
}

const highlights: Highlight[] = [
  { Icon: BadgeCheck, color: '#0057FF', text: 'CMMI Level 5 Certified' },
  { Icon: Globe,      color: '#00B894', text: 'India & Global Reach' },
  { Icon: LayoutGrid, color: '#7B61FF', text: '500+ Business Processes' },
  { Icon: Trophy,     color: '#FF6B35', text: 'Trusted Growth Partner' },
]

const visualStats: VisualStat[] = [
  { value: '1991', label: 'Founded' },
  { value: '500+', label: 'Team' },
  { value: '25+',  label: 'Verticals' },
  { value: '100+', label: 'Gov Projects' },
]

export default function About() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="about" className={styles.section} ref={ref}>
      <div className={styles.container}>

        <motion.div className={styles.visual}
          initial={{ opacity: 0, x: -50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

          <div className={styles.visualCard}>
            <div className={styles.vcCircle1} aria-hidden="true" />
            <div className={styles.vcCircle2} aria-hidden="true" />

            <svg className={styles.vcSvg} viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <circle cx="100" cy="100" r="90" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
              <circle cx="100" cy="100" r="65" stroke="rgba(255,255,255,0.06)" strokeWidth="1" strokeDasharray="4 6" />
              <circle cx="100" cy="100" r="40" stroke="rgba(0,194,255,0.2)" strokeWidth="1.5" strokeDasharray="3 5" />
              <ellipse cx="100" cy="100" rx="90" ry="28" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
              <ellipse cx="100" cy="100" rx="90" ry="60" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
              <circle cx="100" cy="10" r="4" fill="rgba(0,194,255,0.6)" />
              <circle cx="178" cy="65" r="3" fill="rgba(123,97,255,0.6)" />
              <circle cx="155" cy="155" r="3.5" fill="rgba(0,184,148,0.6)" />
              <circle cx="45" cy="155" r="3" fill="rgba(255,107,53,0.6)" />
              <circle cx="22" cy="65" r="3" fill="rgba(0,194,255,0.5)" />
              <line x1="100" y1="10" x2="178" y2="65" stroke="rgba(0,194,255,0.2)" strokeWidth="1" />
              <line x1="178" y1="65" x2="155" y2="155" stroke="rgba(123,97,255,0.2)" strokeWidth="1" />
              <line x1="155" y1="155" x2="45" y2="155" stroke="rgba(0,184,148,0.2)" strokeWidth="1" />
              <line x1="45" y1="155" x2="22" y2="65" stroke="rgba(255,107,53,0.2)" strokeWidth="1" />
              <line x1="22" y1="65" x2="100" y2="10" stroke="rgba(0,194,255,0.15)" strokeWidth="1" />
              <circle cx="100" cy="100" r="14" fill="rgba(0,87,255,0.3)" />
              <circle cx="100" cy="100" r="8" fill="rgba(0,194,255,0.5)" />
              <circle cx="100" cy="100" r="3" fill="white" />
            </svg>

            <div className={styles.yearBadge}>
              <span className={styles.yearNum}>1991</span>
              <span className={styles.yearLabel}>Founded</span>
            </div>

            <div className={styles.vcStats}>
              {visualStats.map(s => (
                <div key={s.label} className={styles.vcStat}>
                  <span className={styles.vcStatVal}>{s.value}</span>
                  <span className={styles.vcStatLabel}>{s.label}</span>
                </div>
              ))}
            </div>

            <div className={styles.locationPill}>
              <MapPin size={13} strokeWidth={2.5} />
              <span>IT Park, Udaipur, Rajasthan, India</span>
            </div>
          </div>

          <motion.div className={styles.floatCard}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}>
            <div className={styles.floatCardIcon}>
              <Trophy size={22} strokeWidth={1.5} />
            </div>
            <div>
              <div className={styles.floatCardTitle}>CMMI Level 5</div>
              <div className={styles.floatCardSub}>Highest Quality Standard</div>
            </div>
          </motion.div>

          <motion.div className={styles.floatCard2}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}>
            <div className={styles.floatCard2Icon}>
              <Users size={20} strokeWidth={1.5} />
            </div>
            <div>
              <div className={styles.floatCardTitle}>500+ Experts</div>
              <div className={styles.floatCardSub}>Engineers & Leaders</div>
            </div>
          </motion.div>
        </motion.div>

        {/* ── Content ── */}
        <motion.div className={styles.content}
          variants={staggerContainer} initial="hidden" animate={inView ? 'visible' : 'hidden'}>

          <motion.div className={styles.tagRow} variants={fadeUp}>
            <span className={styles.tag}>About E-Connect</span>
          </motion.div>

          <motion.h2 className={styles.title} variants={fadeUp}>
            We Connect &amp; Deliver
            <span className={styles.accent}> End-to-End IT</span>
          </motion.h2>

          <motion.p className={styles.para} variants={fadeUp}>
            E-Connect Solutions provides comprehensive end-to-end business and IT solutions
            that enhance our customers' operations. With over <strong>35 years of experience</strong>,
            we deliver innovative solutions leveraging the best business and IT thinking for
            clients in India and around the globe.
          </motion.p>

          <motion.p className={styles.para} variants={fadeUp}>
            Based in Udaipur, we are a team of <strong>500+ intrapreneurs, engineers and leaders</strong>
            {' '}helping customers with their digital transformation journey.
          </motion.p>

          <motion.div className={styles.highlights} variants={staggerContainer}>
            {highlights.map(({ Icon, color, text }, i) => (
              <motion.div key={text} className={styles.hlItem}
                style={{ '--hc': color } as React.CSSProperties}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}>
                <div className={styles.hlIcon}><Icon size={17} strokeWidth={2} /></div>
                <span className={styles.hlText}>{text}</span>
              </motion.div>
            ))}
          </motion.div>

          <motion.div className={styles.quoteBlock} variants={fadeUp}>
            <div className={styles.quoteStripe} />
            <div className={styles.quoteInner}>
              <Quote size={28} className={styles.quoteDecor} />
              <p className={styles.quoteText}>
                "We are consistently delivering business value to our customers, enabling them
                to excel and win in the emerging e-Economy."
              </p>
              <div className={styles.quoteAuthor}>
                <div className={styles.authorAvatar}>JP</div>
                <div>
                  <div className={styles.authorName}>Jaimin Patel</div>
                  <div className={styles.authorRole}>Chief Business Officer &amp; Founder</div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <Link to="/about" className={styles.learnBtn}>
              Learn More About Us <ArrowRight size={15} strokeWidth={2.5} />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
