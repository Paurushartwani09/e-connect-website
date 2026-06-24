import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { Cloud, Server, Layers, Monitor, Database, ArrowRight, ChevronRight } from 'lucide-react'
import { products } from '../../data/productsData'
import styles from './Products.module.css'

const deployOptions = [
  { Icon: Cloud,    label: 'Cloud, Edge or On-Premise' },
  { Icon: Layers,   label: 'SaaS or Managed SaaS' },
  { Icon: Monitor,  label: 'Web, Desktop or Mobile' },
  { Icon: Database, label: 'Single or Multi-Tenant' },
]

export default function Products() {
  const { ref, inView } = useInView({ threshold: 0.06, triggerOnce: true })

  return (
    <section id="products" className={styles.section} ref={ref}>
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={styles.container}>

        <motion.div className={styles.topLabel}
          initial={{ opacity: 0, y: 16 }} animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}>
          <span className={styles.labelDot} />
          Products, We Offer
        </motion.div>

        <div className={styles.layout}>

          {/* LEFT */}
          <motion.div className={styles.leftCol}
            initial={{ opacity: 0, x: -30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>

            <h2 className={styles.heading}>
              Managed SaaS and SaaS Products{' '}
              <span className={styles.headingAccent}>for Every Operational Domain</span>
            </h2>

            <p className={styles.headingDesc}>
              From ERP and citizen services to online auctions and works management —
              our product suite is purpose-built for government, PSUs, and enterprise
              organisations across India with flexible deployment options.
            </p>

            <div className={styles.deployBlock}>
              <p className={styles.deployLabel}>Deployment Flexibility</p>
              <div className={styles.deployGrid}>
                {deployOptions.map((d, i) => (
                  <motion.div key={d.label} className={styles.deployItem}
                    initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.35 + i * 0.07, duration: 0.4 }}>
                    <div className={styles.deployIconWrap}>
                      <d.Icon size={15} strokeWidth={2} />
                    </div>
                    <span className={styles.deployText}>{d.label}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.7, duration: 0.4 }}>
              <Link to="/products" className={styles.ctaLink}>
                Explore Our Product Portfolio <ArrowRight size={15} strokeWidth={2.5} />
              </Link>
            </motion.div>
          </motion.div>

          {/* RIGHT: 2×3 grid */}
          <div className={styles.rightCol}>
            <div className={styles.productsGrid}>
              {products.map((p, i) => (
                <ProductCard key={p.id} product={p} index={i} inView={inView} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function ProductCard({ product, index, inView }) {
  const { icon: Icon, color, gradient, title, category, shortDesc, badge, slug } = product

  return (
    <motion.div
      className={styles.card}
      style={{ '--c': color, '--g': gradient }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
    >
      <div className={styles.cardTopBar} />
      <div className={styles.cardHead}>
        <div className={styles.cardIconWrap}>
          <Icon size={20} strokeWidth={1.6} />
        </div>
        <span className={styles.cardBadge}>{badge}</span>
      </div>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p className={styles.cardCategory}>{category}</p>
      <p className={styles.cardDesc}>{shortDesc}</p>
      <Link to={slug} className={styles.cardLink}>
        Explore <ChevronRight size={13} strokeWidth={2.5} />
      </Link>
    </motion.div>
  )
}
