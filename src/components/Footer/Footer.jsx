import React from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import { FiFacebook, FiTwitter, FiLinkedin, FiMapPin, FiPhone, FiMail, FiArrowRight } from 'react-icons/fi'
import styles from './Footer.module.css'

const offerings = [
  { label: 'Application Development', path: '/services' },
  { label: 'Systems Integration',     path: '/services' },
  { label: 'IT Services',             path: '/services' },
  { label: 'M-SaaS Products',         path: '/products' },
  { label: 'E-Governance Solutions',  path: '/services' },
  { label: 'IT Security',             path: '/services' },
]

const quickLinks = [
  { label: 'Home',       path: '/' },
  { label: 'Services',   path: '/services' },
  { label: 'About Us',   path: '/about' },
  { label: 'Products',   path: '/products' },
  { label: 'Industries', path: '/industries' },
  { label: 'Why Us',     path: '/why-us' },
  { label: 'Careers',    path: '/careers' },
  { label: 'Media',      path: '/media' },
  { label: 'Contact',    path: '/contact' },
]

export default function Footer() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer} ref={ref}>
      <div className={styles.container}>
        {/* Top */}
        <motion.div
          className={styles.top}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Brand */}
          <div className={styles.brand}>
            <Link to="/" className={styles.logo}>
              <img
                src="/espl-logo-wh2.png"
                alt="E-Connect Solutions"
                className={styles.logoImg}
              />
            </Link>
            <p className={styles.brandDesc}>
              Comprehensive end-to-end business and IT solutions enhancing our customers'
              operations since 1991 — in India and around the globe.
            </p>
            <div className={styles.socialLinks}>
              <a href="https://www.facebook.com/espludaipur/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Facebook">
                <FiFacebook size={15} />
              </a>
              <a href="https://twitter.com/esplrajasthan" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="Twitter">
                <FiTwitter size={15} />
              </a>
              <a href="https://at.linkedin.com/company/e-connectsolutions-pvt.-limited" target="_blank" rel="noopener noreferrer" className={styles.socialLink} aria-label="LinkedIn">
                <FiLinkedin size={15} />
              </a>
            </div>
          </div>

          {/* Offerings */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Offerings</h4>
            <ul className={styles.colList}>
              {offerings.map(item => (
                <li key={item.label}>
                  <Link to={item.path} className={styles.colLink}>
                    <FiArrowRight size={11} className={styles.colLinkIcon} />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Quick Links</h4>
            <ul className={styles.colList}>
              {quickLinks.map(link => (
                <li key={link.path}>
                  <Link to={link.path} className={styles.colLink}>
                    <FiArrowRight size={11} className={styles.colLinkIcon} />
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className={styles.col}>
            <h4 className={styles.colTitle}>Contact Info</h4>
            <div className={styles.contactList}>
              <div className={styles.contactItem}>
                <FiMapPin size={14} className={styles.contactIcon} />
                <span>G-18, 19, 20, IT Park, M.I.A. Udaipur-313 001, INDIA</span>
              </div>
              <div className={styles.contactItem}>
                <FiPhone size={14} className={styles.contactIcon} />
                <a href="tel:+912946657300" className={styles.contactLink}>+91-294-6657300</a>
              </div>
              <div className={styles.contactItem}>
                <FiMail size={14} className={styles.contactIcon} />
                <a href="mailto:sales@e-connectsolutions.com" className={styles.contactLink}>
                  sales@e-connectsolutions.com
                </a>
              </div>
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <p className={styles.newsletterLabel}>Stay Updated</p>
              <div className={styles.newsletterForm}>
                <input type="email" placeholder="Your email" className={styles.newsletterInput} aria-label="Email for newsletter" />
                <button className={styles.newsletterBtn} aria-label="Subscribe">
                  <FiArrowRight size={15} />
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Divider */}
        <div className={styles.divider} />

        {/* Bottom */}
        <motion.div
          className={styles.bottom}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <p className={styles.copyright}>© {currentYear} E-Connect Solutions Pvt. Ltd. All Rights Reserved.</p>
          <div className={styles.legalLinks}>
            <a href="#" className={styles.legalLink}>Privacy Policy</a>
            <a href="#" className={styles.legalLink}>Terms of Service</a>
          </div>
          <p className={styles.madeWith}>Enabling IT Since 1991 · CMMI Level 5</p>
        </motion.div>
      </div>
    </footer>
  )
}
