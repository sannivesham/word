export interface NavItem {
  label: string;
  href: string;
  isExternal?: boolean;
}

export const NAV_ITEMS: NavItem[] = [
  { label: 'Home', href: '/#hero' },
  { label: 'About', href: '/#about' },
  { label: 'Skills', href: '/#skills' },
  { label: 'Work', href: '/#projects' },
  { label: 'Ventures', href: '/#damayanti-crest' },
  { label: 'Experience', href: '/#experience' },
  { label: 'Contact', href: '/#contact' }
];

export const OWNER_INFO = {
  fullName: 'G. Reshwanth Reddy',
  displayName: 'Reshwanth Reddy',
  monogram: 'RR',
  role: 'Software Developer | App & Web Developer | Founder of Damayanti Crest',
  tagline: 'Building digital experiences. Turning ideas into reality.',
  statement: 'I don’t just build websites. I build digital products.',
  bio: 'I design and develop digital products, applications and web experiences, transforming ideas into meaningful technology. My work spans productivity software, cultural platforms, and digital solutions for organisations.',
  location: 'Hyderabad, India',
  education: {
    degree: 'B.Tech in Electronics and Communication Engineering',
    institution: 'Sreenidhi Institute of Science and Technology (SNIST)',
    location: 'Hyderabad, Telangana, India'
  },
  social: {
    github: 'https://github.com/damayanti-technologies',
    linkedin: 'https://www.linkedin.com/in/reshwanth-reddy-519822295/',
    email: 'damayanti.crest@gmail.com',
    secondaryEmail: 'reshwanthreddy.dev@gmail.com'
  },
  resume: {
    available: true,
    fileName: 'G_Reshwanth_Reddy_Resume.pdf',
    lastUpdated: 'November 2026'
  }
};
