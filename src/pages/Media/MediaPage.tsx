import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { Link } from 'react-router-dom'
import {
  Newspaper, Download, Calendar,
  ChevronRight, ArrowRight,
  Award, Globe, Users, Zap, TrendingUp, Mail,
  FileText, Mic, Video, BookOpen, X, ZoomIn, Image as ImageIcon, Search,
  type LucideIcon
} from 'lucide-react'
import PageHero from '../../components/PageHero/PageHero'
import styles from './MediaPage.module.css'

interface NewsItem {
  id: number
  category: string
  date: string
  icon: LucideIcon
  color: string
  image: string
  title: string
  excerpt: string
  tag: string
}

interface GalleryPhoto {
  id: number
  src: string
  caption: string
  span: 'wide' | 'normal'
}

interface MediaKitItem {
  icon: LucideIcon
  label: string
  desc: string
  size: string
}

interface StatItem {
  icon: LucideIcon
  value: string
  label: string
  color: string
}

interface SectionHeaderProps {
  tag: string
  title: string
  accent: string
}

interface FilterBarProps {
  categories: string[]
  active: string
  onSelect: (cat: string) => void
  search: string
  onSearch: (q: string) => void
}

interface NewsCardProps {
  item: NewsItem
  index: number
  onOpen: () => void
}

interface PhotoGalleryProps {
  onOpenPhoto: (photo: GalleryPhoto) => void
}

interface LightboxProps {
  item: NewsItem
  onClose: () => void
}

interface PhotoLightboxProps {
  photo: GalleryPhoto
  onClose: () => void
}

const categories: string[] = ['All', 'Press Release', 'News', 'Awards', 'Events', 'Blog']

const newsItems: NewsItem[] = [
  { id: 1, category: 'Press Release', date: 'May 2025', icon: FileText, color: '#0057FF', image: 'https://picsum.photos/seed/espl1/600/340', title: 'E-Connect Solutions Achieves CMMI Level 5 Re-Certification', excerpt: 'E-Connect Solutions Pvt. Ltd. has successfully re-certified to CMMI Level 5, reaffirming its commitment to the highest standards of software process maturity and consistent quality delivery.', tag: 'Milestone' },
  { id: 2, category: 'News', date: 'Apr 2025', icon: Globe, color: '#00B894', image: 'https://picsum.photos/seed/espl2/600/340', title: 'E-Connect Launches Next-Gen E-Governance Platform for Rajasthan Urban Bodies', excerpt: 'Our new unified citizen services platform is now live across 15 urban local bodies in Rajasthan, enabling 2M+ citizens to access government services digitally.', tag: 'Product Launch' },
  { id: 3, category: 'Awards', date: 'Mar 2025', icon: Award, color: '#FF6B35', image: 'https://picsum.photos/seed/espl3/600/340', title: 'Recognized as Top IT Solutions Provider — Digital India Summit 2025', excerpt: 'E-Connect Solutions was honored at the Digital India Summit for excellence in delivering transformative e-governance and enterprise IT solutions.', tag: 'Recognition' },
  { id: 4, category: 'Events', date: 'Feb 2025', icon: Mic, color: '#7B61FF', image: 'https://picsum.photos/seed/espl4/600/340', title: 'E-Connect at NASSCOM Technology & Leadership Forum 2025', excerpt: 'Our leadership team participated in key sessions on Digital Transformation, AI in Governance, and the future of Enterprise IT at NASSCOM TLF 2025.', tag: 'Conference' },
  { id: 5, category: 'Blog', date: 'Jan 2025', icon: BookOpen, color: '#E84393', image: 'https://picsum.photos/seed/espl5/600/340', title: 'The Future of E-Governance: How AI is Transforming Citizen Services', excerpt: 'In this blog post, our Chief Business Officer Jaimin Patel explores how AI and intelligent automation are reshaping the way governments interact with citizens.', tag: 'Thought Leadership' },
  { id: 6, category: 'News', date: 'Dec 2024', icon: TrendingUp, color: '#0EA5E9', image: 'https://picsum.photos/seed/espl6/600/340', title: 'E-Connect Crosses 100K Active Users Milestone on Government Platforms', excerpt: 'A landmark achievement as our e-governance applications surpass 100,000 daily active users across various government departments and citizen service portals.', tag: 'Milestone' },
  { id: 7, category: 'Press Release', date: 'Nov 2024', icon: Zap, color: '#0057FF', image: 'https://picsum.photos/seed/espl7/600/340', title: 'New M-SaaS Platform Launched for Enterprise Loan Management', excerpt: 'E-Connect Solutions launches a fully managed SaaS platform for NBFCs and PF Trusts, featuring AI-powered credit assessment and end-to-end loan lifecycle management.', tag: 'Product' },
  { id: 8, category: 'Events', date: 'Oct 2024', icon: Users, color: '#00B894', image: 'https://picsum.photos/seed/espl8/600/340', title: 'E-Connect Hosts Annual IT Leadership Conclave in Udaipur', excerpt: 'Our 3rd Annual IT Leadership Conclave brought together 200+ enterprise technology leaders to discuss Digital Transformation, IT Security, and the Future of Work.', tag: 'Event' },
  { id: 9, category: 'Awards', date: 'Sep 2024', icon: Award, color: '#FF6B35', image: 'https://picsum.photos/seed/espl9/600/340', title: 'Best E-Governance Solution of the Year — SKOCH Award 2024', excerpt: 'E-Connect Solutions wins the prestigious SKOCH Award for Best E-Governance Solution for our work on transforming urban local body service delivery in Rajasthan.', tag: 'Award' },
]

const galleryPhotos: GalleryPhoto[] = [
  { id: 1, src: 'https://picsum.photos/seed/gallery1/600/400', caption: 'E-Connect HQ — Udaipur IT Park', span: 'wide' },
  { id: 2, src: 'https://picsum.photos/seed/gallery2/400/400', caption: 'Leadership Team 2025', span: 'normal' },
  { id: 3, src: 'https://picsum.photos/seed/gallery3/400/400', caption: 'Annual IT Conclave 2024', span: 'normal' },
  { id: 4, src: 'https://picsum.photos/seed/gallery4/400/400', caption: 'CMMI Level 5 Certification Ceremony', span: 'normal' },
  { id: 5, src: 'https://picsum.photos/seed/gallery5/600/400', caption: 'NASSCOM TLF 2025 — Panel Discussion', span: 'wide' },
  { id: 6, src: 'https://picsum.photos/seed/gallery6/400/400', caption: 'SKOCH Award 2024', span: 'normal' },
  { id: 7, src: 'https://picsum.photos/seed/gallery7/400/400', caption: 'Engineering Team Sprint Review', span: 'normal' },
  { id: 8, src: 'https://picsum.photos/seed/gallery8/400/400', caption: 'Client Onboarding Workshop — Jaipur', span: 'normal' },
  { id: 9, src: 'https://picsum.photos/seed/gallery9/600/400', caption: 'Digital India Summit 2025', span: 'wide' },
  { id: 10, src: 'https://picsum.photos/seed/gallery10/400/400', caption: 'Product Demo Day — E-Prashashan', span: 'normal' },
  { id: 11, src: 'https://picsum.photos/seed/gallery11/400/400', caption: 'CSR Initiative — Rural Digital Literacy', span: 'normal' },
  { id: 12, src: 'https://picsum.photos/seed/gallery12/400/400', caption: 'Office Culture & Team Building', span: 'normal' },
]

const mediaKitItems: MediaKitItem[] = [
  { icon: ImageIcon, label: 'Brand Logo Pack',    desc: 'PNG, SVG, and EPS formats — light & dark variants',       size: '2.4 MB' },
  { icon: FileText,  label: 'Company Profile',    desc: '2-page overview of our services, solutions & milestones', size: '1.1 MB' },
  { icon: FileText,  label: 'Press Kit PDF',      desc: 'Key facts, leadership bios, and company overview',        size: '3.2 MB' },
  { icon: ImageIcon, label: 'Photography Assets', desc: 'High-res office and team photos',                         size: '18 MB'  },
]

const mediaStats: StatItem[] = [
  { icon: Newspaper, value: '50+', label: 'Press Mentions',      color: '#0057FF' },
  { icon: Award,     value: '15+', label: 'Awards Won',          color: '#FF6B35' },
  { icon: Video,     value: '30+', label: 'Events Participated', color: '#7B61FF' },
  { icon: Globe,     value: '10+', label: 'Media Partners',      color: '#00B894' },
]

export default function MediaPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const [searchQuery, setSearchQuery] = useState<string>('')
  const [lightboxItem, setLightboxItem] = useState<NewsItem | null>(null)
  const [galleryPhoto, setGalleryPhoto] = useState<GalleryPhoto | null>(null)

  const filtered = newsItems.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory
    const matchesSearch = !searchQuery ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCat && matchesSearch
  })

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.4 }}
    >
      <PageHero
        icon={Newspaper}
        tag="Media Centre"
        title="News, Awards &"
        accent="Press Releases"
        description="Stay up to date with E-Connect Solutions — our latest announcements, industry recognition, events, and thought leadership."
        breadcrumb="Media"
        gradient="linear-gradient(135deg,#001F6B 0%,#0057FF 45%,#00B894 100%)"
      />

      <MediaStats />

      <section className={styles.newsSection}>
        <div className={styles.container}>
          <SectionHeader tag="Latest Updates" title="News & Press" accent="Releases" />
          <FilterBar categories={categories} active={activeCategory} onSelect={setActiveCategory} search={searchQuery} onSearch={setSearchQuery} />
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory + searchQuery}
              className={styles.newsGrid}
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.3 }}
            >
              {filtered.length > 0 ? (
                filtered.map((item, i) => (
                  <NewsCard key={item.id} item={item} index={i} onOpen={() => setLightboxItem(item)} />
                ))
              ) : (
                <div className={styles.emptyState}>
                  <Search size={40} className={styles.emptyIcon} />
                  <p>No results found for "<strong>{searchQuery}</strong>"</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      <PhotoGallery onOpenPhoto={setGalleryPhoto} />
      <MediaKit />
      <PressContact />

      <AnimatePresence>
        {lightboxItem && <Lightbox item={lightboxItem} onClose={() => setLightboxItem(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {galleryPhoto && <PhotoLightbox photo={galleryPhoto} onClose={() => setGalleryPhoto(null)} />}
      </AnimatePresence>
    </motion.div>
  )
}

function MediaStats() {
  const { ref, inView } = useInView({ threshold: 0.15, triggerOnce: true })
  return (
    <section className={styles.statsSection} ref={ref}>
      <div className={styles.container}>
        <div className={styles.statsGrid}>
          {mediaStats.map(({ icon: Icon, value, label, color }, i) => (
            <motion.div key={label} className={styles.statCard} style={{ '--sc': color } as React.CSSProperties}
              initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}>
              <div className={styles.statCardIcon}><Icon size={22} strokeWidth={1.5} /></div>
              <div className={styles.statCardVal}>{value}</div>
              <div className={styles.statCardLabel}>{label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function SectionHeader({ tag, title, accent }: SectionHeaderProps) {
  return (
    <div className={styles.sectionHeader}>
      <span className={styles.tag}>{tag}</span>
      <h2 className={styles.sectionTitle}>{title} <span className={styles.accent}>{accent}</span></h2>
    </div>
  )
}

function FilterBar({ categories, active, onSelect, search, onSearch }: FilterBarProps) {
  return (
    <div className={styles.filterBar}>
      <div className={styles.filterPills}>
        {categories.map(cat => (
          <motion.button key={cat}
            className={`${styles.filterPill} ${active === cat ? styles.filterPillActive : ''}`}
            onClick={() => onSelect(cat)} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            {cat}
          </motion.button>
        ))}
      </div>
      <div className={styles.searchBox}>
        <Search size={15} className={styles.searchIcon} />
        <input type="text" placeholder="Search news, awards…" value={search}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => onSearch(e.target.value)} className={styles.searchInput} />
        {search && (
          <button className={styles.searchClear} onClick={() => onSearch('')} aria-label="Clear">
            <X size={13} />
          </button>
        )}
      </div>
    </div>
  )
}

function NewsCard({ item, index, onOpen }: NewsCardProps) {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  const Icon = item.icon

  return (
    <motion.article ref={ref} className={styles.newsCard} style={{ '--nc': item.color } as React.CSSProperties}
      initial={{ opacity: 0, y: 40 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, transition: { duration: 0.2 } }}
      onClick={onOpen} role="button" tabIndex={0}
      onKeyDown={(e: React.KeyboardEvent) => e.key === 'Enter' && onOpen()} aria-label={`Read: ${item.title}`}>

      <div className={styles.cardImageWrap}>
        <img src={item.image} alt={item.title} className={styles.cardImage} loading="lazy" />
        <div className={styles.cardImageOverlay} />
        <span className={styles.cardTagFloat}>{item.tag}</span>
      </div>

      <div className={styles.cardMeta}>
        <div className={styles.cardIconBox}><Icon size={20} strokeWidth={1.5} /></div>
        <div className={styles.cardMetaRight}>
          <span className={styles.cardCat}>{item.category}</span>
          <span className={styles.cardDate}><Calendar size={11} strokeWidth={2} /> {item.date}</span>
        </div>
      </div>

      <h3 className={styles.cardTitle}>{item.title}</h3>
      <p className={styles.cardExcerpt}>{item.excerpt}</p>

      <div className={styles.cardFooter}>
        <span className={styles.readMore}>Read More <ChevronRight size={13} strokeWidth={2.5} /></span>
      </div>
    </motion.article>
  )
}

function PhotoGallery({ onOpenPhoto }: PhotoGalleryProps) {
  const { ref, inView } = useInView({ threshold: 0.05, triggerOnce: true })

  return (
    <section className={styles.gallerySection} ref={ref}>
      <div className={styles.container}>
        <SectionHeader tag="Photo Gallery" title="Events &" accent="Moments" />
        <div className={styles.galleryGrid}>
          {galleryPhotos.map((photo, i) => (
            <motion.div
              key={photo.id}
              className={`${styles.galleryItem} ${photo.span === 'wide' ? styles.galleryWide : ''}`}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              onClick={() => onOpenPhoto(photo)}
              whileHover="hover"
            >
              <img src={photo.src} alt={photo.caption} className={styles.galleryImg} loading="lazy" />
              <motion.div
                className={styles.galleryOverlay}
                variants={{ hover: { opacity: 1 }, default: { opacity: 0 } }}
                initial="default"
              >
                <ZoomIn size={28} strokeWidth={1.8} className={styles.galleryZoomIcon} />
                <p className={styles.galleryCaption}>{photo.caption}</p>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MediaKit() {
  const { ref, inView } = useInView({ threshold: 0.1, triggerOnce: true })
  return (
    <section className={styles.mediaKitSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.mediaKitInner}
          initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}>
          <div className={styles.mediaKitLeft}>
            <span className={styles.tag}>Media Resources</span>
            <h2 className={styles.mediaKitTitle}>Download Our<span className={styles.accent}> Media Kit</span></h2>
            <p className={styles.mediaKitDesc}>Get official brand assets, company profile, press release templates, and photography for editorial use.</p>
            <a href="mailto:sales@e-connectsolutions.com?subject=Media Kit Request" className={styles.mediaKitCta}>
              <Mail size={15} strokeWidth={2} /> Request Full Media Kit
            </a>
          </div>
          <div className={styles.mediaKitRight}>
            {mediaKitItems.map(({ icon: Icon, label, desc, size }, i) => (
              <motion.div key={label} className={styles.kitItem}
                initial={{ opacity: 0, x: 30 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.1 + i * 0.1, duration: 0.5 }}
                whileHover={{ x: 4, transition: { duration: 0.15 } }}>
                <div className={styles.kitItemIcon}><Icon size={20} strokeWidth={1.5} /></div>
                <div className={styles.kitItemBody}>
                  <div className={styles.kitItemLabel}>{label}</div>
                  <div className={styles.kitItemDesc}>{desc}</div>
                </div>
                <div className={styles.kitItemSize}>{size}</div>
                <Download size={15} className={styles.kitItemDownload} strokeWidth={2} />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function PressContact() {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })
  return (
    <section className={styles.pressSection} ref={ref}>
      <div className={styles.container}>
        <motion.div className={styles.pressBanner}
          initial={{ opacity: 0, scale: 0.97 }} animate={inView ? { opacity: 1, scale: 1 } : {}} transition={{ duration: 0.6 }}>
          <div className={styles.pressOrb} />
          <div className={styles.pressContent}>
            <div className={styles.pressIconWrap}><Mic size={32} strokeWidth={1.5} /></div>
            <div>
              <h2 className={styles.pressTitle}>Press &amp; Media Enquiries</h2>
              <p className={styles.pressDesc}>For press releases, interview requests, editorial coverage, or speaking opportunities — our communications team is ready to help.</p>
            </div>
          </div>
          <div className={styles.pressBtns}>
            <a href="mailto:sales@e-connectsolutions.com?subject=Press Enquiry" className={styles.pressPrimary}>
              <Mail size={15} strokeWidth={2} /> Contact Press Team
            </a>
            <Link to="/contact" className={styles.pressSecondary}>
              General Enquiry <ArrowRight size={14} strokeWidth={2} />
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Lightbox({ item, onClose }: LightboxProps) {
  const Icon = item.icon
  return (
    <motion.div className={styles.lightboxOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }} onClick={onClose} role="dialog" aria-modal="true">
      <motion.div className={styles.lightboxCard} style={{ '--nc': item.color } as React.CSSProperties}
        initial={{ opacity: 0, scale: 0.88, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.88, y: 40 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close"><X size={18} strokeWidth={2} /></button>
        <div className={styles.lightboxImageWrap}>
          <img src={item.image} alt={item.title} className={styles.lightboxImage} />
        </div>
        <div className={styles.lightboxHeader}>
          <div className={styles.lightboxIconBox}><Icon size={28} strokeWidth={1.5} /></div>
          <div>
            <span className={styles.lightboxCat}>{item.category}</span>
            <div className={styles.lightboxDate}><Calendar size={12} strokeWidth={2} /> {item.date}</div>
          </div>
          <span className={styles.lightboxTag}>{item.tag}</span>
        </div>
        <h2 className={styles.lightboxTitle}>{item.title}</h2>
        <p className={styles.lightboxExcerpt}>{item.excerpt}</p>
        <div className={styles.lightboxFooter}>
          <a href="mailto:sales@e-connectsolutions.com?subject=Media Enquiry" className={styles.lightboxCta}>
            <Mail size={14} strokeWidth={2} /> Contact for Full Story
          </a>
          <button className={styles.lightboxSecondary} onClick={onClose}>Close</button>
        </div>
      </motion.div>
    </motion.div>
  )
}

function PhotoLightbox({ photo, onClose }: PhotoLightboxProps) {
  return (
    <motion.div className={styles.lightboxOverlay}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      transition={{ duration: 0.22 }} onClick={onClose} role="dialog" aria-modal="true">
      <motion.div className={styles.photoLightboxCard}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
        onClick={(e: React.MouseEvent) => e.stopPropagation()}>
        <button className={styles.lightboxClose} onClick={onClose} aria-label="Close"><X size={18} strokeWidth={2} /></button>
        <img src={photo.src.replace('/600/400', '/1200/800')} alt={photo.caption} className={styles.photoLightboxImg} />
        <p className={styles.photoLightboxCaption}>{photo.caption}</p>
      </motion.div>
    </motion.div>
  )
}
