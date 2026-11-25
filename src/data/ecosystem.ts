export interface Division {
  id: string;
  name: string;
  tagline: string;
  description: string;
  iconPath: string;
  accentColor: string;
  keyInitiatives: string[];
}

export const ECOSYSTEM_DIVISIONS: Division[] = [
  {
    id: 'technologies',
    name: 'Damayanti Technologies',
    tagline: 'Software Applications & Digital Tools',
    description: 'Engineering locally focused, privacy-first software products including spreadsheet systems, text processors, and digital utilities.',
    iconPath: '/assets/damayanti/icons/tech.svg',
    accentColor: '#FF604A',
    keyInitiatives: ['DC Excel (Spreadsheet Application)', 'DC Word (Document Processor)', 'Sandarshana (Web Browser Project)', 'Privacy-first Desktop PWA Stack']
  },
  {
    id: 'heritage',
    name: 'Damayanti Heritage',
    tagline: 'Cultural Preservation & Digital Knowledge',
    description: 'Digitizing, curating, and presenting timeless Indian traditions, sacred temple archives, and historical epics for current generations.',
    iconPath: '/assets/damayanti/icons/heritage.svg',
    accentColor: '#C5A15D',
    keyInitiatives: ['Sannivesham (Telugu Cultural Sanctuary)', 'Itihasalu & Epic Genealogies', 'Pilgrimage Temple Directory', 'Pratibha Vedhika Cultural Quizzes']
  },
  {
    id: 'publications',
    name: 'Damayanti Publications',
    tagline: 'Editorial Literature & Research Works',
    description: 'Curating, authoring, and disseminating structured educational literature, philosophical translations, and spiritual commentaries.',
    iconPath: '/assets/damayanti/icons/publications.svg',
    accentColor: '#9C7A3C',
    keyInitiatives: ['Spiritual Commentary Compilations', 'Cultural Heritage Booklets', 'Digital Research Archives', 'Multi-Language Publications']
  },
  {
    id: 'traditions',
    name: 'Damayanti Traditions',
    tagline: 'Living Customs & Sacred Practices',
    description: 'Documenting and celebrating festival calendars, ritual timings, Vedic mantras, and ancestral daily disciplines.',
    iconPath: '/assets/damayanti/icons/traditions.svg',
    accentColor: '#C07D38',
    keyInitiatives: ['Telugu Panchangam & Festival Timings', 'Japa & Ramakoti Chanting Trackers', 'Daily Traditional Observances', 'Family Heritage Guides']
  }
];

export const DAMAYANTI_INFO = {
  name: 'Damayanti Crest',
  tagline: 'Many Ideas. One Vision.',
  founder: 'G. Reshwanth Reddy',
  statement: 'An independent business and creative ecosystem bringing together technology, heritage, publications, and traditions under a unified operational vision.',
  emblemPath: '/assets/damayanti/logos/crest-mark.svg',
  emblemJpg: '/assets/damayanti/images/damayanti-crest-emblem.jpg',
  colors: {
    navy: '#171B2B',
    gold: '#C5A15D',
    ivory: '#F7F3EA',
    charcoal: '#343844'
  },
  principles: [
    { title: 'Substance Over Spectacle', description: 'Real utility, clean engineering, and honest implementation over superficial marketing.' },
    { title: 'Data Sovereignty', description: 'Prioritizing local execution, client privacy, and zero unnecessary server surveillance.' },
    { title: 'Heritage in Modern Form', description: 'Preserving ancient knowledge through accessible, contemporary digital craftsmanship.' }
  ]
};
