import React, { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link, useLocation } from 'react-router-dom'
import {
  Home, Cog, Info, Package, Building2,
  Award, Mail, Sun, Moon, Menu, X, ChevronRight, ChevronDown,
  Newspaper, Briefcase
} from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { products } from '../../data/productsData'
import styles from './Navbar.module.css'

const DROPDOWN_WIDTH = 600
const MARGIN = 16

const navLinks = [
  { label: 'Home',       path: '/',           Icon: Home },
  { label: 'Services',   path: '/services',   Icon: Cog },
  { label: 'About',      path: '/about',      Icon: Info },
  { label: 'Products',   path: '/products',   Icon: Package, hasDropdown: true },
  { label: 'Industries', path: '/industries', Icon: Building2 },
  { label: 'Why Us',     path: '/why-us',     Icon: Award },
  { label: 'Careers',    path: '/careers',    Icon: Briefcase },
  { label: 'Media',      path: '/media',      Icon: Newspaper },
  { label: 'Contact',    path: '/contact',    Icon: Mail },
]

export default function Navbar() {
  const [scrolled,        setScrolled]        = useState(false)
  const [menuOpen,        setMenuOpen]         = useState(false)
  const [dropOpen,        setDropOpen]         = useState(false)  // desktop hover
  const [mobileSubOpen,   setMobileSubOpen]    = useState(false)  // mobile accordion
  const [dropLeft,        setDropLeft]         = useState(0)
  const { theme, toggleTheme } = useTheme()
  const location               = useLocation()
  const wrapperRef             = useRef(null)
  const hideTimer              = useRef(null)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  // Close everything on route change
  useEffect(() => {
    setMenuOpen(false)
    setDropOpen(false)
    setMobileSubOpen(false)
  }, [location.pathname])

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)

  /* ── Desktop hover positioning ── */
  const computeLeft = useCallback(() => {
    if (!wrapperRef.current) return
    const vw = window.innerWidth
    const actualWidth = Math.min(DROPDOWN_WIDTH, vw - MARGIN * 2)
    const rect = wrapperRef.current.getBoundingClientRect()
    const triggerCentreX = rect.left + rect.width / 2
    let left = triggerCentreX - actualWidth / 2
    left = Math.max(MARGIN, left)
    left = Math.min(left, vw - actualWidth - MARGIN)
    left = left - rect.left
    setDropLeft(left)
  }, [])

  const handleDropEnter = () => {
    clearTimeout(hideTimer.current)
    computeLeft()
    setDropOpen(true)
  }
  const handleDropLeave = () => {
    hideTimer.current = setTimeout(() => setDropOpen(false), 120)
  }

  return (
    <motion.header
      className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className={styles.container}>

        {/* Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src={scrolled ? '/espl-logo-sticky.jpg' : '/espl-logo-wh2.png'}
            alt="E-Connect Solutions"
            className={styles.logoImg}
            key={scrolled ? 'sticky' : 'default'}
          />
        </Link>

        {/* ── Desktop Nav ── */}
        <nav className={styles.desktopNav} aria-label="Main navigation">
          {navLinks.map(({ label, path, Icon, hasDropdown }) => {
            if (hasDropdown) {
              return (
                <div
                  key={path}
                  className={styles.dropdownWrapper}
                  ref={wrapperRef}
                  onMouseEnter={handleDropEnter}
                  onMouseLeave={handleDropLeave}
                >
                  <Link
                    to={path}
                    className={`${styles.navLink} ${styles.dropdownTrigger} ${isActive(path) ? styles.active : ''}`}
                  >
                    <Icon size={13} strokeWidth={2} className={styles.navIcon} />
                    {label}
                    <motion.span
                      className={styles.chevron}
                      animate={{ rotate: dropOpen ? 180 : 0 }}
                      transition={{ duration: 0.22 }}
                    >
                      <ChevronDown size={13} strokeWidth={2.5} />
                    </motion.span>
                    {isActive(path) && (
                      <motion.span className={styles.activePill} layoutId="activePill"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                    )}
                  </Link>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        className={styles.dropdown}
                        style={{ left: dropLeft }}
                        onMouseEnter={handleDropEnter}
                        onMouseLeave={handleDropLeave}
                        initial={{ opacity: 0, y: -8, scale: 0.97 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -8, scale: 0.97 }}
                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <div className={styles.dropdownGrid}>
                          {products.map((p) => {
                            const PIcon = p.icon
                            return (
                              <Link
                                key={p.id}
                                to={p.slug}
                                className={styles.dropdownItem}
                                style={{ '--pc': p.color, '--pg': p.gradient }}
                              >
                                <div className={styles.dropdownItemIcon}>
                                  <PIcon size={18} />
                                </div>
                                <div className={styles.dropdownItemText}>
                                  <span className={styles.dropdownItemTitle}>{p.title}</span>
                                  <span className={styles.dropdownItemTagline}>{p.tagline}</span>
                                </div>
                                <ChevronRight size={13} className={styles.dropdownItemArrow} />
                              </Link>
                            )
                          })}
                        </div>
                        <div className={styles.dropdownFooter}>
                          <Link to="/products" className={styles.dropdownFooterLink}>
                            <Package size={14} strokeWidth={2} />
                            View All Products
                            <ChevronRight size={13} />
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )
            }

            return (
              <Link key={path} to={path} className={`${styles.navLink} ${isActive(path) ? styles.active : ''}`}>
                <Icon size={13} strokeWidth={2} className={styles.navIcon} />
                {label}
                {isActive(path) && (
                  <motion.span className={styles.activePill} layoutId="activePill"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Controls */}
        <div className={styles.controls}>
          <motion.button className={styles.themeBtn} onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
            whileTap={{ scale: 0.88 }} whileHover={{ scale: 1.06 }}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={theme}
                initial={{ rotate: -90, opacity: 0, scale: 0.4 }}
                animate={{ rotate: 0, opacity: 1, scale: 1 }}
                exit={{ rotate: 90, opacity: 0, scale: 0.4 }}
                transition={{ duration: 0.22 }}>
                {theme === 'light' ? <Moon size={16} strokeWidth={2} /> : <Sun size={16} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </motion.button>

          <Link to="/contact" className={styles.ctaBtn}>
            <Mail size={13} strokeWidth={2.5} />
            Let's Connect
          </Link>

          <button className={styles.hamburger} onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu" aria-expanded={menuOpen}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span key={menuOpen ? 'x' : 'm'}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.18 }}>
                {menuOpen ? <X size={20} strokeWidth={2} /> : <Menu size={20} strokeWidth={2} />}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* ── Mobile Menu ── */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}>
            <nav className={styles.mobileNav}>
              {navLinks.map(({ label, path, Icon, hasDropdown }, i) => {
                if (hasDropdown) {
                  return (
                    <motion.div key={path}
                      initial={{ opacity: 0, x: -24 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05, duration: 0.28 }}>

                      {/* Products accordion trigger */}
                      <button
                        className={`${styles.mobileNavLink} ${styles.mobileNavBtn} ${isActive(path) ? styles.mobileActive : ''}`}
                        onClick={() => setMobileSubOpen(o => !o)}
                        aria-expanded={mobileSubOpen}
                      >
                        <span className={styles.mobileNavIcon}><Icon size={17} strokeWidth={2} /></span>
                        <span className={styles.mobileNavLabel}>{label}</span>
                        <motion.span
                          className={styles.mobileSubChevron}
                          animate={{ rotate: mobileSubOpen ? 180 : 0 }}
                          transition={{ duration: 0.22 }}
                        >
                          <ChevronDown size={15} strokeWidth={2.5} />
                        </motion.span>
                      </button>

                      {/* Accordion: product list */}
                      <AnimatePresence initial={false}>
                        {mobileSubOpen && (
                          <motion.div
                            className={styles.mobileSubMenu}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                          >
                            {products.map((p, pi) => {
                              const PIcon = p.icon
                              return (
                                <motion.div key={p.id}
                                  initial={{ opacity: 0, x: -12 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: pi * 0.04, duration: 0.22 }}>
                                  <Link
                                    to={p.slug}
                                    className={styles.mobileSubItem}
                                    style={{ '--pc': p.color, '--pg': p.gradient }}
                                  >
                                    <div className={styles.mobileSubIcon}>
                                      <PIcon size={15} />
                                    </div>
                                    <span className={styles.mobileSubTitle}>{p.title}</span>
                                    <ChevronRight size={12} className={styles.mobileSubArrow} />
                                  </Link>
                                </motion.div>
                              )
                            })}
                            {/* View All link */}
                            <Link to="/products" className={styles.mobileSubViewAll}>
                              <Package size={14} strokeWidth={2} />
                              View All Products
                              <ChevronRight size={12} />
                            </Link>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )
                }

                return (
                  <motion.div key={path}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05, duration: 0.28 }}>
                    <Link to={path} className={`${styles.mobileNavLink} ${isActive(path) ? styles.mobileActive : ''}`}>
                      <span className={styles.mobileNavIcon}><Icon size={17} strokeWidth={2} /></span>
                      <span className={styles.mobileNavLabel}>{label}</span>
                      {isActive(path) && <ChevronRight size={14} className={styles.mobileChevron} />}
                    </Link>
                  </motion.div>
                )
              })}

              <motion.div className={styles.mobileBottom}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.42, duration: 0.28 }}>
                <button className={styles.mobileThemeBtn} onClick={toggleTheme}>
                  {theme === 'light' ? <Moon size={15} strokeWidth={2} /> : <Sun size={15} strokeWidth={2} />}
                  {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
                </button>
                <Link to="/contact" className={styles.mobileCta}>
                  <Mail size={14} strokeWidth={2.5} /> Let's Connect
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
