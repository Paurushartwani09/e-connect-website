import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { staggerContainer, fadeUp } from '../../utils/animations'
import styles from './Testimonials.module.css'

const testimonials = [
  {
    id: 1,
    quote: "Working on hundreds of projects with a wide range of objectives, sizes, and technologies has taught us how to quickly master new skill sets.",
    name: "Mukesh Vyas",
    role: "Head of Human Resource",
    company: "E-Connect Solutions",
    avatar: "MV",
    color: "#0057FF",
  },
  {
    id: 2,
    quote: "Resources, budgets, timelines, and people are different in each organization, and so is the solution to its business challenges. Keeping this in mind, we have various offering models to cater to your business's needs.",
    name: "Rajendra Chouhan",
    role: "Head of Software Delivery",
    company: "E-Connect Solutions",
    avatar: "RC",
    color: "#7B61FF",
  },
  {
    id: 3,
    quote: "We are consistently delivering business value to our customers, and enabling them to excel and win in the emerging e-Economy.",
    name: "Jaimin Patel",
    role: "Chief Business Officer & Founder",
    company: "E-Connect Solutions",
    avatar: "JP",
    color: "#00B894",
  },
]

export default function Testimonials() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive(prev => (prev + 1) % testimonials.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  return (
    <section className={styles.testimonials} ref={ref}>
      <div className={styles.container}>
        <motion.div
          className={styles.header}
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? 'visible' : 'hidden'}
        >
          <motion.span className={styles.sectionTag} variants={fadeUp}>
            Our Team Says
          </motion.span>
          <motion.h2 className={styles.title} variants={fadeUp}>
            Voices from
            <span className={styles.titleAccent}> E-Connect</span>
          </motion.h2>
        </motion.div>

        <motion.div
          className={styles.testimonialWrap}
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className={styles.quoteIcon}>"</div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className={styles.testimonialContent}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
            >
              <p className={styles.quoteText}>{testimonials[active].quote}</p>
              <div className={styles.author}>
                <div
                  className={styles.authorAvatar}
                  style={{ background: `linear-gradient(135deg, ${testimonials[active].color}, #00C2FF)` }}
                >
                  {testimonials[active].avatar}
                </div>
                <div>
                  <div className={styles.authorName}>{testimonials[active].name}</div>
                  <div className={styles.authorRole}>{testimonials[active].role}</div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Dots */}
          <div className={styles.dots}>
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`${styles.dot} ${i === active ? styles.dotActive : ''}`}
                onClick={() => setActive(i)}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </motion.div>

        {/* Side cards */}
        <div className={styles.sideCards}>
          {testimonials.map((t, i) => (
            <motion.div
              key={t.id}
              className={`${styles.sideCard} ${i === active ? styles.sideCardActive : ''}`}
              initial={{ opacity: 0, x: 30 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.1, duration: 0.5 }}
              onClick={() => setActive(i)}
            >
              <div
                className={styles.sideAvatar}
                style={{ background: `linear-gradient(135deg, ${t.color}, #00C2FF)` }}
              >
                {t.avatar}
              </div>
              <div>
                <div className={styles.sideName}>{t.name}</div>
                <div className={styles.sideRole}>{t.role}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
