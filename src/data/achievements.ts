export interface ActivityItem {
  id: string;
  category: string;
  title: string;
  organisation: string;
  description: string;
  highlights: string[];
  focus: string;
}

export const ACTIVITIES: ActivityItem[] = [
  {
    id: 'robotics-snist',
    category: 'Robotics & Hardware',
    title: 'Robotics Club Active Member & Technical Contributor',
    organisation: 'Sreenidhi Institute of Science and Technology (SNIST)',
    description: 'Active technical engagement in the SNIST Robotics Club, participating in mechanical design discussions, sensor calibration, and micro-controller programming for automated systems.',
    highlights: [
      'Engineered microcontroller firmware using Embedded C for automated movement',
      'Interfaced ultrasonic sensors, motor drivers, and infrared feedback modules',
      'Collaborated in interdisciplinary team brainstorming on robotic kinematics'
    ],
    focus: 'Embedded C, Actuators & Autonomous Logic'
  },
  {
    id: 'ece-engineering',
    category: 'Academic Foundation',
    title: 'Electronics & Communication Engineering (ECE)',
    organisation: 'Sreenidhi Institute of Science and Technology (SNIST)',
    description: 'Pursuing comprehensive B.Tech curriculum covering signal processing, digital electronics, microprocessors, communication protocols, and embedded systems architecture.',
    highlights: [
      'Gained deep understanding of hardware register manipulation and low-level protocols (I2C, SPI, UART)',
      'Combined hardware principles with modern software frontends to build full-stack and IoT solutions'
    ],
    focus: 'Circuits, Microcontrollers & Signal Flow'
  },
  {
    id: 'ecosystem-venture',
    category: 'Product Development',
    title: 'Independent Venture Founder & System Architect',
    organisation: 'Damayanti Crest',
    description: 'Conceived and launched Damayanti Crest as an umbrella venture spanning software engineering, cultural preservation, and digital publications without external corporate funding.',
    highlights: [
      'Built and deployed Sannivesham with live Android and web presence',
      'Architected DC Excel and DC Word as offline-first productivity applications',
      'Formulated an integrated business ecosystem roadmap across 4 operational divisions'
    ],
    focus: 'Ecosystem Architecture & Product Engineering'
  },
  {
    id: 'community-solutions',
    category: 'Community Engineering',
    title: 'Digital Solutions Developer for Organisations',
    organisation: 'External Client & Community Platforms',
    description: 'Engineered web applications and learning management portals for socio-cultural foundations (Abhay Hindu Sena, SYF Bharat, Sanathana Gurukulam) to expand their community educational reach.',
    highlights: [
      'Constructed complete LMS architecture for Sanathana Gurukulam with Firebase backends',
      'Delivered high-performance, mobile-first web portals and branding assets'
    ],
    focus: 'LMS Architecture, Firebase & Community Reach'
  }
];
