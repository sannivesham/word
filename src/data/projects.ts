export interface ProjectFeature {
  title: string;
  description: string;
  icon?: string;
}

export interface ProjectProcessStep {
  step: string;
  title: string;
  description: string;
}

export interface ProjectChallenge {
  challenge: string;
  solution: string;
}

export interface Project {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  category: 'independent' | 'organisational';
  categoryLabel: string;
  tagline: string;
  description: string;
  fullOverview: string;
  role: string;
  status: string;
  technologies: string[];
  heroTheme: {
    bg: string;
    text: string;
    accent: string;
    subtleBorder: string;
  };
  objective: string;
  solution: string;
  features: ProjectFeature[];
  process: ProjectProcessStep[];
  challenges: ProjectChallenge[];
  previewUrl?: string;
  repoUrl?: string;
  appUrl?: string;
  isExternalLinkLive: boolean;
  featured: boolean;
  order: number;
  highlightStat?: {
    value: string;
    label: string;
  };
}

export const PROJECTS: Project[] = [
  {
    id: 'dc-excel',
    slug: 'dc-excel',
    title: 'DC Excel',
    shortTitle: 'Spreadsheet App',
    category: 'independent',
    categoryLabel: 'Productivity Software / Spreadsheet Application',
    tagline: 'High-performance, locally focused spreadsheet application within the Damayanti Crest ecosystem.',
    description: 'A privacy-first, desktop-class spreadsheet web application engineered to compute formulas, render interactive ECharts visualizations, and manipulate datasets with zero server-side telemetry.',
    fullOverview: 'DC Excel is an independent spreadsheet processor engineered under Damayanti Technologies. Unlike conventional cloud sheets that stream every keystroke across external servers, DC Excel executes formula parsing, cell dependency graphing, and data storage locally via IndexedDB. It pairs native ExcelJS import/export with dynamic chart visualizers and PWA capability for seamless desktop-grade utility.',
    role: 'Lead Architect & Frontend Engineer',
    status: 'MVP Functional / Active Development',
    technologies: ['React 18', 'TypeScript', 'Tailwind CSS', 'Zustand', 'IndexedDB (idb)', 'ExcelJS', 'ECharts', 'JSZip', 'Vite', 'PWA'],
    heroTheme: {
      bg: '#181818',
      text: '#F7F5F0',
      accent: '#FF604A',
      subtleBorder: '#333333'
    },
    objective: 'Create an offline-first, confidential spreadsheet environment that provides smooth formula recalculations and file compatibility without privacy compromises.',
    solution: 'Designed an in-browser reactive state architecture powered by Zustand and IndexedDB. Built formula parsing with real-time cell coordinate references, integrated ECharts for immediate visual reporting, and supported .xlsx binary import/export via ExcelJS.',
    features: [
      {
        title: 'Zero-Telemetry Local Storage',
        description: 'All workbooks and formula calculations persist in client IndexedDB storage, preserving complete document confidentiality.'
      },
      {
        title: 'Formula Engine & Cell Dependencies',
        description: 'Evaluates standard arithmetic and logical formula expressions with automatic recalculation across dependent cells.'
      },
      {
        title: 'Integrated Dynamic Charts',
        description: 'Instantly renders column, line, and pie charts directly from selected spreadsheet cell matrices using Apache ECharts.'
      },
      {
        title: 'Bidirectional .xlsx Export & Import',
        description: 'Full compatibility with standard Microsoft Excel spreadsheets using client-side binary parsing with ExcelJS and JSZip.'
      },
      {
        title: 'Progressive Web App (PWA)',
        description: 'Installable on desktop operating systems (Windows, macOS, Linux) with offline execution support.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Grid Architecture & Virtualization',
        description: 'Researched DOM performance for two-dimensional coordinate grids and engineered responsive row-column indices.'
      },
      {
        step: '02',
        title: 'State & Formula Parsing',
        description: 'Engineered Zustand-backed cell store that decouples display values, raw formula strings, and formatting flags.'
      },
      {
        step: '03',
        title: 'Offline Persistence Pipeline',
        description: 'Integrated the IndexedDB transaction pipeline via `idb` to guarantee auto-saving without UI micro-stutters.'
      },
      {
        step: '04',
        title: 'Visual Analytics Integration',
        description: 'Hooked ECharts instances to active cell selections, enabling one-click graphic visualizations of quantitative datasets.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining instant UI feedback during formula cascade recalculations.',
        solution: 'Isolated cell evaluation dependencies into an internal topological order so only affected cells recompute.'
      },
      {
        challenge: 'Accurate binary roundtripping of styles and numbers for Excel files without backend servers.',
        solution: 'Implemented client-side ExcelJS buffer transforms in web workers to avoid blocking the main thread.'
      }
    ],
    isExternalLinkLive: false,
    previewUrl: '#',
    featured: true,
    order: 1,
    highlightStat: {
      value: '100% Local',
      label: 'Zero Data Leaks'
    }
  },
  {
    id: 'dc-word',
    slug: 'dc-word',
    title: 'DC Word',
    shortTitle: 'Document Editor',
    category: 'independent',
    categoryLabel: 'Productivity Software / Document Processor',
    tagline: 'Desktop-class, privacy-first word processor web application built for distraction-free writing.',
    description: 'A focused document editing environment crafted under Damayanti Crest, prioritizing typographic elegance, rich document styling, offline safety, and responsive editorial layout.',
    fullOverview: 'DC Word re-imagines the modern text editor as an understated, responsive workspace free from cluttered ad-tech toolbars or mandatory cloud logins. Engineered with React 19, TypeScript, and IndexedDB, it delivers fluid typographic control, page margin configuration, structured heading hierarchies, and persistent autosaving directly on the user’s device.',
    role: 'Lead Architect & Developer',
    status: 'In Active Development',
    technologies: ['React 19', 'TypeScript', 'Tailwind CSS', 'Zustand', 'IndexedDB (idb)', 'Vite', 'PWA'],
    heroTheme: {
      bg: '#F0EEE8',
      text: '#181818',
      accent: '#FF604A',
      subtleBorder: '#E4E0D8'
    },
    objective: 'Provide a clean, distraction-free document processor with desktop-level formatting capabilities that operates reliably without internet connectivity.',
    solution: 'Constructed an editorial-focused interface utilizing semantic document trees, clean typography presets, and continuous local autosave states through IndexedDB.',
    features: [
      {
        title: 'Distraction-Free Editorial Layout',
        description: 'Crafted with generous typographic whitespace, custom margins, and clean line-height settings inspired by print publications.'
      },
      {
        title: 'Rich Typography Hierarchy',
        description: 'Comprehensive formatting engine supporting title tiers, blockquotes, callout panels, monospace code, and lists.'
      },
      {
        title: 'Continuous Local Autosave',
        description: 'Safeguards every keystroke in background IndexedDB transactions with zero risk of draft loss during unexpected closures.'
      },
      {
        title: 'Document Management Drawer',
        description: 'Organize, duplicate, rename, and switch between multi-document workspaces without leaving the application.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Typographic System Definition',
        description: 'Established proportion scales, optical font sizing, and reading rhythm tailored for prolonged writing sessions.'
      },
      {
        step: '02',
        title: 'Editable Canvas Architecture',
        description: 'Implemented an intuitive content editing interface with clean keyboard shortcuts for formatting commands.'
      },
      {
        step: '03',
        title: 'Document State Synchronization',
        description: 'Connected Zustand store with asynchronous storage listeners to preserve version history locally.'
      }
    ],
    challenges: [
      {
        challenge: 'Balancing minimal aesthetics with comprehensive editorial controls.',
        solution: 'Engineered contextual floating toolbars that appear when text is highlighted and recede during active typing.'
      }
    ],
    isExternalLinkLive: false,
    previewUrl: '#',
    featured: true,
    order: 2,
    highlightStat: {
      value: 'Offline First',
      label: 'Instant Document Save'
    }
  },
  {
    id: 'sannivesham',
    slug: 'sannivesham',
    title: 'Sannivesham',
    shortTitle: 'Telugu Cultural Platform',
    category: 'independent',
    categoryLabel: 'Cultural Heritage / Knowledge Platform',
    tagline: 'A Telugu-first digital ecosystem preserving Indian traditions, temple heritage, and philosophical literature.',
    description: 'An expansive cultural platform providing structured temple directories, Ramayana itihasalu, shlokas, Bhagavad Gita verses, interactive quizzes, and daily devotional tools.',
    fullOverview: 'Sannivesham (సన్నివేశం) is a signature cultural platform founded to bring timeless Sanatana traditions to contemporary audiences through digital craftsmanship. Built with deep respect for Telugu heritage, the platform encompasses extensive interactive modules: from genealogies in the Ramayana and temple histories to Pratibha Vedhika knowledge quizzes, Ramakoti counters, and festival calendars.',
    role: 'Founder, Architect & Full-Stack Developer',
    status: 'Live Web Platform & Android App',
    technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'Capacitor / Android WebView', 'Firebase', 'Telugu Unicode'],
    heroTheme: {
      bg: '#2A0E08',
      text: '#FAF2E6',
      accent: '#D99A27',
      subtleBorder: '#5E2818'
    },
    objective: 'Digitize and organize authentic Sanatana cultural knowledge in an accessible, beautifully presented Telugu-first digital sanctuary.',
    solution: 'Designed and deployed a cross-platform digital sanctuary offering structured sacred texts, interactive genealogical trees for epics, devotional counters, and community quizzes.',
    features: [
      {
        title: 'Itihasalu & Epic Chronicles',
        description: 'Detailed exploration of the Ramayana, Balakanda events, relationship maps, and chapter-by-chapter summaries.'
      },
      {
        title: 'Sacred Temples Directory',
        description: 'Curated architectural, historical, and timing records of sacred pilgrimage sites across India with rich imagery.'
      },
      {
        title: 'Pratibha Vedhika & Dharma Pariksha',
        description: 'Interactive cultural and philosophical quiz engines that engage youth and families in learning traditions.'
      },
      {
        title: 'Ramakoti & Japa Counter',
        description: 'Interactive digital counter for daily mantra chanting and spiritual goal tracking.'
      },
      {
        title: 'Bhagavad Gita & Stotras',
        description: 'Verse-by-verse Telugu transliteration, meaning, and audio accompaniment for daily spiritual reflection.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Cultural Curation & Telugu Typography',
        description: 'Curated verified texts with scholars and established high-legibility Telugu typography across mobile screens.'
      },
      {
        step: '02',
        title: 'Modular Platform Architecture',
        description: 'Created independent modules for quizzes, temple directory, chant counters, and literature libraries.'
      },
      {
        step: '03',
        title: 'Android Mobile Application',
        description: 'Packaged the responsive web architecture into a lightweight, high-performance mobile application for Android.'
      }
    ],
    challenges: [
      {
        challenge: 'Ensuring complex Telugu conjunct ligatures render crisply on various older Android viewports.',
        solution: 'Implemented dedicated font-face fallback chains with Noto Sans Telugu and Cormorant Garamond headings.'
      }
    ],
    isExternalLinkLive: true,
    previewUrl: 'https://sannivesham.com',
    appUrl: 'https://sannivesham.com/download',
    featured: true,
    order: 3,
    highlightStat: {
      value: 'Multi-Module',
      label: 'Temples, Quizzes & Epics'
    }
  },
  {
    id: 'damayanti-crest',
    slug: 'damayanti-crest',
    title: 'Damayanti Crest',
    shortTitle: 'Technology Ecosystem',
    category: 'independent',
    categoryLabel: 'Technology Ecosystem / Entrepreneurial Venture',
    tagline: 'Many Ideas. One Vision. An independent umbrella ecosystem spanning technology, heritage, and publications.',
    description: 'The central umbrella venture founded to cultivate and orchestrate independent software applications, cultural initiatives, publishing endeavors, and traditional heritage platforms.',
    fullOverview: 'Damayanti Crest serves as the foundational umbrella founded by Reshwanth Reddy. Guided by the ethos “Many Ideas. One Vision”, Damayanti Crest harmonizes four distinct operational pillars: Damayanti Technologies (modern software applications and tools), Damayanti Heritage (cultural preservation), Damayanti Publications (books and editorial media), and Damayanti Traditions (living customs and practices).',
    role: 'Founder & Lead Technologist',
    status: 'Independent Venture & Ecosystem Active',
    technologies: ['HTML5', 'CSS3 Architecture', 'Vanilla JavaScript', 'SVG Engineering', 'GitHub Pages Deployment', 'Responsive Design'],
    heroTheme: {
      bg: '#171B2B',
      text: '#FAF8F2',
      accent: '#C5A15D',
      subtleBorder: '#282F48'
    },
    objective: 'Establish a cohesive, beautifully branded home for multiple independent products and cultural endeavours under one structured umbrella.',
    solution: 'Architected a lightweight, dependency-free corporate portal with modular brand directories, dynamic product filtering, and an editorial identity system.',
    features: [
      {
        title: 'Four Core Divisions',
        description: 'Clear structural taxonomy covering Technologies, Heritage, Publications, and Traditions.'
      },
      {
        title: 'Product & Initiative Registry',
        description: 'Centralized registry showcasing DC Excel, DC Word, Sannivesham, Sandarshana, and Arrout with honest deployment statuses.'
      },
      {
        title: 'Subpath-Safe Architecture',
        description: 'Engineered with relative assets to ensure flawless rendering on custom apex domains or GitHub Pages subpaths.'
      },
      {
        title: 'Cohesive Heritage-Modern Design',
        description: 'Understated Midnight Navy and Antique Gold visual system that bridges timeless legacy with digital clarity.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Ecosystem Taxonomy',
        description: 'Mapped the long-term vision, classifying products into logical technology and cultural divisions.'
      },
      {
        step: '02',
        title: 'Visual Identity System',
        description: 'Designed the geometric crest mark, division emblems, and editorial typography guidelines.'
      },
      {
        step: '03',
        title: 'Static Production Deployment',
        description: 'Built zero-dependency web architecture with automated sitemaps, robots.txt, and accessible markup.'
      }
    ],
    challenges: [
      {
        challenge: 'Presenting diverse ventures (from software spreadsheets to sacred literature) within one unified brand voice.',
        solution: 'Formulated a division architecture where each branch holds a dedicated identity while sharing the parent Crest philosophy.'
      }
    ],
    isExternalLinkLive: true,
    previewUrl: 'https://damayanti-technologies.github.io/damayanti-crest/',
    featured: true,
    order: 4,
    highlightStat: {
      value: '4 Divisions',
      label: 'Tech, Heritage, Books, Traditions'
    }
  },
  {
    id: 'abhay-hindu-sena',
    slug: 'abhay-hindu-sena',
    title: 'Abhay Hindu Sena',
    shortTitle: 'Organisational Portal',
    category: 'organisational',
    categoryLabel: 'Organisational Digital Development',
    tagline: 'High-impact digital portal and communications platform built for an external socio-cultural organisation.',
    description: 'Designed and engineered an official web portal and digital assets for Abhay Hindu Sena, providing a strong online presence, announcements channel, and member outreach.',
    fullOverview: 'Developed as a dedicated digital solution for Abhay Hindu Sena, this project established the organisation’s web portal. The project required striking visual impact, intuitive content navigation, responsive mobile performance, and a clear presentation of social initiatives and public announcements.',
    role: 'Lead Digital & Web Developer',
    status: 'Portal Deployed / Digital Solutions Implemented',
    technologies: ['HTML5', 'Tailwind CSS', 'JavaScript', 'Lucide Icons', 'Responsive UI Engineering'],
    heroTheme: {
      bg: '#090B10',
      text: '#FAF2E6',
      accent: '#FF6F00',
      subtleBorder: '#232838'
    },
    objective: 'Provide a secure, visually commanding online portal that communicates the organisation’s mission and simplifies announcement broadcasting.',
    solution: 'Engineered a modern web portal featuring bold Cinzel headings, saffron-gold visual highlights, optimized mobile performance, and accessible content sections.',
    features: [
      {
        title: 'Mission & Initiatives Showcase',
        description: 'Dedicated sections articulating social community activities and community welfare efforts.'
      },
      {
        title: 'High-Contrast Identity System',
        description: 'Rich dark background with vibrant saffron gradients that reflect the organisation’s distinct visual presence.'
      },
      {
        title: 'Mobile-First Responsive Layout',
        description: 'Flawless readability and interaction on Android smartphones and entry-level mobile browsers.'
      },
      {
        title: 'Announcement Channels',
        description: 'Streamlined update panels for public notices, events, and community member coordination.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Requirements Alignment',
        description: 'Consulted with leadership to establish accurate messaging, public contact avenues, and tone.'
      },
      {
        step: '02',
        title: 'Component Engineering',
        description: 'Constructed custom hero banners, mission cards, and responsive navigation drawers.'
      },
      {
        step: '03',
        title: 'Performance & Cross-Device QA',
        description: 'Optimized asset delivery and audited touch interactions across mobile screen sizes.'
      }
    ],
    challenges: [
      {
        challenge: 'Maintaining high contrast and visual authority without compromising page load speeds on mobile networks.',
        solution: 'Utilized lightweight SVG icons and CSS-driven gradients instead of heavy raster graphics.'
      }
    ],
    isExternalLinkLive: false,
    previewUrl: '#',
    featured: false,
    order: 5,
    highlightStat: {
      value: 'Impact Driven',
      label: 'Organisational Reach'
    }
  },
  {
    id: 'syf-bharat',
    slug: 'syf-bharat',
    title: 'SYF Bharat',
    shortTitle: 'Youth Foundation Portal',
    category: 'organisational',
    categoryLabel: 'Organisational Digital Development',
    tagline: 'Digital infrastructure and mobile interfaces designed for Sanathana Youth Foundation.',
    description: 'Developed modern web solutions, brand integration, and mobile application interfaces for SYF Bharat to foster youth engagement, cultural events, and leadership initiatives.',
    fullOverview: 'Sanathana Youth Foundation (SYF Bharat) engages youth across regions in cultural learning, community service, and nation-building initiatives. As the digital solutions developer, Reshwanth engineered web layouts, digital branding assets, and mobile interfaces that reflect the dynamic energy of modern Indian youth.',
    role: 'Frontend & App Solutions Developer',
    status: 'Digital Platform Development',
    technologies: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'Firebase Integration', 'Mobile UI Design'],
    heroTheme: {
      bg: '#1A1817',
      text: '#FDFBF7',
      accent: '#FF7A00',
      subtleBorder: '#38332E'
    },
    objective: 'Build an engaging, accessible digital platform that connects youth volunteers and showcases educational programs.',
    solution: 'Delivered an energetic digital presence incorporating official SYF brand assets, interactive event modules, and streamlined registration gateways.',
    features: [
      {
        title: 'Youth Volunteer Portals',
        description: 'Engaging entry points for young citizens seeking community development and cultural leadership.'
      },
      {
        title: 'Event & Workshop Directories',
        description: 'Dynamic listings for upcoming youth camps, educational sessions, and volunteer meets.'
      },
      {
        title: 'Brand Alignment',
        description: 'Integrated official SYF circular iconography and saffron-gold brand motifs across every view.'
      },
      {
        title: 'Fast Mobile Optimization',
        description: 'Engineered for rapid loading on 4G/5G mobile devices commonly used by youth participants.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Brand Asset Digitization',
        description: 'Cleaned and vectorized circular emblem assets for crisp multi-resolution presentation.'
      },
      {
        step: '02',
        title: 'Portal Interface Build',
        description: 'Developed intuitive interactive cards and event modules prioritizing ease of action.'
      },
      {
        step: '03',
        title: 'Backend Connectivity Planning',
        description: 'Structured database schemas for volunteer registrations and announcement notifications.'
      }
    ],
    challenges: [
      {
        challenge: 'Creating a youthful, modern aesthetic while maintaining deep cultural reverence.',
        solution: 'Balanced dynamic micro-interactions and bold typography with warm, respectful color palettes.'
      }
    ],
    isExternalLinkLive: false,
    previewUrl: '#',
    featured: false,
    order: 6,
    highlightStat: {
      value: 'Youth Centric',
      label: 'Digital Leadership'
    }
  },
  {
    id: 'sanathana-gurukulam',
    slug: 'sanathana-gurukulam',
    title: 'Sanathana Gurukulam',
    shortTitle: 'E-Learning Platform',
    category: 'organisational',
    categoryLabel: 'Education / Digital Platform',
    tagline: 'Comprehensive digital learning platform with courses, live sessions, age groups, and certificates.',
    description: 'An expansive e-learning web platform featuring tiered age-group curricula, live classroom streaming, community discussions, student dashboards, and automated certification.',
    fullOverview: 'Sanathana Gurukulam is an educational digital platform created to provide structured courses in traditional wisdom, languages, shlokas, and cultural values. Built with a rich cream and maroon aesthetic, it includes student authentication, age-group categorization (children, youth, adults), live session integration, community forums, and administrative course management.',
    role: 'Full-Stack Developer & Platform Architect',
    status: 'Platform Implemented / Multi-Module Live',
    technologies: ['HTML5', 'CSS3 Architecture', 'JavaScript', 'Firebase Auth', 'Firestore Database', 'Cormorant Garamond', 'Poppins'],
    heroTheme: {
      bg: '#4A1F0E',
      text: '#FCF4E2',
      accent: '#D99A27',
      subtleBorder: '#7A2E16'
    },
    objective: 'Create a dignified, accessible digital gurukulam that organizes multi-age courses and live spiritual education with ease.',
    solution: 'Architected a full learning management suite integrating Firebase authentication, real-time Firestore synchronization, course video players, student progress tracking, and certificate generators.',
    features: [
      {
        title: 'Age-Tiered Course Curricula',
        description: 'Structured learning paths tailored specifically for young children, teenagers, and adult seekers.'
      },
      {
        title: 'Live Classroom Integration',
        description: 'Real-time scheduled sessions with direct access for enrolled students and reminder alerts.'
      },
      {
        title: 'Interactive Community Forum',
        description: 'Peer-to-peer discussion boards where students interact with teachers and clarify philosophical concepts.'
      },
      {
        title: 'Automated Certificate Engine',
        description: 'Generates verified, personalized completion certificates upon course accomplishment.'
      },
      {
        title: 'Student Dashboard & Progress',
        description: 'Personalized dashboard tracking module completions, assignments, and upcoming live classes.'
      }
    ],
    process: [
      {
        step: '01',
        title: 'Curriculum & Database Modeling',
        description: 'Designed Firestore data collections for age groups, course chapters, quizzes, and live schedules.'
      },
      {
        step: '02',
        title: 'Interface & Heritage Aesthetics',
        description: 'Formulated a serene Sand, Cream, and Maroon design system inspired by traditional gurukul architecture.'
      },
      {
        step: '03',
        title: 'Authentication & Security Rules',
        description: 'Implemented strict Firestore security rules separating student records, teacher roles, and public courses.'
      }
    ],
    challenges: [
      {
        challenge: 'Managing diverse user demographics ranging from children to elders with varying tech familiarity.',
        solution: 'Built an extraordinarily straightforward, clean navigation system with high-contrast buttons and minimal cognitive overhead.'
      }
    ],
    isExternalLinkLive: false,
    previewUrl: '#',
    featured: true,
    order: 7,
    highlightStat: {
      value: 'Full LMS',
      label: 'Courses, Live & Certificates'
    }
  }
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug || p.id === slug);
}
