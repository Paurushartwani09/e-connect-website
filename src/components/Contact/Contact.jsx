import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp, fadeLeft, fadeRight } from '../../utils/animations'
import styles from './Contact.module.css'

const contactInfo = [
  {
    icon: '📍',
    label: 'Address',
    value: 'G-18, 19, 20, IT Park, M.I.A. Udaipur-313 001, Rajasthan, India',
  },
  {
    icon: '📞',
    label: 'Phone',
    value: '+91-294-6657300',
    href: 'tel:+912946657300',
  },
  {
    icon: '📠',
    label: 'Fax',
    value: '+91-294-6657312',
  },
  {
    icon: '✉️',
    label: 'Email',
    value: 'sales@e-connectsolutions.com',
    href: 'mailto:sales@e-connectsolutions.com',
  },
]

export default function Contact() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [form, setForm] = useState({ name: '', email: '', company: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setSubmitted(true)
  }

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
    if (errors[e.target.name]) setErrors(prev => ({ ...prev, [e.target.name]: '' }))
  }

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className={styles.container}>
        {/* Header */}
        <motion.div
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.sectionTag} variants={fadeUp}>
            Get In Touch
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Let's Start Your
            <span className={styles.titleAccent}> Digital Journey</span>
          </motion.h2>
          <motion.p className={styles.desc} variants={fadeUp}>
            Ready to transform your business? Reach out to our team and let's discuss
            how E-Connect Solutions can help you achieve your goals.
          </motion.p>
        </motion.div>

        <div className={styles.content}>
          {/* Contact Info */}
          <motion.div
            className={styles.infoPanel}
            variants={fadeLeft}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            <div className={styles.infoPanelInner}>
              <h3 className={styles.infoPanelTitle}>Contact Information</h3>
              <p className={styles.infoPanelSub}>
                Reach us through any of these channels and we'll get back to you promptly.
              </p>

              <div className={styles.infoList}>
                {contactInfo.map((info) => (
                  <div key={info.label} className={styles.infoItem}>
                    <div className={styles.infoIcon}>{info.icon}</div>
                    <div>
                      <div className={styles.infoLabel}>{info.label}</div>
                      {info.href ? (
                        <a href={info.href} className={styles.infoValue}>{info.value}</a>
                      ) : (
                        <div className={styles.infoValue}>{info.value}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Social Links */}
              <div className={styles.socialLinks}>
                <a
                  href="https://www.facebook.com/espludaipur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Facebook"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                  </svg>
                </a>
                <a
                  href="https://twitter.com/esplrajasthan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="Twitter"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"/>
                  </svg>
                </a>
                <a
                  href="https://at.linkedin.com/company/e-connectsolutions-pvt.-limited"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  aria-label="LinkedIn"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/>
                    <circle cx="4" cy="4" r="2"/>
                  </svg>
                </a>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            className={styles.formPanel}
            variants={fadeRight}
            initial="hidden"
            animate={inView ? 'visible' : 'hidden'}
          >
            {submitted ? (
              <motion.div
                className={styles.successMsg}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className={styles.successIcon}>✅</div>
                <h3>Message Sent!</h3>
                <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
                <button className={styles.resetBtn} onClick={() => { setSubmitted(false); setForm({ name: '', email: '', company: '', service: '', message: '' }) }}>
                  Send Another Message
                </button>
              </motion.div>
            ) : (
              <form className={styles.form} onSubmit={handleSubmit} noValidate>
                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="name" className={styles.label}>Full Name *</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      autoComplete="name"
                    />
                    {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="email" className={styles.label}>Email Address *</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                      placeholder="john@company.com"
                      value={form.email}
                      onChange={handleChange}
                      autoComplete="email"
                    />
                    {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                  </div>
                </div>

                <div className={styles.formRow}>
                  <div className={styles.formGroup}>
                    <label htmlFor="company" className={styles.label}>Company / Organization</label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      className={styles.input}
                      placeholder="Your Company"
                      value={form.company}
                      onChange={handleChange}
                      autoComplete="organization"
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.label}>Service Interested In</label>
                    <select
                      id="service"
                      name="service"
                      className={styles.input}
                      value={form.service}
                      onChange={handleChange}
                    >
                      <option value="">Select a service</option>
                      <option value="it-services">IT Services</option>
                      <option value="app-dev">Application Development</option>
                      <option value="msaas">M-SaaS Products</option>
                      <option value="egovernance">E-Governance Solutions</option>
                      <option value="integration">Systems Integration</option>
                      <option value="security">IT Security</option>
                    </select>
                  </div>
                </div>

                <div className={styles.formGroup}>
                  <label htmlFor="message" className={styles.label}>Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                    placeholder="Tell us about your project or requirements..."
                    rows={5}
                    value={form.message}
                    onChange={handleChange}
                  />
                  {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                </div>

                <button type="submit" className={styles.submitBtn}>
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                    <path d="M2 8h12M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
