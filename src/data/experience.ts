export interface Milestone {
  period: string;
  role: string;
  entity: string;
  location: string;
  category: 'independent' | 'organisational' | 'academic';
  summary: string;
  deliverables: string[];
  technologies: string[];
}

export const MILESTONES: Milestone[] = [
  {
    period: 'Present — Ongoing',
    role: 'Founder & Lead Technologist',
    entity: 'Damayanti Crest',
    location: 'Hyderabad, India',
    category: 'independent',
    summary: 'Founded and orchestrating an independent technology and creative ecosystem structured into four core divisions: Technologies, Heritage, Publications, and Traditions.',
    deliverables: [
      'Architected overarching ecosystem roadmap and digital portal infrastructure',
      'Unified software applications, publishing initiatives, and cultural archives',
      'Established privacy-first product design principles across software releases'
    ],
    technologies: ['Systems Architecture', 'Product Design', 'HTML5/CSS3', 'JavaScript', 'Ecosystem Strategy']
  },
  {
    period: '2025 — 2026',
    role: 'Lead Architect & Software Developer',
    entity: 'Productivity Applications (DC Excel & DC Word)',
    location: 'Hyderabad, India',
    category: 'independent',
    summary: 'Conceived and engineered offline-first, desktop-class web applications emphasizing client confidentiality and responsive data manipulation.',
    deliverables: [
      'Built DC Excel: in-browser formula engine, ECharts data visualization, and native .xlsx parsing',
      'Built DC Word: distraction-free editorial canvas, local IndexedDB persistence, and rich formatting',
      'Eliminated cloud telemetry to ensure 100% confidential client-side execution'
    ],
    technologies: ['React 18/19', 'TypeScript', 'Zustand', 'IndexedDB', 'ExcelJS', 'ECharts', 'Tailwind CSS']
  },
  {
    period: '2024 — 2026',
    role: 'Founder & Full-Stack Architect',
    entity: 'Sannivesham (సన్నివేశం)',
    location: 'Hyderabad, India',
    category: 'independent',
    summary: 'Envisioned, designed, and deployed a comprehensive Telugu cultural platform and Android application preserving Indian traditions, epics, and temple directories.',
    deliverables: [
      'Launched official live platform (sannivesham.com) and companion mobile application',
      'Engineered interactive Pratibha Vedhika quiz engine, Ramakoti counter, and temple directory',
      'Implemented responsive Telugu typography and high-density cultural media architectures'
    ],
    technologies: ['HTML5/JS', 'Tailwind CSS', 'Android WebView / Capacitor', 'Firebase', 'Telugu Unicode']
  },
  {
    period: '2024 — 2026',
    role: 'Full-Stack Developer & Platform Architect',
    entity: 'Sanathana Gurukulam & Client Platforms',
    location: 'Hyderabad, India',
    category: 'organisational',
    summary: 'Engineered digital learning systems and community portals for external organisations, transforming educational reach through modern web architecture.',
    deliverables: [
      'Constructed Sanathana Gurukulam: full learning portal with age-group curricula, live classes, and certificates',
      'Developed Abhay Hindu Sena web presence with robust mobile-first communication channels',
      'Architected youth portal layouts and digital assets for Sanathana Youth Foundation (SYF Bharat)'
    ],
    technologies: ['Firebase Auth & Firestore', 'JavaScript', 'Tailwind CSS', 'Responsive Architecture']
  },
  {
    period: 'Academic Engagement',
    role: 'B.Tech Student & Technical Innovator',
    entity: 'Sreenidhi Institute of Science and Technology (SNIST)',
    location: 'Hyderabad, India',
    category: 'academic',
    summary: 'Pursuing Bachelor of Technology in Electronics and Communication Engineering (ECE), engaging in embedded systems, microcontrollers, and robotics.',
    deliverables: [
      'Active participant in Robotics Club initiatives, kinematic prototypes, and sensor integrations',
      'Programmed ESP32 and Raspberry Pi Pico microcontrollers using Embedded C',
      'Bridged hardware circuit design principles with modern software user interfaces'
    ],
    technologies: ['Embedded C', 'ESP32', 'Raspberry Pi Pico', 'Sensors (I2C/SPI)', 'ECE Hardware']
  }
];
