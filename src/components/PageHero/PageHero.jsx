import React from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiHome, FiChevronRight } from 'react-icons/fi'
import styles from './PageHero.module.css'

export default function PageHero({ icon: Icon, tag, title, accent, description, breadcrumb, gradient }) {
  return (
    <section className={styles.hero} style={gradient ? { '--hero-gradient': gradient } : {}}>
      {/* Animated mesh background */}
      <div className={styles.mesh} aria-hidden="true">
        <div className={styles.meshOrb1} />
        <div className={styles.meshOrb2} />
        <div className={styles.meshOrb3} />
        <div className={styles.meshGrid} />
      </div>

      <div className={styles.container}>
        {/* Breadcrumb */}
        <motion.nav
          className={styles.breadcrumb}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          aria-label="Breadcrumb"
        >
          <Link to="/" className={styles.breadcrumbLink}>
            <FiHome size={13} />
            Home
          </Link>
          <FiChevronRight size={13} className={styles.breadcrumbSep} />
          <span className={styles.breadcrumbCurrent}>{breadcrumb}</span>
        </motion.nav>

        {/* Icon badge */}
        {Icon && (
          <motion.div
            className={styles.iconBadge}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2, type: 'spring', stiffness: 200 }}
          >
            <Icon size={32} />
          </motion.div>
        )}

        {/* Tag */}
        <motion.span
          className={styles.tag}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {tag}
        </motion.span>

        {/* Title */}
        <motion.h1
          className={styles.title}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
        >
          {title}
          {accent && <span className={styles.accent}> {accent}</span>}
        </motion.h1>

        {/* Description */}
        {description && (
          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            {description}
          </motion.p>
        )}
      </div>

      {/* Wave divider */}
      <div className={styles.wave} aria-hidden="true">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--bg-page)" />
        </svg>
      </div>
    </section>
  )
}
