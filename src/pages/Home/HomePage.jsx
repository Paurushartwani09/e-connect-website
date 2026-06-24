import React from 'react'
import { motion } from 'framer-motion'
import Hero from '../../components/Hero/Hero'
import Services from '../../components/Services/Services'
import About from '../../components/About/About'
import Stats from '../../components/Stats/Stats'
import Products from '../../components/Products/Products'
import Industries from '../../components/Industries/Industries'
import WhyUs from '../../components/WhyUs/WhyUs'
import Testimonials from '../../components/Testimonials/Testimonials'
import Clients from '../../components/Clients/Clients'
import Contact from '../../components/Contact/Contact'

export default function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Hero />
      <Services />
      <About />
      <Stats />
      <Products />
      <Industries />
      <WhyUs />
      <Testimonials />
      <Clients />
      <Contact />
    </motion.div>
  )
}
