import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  FiCheckCircle, FiArrowRight, FiMail,
  FiCloud, FiServer, FiLayers, FiMonitor, FiCpu, FiDatabase,
  FiZap, FiPackage, type IconType
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import type { Product } from '../../data/productsData'
import styles from './ProductDetailPage.module.css'

interface ProductDetailTemplateProps {
  product: Product | undefined
}

const deployIcons: Record<string, IconType> = {
  Cloud: FiCloud,
  'On-Premise': FiServer,
  SaaS: FiLayers,
  'Multi-Tenant': FiMonitor,
  Edge: FiCpu,
  Hybrid: FiDatabase,
}

const featureIconSet: IconType[] = [FiZap, FiCheckCircle, FiPackage, FiArrowRight, FiMail, FiCloud]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 32 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.15 },
  transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function ProductDetailTemplate({ product: p }: ProductDetailTemplateProps) {
  if (!p) return null

  const ProductIcon = p.icon

  return (
    <motion.div
      className={styles.page}
      style={{ '--pc': p.color, '--pg': p.gradient } as React.CSSProperties}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={ProductIcon}
        tag={p.category}
        title={p.title}
        accent={p.badge}
        description={p.tagline}
        breadcrumb={p.title}
        gradient={p.gradient}
      />

      {/* ── Overview ── */}
      <section className={styles.overviewSection}>
        <div className={styles.container}>
          <div className={styles.overviewGrid}>
            <motion.div className={styles.overviewText} {...fadeUp(0)}>
              <span className={styles.sectionTag}>Overview</span>
              {p.fullDesc.split('. ').reduce<React.ReactElement[]>((acc, sentence, i, arr) => {
                if (i % 2 === 0) {
                  const pair = arr.slice(i, i + 2).join('. ')
                  acc.push(<p key={i}>{pair + (arr[i + 1] ? '' : '')}</p>)
                }
                return acc
              }, [])}
            </motion.div>

            <motion.div className={styles.statsCard} {...fadeUp(0.15)}>
              <div className={styles.statsCardHeader}>
                <div className={styles.statsCardIconWrap}>
                  <ProductIcon size={26} />
                </div>
                <div>
                  <div className={styles.statsCardTitle}>{p.title}</div>
                  <span className={styles.statsCardBadge}>{p.badge}</span>
                </div>
              </div>

              <div className={styles.statsGrid}>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{p.clients}</span>
                  <span className={styles.statLabel}>Clients</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{p.industries}</span>
                  <span className={styles.statLabel}>Industries</span>
                </div>
                <div className={styles.statItem}>
                  <span className={styles.statVal}>{p.deployments.length}</span>
                  <span className={styles.statLabel}>Deploy Options</span>
                </div>
              </div>

              <div className={styles.deployTags}>
                {p.deployments.map(d => {
                  const DIcon = deployIcons[d] || FiCloud
                  return (
                    <span key={d} className={styles.deployTag}>
                      <DIcon size={12} /> {d}
                    </span>
                  )
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Key Modules ── */}
      <section className={styles.modulesSection}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHeader} {...fadeUp(0)}>
            <span className={styles.sectionTag}>Capabilities</span>
            <h2 className={styles.sectionTitle}>Key <span className={styles.accent}>Modules</span></h2>
            <p className={styles.sectionSub}>Purpose-built components that work together as one cohesive system</p>
          </motion.div>

          <div className={styles.modulesGrid}>
            {p.modules.map((m, i) => (
              <motion.div key={m} className={styles.moduleItem} {...fadeUp(i * 0.07)}>
                <FiCheckCircle size={16} className={styles.moduleCheck} />
                {m}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Key Features ── */}
      <section className={styles.featuresSection}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHeader} {...fadeUp(0)}>
            <span className={styles.sectionTag}>Why Choose This</span>
            <h2 className={styles.sectionTitle}>Key <span className={styles.accent}>Features</span></h2>
            <p className={styles.sectionSub}>Built-in capabilities that deliver measurable business value from day one</p>
          </motion.div>

          <div className={styles.featuresGrid}>
            {p.features.map((f, i) => {
              const FIcon = featureIconSet[i % featureIconSet.length]
              return (
                <motion.div key={f.title} className={styles.featureCard} {...fadeUp(i * 0.07)}>
                  <div className={styles.featureIconWrap}><FIcon size={20} /></div>
                  <h3 className={styles.featureTitle}>{f.title}</h3>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Use Cases ── */}
      <section className={styles.useCasesSection}>
        <div className={styles.container}>
          <motion.div className={styles.sectionHeader} {...fadeUp(0)}>
            <span className={styles.sectionTag}>Real-world Impact</span>
            <h2 className={styles.sectionTitle}>Use <span className={styles.accent}>Cases</span></h2>
            <p className={styles.sectionSub}>How organisations across India are transforming operations with this product</p>
          </motion.div>

          <div className={styles.useCasesGrid}>
            {p.useCases.map((uc, i) => (
              <motion.div key={uc.title} className={styles.useCaseCard} {...fadeUp(i * 0.1)}>
                <div className={styles.useCaseNumber}>{String(i + 1).padStart(2, '0')}</div>
                <h3 className={styles.useCaseTitle}>{uc.title}</h3>
                <p className={styles.useCaseDesc}>{uc.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tech Stack ── */}
      <section className={styles.techSection}>
        <div className={styles.techInner}>
          <span className={styles.techLabel}>Tech Stack</span>
          <div className={styles.techTags}>
            {p.techStack.map(t => (
              <motion.span
                key={t}
                className={styles.techTag}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35 }}
              >
                {t}
              </motion.span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className={styles.ctaSection}>
        <div className={styles.container}>
          <motion.div className={styles.ctaBanner} {...fadeUp(0)}>
            <div className={styles.ctaOrb} />
            <div className={styles.ctaContent}>
              <h2 className={styles.ctaTitle}>Ready to See {p.title} in Action?</h2>
              <p className={styles.ctaDesc}>
                Talk to our product team and get a personalised demo tailored to your organisation.
              </p>
              <div className={styles.ctaBtns}>
                <Link to="/contact" className={styles.ctaPrimary}>
                  <FiMail size={16} /> Request a Demo
                </Link>
                <Link to="/products" className={styles.ctaSecondary}>
                  View All Products <FiArrowRight size={14} />
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  )
}
