import type { ImageMetadata } from 'astro';
import octanetIcon from '../assets/icons/octanet.png';
import cravecoinIcon from '../assets/icons/cravecoin.png';
import fitfuelIcon from '../assets/icons/fitfuel.png';
import quantaviewIcon from '../assets/icons/quantaview.png';
import stoxiumIcon from '../assets/icons/stoxium.png';
import powergaugeIcon from '../assets/icons/powergauge.png';
// import towzerIcon from '../assets/icons/towzer.png';
import portrait from '../assets/portrait.jpg';


export interface LinkItem {
  label: string;
  href: string;
  description?: string;
}

export type SocialKind = 'github' | 'linkedin' | 'instagram';

export interface Social {
  kind: SocialKind;
  label: string;
  handle: string;
  href: string;
}

export interface Readout {
  value: number;
  suffix?: string;
  label: string;
  context: string;
}

export interface Experience {
  role: string;
  company: string;
  start: string;
  end: string;
  location?: string;
  summary: string;
  readouts: Readout[];
  highlights: string[];
  stack: string[];
}

export interface Education {
  qualification: string;
  short: string;
  institution: string;
  affiliation?: string;
  year: string;
  score: string;
  note?: string;
  major: boolean;
}

export interface Credential {
  name: string;
  issuer: string;
  code: string;
  verifyUrl: string;
}

export interface Publication {
  id: string;
  title: string;
  subtitle?: string;
  authors: string[];
  authorsNote?: string;
  kind: 'Journal article' | 'Conference proceedings' | 'Conference presentation';
  venue: string;
  details: string[];
  date: string;
  year: number;
  project?: string;
  links: LinkItem[];
  note?: string;
  citation: string;
}

export type ProjectStatus = 'Live on Google Play' | 'Built' | 'Version 2 in progress' | 'In progress';

export interface Project {
  id: string;
  name: string;
  tagline: string;
  icon: ImageMetadata;
  status: ProjectStatus;
  period?: string;
  summary: string;
  problem?: string;
  contributions?: string[];
  features?: string[];
  stack: string[];
  links: LinkItem[];
  readouts?: Readout[];
  note?: string;
}


export const profile = {
  name: 'Sushant Tare',
  fullName: 'Sushant Avinash Tare',
  initials: 'ST',
  titles: [
    'Flutter Developer',
    'Mobile App Engineer',
    'Play Store Publisher',
    'Real-time Architect',
    'UI/UX Craftsman',
  ],
  intro:
    "I build Android apps with Flutter, and I'm the sole mobile developer behind OctaNet, adopted by 9 international companies.",
  location: 'Palghar, Maharashtra, India',
  email: 'sushanttare20022004@gmail.com',
  availability: 'Open to full-time mobile roles and freelance Android projects',
  cv: { href: '/cv/Sushant_Tare_CV.pdf', label: 'CV' },
  portrait,
  portraitAlt: 'Sushant Tare outdoors under a tree, wearing a navy velvet blazer and sunglasses.',
  site: 'https://sushanttare.netlify.app',
  description:
    'Sushant Tare is a Flutter developer from Palghar, India. Sole mobile developer behind OctaNet on Google Play, author of five research papers on mobile apps.',
} as const;

export const socials: Social[] = [
  { kind: 'github', label: 'GitHub', handle: 'LuciferTare', href: 'https://github.com/LuciferTare' },
  {
    kind: 'linkedin',
    label: 'LinkedIn',
    handle: 'sushant-tare',
    href: 'https://www.linkedin.com/in/sushant-tare-8857b2290/',
  },
  {
    kind: 'instagram',
    label: 'Instagram',
    handle: 'lucifer_code_with_ease',
    href: 'https://www.instagram.com/lucifer_code_with_ease/',
  },
];

export const nav: LinkItem[] = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Education', href: '#education' },
  { label: 'Research', href: '#research' },
  { label: 'Work', href: '#work' },
  { label: 'Contact', href: '#contact' },
];


export const about = {
  lead:
    "I'm Sushant, a Flutter developer from Palghar, Maharashtra. For the last 2 years I've been the only mobile developer at TrustLink Technologies, where I built OctaNet, the app ISP field teams use for network, attendance, and customer work.",
  paragraphs: [
    "Being the sole app developer on a team of 9 means owning everything between the first commit and the Play Store listing: architecture, integrations, releases, and the crash reports that follow. It taught me to design for change, which is why OctaNet runs on a modular codebase that adapts to each new client's requirements.",
    'Outside work I gravitate to apps where data keeps moving: live crypto markets, battery telemetry read from native Android through Method Channels, and a fitness tracker that works with no connection at all. Most of those projects became research papers. There are 5 so far.',
    "I'm open to full-time mobile roles, and to freelance projects where someone needs an Android app built in Flutter, from the first screen to the Play Store release.",
  ],
  skills: [
    { group: 'Mobile', items: ['Flutter', 'Dart', 'GetX', 'Android Method Channels'] },
    { group: 'Data and services', items: ['REST APIs', 'Firebase', 'Cloud Firestore', 'SQLite', 'FCM push notifications'] },
    { group: 'Integrations', items: ['Google Maps', 'Payment gateways'] },
    { group: 'Quality and delivery', items: ['Firebase Crashlytics', 'GitHub Actions', 'Google Play Store', 'Code reviews'] },
    { group: 'Tools', items: ['Git', 'GitHub', 'Android Studio', 'VS Code', 'Postman'] },
    { group: 'Practices', items: ['Modular architecture', 'Offline-first design', 'Agile retrospectives', 'HTML and CSS'] },
  ],
  languages: ['Marathi (native)', 'Hindi', 'English'],
};


export const experience: Experience[] = [
  {
    role: 'Mobile Application Developer',
    company: 'TrustLink Technologies Pvt. Ltd.',
    start: 'Sep 2024',
    end: 'Present',
    summary:
      'Sole mobile developer on a 9-person engineering team building OctaNet, a broadband network management platform for ISPs and enterprise networks.',
    readouts: [
      {
        value: 9,
        label: 'international companies',
        context: 'adopted company-branded OctaNet builds within 4 months of launch.',
      },
      {
        value: 40,
        suffix: '%',
        label: 'shorter delivery cycle',
        context: 'for new features, from a modular codebase I designed and maintain.',
      },
      {
        value: 25,
        suffix: '%',
        label: 'fewer quality defects',
        context: 'a reduction I contributed to through code reviews, QA syncs, and retrospectives.',
      },
    ],
    highlights: [
      'Led end-to-end development and production deployment of the OctaNet Application on the Google Play Store, a Flutter field-operations app covering network, attendance, and customer workflows for ISP field teams.',
      "Delivered company-branded builds that carry each client's branding and company identity.",
      'Own the full mobile lifecycle as the only app developer alongside 8 web, backend, and desktop developers, keeping the codebase adaptable to new client requirements.',
      'Integrated Google Maps, payment gateways, and FCM push notifications.',
      'Work with Product and QA through regular syncs, structured code reviews, and retrospectives.',
    ],
    stack: ['Flutter', 'Dart', 'Google Maps', 'Payment gateways', 'FCM', 'Google Play'],
  },
];


export const education: Education[] = [
  {
    qualification: 'MSc in Information Technology',
    short: 'MSc IT',
    institution: 'S.D.S.M. College, Palghar',
    affiliation: 'University of Mumbai',
    year: '2026',
    score: '74.60%',
    major: true,
  },
  {
    qualification: 'BSc in Information Technology',
    short: 'BSc IT',
    institution: 'S.D.S.M. College, Palghar',
    affiliation: 'University of Mumbai',
    year: '2024',
    score: '72.68%',
    major: true,
  },
  {
    qualification: 'Higher Secondary Certificate',
    short: 'HSC',
    institution: 'S.D.S.M. College, Palghar',
    year: '2021',
    score: '77.50%',
    major: false,
  },
  {
    qualification: 'Secondary School Certificate',
    short: 'SSC',
    institution: 'Anand Ashram English High School',
    affiliation: 'Maharashtra State Board',
    year: '2019',
    score: '78.20%',
    major: false,
  },
];

export const credentials: Credential[] = [
  {
    name: 'AWS Certified Cloud Practitioner',
    issuer: 'Amazon Web Services',
    code: 'CLF-C02',
    verifyUrl: '', 
  },
  {
    name: 'Microsoft Certified: Azure Data Engineer Associate',
    issuer: 'Microsoft',
    code: 'DP-203',
    verifyUrl: '',
  },
];


export const recognition = {
  title: 'Aavishkar 2023, final round',
  date: 'Dec 17, 2023',
  finalists: 432,
  entries: 6000,
  body:
    'Selected as one of 432 finalists from more than 6,000 zonal entries at the Aavishkar research convention, presenting original research on Cravecoin grounded in data analysis and stakeholder feedback.',
};

export const publications: Publication[] = [
  {
    id: 'fitfuel',
    title: 'Fit&Fuel',
    subtitle: 'The Fitness Tracker',
    authors: ['Sushant A. Tare'],
    authorsNote: 'Dr. Juita T. Raut',
    kind: 'Conference presentation',
    venue:
    "Multidisciplinary International Conference on Environmental Sustainability, Social Progress and Good Governance: India's Vision 2047 (ESSG-2047)",
    details: ['Hybrid mode', 'S.D.S.M. College, Palghar (University of Mumbai)'],
    date: 'Apr 27, 2026',
    year: 2026,
    project: 'fitfuel',
    links: [],
    citation:
      "Tare, S. A. (2026, April 27). Fit&Fuel: The fitness tracker [Conference presentation]. Multidisciplinary International Conference on Environmental Sustainability, Social Progress and Good Governance: India's Vision 2047 (ESSG-2047), S.D.S.M. College, Palghar, India.",
  },
  {
    id: 'quantaview',
    title: 'Quantaview',
    subtitle: 'The Crypto Analyser',
    authors: ['Sushant A. Tare', 'Dr. Juita T. Raut'],
    kind: 'Journal article',
    venue: 'MyResearchGo',
    details: ['ISSN 3107-3816 (Online)', 'Vol. 1, Issue 8'],
    date: 'Nov 2025',
    year: 2025,
    project: 'quantaview',
    links: [{ label: 'Read Paper', href: '/papers/quantaview-myresearchgo-2025.pdf', description: 'PDF' }],
    citation:
      'Tare, S. A., & Raut, J. T. (2025). Quantaview: The crypto analyser. MyResearchGo, 1(8). ISSN 3107-3816.',
  },
  {
    id: 'towzer',
    title: 'Towzer',
    subtitle: 'Connecting Breakdowns to Solutions',
    authors: ['Sushant A. Tare'],
    kind: 'Journal article',
    venue: 'MyResearchGo',
    details: ['ISSN 3107-3816 (Online)', 'Vol. 1, Issue 7', 'Innovation Week, 79th Independence Day'],
    date: 'Oct 2025',
    year: 2025,
    // project: 'towzer',
    links: [{ label: 'Certificate', href: '/papers/towzer-certificate.pdf', description: 'Certificate of publication, PDF' }],
    citation: 'Tare, S. A. (2025). Towzer: Connecting breakdowns to solutions. MyResearchGo, 1(7). ISSN 3107-3816.',
  },
  {
    id: 'fiberflow',
    title: 'FiberFlow',
    subtitle: 'A Flutter-Based Real-Time Network Management System for ISPs',
    authors: ['Sushant A. Tare', 'Shreyas C. Shetty'],
    kind: 'Journal article',
    venue: 'International Journal of Innovative Research in Technology (IJIRT)',
    details: ['ISSN 2349-6002', 'Vol. 12, Issue 1', 'pp. 5353-5355', 'UGC-approved journal (No. 47859)'],
    date: 'Jun 2025',
    year: 2025,
    project: 'octanet',
    links: [
      { label: 'IJIRT Article', href: 'https://ijirt.org/Article?manuscript=181711', description: 'on ijirt.org' },
      { label: 'Read Paper', href: '/papers/fiberflow-ijirt-2025.pdf', description: 'PDF' },
    ],
    note: "FiberFlow is the research name for OctaNet. UGC is India's University Grants Commission, which maintains the list of approved journals.",
    citation:
      'Tare, S. A., & Shetty, S. C. (2025). FiberFlow: A Flutter-based real-time network management system for ISPs. International Journal of Innovative Research in Technology, 12(1), 5353-5355.',
  },
  {
    id: 'cravecoin',
    title: 'Cravecoin',
    subtitle: 'The Crypto Tracker',
    authors: ['Sushant Avinash Tare'],
    kind: 'Conference proceedings',
    venue: 'Shodh Samiksha, One Day National Level Multidisciplinary Conference',
    details: [
      'ISBN 978-81-985429-6-0',
      'Thakur Ramnarayan College of Arts & Commerce, with the University of Mumbai',
    ],
    date: 'Feb 8, 2025',
    year: 2025,
    project: 'cravecoin',
    links: [{ label: 'Certificate', href: '/papers/cravecoin-certificate.pdf', description: 'Certificate of publication, PDF' }],
    citation:
      'Tare, S. A. (2025, February 8). Cravecoin: The crypto tracker. In Shodh Samiksha: One Day National Level Multidisciplinary Conference proceedings. Thakur Ramnarayan College of Arts & Commerce. ISBN 978-81-985429-6-0.',
  },
];


export const featured: Project[] = [
  {
    id: 'octanet',
    name: 'OctaNet',
    tagline: 'Field-operations app for ISP technicians',
    icon: octanetIcon,
    status: 'Live on Google Play',
    period: 'Sep 2024 - Present',
    summary:
      'The mobile side of OctaNet, a broadband network management platform. Field teams use it for network, attendance, and customer work, with the live network on a map in their pocket.',
    problem:
      'ISP field engineers kept fibre routes, device details, and customer connections in spreadsheets and notebooks. Records were inconsistent, stuck with individual engineers, and lost when people left.',
    contributions: [
      'Sole mobile developer, from architecture to production release on Google Play.',
      "Company-branded builds that carry each client's identity, adopted by 9 international companies within 4 months.",
      'Google Maps network view, payment gateways, and FCM push notifications.',
      'A modular codebase that cut feature-delivery cycle time by 40%.',
    ],
    features: [
      'Network devices plotted on a single map with custom markers and connection details',
      'Tickets for engineers, tasks for the wider team',
      'Attendance and customer workflows for field staff',
      'Action reports that log every change made on the map',
    ],
    stack: ['Flutter', 'Dart', 'Google Maps', 'FCM', 'Payment gateways', 'REST APIs'],
    links: [
      { label: 'Google Play', href: 'https://play.google.com/store/apps/details?id=octanet.tech', description: 'OctaNet on Google Play' },
      { label: 'FiberFlow Paper', href: '/papers/fiberflow-ijirt-2025.pdf', description: 'Research paper on OctaNet, PDF' },
    ],
    note: 'Published as FiberFlow in IJIRT, a UGC-approved journal.',
  },
  {
    id: 'cravecoin',
    name: 'Cravecoin',
    tagline: 'Real-time crypto tracking',
    icon: cravecoinIcon,
    status: 'Built',
    period: 'Jun 2023 - Dec 2023',
    summary:
      'A real-time cryptocurrency tracker with market data integration, portfolio management, crypto analytics, and predictive logic for trend monitoring.',
    features: [
      'Live market data integration',
      'Portfolio management',
      'Crypto analytics dashboards',
      'Predictive logic for trend monitoring',
    ],
    stack: ['Flutter', 'Dart', 'Market data APIs'],
    links: [{ label: 'Publication Certificate', href: '/papers/cravecoin-certificate.pdf', description: 'PDF' }],
    note: 'Quantaview later distilled Cravecoin into a focused analyser, and Stoxium carried the same model to stocks.',
  },
];

export const inProgress: Project = {
  id: 'fitfuel',
  name: 'Fit&Fuel',
  tagline: 'Offline-first fitness, growing into gym management',
  icon: fitfuelIcon,
  status: 'Version 2 in progress',
  period: 'Jul 2025 - Present',
  summary:
    'A fully offline fitness application that keeps everything in local storage. Version 1 is complete. Version 2, much larger, extends it into a gym management application.',
  features: [
    'Workout tracking',
    'Calorie calculations',
    'Progress analytics',
    'Personalised recommendations',
    'Dashboard-based performance monitoring',
  ],
  stack: ['Flutter', 'Dart', 'Local storage'],
  links: [],
  note: 'Presented at the ESSG-2047 International Conference, Apr 2026.',
};

export const moreWork: Project[] = [
  {
    id: 'powergauge',
    name: 'Power Gauge',
    tagline: 'Battery telemetry',
    icon: powergaugeIcon,
    status: 'Built',
    period: 'Jan 2025 - Mar 2025',
    summary:
      'Real-time battery telemetry. Method Channels bridge Flutter to native Android for live performance metrics and battery health analytics.',
    stack: ['Flutter', 'Method Channels', 'Native Android'],
    links: [],
  },
  // {
  //   id: 'towzer',
  //   name: 'Towzer',
  //   tagline: 'Breakdown assistance',
  //   icon: towzerIcon,
  //   status: 'In progress',
  //   summary: 'Connects stranded drivers with tow trucks and mechanics.',
  //   stack: ['Flutter', 'Dart'],
  //   links: [{ label: 'Certificate', href: '/papers/towzer-certificate.pdf', description: 'Towzer publication certificate, PDF' }],
  // },
  {
    id: 'quantaview',
    name: 'Quantaview',
    tagline: 'Crypto analyser',
    icon: quantaviewIcon,
    status: 'Built',
    summary:
      'Tracks 20 cryptocurrencies live through the CoinGecko API and a Binance WebSocket, scores fundamentals, market activity, and valuation, models ROI scenarios, and maps market cap as a heatmap.',
    stack: ['Flutter', 'Firebase', 'Binance WebSocket', 'CoinGecko API'],
    links: [{ label: 'Paper', href: '/papers/quantaview-myresearchgo-2025.pdf', description: 'Quantaview paper, PDF' }],
  },
  {
    id: 'stoxium',
    name: 'Stoxium',
    tagline: 'Stock analyser',
    icon: stoxiumIcon,
    status: 'Built',
    summary: "Quantaview's analysis model, rebuilt for the stock market.",
    stack: ['Flutter', 'Dart'],
    links: [],
  },
];

export const homeScreen = [
  { name: 'OctaNet', icon: octanetIcon },
  { name: 'Cravecoin', icon: cravecoinIcon },
  { name: 'Fit&Fuel', icon: fitfuelIcon },
  { name: 'Power Gauge', icon: powergaugeIcon },
  // { name: 'Towzer', icon: towzerIcon },
  { name: 'Quantaview', icon: quantaviewIcon },
  { name: 'Stoxium', icon: stoxiumIcon },
];


export const contact = {
  heading: 'Get In Touch',
  body: 'Tell me about the role or the project you have in mind. A short message with the basics is plenty to start.',
  formProvider: 'netlify' as 'mailto' | 'netlify',
  formName: 'contact',
  topics: ['A full-time role', 'A freelance project', 'Something else'],
};
