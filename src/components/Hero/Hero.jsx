import React, { useEffect, useRef, useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  ArrowRight, ChevronLeft, ChevronRight,
  Server, Cloud, Code2, Globe, ShieldCheck, Link2,
  Users, Calendar, Layers, TrendingUp, CheckCircle2,
} from 'lucide-react'
import styles from './Hero.module.css'

/* ── Slides data ───────────────────────────────────────── */
const slides = [
  {
    id: 0,
    badge: 'CMMI Level 5 · Enabling IT Since 1991',
    headline: ['Enterprise Solutions', 'for Govt, Business', 'and Industries'],
    gradLine: 1,           // index of headline line to colour
    sub: 'We innovate and implement Digital Transformation to see your success — from Enterprise Application Development to full IT Infrastructure Management.',
    cta1: { label: 'Start Your Project', to: '/contact' },
    cta2: { label: 'Explore Services',   to: '/services' },
    accent: '#00C2FF',
    bg: 'linear-gradient(135deg,#001F6B 0%,#0057FF 52%,#00C2FF 100%)',
  },
  {
    id: 1,
    badge: 'Trusted by 100K+ Users Across India',
    headline: ['Powering Digital', 'Transformation for', 'Smart Governance'],
    gradLine: 0,
    sub: 'From e-Governance platforms to M-SaaS products, we deliver cutting-edge solutions that modernise public services and enhance citizen experiences.',
    cta1: { label: 'View Products',    to: '/products' },
    cta2: { label: 'Our Industries',   to: '/industries' },
    accent: '#7B61FF',
    bg: 'linear-gradient(135deg,#0D0028 0%,#2A1570 50%,#7B61FF 100%)',
  },
  {
    id: 2,
    badge: '35+ Years of Technology Excellence',
    headline: ['End-to-End IT', 'Infrastructure &', 'Security Solutions'],
    gradLine: 2,
    sub: 'Comprehensive IT infrastructure management, cybersecurity, cloud services, and 24/7 support — keeping your business resilient and future-ready.',
    cta1: { label: 'Our Services',  to: '/services' },
    cta2: { label: 'Why Choose Us', to: '/why-us' },
    accent: '#00B894',
    bg: 'linear-gradient(135deg,#001A12 0%,#005C3F 50%,#00B894 100%)',
  },
]

/* ── Stat cards ────────────────────────────────────────── */
const statCards = [
  { Icon: Calendar,   value: '35+',   label: 'Years',     color: '#0057FF' },
  { Icon: Users,      value: '500+',  label: 'Experts',   color: '#00B894' },
  { Icon: Layers,     value: '25+',   label: 'Verticals', color: '#7B61FF' },
  { Icon: TrendingUp, value: '100K+', label: 'Users',     color: '#FF6B35' },
]

/* ── Tech orbs (right visual) ──────────────────────────── */
const techOrbs = [
  { Icon: Server,      label: 'IT Services',  x: 60,  y: 30  },
  { Icon: Cloud,       label: 'M-SaaS',       x: 220, y: 80  },
  { Icon: Code2,       label: 'App Dev',       x: 30,  y: 200 },
  { Icon: Globe,       label: 'E-Governance',  x: 250, y: 220 },
  { Icon: ShieldCheck, label: 'Security',      x: 130, y: 310 },
  { Icon: Link2,       label: 'Integration',   x: 310, y: 150 },
]

/* ── Slide content animation variants ─────────────────── */
// custom = dir: 1 (next/right arrow) → slides right-to-left
//               -1 (prev/left arrow) → slides left-to-right
const textVariants = {
  enter:  (dir) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
  exit: (dir) => ({
    x: dir > 0 ? '-100%' : '100%',
    opacity: 0,
    transition: { duration: 0.45, ease: [0.55, 0, 0.78, 0] },
  }),
}

const INTERVAL = 5500

export default function Hero() {
  const canvasRef  = useRef(null)
  const timerRef   = useRef(null)
  const [current, setCurrent] = useState(0)
  const [dir, setDir]         = useState(1)   // 1 = forward (right arrow), -1 = back (left arrow)
  const currentRef = useRef(0)   // always in sync, no stale closure

  const goTo = useCallback((idx) => {
    const d = idx > currentRef.current ? 1 : -1
    setDir(d)
    setCurrent(idx)
    currentRef.current = idx
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % slides.length
      setDir(1)
      setCurrent(next)
      currentRef.current = next
    }, INTERVAL)
  }, [])

  const prev = () => goTo((currentRef.current - 1 + slides.length) % slides.length)
  const next = () => goTo((currentRef.current + 1) % slides.length)

  /* ── Particle canvas ───────────────────────────────── */
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 70 }, () => ({
      x: Math.random() * canvas.width, y: Math.random() * canvas.height,
      r: Math.random() * 1.8 + 0.3,
      vx: (Math.random() - 0.5) * 0.35, vy: (Math.random() - 0.5) * 0.35,
      o: Math.random() * 0.45 + 0.08,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > canvas.width)  p.vx *= -1
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.o})`
        ctx.fill()
      })
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const d  = Math.sqrt(dx * dx + dy * dy)
          if (d < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.06 * (1 - d / 90)})`
            ctx.lineWidth = 0.6; ctx.stroke()
          }
        }
      }
      raf = requestAnimationFrame(draw)
    }
    draw()
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  }, [])

  /* ── Auto-advance (initial start) ─────────────────── */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      const next = (currentRef.current + 1) % slides.length
      setDir(1)
      setCurrent(next)
      currentRef.current = next
    }, INTERVAL)
    return () => clearInterval(timerRef.current)
  }, [])

  const slide = slides[current]

  return (
    <section id="home" className={styles.hero}>
      {/* Animated background */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${slide.id}`}
          className={styles.slideBg}
          style={{ background: slide.bg }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          aria-hidden="true"
        />
      </AnimatePresence>

      <canvas ref={canvasRef} className={styles.particles} aria-hidden="true" />
      <div className={styles.grid}    aria-hidden="true" />
      <div className={styles.orb1}    aria-hidden="true" />
      <div className={styles.orb2}    aria-hidden="true" />

      {/* ── Main content ─────────────────────────────── */}
      <div className={styles.inner}>

        {/* LEFT: animated slide text */}
        <div className={styles.left}>
          <div className={styles.slideWrapper}>
            <AnimatePresence mode="wait" custom={dir}>
              <motion.div
                key={slide.id}
                className={styles.slideContent}
                variants={textVariants}
                initial="enter"
                animate="center"
                exit="exit"
                custom={dir}
              >
              {/* Badge */}
              <div className={styles.badge} style={{ '--ac': slide.accent }}>
                <span className={styles.badgePulse} style={{ background: slide.accent }} />
                <CheckCircle2 size={13} strokeWidth={2.5} style={{ color: slide.accent, flexShrink: 0 }} />
                {slide.badge}
              </div>

              {/* Headline */}
              <h1 className={styles.headline}>
                {slide.headline.map((line, i) =>
                  i === slide.gradLine
                    ? <span key={i} className={styles.headlineGrad} style={{ '--ac': slide.accent }}>{line}<br /></span>
                    : <React.Fragment key={i}>{line}<br /></React.Fragment>
                )}
              </h1>

              <p className={styles.sub}>{slide.sub}</p>

              {/* CTAs */}
              <div className={styles.ctas}>
                <Link to={slide.cta1.to} className={styles.ctaPrimary}>
                  <span>{slide.cta1.label}</span>
                  <ArrowRight size={16} strokeWidth={2.5} />
                </Link>
                <Link to={slide.cta2.to} className={styles.ctaSecondary}>
                  <span>{slide.cta2.label}</span>
                </Link>
              </div>
            </motion.div>
            </AnimatePresence>
          </div>

          {/* Stat cards — always visible */}
          <div className={styles.statRow}>
            {statCards.map(({ Icon, value, label, color }, i) => (
              <motion.div key={label} className={styles.statCard}
                initial={{ opacity: 0, y: 20, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.09, duration: 0.5 }}
                style={{ '--sc': color }}>
                <div className={styles.statCardIcon}><Icon size={17} strokeWidth={2} /></div>
                <div className={styles.statCardVal}>{value}</div>
                <div className={styles.statCardLabel}>{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* RIGHT: Tech-icon orbital visual */}
        <div className={styles.right}>
          <motion.div className={styles.orbCanvas}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}>

            <div className={styles.centerSphere}>
              <motion.div className={styles.sphereRing1}
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: 'linear' }} />
              <motion.div className={styles.sphereRing2}
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: 'linear' }} />
              <div className={styles.sphereCore}>
                <img src="/espl-logo-wh2.png" alt="E-Connect" className={styles.sphereLogo} />
              </div>
            </div>

            {techOrbs.map(({ Icon, label, x, y }, i) => (
              <motion.div key={label} className={styles.techOrb}
                style={{ left: x, top: y }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + i * 0.12, duration: 0.4, type: 'spring', stiffness: 200 }}>
                <motion.div className={styles.techOrbInner}
                  animate={{ y: [0, -8, 0] }}
                  transition={{ duration: 2.5 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.3 }}>
                  <div className={styles.techOrbIcon}><Icon size={20} strokeWidth={1.5} /></div>
                  <span className={styles.techOrbLabel}>{label}</span>
                </motion.div>
              </motion.div>
            ))}

            <div className={styles.orbit1} aria-hidden="true" />
            <div className={styles.orbit2} aria-hidden="true" />
          </motion.div>
        </div>
      </div>

      {/* ── Slider controls ──────────────────────────── */}
      {/* Prev / Next arrows */}
      <button className={`${styles.arrow} ${styles.arrowLeft}`}  onClick={prev} aria-label="Previous slide">
        <ChevronLeft size={22} strokeWidth={2.5} />
      </button>
      <button className={`${styles.arrow} ${styles.arrowRight}`} onClick={next} aria-label="Next slide">
        <ChevronRight size={22} strokeWidth={2.5} />
      </button>

      {/* Dot indicators */}
      <div className={styles.dots} role="tablist" aria-label="Slide indicators">
        {slides.map((s, i) => (
          <button
            key={s.id}
            role="tab"
            aria-selected={i === current}
            aria-label={`Go to slide ${i + 1}`}
            className={`${styles.dot} ${i === current ? styles.dotActive : ''}`}
            style={i === current ? { '--ac': slide.accent } : {}}
            onClick={() => goTo(i)}
          />
        ))}
      </div>

      {/* Progress bar */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`prog-${current}`}
          className={styles.progressBar}
          style={{ '--ac': slide.accent }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
        />
      </AnimatePresence>

      {/* Scroll hint */}
      <motion.div className={styles.scroll}
        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}>
        <div className={styles.scrollMouse}>
          <motion.div className={styles.scrollDot}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }} />
        </div>
        <span>Scroll</span>
      </motion.div>
    </section>
  )
}
