import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '../../utils/animations'
import {
  Building2, Mountain, ShoppingCart, Factory,
  Landmark, Briefcase, Store, HardHat,
  CheckCircle2, Zap, type LucideIcon
} from 'lucide-react'
import styles from './Industries.module.css'

interface Industry {
  Icon: LucideIcon
  name: string
  color: string
}

const govtIndustries: Industry[] = [
  { Icon: Building2,    name: 'Urban Development',     color: '#0057FF' },
  { Icon: Mountain,     name: 'Mines & Mineral',        color: '#FF6B35' },
  { Icon: ShoppingCart, name: 'Liquor Supply Chain',    color: '#7B61FF' },
  { Icon: Factory,      name: 'Industrial Development', color: '#00B894' },
]

const enterpriseIndustries: Industry[] = [
  { Icon: Landmark,   name: 'NBFC',                   color: '#0EA5E9' },
  { Icon: Briefcase,  name: 'PF Trust',                color: '#E84393' },
  { Icon: Store,      name: 'POS & Retailing',         color: '#FF6B35' },
  { Icon: HardHat,    name: 'Infrastructure Projects',  color: '#00B894' },
]

const businessProcesses: string[] = [
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
      <div className={styles.bgBlob} aria-hidden="true" />
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
                    style={{ '--ic': ind.color } as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  >
                    <div className={styles.industryIconWrap}><ind.Icon size={18} strokeWidth={1.8} /></div>
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
                    style={{ '--ic': ind.color } as React.CSSProperties}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={inView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.45 + i * 0.08, duration: 0.4 }}
                    whileHover={{ scale: 1.04, transition: { duration: 0.2 } }}
                  >
                    <div className={styles.industryIconWrap}><ind.Icon size={18} strokeWidth={1.8} /></div>
                    <span className={styles.industryName}>{ind.name}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className={styles.processPanel}
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
          >
            <div className={styles.processPanelHeader}>
              <div className={styles.processPanelIcon}>
                <Zap size={24} strokeWidth={1.8} color="white" />
              </div>
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
                  <CheckCircle2 size={15} strokeWidth={2} className={styles.processCheck} />
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
