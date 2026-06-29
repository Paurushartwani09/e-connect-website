import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  FiBox,
  FiTrendingUp, FiCheckCircle, FiArrowRight,
  FiCloud, FiMonitor, FiServer, FiLayers,
  FiMail, FiCpu, FiDatabase,
  FiZap, FiStar, FiShield, FiPackage,
  type IconType
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import { products, type Product } from '../../data/productsData'
import styles from './ProductsPage.module.css'

const deployIcons: Record<string, IconType> = {
  Cloud: FiCloud,
  'On-Premise': FiServer,
  SaaS: FiLayers,
  'Multi-Tenant': FiMonitor,
  Edge: FiCpu,
  Hybrid: FiDatabase,
}

interface AllProductsGridProps {
  inView: boolean
}

export default function ProductsPage() {
  const [selected, setSelected] = useState<string>(products[0].id)
  const active = products.find(p => p.id === selected) as Product
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiPackage}
        tag="Our Product Portfolio"
        title="Trusted Enterprise"
        accent="Products"
        description="ERP, e-Governance, M-SaaS, Auction, FinTech, and Cybersecurity — built and battle-tested across 100K+ users in India."
        breadcrumb="Products"
        gradient="linear-gradient(135deg,#001F6B 0%,#7B61FF 60%,#E84393 100%)"
      />

      <section className={styles.explorerSection} ref={ref}>
        <div className={styles.container}>
          <div className={styles.explorer}>

            <div className={styles.sidebar}>
              <p className={styles.sidebarLabel}>Select a Product</p>
              {products.map((p, i) => {
                const Icon = p.icon
                return (
                  <motion.button
                    key={p.id}
                    className={`${styles.sidebarItem} ${selected === p.id ? styles.sidebarActive : ''}`}
                    style={{ '--pc': p.color } as React.CSSProperties}
                    onClick={() => setSelected(p.id)}
                    initial={{ opacity: 0, x: -20 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: i * 0.07, duration: 0.4 }}
                    whileHover={{ x: 4, transition: { duration: 0.15 } }}
                  >
                    <div className={styles.sidebarIcon}><Icon size={18} /></div>
                    <div className={styles.sidebarText}>
                      <span className={styles.sidebarTitle}>{p.title}</span>
                      <span className={styles.sidebarCat}>{p.category}</span>
                    </div>
                    {selected === p.id && <FiArrowRight size={14} className={styles.sidebarArrow} />}
                  </motion.button>
                )
              })}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected}
                className={styles.detailPanel}
                style={{ '--pc': active.color, '--pg': active.gradient } as React.CSSProperties}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              >
                <div className={styles.detailHeader}>
                  <div className={styles.detailIconWrap}>
                    <active.icon size={32} />
                  </div>
                  <div className={styles.detailHeaderText}>
                    <div className={styles.detailTopRow}>
                      <span className={styles.detailCat}>{active.category}</span>
                      <span className={styles.productBadge}>{active.badge}</span>
                    </div>
                    <h2 className={styles.detailTitle}>{active.title}</h2>
                    <p className={styles.detailTagline}>{active.tagline}</p>
                  </div>
                </div>

                <p className={styles.detailDesc}>{active.desc}</p>

                <div className={styles.detailStats}>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.clients}</span>
                    <span className={styles.detailStatLabel}>Clients</span>
                  </div>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.industries}</span>
                    <span className={styles.detailStatLabel}>Industries</span>
                  </div>
                  <div className={styles.detailStat}>
                    <span className={styles.detailStatVal}>{active.deployments.length}</span>
                    <span className={styles.detailStatLabel}>Deploy Options</span>
                  </div>
                </div>

                <div className={styles.modulesSection}>
                  <h4 className={styles.modulesTitle}>Key Modules</h4>
                  <div className={styles.modulesGrid}>
                    {active.modules.map(m => (
                      <div key={m} className={styles.moduleItem}>
                        <FiCheckCircle size={14} className={styles.moduleCheck} />
                        {m}
                      </div>
                    ))}
                  </div>
                </div>

                <div className={styles.deploySection}>
                  <h4 className={styles.deployTitle}>Deployment Options</h4>
                  <div className={styles.deployTags}>
                    {active.deployments.map(d => {
                      const DIcon = deployIcons[d] || FiCloud
                      return (
                        <span key={d} className={styles.deployTag}>
                          <DIcon size={13} /> {d}
                        </span>
                      )
                    })}
                  </div>
                </div>

                <Link to="/contact" className={styles.detailCta}>
                  <FiMail size={15} /> Request a Demo
                </Link>
                <Link to={active.slug} className={styles.detailViewLink}>
                  View Full Details <FiArrowRight size={13} />
                </Link>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>

      <AllProductsGrid inView={inView} />
      <ProductsCta />
    </motion.div>
  )
}

function AllProductsGrid({ inView }: AllProductsGridProps) {
  return (
    <section className={styles.gridSection}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <span className={styles.tag}>At a Glance</span>
          <h2 className={styles.sectionTitle}>All <span className={styles.accent}>6 Products</span></h2>
          <p className={styles.sectionSub}>Purpose-built for government, enterprise, and financial institutions across India</p>
        </div>
        <div className={styles.allGrid}>
          {products.map((p, i) => {
            const Icon = p.icon
            return (
              <Link to={p.slug} key={p.id} style={{ textDecoration: 'none' }}>
                <motion.div
                  className={styles.gridCard}
                  style={{ '--pc': p.color, '--pg': p.gradient } as React.CSSProperties}
                  initial={{ opacity: 0, y: 40 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -8, transition: { duration: 0.2 } }}
                >
                  <div className={styles.gridCardTop}>
                    <div className={styles.gridCardIcon}><Icon size={24} /></div>
                    <span className={styles.gridCardBadge}>{p.badge}</span>
                  </div>
                  <h3 className={styles.gridCardTitle}>{p.title}</h3>
                  <p className={styles.gridCardCat}>{p.category}</p>
                  <p className={styles.gridCardDesc}>{p.desc.slice(0, 95)}…</p>
                  <div className={styles.gridCardFooter}>
                    <span className={styles.gridCardClients}>{p.clients} clients</span>
                    <span className={styles.gridCardViewLink}>View Details <FiArrowRight size={11} /></span>
                  </div>
                </motion.div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function ProductsCta() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  const ctaIcons: IconType[] = [FiStar, FiZap, FiShield]
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
            <div className={styles.ctaIcons}>
              {ctaIcons.map((Icon, i) => (
                <div key={i} className={styles.ctaIconBubble}><Icon size={20} /></div>
              ))}
            </div>
            <h2 className={styles.ctaTitle}>See Our Products in Action</h2>
            <p className={styles.ctaDesc}>Request a live demo and discover how our products can transform your operations.</p>
            <div className={styles.ctaBtns}>
              <Link to="/contact" className={styles.ctaPrimary}><FiMail size={16} /> Request Demo</Link>
              <Link to="/services" className={styles.ctaSecondary}>Our Services <FiArrowRight size={14} /></Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
