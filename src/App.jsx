import React, { Suspense, lazy } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import ScrollToTop from './components/ScrollToTop/ScrollToTop'
import PageLoader from './components/PageLoader/PageLoader'

// Lazy-loaded pages
const HomePage      = lazy(() => import('./pages/Home/HomePage'))
const ServicesPage  = lazy(() => import('./pages/Services/ServicesPage'))
const AboutPage     = lazy(() => import('./pages/About/AboutPage'))
const ProductsPage  = lazy(() => import('./pages/Products/ProductsPage'))
const IndustriesPage= lazy(() => import('./pages/Industries/IndustriesPage'))
const WhyUsPage     = lazy(() => import('./pages/WhyUs/WhyUsPage'))
const ContactPage   = lazy(() => import('./pages/Contact/ContactPage'))
const MediaPage     = lazy(() => import('./pages/Media/MediaPage'))
const CareersPage   = lazy(() => import('./pages/Careers/CareersPage'))

// Product detail pages
const EPrashashanPage    = lazy(() => import('./pages/Products/EPrashashanPage'))
const CitizenConnctPage  = lazy(() => import('./pages/Products/CitizenConnctPage'))
const SelctPage          = lazy(() => import('./pages/Products/SelctPage'))
const AnytimeAuctionPage = lazy(() => import('./pages/Products/AnytimeAuctionPage'))
const AnytimeRentalsPage = lazy(() => import('./pages/Products/AnytimeRentalsPage'))
const WorkXPage          = lazy(() => import('./pages/Products/WorkXPage'))

function App() {
  const location = useLocation()

  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Suspense fallback={<PageLoader />}>
          <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
              <Route path="/"           element={<HomePage />} />
              <Route path="/services"   element={<ServicesPage />} />
              <Route path="/about"      element={<AboutPage />} />
              <Route path="/products"                    element={<ProductsPage />} />
              <Route path="/products/eprashashan"       element={<EPrashashanPage />} />
              <Route path="/products/citizen-connct"    element={<CitizenConnctPage />} />
              <Route path="/products/selct"             element={<SelctPage />} />
              <Route path="/products/anytime-auction"   element={<AnytimeAuctionPage />} />
              <Route path="/products/anytime-rentals"   element={<AnytimeRentalsPage />} />
              <Route path="/products/workx"             element={<WorkXPage />} />
              <Route path="/industries" element={<IndustriesPage />} />
              <Route path="/why-us"     element={<WhyUsPage />} />
              <Route path="/media"      element={<MediaPage />} />
              <Route path="/careers"    element={<CareersPage />} />
              <Route path="/contact"    element={<ContactPage />} />
            </Routes>
          </AnimatePresence>
        </Suspense>
      </main>
      <Footer />
    </>
  )
}

export default App
