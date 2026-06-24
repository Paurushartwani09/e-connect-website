import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './Industries.module.css'

const govtIndustries = [
  { icon: '🏙️', name: 'Urban Development' },
  { icon: '⛏️', name: 'Mines & Mineral' },
  { icon: '🍶', name: 'Liquor Supply Chain' },
  { icon: '🏭', name: 'Industrial Development' },
]

const enterpriseIndustries = [
  { icon: '🏦', name: 'NBFC' },
  { icon: '💼', name: 'PF Trust' },
  { icon: '🛒', name: 'POS & Retailing' },
  { icon: '🏗️', name: 'Infrastructure Projects' },
]

const businessProcesses = [
  'Human Resource & Payroll',
  'Finance & Accounting',
  'Citizen Service Delivery',
  'Customer Support',
  'Loan Management',
  'Sales & Retailing',
  'Supply Chain & Distribution',
  'Inventory & Procurements',
  'Contracts, Works & Projects',
  'Administration and Management',
]

export default function Industries() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="industries" className={styles.industries} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.sectionTag} variants={fadeUp}>
            Businesses We Serve
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Government &amp;
            <span className={styles.titleAccent}> Enterprises</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            We serve Governments, Enterprises and State Owned Enterprises of all sizes across
            various industry domains — with exposure to 500+ business processes.
          </motion.p>
        </motion.div>

        <div className={styles.content}>
          {/* Left: Industry Cards */}
          <div className={styles.industryColumns}>
            <motion.div
              className={styles.industryGroup}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>🏛️</span>
                <h3 className={styles.groupTitle}>Government Sector</h3>
              </div>
              <div className={styles.industryGrid}>
                {govtIndustries.map((ind, i) => (
                  <motion.div
                    key={ind.name}
                    className={styles.industryCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  >
                    <span className={styles.industryIcon}>{ind.icon}</span>
                    <span className={styles.industryName}>{ind.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              className={styles.industryGroup}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.35 }}
            >
              <div className={styles.groupHeader}>
                <span className={styles.groupIcon}>🏢</span>
                <h3 className={styles.groupTitle}>Enterprise Sector</h3>
              </div>
              <div className={styles.industryGrid}>
                {enterpriseIndustries.map((ind, i) => (
                  <motion.div
                    key={ind.name}
                    className={styles.industryCard}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  >
                    <span className={styles.industryIcon}>{ind.icon}</span>
                    <span className={styles.industryName}>{ind.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Business Processes */}
          <motion.div
            className={styles.processPanel}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.processPanelHeader}>
              <span className={styles.processPanelIcon}>⚡</span>
              <div>
                <h3 className={styles.processPanelTitle}>500+ Business Processes</h3>
                <p className={styles.processPanelSub}>Cross-industry expertise</p>
              </div>
            </div>
            <div className={styles.processList}>
              {businessProcesses.map((process, i) => (
                <motion.div
                  key={process}
                  className={styles.processItem}
                  initial={{ opacity: 0, x: 20 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: 0.4 + i * 0.06, duration: 0.4 }}
                >
                  <span className={styles.processCheck}>✓</span>
                  <span>{process}</span>
                </motion.div>
              ))}
            </div>
            <div className={styles.processFooter}>
              <span>25+ Industry Verticals</span>
              <span className={styles.processDivider}>·</span>
              <span>Cross-industry Best Practices</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
