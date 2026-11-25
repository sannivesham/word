export interface SkillItem {
  name: string;
  levelDesc: string;
  tags: string[];
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  skills: SkillItem[];
}

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'programming',
    number: '01',
    title: 'Programming Languages',
    subtitle: 'Core Foundation',
    description: 'Languages used across software applications, algorithmic solutions, and embedded hardware development.',
    skills: [
      { name: 'JavaScript (ES6+)', levelDesc: 'Advanced asynchronous programming, DOM lifecycle, modern patterns', tags: ['Web', 'Node', 'Frontend'] },
      { name: 'TypeScript', levelDesc: 'Strict typing, interface architecture, generic patterns', tags: ['Enterprise', 'Scale'] },
      { name: 'C & Embedded C', levelDesc: 'Low-level memory management, microcontroller firmware, registers', tags: ['Hardware', 'ECE'] },
      { name: 'C++', levelDesc: 'Object-oriented software systems and performance engineering', tags: ['Systems'] },
      { name: 'Python', levelDesc: 'Data manipulation, automation scripts, prototype logic', tags: ['Scripting', 'Automation'] },
      { name: 'SQL', levelDesc: 'Relational data queries, table schemas, and indexing', tags: ['Databases'] }
    ]
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend Development',
    subtitle: 'Client Interfaces',
    description: 'Modern component architectures, interactive motion systems, and performant web client engineering.',
    skills: [
      { name: 'React (18 & 19)', levelDesc: 'Functional hooks, server/client boundaries, concurrent features', tags: ['Core', 'Framework'] },
      { name: 'Tailwind CSS', levelDesc: 'Custom design systems, CSS variables, utility tokens, responsive design', tags: ['UI', 'Styling'] },
      { name: 'State Management (Zustand)', levelDesc: 'Minimalist centralized stores, middleware, and persistent states', tags: ['Architecture'] },
      { name: 'HTML5 & Semantic Web', levelDesc: 'Accessible DOM landmarks, SEO metadata, microdata schemas', tags: ['Standards', 'A11y'] },
      { name: 'CSS3 & Motion Design', levelDesc: 'Flexbox, CSS Grid, keyframes, transitions, clipping masks', tags: ['Visual'] },
      { name: 'PWA & Offline First', levelDesc: 'Service workers, web app manifests, local asset caching', tags: ['Reliability'] }
    ]
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend & Services',
    subtitle: 'Data & Cloud',
    description: 'Cloud databases, secure authentication, client-side persistence, and API integrations.',
    skills: [
      { name: 'Firebase Firestore', levelDesc: 'NoSQL document collections, real-time listeners, transactions', tags: ['Cloud', 'Realtime'] },
      { name: 'Firebase Authentication', levelDesc: 'OAuth providers, email/password sessions, token validation', tags: ['Security'] },
      { name: 'Firestore Security Rules', levelDesc: 'Role-based access control, write verification, schema guards', tags: ['Security'] },
      { name: 'IndexedDB & idb', levelDesc: 'Local structured storage, high-volume offline transactions', tags: ['Offline', 'Privacy'] },
      { name: 'RESTful APIs', levelDesc: 'HTTP endpoints, payload serialization, error resilience', tags: ['Integration'] }
    ]
  },
  {
    id: 'app-dev',
    number: '04',
    title: 'Application Development',
    subtitle: 'Mobile & Hybrid',
    description: 'Cross-platform mobile apps, native wrappers, and responsive touch architectures.',
    skills: [
      { name: 'Android Studio', levelDesc: 'App bundling, manifest configuration, device emulators, APK signing', tags: ['Android', 'Mobile'] },
      { name: 'WebView & Capacitor', levelDesc: 'Bridging responsive web applications into native Android binaries', tags: ['Hybrid', 'Native'] },
      { name: 'Touch & Gesture UX', levelDesc: 'Designing responsive interfaces optimized for handheld thumb zones', tags: ['UX', 'Mobile'] },
      { name: 'Cross-Platform Layouts', levelDesc: 'Pixel-consistent experiences across phones, tablets, and desktops', tags: ['Responsive'] }
    ]
  },
  {
    id: 'dev-tools',
    number: '05',
    title: 'Engineering Tools',
    subtitle: 'Workflow & Build',
    description: 'Toolchains, version control, build optimizers, and automated test environments.',
    skills: [
      { name: 'Git & GitHub', levelDesc: 'Branch management, pull requests, semantic commit logs, GitHub Pages', tags: ['VCS', 'DevOps'] },
      { name: 'Vite', levelDesc: 'Lightning-fast HMR, Rollup bundler tuning, tree-shaking optimizations', tags: ['Build'] },
      { name: 'VS Code & Google Antigravity', levelDesc: 'Multi-agent developer environments, linting, debugging', tags: ['IDE'] },
      { name: 'Vitest & Playwright', levelDesc: 'Component unit testing and browser automation testing', tags: ['Testing', 'QA'] }
    ]
  },
  {
    id: 'hardware',
    number: '06',
    title: 'Hardware & Embedded',
    subtitle: 'Electronics & IoT',
    description: 'Rooted in Electronics & Communication Engineering (ECE) training at SNIST.',
    skills: [
      { name: 'ESP32 & IoT', levelDesc: 'Wi-Fi/Bluetooth dual-mode microcontrollers, peripheral communication', tags: ['IoT', 'Hardware'] },
      { name: 'Raspberry Pi Pico', levelDesc: 'RP2040 microcomputing, GPIO control, timing routines', tags: ['Embedded'] },
      { name: 'Sensors & Interfacing', levelDesc: 'I2C, SPI, UART communication protocols, analog/digital sensors', tags: ['Protocols'] },
      { name: 'Robotics Engineering', levelDesc: 'Robotics Club involvement, motor drivers, automated kinematics', tags: ['Robotics', 'SNIST'] },
      { name: 'Circuit Prototyping', levelDesc: 'Breadboarding, schematics, power distribution, signal analysis', tags: ['ECE'] }
    ]
  }
];
