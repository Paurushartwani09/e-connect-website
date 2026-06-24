import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  Trophy, MapPin, Users, LayoutGrid, BadgeCheck, Globe,
  Quote, ArrowRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './About.module.css'

const highlights = [
  { Icon: BadgeCheck, color: '#0057FF', text: 'CMMI Level 5 Certified' },
  { Icon: Globe,      color: '#00B894', text: 'India & Global Reach' },
  { Icon: LayoutGrid, color: '#7B61FF', text: '500+ Business Processes' },
  { Icon: Trophy,     color: '#FF6B35', text: 'Trusted Growth Partner' },
]

const visualStats = [
  { value: '1991', label: 'Founded', Icon: null },
  { value: '500+', label: 'Team',        Icon: null },
  { value: '25+',  label: 'Verticals',   Icon: null },
  { value: '100+', label: 'Gov Projects', Icon: null },
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
            {/* decorative circles */}
            <div className={styles.vcCircle1} aria-hidden="true" />
            <div className={styles.vcCircle2} aria-hidden="true" />

          
            <div className={styles.yearBadge}>
              <span className={styles.yearNum}>1991</span>
              <span className={styles.yearLabel}>Founded</span>
            </div>

            {/* Stats grid */}
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

          {/* Floating users card */}
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

          {/* Highlights */}
          <motion.div className={styles.highlights} variants={staggerContainer}>
            {highlights.map(({ Icon, color, text }, i) => (
              <motion.div key={text} className={styles.hlItem}
                style={{ '--hc': color }}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08, duration: 0.4 }}>
                <div className={styles.hlIcon}><Icon size={17} strokeWidth={2} /></div>
                <span className={styles.hlText}>{text}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Quote */}
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
