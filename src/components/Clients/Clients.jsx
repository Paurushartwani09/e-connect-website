import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './Clients.module.css'

// Placeholder client names (representing the logo carousel from the original site)
const clients = [
  'Urban Development Dept.',
  'Mines & Minerals Board',
  'State Finance Corp.',
  'Industrial Dev. Corp.',
  'Municipal Corporation',
  'State PSU',
  'NBFC Partner',
  'Retail Chain',
  'Infrastructure Ltd.',
  'PF Trust',
  'Govt. of Rajasthan',
  'Smart City Mission',
]

export default function Clients() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section className={styles.clients} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.sectionTag} variants={fadeUp}>
            Our Customers
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Happy Customers Are Our
            <span className={styles.titleAccent}> Advocates</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            Our happy customers have become our most successful sales team.
          </motion.p>
        </motion.div>

        {/* Marquee Track */}
        <motion.div
          className={styles.marqueeWrap}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          <div className={styles.marqueeTrack}>
            <div className={styles.marqueeInner}>
              {[...clients, ...clients].map((client, i) => (
                <div key={i} className={styles.clientCard}>
                  <div className={styles.clientLogo}>
                    {client.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <span className={styles.clientName}>{client}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Second row - reverse */}
        <motion.div
          className={styles.marqueeWrap}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className={styles.marqueeTrack}>
            <div className={`${styles.marqueeInner} ${styles.marqueeReverse}`}>
              {[...clients.slice(6), ...clients.slice(0, 6), ...clients.slice(6), ...clients.slice(0, 6)].map((client, i) => (
                <div key={i} className={styles.clientCard}>
                  <div className={styles.clientLogo}>
                    {client.split(' ').map(w => w[0]).join('').slice(0, 2)}
                  </div>
                  <span className={styles.clientName}>{client}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className={styles.ctaRow}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <p>Join hundreds of organizations leveraging their potential with E-Connect</p>
          <a
            href="#contact"
            className={styles.ctaBtn}
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          >
            Become a Customer
          </a>
        </motion.div>
      </div>
    </section>
  )
}
