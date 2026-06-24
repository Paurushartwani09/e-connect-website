import {
  FiBarChart2, FiUsers, FiGlobe, FiTrendingUp,
  FiHome, FiBriefcase, FiCloud, FiServer, FiLayers,
  FiMonitor, FiCpu, FiDatabase
} from 'react-icons/fi'

export const products = [

  /* ─── 1. E-Prashashan ─────────────────────────────────── */
  {
    id: 'eprashashan',
    slug: '/products/eprashashan',
    icon: FiBarChart2,
    color: '#0057FF',
    gradient: 'linear-gradient(135deg,#0057FF,#00C2FF)',
    title: 'E-Prashashan',
    category: 'Enterprise Resource Planning',
    tagline: 'The ERP Suite for State Owned Enterprises & PSUs',
    badge: 'Flagship ERP',
    clients: '80+',
    industries: '15+',
    deployments: ['Cloud', 'On-Premise', 'SaaS'],
    shortDesc: 'The ERP Suite for State Owned Enterprise & PSU',
    desc: 'E-Prashashan is a comprehensive, fully integrated ERP platform purpose-built for State Owned Enterprises, PSUs, and large government-linked organisations. It brings Finance, Human Resources, Procurement, Inventory, and Project Management into a single unified system eliminating data silos and delivering real-time operational visibility.',
    fullDesc: 'E-Prashashan is a battle-tested, fully integrated ERP platform purpose-built for State Owned Enterprises, Public Sector Undertakings, and large government-linked organisations across India. It brings Finance, Human Resources, Procurement, Inventory, and Project Management into a single unified system — eliminating data silos and delivering real-time visibility across every business function. Built on a scalable, enterprise-grade architecture, E-Prashashan supports both on-premise deployments for organisations with strict data sovereignty requirements and cloud deployments for those seeking operational agility. With 80+ clients across 15+ industry verticals, it is one of the most widely deployed ERP systems serving the Indian public sector. The system is designed to handle the unique compliance, reporting, and audit requirements of government-owned enterprises — including multi-level approval workflows, treasury integration, and e-procurement readiness.',
    modules: [
      'Finance & Accounts Management',
      'HR, Payroll & Leave Management',
      'Inventory & Stores Management',
      'Procurement & Purchase Orders',
      'Project & Works Management',
      'Business Intelligence & MIS Reports',
    ],
    features: [
      {
        title: 'Unified Data Architecture',
        desc: 'Single source of truth across all departments — Finance, HR, Inventory, and Projects — eliminating reconciliation overhead.',
      },
      {
        title: 'Government-grade Compliance',
        desc: 'Built-in compliance with GFR, CAG audit requirements, GST, TDS, and Indian accounting standards.',
      },
      {
        title: 'Multi-level Approval Workflows',
        desc: 'Configurable hierarchical approval chains for procurement, payments, and HR decisions matching your organisational structure.',
      },
      {
        title: 'Real-time Executive Dashboards',
        desc: 'Drill-down dashboards for Directors, CFOs, and Department Heads with live operational and financial metrics.',
      },
      {
        title: 'Multi-entity & Multi-location',
        desc: 'Manage multiple subsidiaries, departments, or regional offices within a single installation with consolidated reporting.',
      },
      {
        title: 'Role-based Access Control',
        desc: 'Granular, department-level permissions ensuring data security and auditability at every level of the organisation.',
      },
    ],
    useCases: [
      {
        title: 'State-Owned Enterprises',
        desc: 'SOEs use E-Prashashan to unify Finance, HR, and Procurement across multiple divisions with full government audit compliance.',
      },
      {
        title: 'Public Sector Undertakings',
        desc: 'PSUs leverage it to manage procurement workflows, inventory across warehouses, and project progress tracking in real time.',
      },
      {
        title: 'Government Development Authorities',
        desc: 'Urban and industrial development authorities use it for managing works contracts, land records, and administrative payroll.',
      },
    ],
    techStack: ['Java EE', 'Oracle DB', 'MS SQL Server', 'Angular', 'REST APIs', 'Docker'],
  },

  /* ─── 2. Citizen CONNCT ───────────────────────────────── */
  {
    id: 'citizen-connct',
    slug: '/products/citizen-connct',
    icon: FiGlobe,
    color: '#FF6B35',
    gradient: 'linear-gradient(135deg,#FF6B35,#FDCB6E)',
    title: 'Citizen CONNCT',
    category: 'E-Governance & Citizen Services',
    tagline: 'Citizen Service Support System for State, District and Department Administration',
    badge: 'NIC Compliant',
    clients: '60+',
    industries: 'Govt.',
    deployments: ['Cloud', 'On-Premise', 'Edge'],
    shortDesc: 'Citizen Service Support System for State, District and Department Administration',
    desc: 'Citizen CONNCT is a unified digital platform enabling State, District, and Department administrations to deliver seamless, transparent, and efficient citizen services. From grievance redressal to certificate issuance and online payments — all through a single integrated system.',
    fullDesc: 'Citizen CONNCT is a comprehensive citizen service delivery and administration platform purpose-built for Indian State Governments, District Collectors, and Department Administrations. It enables government bodies to deliver citizen-centric digital services across departments — from birth and death certificates to land records, grievance redressal, scheme applications, and online fee payments — all through a single integrated window. The platform is fully compliant with NIC, MeitY, and CERT-In guidelines and has been successfully deployed across 60+ government departments and district administrations. It features an AI-powered grievance management engine, real-time service status tracking for citizens, a unified department officer dashboard, and deep integration with Aadhaar, DigiLocker, and state payment gateways. Citizen CONNCT transforms fragmented department portals into a coherent, measurable, and accountable digital government.',
    modules: [
      'Citizen Services Delivery Portal',
      'Online Payments & Fee Collection',
      'Document & Certificate Management',
      'Grievance Redressal & Tracking',
      'Scheme & Benefit Management',
      'Audit Trail & Compliance Engine',
    ],
    features: [
      {
        title: 'Unified Service Window',
        desc: 'Single platform connecting multiple departments — citizens apply, track, and receive services without visiting offices.',
      },
      {
        title: 'Aadhaar & DigiLocker Integration',
        desc: 'Seamless KYC, identity verification, and document fetching via Aadhaar and DigiLocker APIs.',
      },
      {
        title: 'Multilingual Interface',
        desc: 'Available in Hindi, English, and major regional languages for maximum citizen accessibility across India.',
      },
      {
        title: 'Real-time SLA Monitoring',
        desc: 'Automatic SLA tracking per service with escalation alerts ensuring officers meet delivery commitments.',
      },
      {
        title: 'e-Sign & Digital Certificates',
        desc: 'Legally valid digitally signed certificates compliant with the IT Act and MeitY guidelines.',
      },
      {
        title: 'Analytics for Administrators',
        desc: 'District-level and department-level dashboards showing pending cases, SLA breaches, and service delivery trends.',
      },
    ],
    useCases: [
      {
        title: 'State Government Portals',
        desc: 'State governments deploy Citizen CONNCT as a unified service delivery portal replacing dozens of fragmented department websites.',
      },
      {
        title: 'District Collector Offices',
        desc: 'District administrations manage all citizen applications, certificates, and grievances through one integrated dashboard.',
      },
      {
        title: 'Municipal Corporations',
        desc: 'Urban local bodies use it for property tax, building plan approvals, water connections, and trade licence management.',
      },
    ],
    techStack: ['Java Spring Boot', 'Oracle DB', 'React.js', 'Aadhaar API', 'DigiLocker API', 'Payment Gateway'],
  },

  /* ─── 3. SELCT ────────────────────────────────────────── */
  {
    id: 'selct',
    slug: '/products/selct',
    icon: FiUsers,
    color: '#7B61FF',
    gradient: 'linear-gradient(135deg,#7B61FF,#A78BFA)',
    title: 'SELCT',
    category: 'HR Technology & Talent Acquisition',
    tagline: 'Applicant Tracking System as managed service for End to End Employee Selection Cycle',
    badge: 'Managed ATS',
    clients: '45+',
    industries: '12+',
    deployments: ['SaaS', 'Multi-Tenant', 'Cloud'],
    shortDesc: 'Applicant Tracking System as managed service for End to End Employee Selection Cycle',
    desc: 'SELCT is a fully managed Applicant Tracking System covering the complete employee selection lifecycle — from requisition and advertisement to shortlisting, examination, interview, selection, and offer management. Purpose-built for government recruitments and large enterprise hiring programmes.',
    fullDesc: "SELCT is a fully managed Applicant Tracking System (ATS) designed specifically for the complex, high-volume recruitment processes of government departments, public sector enterprises, and large institutions. It covers the complete employee selection lifecycle — from vacancy requisition and advertisement publication to online applications, eligibility screening, written examination management, merit list generation, interview scheduling, document verification, and final offer management. Unlike generic ATS platforms, SELCT is built for the rules-based, transparent, and auditable nature of government recruitment — with configurable reservation policies, category-wise merit lists, OMR/CBT exam integration, and complete RTI-ready audit trails. Deployed as a managed SaaS service, it eliminates infrastructure overhead and allows HR teams to focus on the selection process rather than technology management.",
    modules: [
      'Vacancy Requisition & Advertisement',
      'Online Application & Registration',
      'Eligibility Screening & Shortlisting',
      'Exam Management (OMR/CBT)',
      'Merit List & Result Generation',
      'Interview Scheduling & Offer Management',
    ],
    features: [
      {
        title: 'Government Recruitment Compliance',
        desc: 'Built-in support for reservation policies, category-wise cutoffs, horizontal and vertical reservations.',
      },
      {
        title: 'CBT & OMR Exam Integration',
        desc: 'Seamless integration with Computer-Based Testing platforms and OMR sheet processing for written examinations.',
      },
      {
        title: 'High-volume Application Handling',
        desc: 'Engineered to handle lakhs of simultaneous applications with zero downtime during application windows.',
      },
      {
        title: 'Automated Merit Generation',
        desc: 'Configurable merit calculation with category-wise lists, tie-breaking rules, and one-click result publication.',
      },
      {
        title: 'RTI-ready Audit Trails',
        desc: 'Every shortlisting, scoring, and selection decision is logged with full transparency for RTI compliance.',
      },
      {
        title: 'Managed Service Delivery',
        desc: 'E-Connect manages the platform end-to-end — infrastructure, upgrades, support — so you focus on hiring.',
      },
    ],
    useCases: [
      {
        title: 'Government Recruitment Boards',
        desc: 'State public service commissions and recruitment boards use SELCT to run transparent, large-scale recruitment drives.',
      },
      {
        title: 'Public Sector Undertakings',
        desc: 'PSUs use it to manage multi-cadre recruitments with department-specific eligibility criteria and reservation compliance.',
      },
      {
        title: 'Large Enterprises',
        desc: 'Private sector organisations with high-volume campus or lateral hiring use SELCT to streamline their selection process.',
      },
    ],
    techStack: ['Java Spring Boot', 'PostgreSQL', 'React.js', 'AWS', 'CBT Integration API', 'REST APIs'],
  },

  /* ─── 4. Anytime Auction ──────────────────────────────── */
  {
    id: 'anytime-auction',
    slug: '/products/anytime-auction',
    icon: FiTrendingUp,
    color: '#E84393',
    gradient: 'linear-gradient(135deg,#E84393,#A855F7)',
    title: 'Anytime Auction',
    category: 'Online Auction & Asset Management',
    tagline: 'Online Auction Platform for auctioning of Properties and other assets',
    badge: 'CPPP Integrated',
    clients: '30+',
    industries: 'Govt. & Enterprise',
    deployments: ['Cloud', 'SaaS', 'On-Premise'],
    shortDesc: 'Online Auction Platform, for auctioning of Properties and other assets',
    desc: 'Anytime Auction is a secure, real-time online auction platform purpose-built for government and enterprise auctioning of properties, vehicles, machinery, and other assets. It supports forward auctions, reverse auctions, and e-tenders with complete digital signature integration and audit compliance.',
    fullDesc: 'Anytime Auction is a secure, high-throughput online auction platform purpose-built for government departments, public sector undertakings, banks, and large enterprises to auction properties, vehicles, equipment, seized assets, and bulk commodities. The platform supports multiple auction formats — forward auctions, reverse auctions, sealed bid tenders, and Dutch auctions — making it versatile for any procurement or asset disposal requirement. It is fully integrated with CPPP (Central Public Procurement Portal) for government procurement compliance and supports PKI-based digital signatures for legally valid bid submission. The real-time bidding engine handles thousands of simultaneous bidders with millisecond latency, ensuring a fair, transparent, and competitive auction process. Every action — from registration to bid placement to award — is logged in an immutable audit trail ready for CAG and vigilance review.',
    modules: [
      'Property & Asset Catalogue Management',
      'Bidder Registration & KYC',
      'Live Forward & Reverse Auction Engine',
      'e-Tender & Sealed Bid Management',
      'Digital Signature Integration',
      'Award Management & Audit Trail',
    ],
    features: [
      {
        title: 'Multi-format Auction Support',
        desc: 'Forward auctions, reverse auctions, sealed bids, and Dutch auctions — all on one unified platform.',
      },
      {
        title: 'Real-time Bidding Engine',
        desc: 'High-performance WebSocket-based engine handling thousands of concurrent bids with zero data loss.',
      },
      {
        title: 'CPPP & GeM Integration',
        desc: "Native integration with India's Central Public Procurement Portal and Government e-Marketplace.",
      },
      {
        title: 'Digital Signature & e-Payment',
        desc: 'PKI digital signature for bid submission and integrated payment gateway for EMD collection.',
      },
      {
        title: 'Immutable Audit Trail',
        desc: 'Every bid, withdrawal, and award decision logged with timestamps and IP for full CAG compliance.',
      },
      {
        title: 'SMS & Email Notifications',
        desc: 'Automated alerts to bidders for auction schedule, outbid notifications, and result announcements.',
      },
    ],
    useCases: [
      {
        title: 'Government Property Auctions',
        desc: 'State governments and development authorities auction surplus land, buildings, and commercial plots transparently online.',
      },
      {
        title: 'Bank Asset Auctions',
        desc: 'Banks and ARCs use it to auction mortgaged properties, vehicles, and seized assets under SARFAESI provisions.',
      },
      {
        title: 'PSU Scrap & Surplus Auctions',
        desc: 'Public sector enterprises use it for competitive disposal of scrap material, surplus inventory, and decommissioned equipment.',
      },
    ],
    techStack: ['Java', 'Spring Boot', 'WebSocket', 'Oracle DB', 'PKI Digital Signature', 'REST APIs'],
  },

  /* ─── 5. Anytime Rentals ──────────────────────────────── */
  {
    id: 'anytime-rentals',
    slug: '/products/anytime-rentals',
    icon: FiHome,
    color: '#0EA5E9',
    gradient: 'linear-gradient(135deg,#0EA5E9,#38BDF8)',
    title: 'Anytime Rentals',
    category: 'Venue & Event Management',
    tagline: 'Online Event Venue Booking Platform specially developed for Govt. & Public Sector',
    badge: 'Govt. Focused',
    clients: '25+',
    industries: 'Govt. & Institutions',
    deployments: ['Cloud', 'SaaS', 'On-Premise'],
    shortDesc: 'Online Event Venue Booking Platform, specially developed for Govt. & Public Sector',
    desc: 'Anytime Rentals is an online venue booking and event management platform purpose-built for government community halls, auditoriums, stadiums, convention centres, and public facilities. It enables online booking, slot management, payment collection, and utilisation reporting for government-owned venues.',
    fullDesc: "Anytime Rentals is a purpose-built online venue booking and event management platform designed specifically for government community halls, district auditoriums, sports complexes, stadiums, convention centres, and other publicly owned facilities. It replaces manual booking registers and telephonic reservations with a transparent, self-service digital booking system — available 24x7 to citizens and organisations. The platform handles complete booking lifecycle management including slot availability, online application, document submission, approval workflows, payment collection, cancellation, and refund processing. Administrators get a real-time utilisation dashboard showing booking trends, revenue, and facility occupancy rates. Built for the specific operational requirements of government venues, it includes features like priority booking for government events, blackout calendar management, and integration with state treasury payment systems.",
    modules: [
      'Venue & Facility Catalogue',
      'Online Slot Booking & Availability',
      'Application & Document Submission',
      'Approval Workflow Management',
      'Payment & Refund Processing',
      'Utilisation Reporting & Analytics',
    ],
    features: [
      {
        title: '24x7 Online Self-service Booking',
        desc: 'Citizens and organisations book venues online any time — no need to visit offices or make phone calls.',
      },
      {
        title: 'Government Approval Workflows',
        desc: 'Configurable multi-level approval chains matching the administrative hierarchy of government bodies.',
      },
      {
        title: 'Integrated Online Payments',
        desc: 'Secure payment gateway integration with automatic receipts and reconciliation with government treasury.',
      },
      {
        title: 'Priority Booking for Govt. Events',
        desc: 'Special booking lanes and blackout management ensuring government events are never displaced by public bookings.',
      },
      {
        title: 'Multi-venue Management',
        desc: 'Manage dozens of government venues — halls, grounds, stadiums — under a single administrative dashboard.',
      },
      {
        title: 'Revenue & Utilisation Analytics',
        desc: 'Real-time dashboards showing revenue collected, booking trends, and utilisation rates per facility.',
      },
    ],
    useCases: [
      {
        title: 'District Administration',
        desc: 'District Collectors manage community halls and auditoriums across the district through a single booking portal.',
      },
      {
        title: 'Municipal Corporations',
        desc: 'Urban local bodies use it for managing marriage halls, parks, and community centres with transparent online booking.',
      },
      {
        title: 'Sports & Stadium Authorities',
        desc: 'Sports departments manage stadium bookings, ground allotments, and event scheduling for public and private use.',
      },
    ],
    techStack: ['Java Spring Boot', 'MySQL', 'React.js', 'Payment Gateway APIs', 'SMS Gateway', 'REST APIs'],
  },

  /* ─── 6. WorkX ────────────────────────────────────────── */
  {
    id: 'workx',
    slug: '/products/workx',
    icon: FiBriefcase,
    color: '#00B894',
    gradient: 'linear-gradient(135deg,#00B894,#00CEC9)',
    title: 'WorkX',
    category: 'Works & Contract Management',
    tagline: 'Works & Contract Management for Govt. Departments and Public Sector Organisations in infrastructure sector',
    badge: 'Infrastructure',
    clients: '35+',
    industries: 'Govt. & Infrastructure',
    deployments: ['On-Premise', 'Cloud', 'SaaS'],
    shortDesc: 'Works & Contract Mgmt for Govt Depts. and Public Sector Org in infrastructure sector',
    desc: 'WorkX is a comprehensive Works and Contract Management System designed for Government Departments and Public Sector Organisations in the infrastructure sector. It manages the complete lifecycle of works contracts — from DPR preparation and tendering through execution, measurement, billing, and final completion.',
    fullDesc: 'WorkX is a comprehensive Works and Contract Management System specifically designed for Government Departments and Public Sector Organisations operating in infrastructure development — including PWD, irrigation departments, urban development authorities, NHAI, and state infrastructure corporations. It manages the complete lifecycle of works contracts — from DPR (Detailed Project Report) preparation and technical sanction through e-tendering, contractor onboarding, work order issuance, physical progress tracking, measurement books, Running Account (RA) bills, final bills, and project closure. WorkX provides engineers, project managers, and department heads with real-time visibility into project progress, contractor performance, fund utilisation, and pending liabilities. It is fully integrated with state e-procurement portals and supports digital measurement books (DMB) replacing paper-based MBs. With strong audit trail capabilities and GFR-aligned reporting, WorkX ensures full accountability in public infrastructure spending.',
    modules: [
      'DPR & Estimate Preparation',
      'e-Tendering & Contract Award',
      'Work Order & Contractor Management',
      'Physical Progress Tracking',
      'Measurement Book & RA Bills',
      'Fund Utilisation & Audit Reports',
    ],
    features: [
      {
        title: 'End-to-end Contract Lifecycle',
        desc: 'From DPR and technical sanction through execution, measurement, billing, and final completion in one system.',
      },
      {
        title: 'Digital Measurement Books',
        desc: 'Mobile-enabled digital measurement book replacing paper MBs — field engineers record measurements on-site.',
      },
      {
        title: 'e-Procurement Integration',
        desc: 'Direct integration with state e-procurement portals for seamless tender publication and award import.',
      },
      {
        title: 'Running Account Bills',
        desc: 'Automated RA bill generation based on approved measurements with multi-level certification workflow.',
      },
      {
        title: 'Fund & Budget Tracking',
        desc: 'Real-time fund utilisation dashboards with budget head mapping and liability forecasting.',
      },
      {
        title: 'GFR & CAG Compliance',
        desc: 'Pre-built reports and audit trails aligned with General Financial Rules and CAG inspection requirements.',
      },
    ],
    useCases: [
      {
        title: 'Public Works Departments',
        desc: 'PWDs use WorkX to manage hundreds of road, bridge, and building construction contracts across districts simultaneously.',
      },
      {
        title: 'Irrigation Departments',
        desc: 'Irrigation authorities manage canal construction, dam repair, and water infrastructure projects with full bill tracking.',
      },
      {
        title: 'Urban Development Authorities',
        desc: 'UDAs use it for managing smart city infrastructure projects, township development, and public amenity construction.',
      },
    ],
    techStack: ['Java Spring Boot', 'Oracle DB', 'React.js', 'e-Procurement API', 'Mobile App (Android)', 'REST APIs'],
  },
]
