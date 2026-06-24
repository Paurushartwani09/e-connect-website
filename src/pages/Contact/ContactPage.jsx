import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import {
  FiMail, FiPhone, FiMapPin, FiSend, FiCheckCircle,
  FiUser, FiBriefcase, FiMessageSquare, FiSettings,
  FiFacebook, FiTwitter, FiLinkedin, FiClock, FiGlobe
} from 'react-icons/fi'
import PageHero from '../../components/PageHero/PageHero'
import styles from './ContactPage.module.css'

const contactCards = [
  { icon: FiPhone,   color: '#0057FF', label: 'Call Us',       value: '+91-294-6657300', sub: 'Mon–Sat, 9am–6pm IST', href: 'tel:+912946657300' },
  { icon: FiMail,    color: '#00B894', label: 'Email Us',      value: 'sales@e-connectsolutions.com', sub: 'We reply within 24 hours', href: 'mailto:sales@e-connectsolutions.com' },
  { icon: FiMapPin,  color: '#FF6B35', label: 'Visit Us',      value: 'G-18,19,20 IT Park, M.I.A. Udaipur-313001', sub: 'Rajasthan, India', href: null },
  { icon: FiClock,   color: '#7B61FF', label: 'Business Hours',value: 'Mon – Saturday', sub: '9:00 AM – 6:00 PM IST', href: null },
]

const services = [
  'IT Services & Infrastructure',
  'Application Development',
  'M-SaaS Products',
  'E-Governance Solutions',
  'Systems Integration',
  'IT Security',
  'Other / General Inquiry',
]

const faqs = [
  { q: 'How quickly can you start a project?', a: 'Typically within 2–4 weeks of contract signing, depending on scope and resource availability.' },
  { q: 'Do you offer managed services?', a: 'Yes — we offer fully managed IT services with SLA-backed uptime, 24/7 monitoring, and dedicated support teams.' },
  { q: 'What engagement models do you offer?', a: 'Project Based, Effort Based, Managed Services, and Team Augmentation — we tailor the model to your needs.' },
  { q: 'Do you work with government organizations?', a: 'Absolutely. E-Governance is one of our core strengths with 100+ successful government projects delivered.' },
]

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', company: '', service: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [activeFaq, setActiveFaq] = useState(null)
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  const validate = () => {
    const e = {}
    if (!form.name.trim())    e.name    = 'Name is required'
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Message is required'
    return e
  }

  const handleSubmit = (ev) => {
    ev.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setSubmitted(true)
  }

  const handleChange = (ev) => {
    setForm(p => ({ ...p, [ev.target.name]: ev.target.value }))
    if (errors[ev.target.name]) setErrors(p => ({ ...p, [ev.target.name]: '' }))
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={FiMail}
        tag="Get In Touch"
        title="Let's Start Your"
        accent="Digital Journey"
        description="Ready to transform your business? Our team is here to help you find the right solution."
        breadcrumb="Contact"
        gradient="linear-gradient(135deg,#001F6B 0%,#00B894 60%,#00C2FF 100%)"
      />

      {/* ── Contact Cards ── */}
      <section className={styles.cardsSection} ref={ref}>
        <div className={styles.container}>
          <div className={styles.contactCards}>
            {contactCards.map((card, i) => {
              const Icon = card.icon
              return (
                <motion.div
                  key={card.label}
                  className={styles.contactCard}
                  style={{ '--cc': card.color }}
                  initial={{ opacity: 0, y: 30 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -6, transition: { duration: 0.2 } }}
                >
                  <div className={styles.contactCardIcon}><Icon size={22} /></div>
                  <div className={styles.contactCardLabel}>{card.label}</div>
                  {card.href
                    ? <a href={card.href} className={styles.contactCardValue}>{card.value}</a>
                    : <div className={styles.contactCardValue}>{card.value}</div>
                  }
                  <div className={styles.contactCardSub}>{card.sub}</div>
                </motion.div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── Form + Info ── */}
      <section className={styles.formSection}>
        <div className={styles.container}>
          <div className={styles.formGrid}>
            {/* Form */}
            <motion.div
              className={styles.formPanel}
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <div className={styles.formPanelHeader}>
                <FiSend size={20} className={styles.formPanelIcon} />
                <div>
                  <h2 className={styles.formPanelTitle}>Send Us a Message</h2>
                  <p className={styles.formPanelSub}>We'll get back to you within 24 hours</p>
                </div>
              </div>

              {submitted ? (
                <motion.div
                  className={styles.successState}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className={styles.successIcon}><FiCheckCircle size={48} /></div>
                  <h3>Message Sent Successfully!</h3>
                  <p>Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <button
                    className={styles.resetBtn}
                    onClick={() => { setSubmitted(false); setForm({ name:'',email:'',phone:'',company:'',service:'',message:'' }) }}
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form className={styles.form} onSubmit={handleSubmit} noValidate>
                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="name" className={styles.label}>
                        <FiUser size={13} /> Full Name *
                      </label>
                      <input id="name" name="name" type="text" className={`${styles.input} ${errors.name ? styles.inputError : ''}`} placeholder="John Doe" value={form.name} onChange={handleChange} autoComplete="name" />
                      {errors.name && <span className={styles.errorMsg}>{errors.name}</span>}
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="email" className={styles.label}>
                        <FiMail size={13} /> Email Address *
                      </label>
                      <input id="email" name="email" type="email" className={`${styles.input} ${errors.email ? styles.inputError : ''}`} placeholder="john@company.com" value={form.email} onChange={handleChange} autoComplete="email" />
                      {errors.email && <span className={styles.errorMsg}>{errors.email}</span>}
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.formGroup}>
                      <label htmlFor="phone" className={styles.label}>
                        <FiPhone size={13} /> Phone Number
                      </label>
                      <input id="phone" name="phone" type="tel" className={styles.input} placeholder="+91 98765 43210" value={form.phone} onChange={handleChange} autoComplete="tel" />
                    </div>
                    <div className={styles.formGroup}>
                      <label htmlFor="company" className={styles.label}>
                        <FiBriefcase size={13} /> Company / Organization
                      </label>
                      <input id="company" name="company" type="text" className={styles.input} placeholder="Your Company" value={form.company} onChange={handleChange} autoComplete="organization" />
                    </div>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="service" className={styles.label}>
                      <FiSettings size={13} /> Service Interested In
                    </label>
                    <select id="service" name="service" className={styles.input} value={form.service} onChange={handleChange}>
                      <option value="">Select a service…</option>
                      {services.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="message" className={styles.label}>
                      <FiMessageSquare size={13} /> Message *
                    </label>
                    <textarea id="message" name="message" className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`} placeholder="Tell us about your project, requirements, or questions…" rows={5} value={form.message} onChange={handleChange} />
                    {errors.message && <span className={styles.errorMsg}>{errors.message}</span>}
                  </div>

                  <button type="submit" className={styles.submitBtn}>
                    <FiSend size={16} /> Send Message
                  </button>
                </form>
              )}
            </motion.div>

            {/* Info Panel */}
            <motion.div
              className={styles.infoPanel}
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {/* Social */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}><FiGlobe size={16} /> Connect With Us</h3>
                <div className={styles.socialLinks}>
                  <a href="https://www.facebook.com/espludaipur/" target="_blank" rel="noopener noreferrer" className={styles.socialLink} style={{ '--sl': '#1877F2' }}>
                    <FiFacebook size={18} />
                    <span>Facebook</span>
                  </a>
                  <a href="https://twitter.com/esplrajasthan" target="_blank" rel="noopener noreferrer" className={styles.socialLink} style={{ '--sl': '#1DA1F2' }}>
                    <FiTwitter size={18} />
                    <span>Twitter</span>
                  </a>
                  <a href="https://at.linkedin.com/company/e-connectsolutions-pvt.-limited" target="_blank" rel="noopener noreferrer" className={styles.socialLink} style={{ '--sl': '#0A66C2' }}>
                    <FiLinkedin size={18} />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>

              {/* FAQ */}
              <div className={styles.infoCard}>
                <h3 className={styles.infoCardTitle}><FiMessageSquare size={16} /> Frequently Asked</h3>
                <div className={styles.faqList}>
                  {faqs.map((faq, i) => (
                    <div key={i} className={styles.faqItem}>
                      <button
                        className={`${styles.faqQ} ${activeFaq === i ? styles.faqQActive : ''}`}
                        onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                      >
                        {faq.q}
                        <motion.span animate={{ rotate: activeFaq === i ? 45 : 0 }} transition={{ duration: 0.2 }}>+</motion.span>
                      </button>
                      <motion.div
                        className={styles.faqA}
                        initial={false}
                        animate={{ height: activeFaq === i ? 'auto' : 0, opacity: activeFaq === i ? 1 : 0 }}
                        transition={{ duration: 0.3 }}
                        style={{ overflow: 'hidden' }}
                      >
                        <p>{faq.a}</p>
                      </motion.div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  )
}
