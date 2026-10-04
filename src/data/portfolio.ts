import type { ImageMetadata } from "astro";
import octanetIcon from "../assets/icons/octanet.png";
import cravecoinIcon from "../assets/icons/cravecoin.png";
import fitfuelIcon from "../assets/icons/fitfuel.png";
import quantaviewIcon from "../assets/icons/quantaview.png";
import stoxiumIcon from "../assets/icons/stoxium.png";
import powergaugeIcon from "../assets/icons/powergauge.png";
// import towzerIcon from '../assets/icons/towzer.png';
import portrait from "../assets/portrait.jpg";

export interface LinkItem {
  label: string;
  href: string;
  description?: string;
}

export type SocialKind = "github" | "linkedin" | "instagram";

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
  team: string;
  summary: string;
  facts: { label: string; value: string }[];
  duties: string[];
  caseStudy: LinkItem;
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
  kind:
    "Journal article" | "Conference proceedings" | "Conference presentation";
  venue: string;
  details: string[];
  date: string;
  datePublished: string;
  year: number;
  project?: string;
  context?: string;
  links: LinkItem[];
  note?: string;
  citation: string;
}

export type ProjectStatus =
  "Live on Google Play" | "Built" | "Version 2.0 in progress" | "In progress";

export interface Project {
  id: string;
  name: string;
  tagline: string;
  icon: ImageMetadata;
  status: ProjectStatus;
  period?: string;
  summary: string;
  problem?: string;
  approach?: string[];
  implementation?: string[];
  outcomes?: string[];
  features?: string[];
  stack: string[];
  links: LinkItem[];
  readouts?: Readout[];
  note?: string;
}

export const profile = {
  name: "Sushant Tare",
  fullName: "Sushant Avinash Tare",
  initials: "ST",
  titles: [
    "Flutter Developer",
    "Mobile App Engineer",
    "Play Store Publisher",
    "Real-time Architect",
    "UI/UX Craftsman",
  ],
  intro:
    "Flutter developer with 2 years shipping Android apps to Google Play. As the sole mobile developer at TrustLink, I built OctaNet, now used by ISPs across 7 countries.",
  location: "Palghar, Maharashtra, India",
  email: "sushanttare20022004@gmail.com",
  availability: "Open to full-time mobile roles and freelance Android projects",
  cv: { href: "/cv/Sushant_Tare_CV.pdf", label: "CV" },
  portrait,
  portraitAlt:
    "Sushant Tare outdoors under a tree, wearing a navy velvet blazer and sunglasses.",
  site: "https://sushanttare.netlify.app",
  description:
    "Sushant Tare is a Flutter developer from Palghar, India, who builds Android apps such as OctaNet on Google Play and has published five research papers on mobile apps.",
} as const;

export const socials: Social[] = [
  {
    kind: "github",
    label: "GitHub",
    handle: "LuciferTare",
    href: "https://github.com/LuciferTare",
  },
  {
    kind: "linkedin",
    label: "LinkedIn",
    handle: "sushant-tare",
    href: "https://www.linkedin.com/in/sushant-tare-8857b2290/",
  },
  {
    kind: "instagram",
    label: "Instagram",
    handle: "lucifer_code_with_ease",
    href: "https://www.instagram.com/lucifer_code_with_ease/",
  },
];

export const nav: LinkItem[] = [
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Research", href: "#research" },
  { label: "About", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
];

export const about = {
  lead: "I'm Sushant. I care most about the parts of an app users never notice until they break: how the code is organised, how it copes with a weak connection, and how it holds up after release.",
  paragraphs: [
    "Owning an app end to end means everything between the first commit and the Play Store listing: architecture, integrations, releases, and the crash reports that follow. It taught me to design for change.",
    "Outside work I gravitate to apps where data keeps moving: live crypto markets, battery telemetry read from native Android through Method Channels, and a fitness tracker that works with no connection at all. Most of those projects became research papers. There are 5 so far.",
  ],
  skills: [
    {
      group: "Mobile",
      items: ["Flutter", "Dart", "GetX", "Android Method Channels"],
    },
    {
      group: "Data and services",
      items: [
        "REST APIs",
        "Firebase",
        "Cloud Firestore",
        "SQLite",
        "FCM push notifications",
      ],
    },
    { group: "Integrations", items: ["Google Maps"] },
    {
      group: "Quality and delivery",
      items: [
        "Firebase Crashlytics",
        "GitHub Actions",
        "Google Play Store",
        "Code reviews",
      ],
    },
    {
      group: "Tools",
      items: ["Git", "GitHub", "Android Studio", "VS Code", "Postman"],
    },
    {
      group: "Practices",
      items: [
        "Modular architecture",
        "Offline-first design",
        "Agile retrospectives",
        "HTML and CSS",
      ],
    },
  ],
  languages: ["Marathi (native)", "Hindi", "English"],
};

export const experience: Experience[] = [
  {
    role: "Mobile Application Developer",
    company: "TrustLink Technologies Pvt. Ltd.",
    start: "Sep 2024",
    end: "Present",
    team: "9-person engineering team",
    summary:
      "I'm the only mobile developer on the team. I own the OctaNet Android app from architecture to Play Store release, and keep a branded build running for every client company.",
    facts: [
      { label: "Team", value: "9 engineers" },
      { label: "Platform", value: "Android, Flutter" },
      { label: "Clients", value: "ISPs in 7 countries" },
    ],
    duties: [
      "Plan, build, test, and release every version of the app on Google Play.",
      "Run one shared codebase that ships under each client's own name, icon, and colours.",
      "Connect the app to the platform's REST APIs, maps, payments, and push notifications.",
      "Track production crashes in Firebase Crashlytics and fix them in the next release.",
      "Review code, and work with Product and QA through regular syncs and retrospectives.",
    ],
    caseStudy: {
      label: "Read the OctaNet case study",
      href: "#project-octanet",
    },
  },
];

export const education: Education[] = [
  {
    qualification: "MSc in Information Technology",
    short: "MSc IT",
    institution: "S.D.S.M. College, Palghar",
    affiliation: "University of Mumbai",
    year: "2026",
    score: "74.60%",
    major: true,
  },
  {
    qualification: "BSc in Information Technology",
    short: "BSc IT",
    institution: "S.D.S.M. College, Palghar",
    affiliation: "University of Mumbai",
    year: "2024",
    score: "72.68%",
    major: true,
  },
  {
    qualification: "Higher Secondary Certificate",
    short: "HSC",
    institution: "S.D.S.M. College, Palghar",
    year: "2021",
    score: "77.50%",
    major: false,
  },
  {
    qualification: "Secondary School Certificate",
    short: "SSC",
    institution: "Anand Ashram English High School",
    affiliation: "Maharashtra State Board",
    year: "2019",
    score: "78.20%",
    major: false,
  },
];

export const credentials: Credential[] = [
  {
    name: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    code: "CLF-C02",
    verifyUrl: "",
  },
  {
    name: "Microsoft Certified: Azure Data Engineer Associate",
    issuer: "Microsoft",
    code: "DP-203",
    verifyUrl: "",
  },
];

export const recognition = {
  finalists: 432,
  entries: 6000,
};

export const publications: Publication[] = [
  {
    id: "fitfuel",
    title: "Fit&Fuel",
    subtitle: "The Fitness Tracker",
    authors: ["Sushant A. Tare", "Dr. Juita T. Raut"],
    kind: "Conference presentation",
    venue:
      "Multidisciplinary International Conference on Environmental Sustainability, Social Progress and Good Governance: India's Vision 2047 (ESSG-2047)",
    details: [
      "Hybrid mode",
      "S.D.S.M. College, Palghar (University of Mumbai)",
    ],
    date: "Apr 27, 2026",
    datePublished: "2026-04-27",
    year: 2026,
    project: "fitfuel",
    links: [
      {
        label: "Read Paper",
        href: "/papers/fitfuel-paper.pdf",
        description: "PDF",
      },
      {
        label: "Certificate",
        href: "/papers/fitfuel-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
    citation:
      "Tare, S. A., & Raut, J. T. (2026, April 27). Fit&Fuel: The fitness tracker [Conference presentation]. Multidisciplinary International Conference on Environmental Sustainability, Social Progress and Good Governance: India's Vision 2047 (ESSG-2047), S.D.S.M. College, Palghar, India.",
  },
  {
    id: "quantaview",
    title: "Quantaview",
    subtitle: "The Crypto Analyser",
    authors: ["Sushant A. Tare", "Dr. Juita T. Raut"],
    kind: "Journal article",
    venue: "MyResearchGo",
    details: ["ISSN 3107-3816 (Online)", "Vol. 1, Issue 8"],
    date: "Nov 2025",
    datePublished: "2025-11",
    year: 2025,
    project: "quantaview",
    links: [
      {
        label: "Read Paper",
        href: "/papers/quantaview-paper.pdf",
        description: "PDF",
      },
      {
        label: "Certificate",
        href: "/papers/quantaview-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
    citation:
      "Tare, S. A., & Raut, J. T. (2025). Quantaview: The crypto analyser. MyResearchGo, 1(8). ISSN 3107-3816.",
  },
  {
    id: "towzer",
    title: "Towzer",
    subtitle: "Connecting Breakdowns to Solutions",
    authors: ["Sushant A. Tare"],
    kind: "Journal article",
    venue: "MyResearchGo",
    details: [
      "ISSN 3107-3816 (Online)",
      "Vol. 1, Issue 7",
      "Innovation Week, 79th Independence Day",
    ],
    date: "Oct 2025",
    datePublished: "2025-10",
    year: 2025,
    // project: 'towzer',
    context:
      "Concept paper for an app that connects stranded drivers with tow trucks and mechanics.",
    links: [
      {
        label: "Read Paper",
        href: "/papers/towzer-paper.pdf",
        description: "PDF",
      },
      {
        label: "Certificate",
        href: "/papers/towzer-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
    citation:
      "Tare, S. A. (2025). Towzer: Connecting breakdowns to solutions. MyResearchGo, 1(7). ISSN 3107-3816.",
  },
  {
    id: "fiberflow",
    title: "FiberFlow",
    subtitle: "A Flutter-Based Real-Time Network Management System for ISPs",
    authors: ["Sushant A. Tare", "Shreyas C. Shetty"],
    kind: "Journal article",
    venue: "International Journal of Innovative Research in Technology (IJIRT)",
    details: [
      "ISSN 2349-6002",
      "Vol. 12, Issue 1",
      "pp. 5353-5355",
      "UGC-approved journal (No. 47859)",
    ],
    date: "Jun 2025",
    datePublished: "2025-06",
    year: 2025,
    project: "octanet",
    links: [
      {
        label: "IJIRT Article",
        href: "https://ijirt.org/Article?manuscript=181711",
        description: "on ijirt.org",
      },
      {
        label: "Read Paper",
        href: "/papers/fiberflow-paper.pdf",
        description: "PDF",
      },
      {
        label: "Certificate",
        href: "/papers/fiberflow-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
    note: "FiberFlow is the research name for OctaNet. UGC is India's University Grants Commission, which maintains the list of approved journals.",
    citation:
      "Tare, S. A., & Shetty, S. C. (2025). FiberFlow: A Flutter-based real-time network management system for ISPs. International Journal of Innovative Research in Technology, 12(1), 5353-5355.",
  },
  {
    id: "cravecoin",
    title: "Cravecoin",
    subtitle: "The Crypto Tracker",
    authors: ["Sushant A. Tare", "Shreyas C. Shetty"],
    kind: "Conference proceedings",
    venue:
      "Shodh Samiksha, One Day National Level Multidisciplinary Conference",
    details: [
      "ISBN 978-81-985429-6-0",
      "Thakur Ramnarayan College of Arts & Commerce, with the University of Mumbai",
    ],
    date: "Feb 8, 2025",
    datePublished: "2025-02-08",
    year: 2025,
    project: "cravecoin",
    links: [
      {
        label: "Read Paper",
        href: "/papers/cravecoin-paper.pdf",
        description: "PDF",
      },
      {
        label: "Certificate",
        href: "/papers/cravecoin-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
    citation:
      "Tare, S. A., & Shetty, S. C. (2025, February 8). Cravecoin: The crypto tracker. In Shodh Samiksha: One Day National Level Multidisciplinary Conference proceedings. Thakur Ramnarayan College of Arts & Commerce. ISBN 978-81-985429-6-0.",
  },
];

export const featured: Project[] = [
  {
    id: "octanet",
    name: "OctaNet",
    tagline: "Field-operations app for ISP technicians",
    icon: octanetIcon,
    status: "Live on Google Play",
    period: "Sep 2024 - Present",
    summary:
      "I build the mobile side of OctaNet, a broadband network management platform. Field teams use it for network, attendance, and customer work, with the live network on a map in their pocket.",
    problem:
      "ISP field engineers kept fibre routes, device details, and customer connections in spreadsheets and notebooks. Records were inconsistent, stuck with individual engineers, and lost when people left.",
    readouts: [
      {
        value: 7,
        label: "countries",
        context:
          "where ISPs adopted their own branded OctaNet build within 4 months of launch.",
      },
      {
        value: 40,
        suffix: "%",
        label: "shorter delivery cycle",
        context:
          "for new features, from a modular codebase I designed and maintain.",
      },
      {
        value: 25,
        suffix: "%",
        label: "fewer quality defects",
        context:
          "a reduction I contributed to through code reviews, QA syncs, and retrospectives.",
      },
    ],
    approach: [
      "I run one Flutter codebase with an Android product flavor per client. Each flavor sets its own package name, app name, icon, and colours, so every company ships as its own Google Play listing.",
      "I split features into modules, so a new client build reuses the shared core instead of forking the code.",
      "I use GetX for state management across the modules.",
    ],
    implementation: [
      "I built it as the sole mobile developer alongside 8 web, backend, and desktop developers, from architecture to production release.",
      "I built a Google Maps network view with custom markers for devices and their connections.",
      "I added live location tracking that runs smoothly with the app in the foreground or background.",
      "I connected tickets, tasks, attendance, and customer workflows to REST APIs, with action reports that log every change made on the map.",
      "I integrated FCM push notifications and Firebase Crashlytics on production builds.",
    ],
    outcomes: [
      "Network, customer, and attendance records in one shared app instead of personal spreadsheets and notebooks.",
      "A fix or feature built once in the shared core reaches every client's app in the same release.",
      "Records stay with the company, not with individual engineers, so nothing is lost when someone leaves.",
    ],
    stack: [
      "Flutter",
      "Dart",
      "GetX",
      "Google Maps",
      "FCM",
      "Firebase Crashlytics",
      "REST APIs",
    ],
    links: [
      {
        label: "Google Play",
        href: "https://play.google.com/store/apps/details?id=octanet.tech",
        description: "OctaNet on Google Play",
      },
      {
        label: "Product site",
        href: "https://octanet.tech",
        description: "OctaNet product website",
      },
      {
        label: "FiberFlow Paper",
        href: "/papers/fiberflow-paper.pdf",
        description: "Research paper on OctaNet, PDF",
      },
    ],
    note: "I published it as FiberFlow in IJIRT, a UGC-approved journal.",
  },
  {
    id: "cravecoin",
    name: "Cravecoin",
    tagline: "Real-time crypto tracking",
    icon: cravecoinIcon,
    status: "Built",
    period: "Jun 2023 - Dec 2023",
    summary:
      "A real-time cryptocurrency tracker with market data integration, portfolio management, crypto analytics, and predictive logic for trend monitoring.",
    features: [
      "Live market data integration",
      "Portfolio management",
      "Crypto analytics dashboards",
      "Predictive logic for trend monitoring",
    ],
    stack: ["Flutter", "Dart", "Market data APIs"],
    links: [
      {
        label: "Read Paper",
        href: "/papers/cravecoin-paper.pdf",
        description: "PDF",
      },
      {
        label: "Publication Certificate",
        href: "/papers/cravecoin-certificate.pdf",
        description: "PDF",
      },
    ],
    note: "Quantaview later distilled Cravecoin into a focused analyser, and Stoxium carried the same model to stocks.",
  },
];

export const inProgress: Project = {
  id: "fitfuel",
  name: "Fit&Fuel",
  tagline: "Offline-first workouts and nutrition, growing into gym management",
  icon: fitfuelIcon,
  status: "Version 2.0 in progress",
  period: "Jul 2025 - Present",
  summary:
    "Version 1.0 puts exercise guidance, nutrition, recipes, and workout music in one app that never needs a connection: every exercise video, recipe, and song ships inside the app, and workout history lives in SQLite. Version 2.0, much larger, extends it into a gym management application.",
  features: [
    "300+ exercises with built-in video tutorials, filtered by body part, muscle group, and equipment",
    "Calorie and macro targets from the Harris-Benedict formula, split per meal",
    "Recipe suggestions scored against those targets for calories, protein, fat, and carbs",
    "Workout log with MET-based calorie estimates and a streak that allows rest days",
    "Gym, Motivation, and Cardio playlists that keep playing in the background, with notification controls",
  ],
  stack: ["Flutter", "Dart", "GetX", "SQLite", "just_audio", "video_player"],
  links: [
    {
      label: "Read Paper",
      href: "/papers/fitfuel-paper.pdf",
      description: "PDF",
    },
    {
      label: "Certificate",
      href: "/papers/fitfuel-certificate.pdf",
      description: "Certificate of publication, PDF",
    },
  ],
  note: "Presented at the ESSG-2047 International Conference, Apr 2026.",
};

export const moreWork: Project[] = [
  {
    id: "powergauge",
    name: "Power Gauge",
    tagline: "Battery telemetry",
    icon: powergaugeIcon,
    status: "Built",
    period: "Jan 2025 - Mar 2025",
    summary:
      "Real-time battery telemetry. Method Channels bridge Flutter to native Android for live performance metrics and battery health analytics.",
    stack: ["Flutter", "Method Channels", "Native Android"],
    links: [],
  },
  // {
  //  id: 'towzer',
  //  name: 'Towzer',
  //  tagline: 'Breakdown assistance',
  //  icon: towzerIcon,
  //  status: 'In progress',
  //  summary: 'Connects stranded drivers with tow trucks and mechanics.',
  //  stack: ['Flutter', 'Dart'],
  //  links: [
  //   { label: 'Paper', href: '/papers/towzer-paper.pdf', description: 'Towzer paper, PDF' },
  //   { label: 'Certificate', href: '/papers/towzer-certificate.pdf', description: 'Towzer publication certificate, PDF' },
  //  ],
  // },
  {
    id: "quantaview",
    name: "Quantaview",
    tagline: "Crypto analyser",
    icon: quantaviewIcon,
    status: "Built",
    summary:
      "Tracks 20 cryptocurrencies live through the CoinGecko API and a Binance WebSocket, scores fundamentals, market activity, and valuation, models ROI scenarios, and maps market cap as a heatmap.",
    stack: ["Flutter", "Firebase", "Binance WebSocket", "CoinGecko API"],
    links: [
      {
        label: "Paper",
        href: "/papers/quantaview-paper.pdf",
        description: "Quantaview paper, PDF",
      },
      {
        label: "Certificate",
        href: "/papers/quantaview-certificate.pdf",
        description: "Certificate of publication, PDF",
      },
    ],
  },
  {
    id: "stoxium",
    name: "Stoxium",
    tagline: "Stock analyser",
    icon: stoxiumIcon,
    status: "Built",
    summary: "Quantaview's analysis model, rebuilt for the stock market.",
    stack: ["Flutter", "Dart"],
    links: [],
  },
];

export const homeScreen = [
  { name: "OctaNet", icon: octanetIcon },
  { name: "Cravecoin", icon: cravecoinIcon },
  { name: "Fit&Fuel", icon: fitfuelIcon },
  { name: "Power Gauge", icon: powergaugeIcon },
  // { name: 'Towzer', icon: towzerIcon },
  { name: "Quantaview", icon: quantaviewIcon },
  { name: "Stoxium", icon: stoxiumIcon },
];

export const contact = {
  heading: "Get In Touch",
  body: "Tell me about the role or the project you have in mind. A short message with the basics is plenty to start.",
  formProvider: "netlify" as "mailto" | "netlify",
  formName: "contact",
  topics: ["A full-time role", "A freelance project", "Something else"],
};
