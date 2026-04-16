/* ─── Types ─── */

export type UserRole = "organiser" | "exhibitor" | "visitor" | "sponsor" | "vendor";

export type MockUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  roles: UserRole[]; // all assigned roles
  role: UserRole;    // currently active role
  avatar: string;    // initials
  company?: string;
};

export type MockEvent = {
  id: string;
  title: string;
  description: string;
  venue: string;
  city: string;
  startDate: string;
  endDate: string;
  status: "upcoming" | "live" | "completed" | "draft";
  exhibitors: number;
  visitors: number;
  booths: number;
  image: string; // gradient placeholder
};

export type RoleFeature = {
  role: string;
  tagline: string;
  highlights: string[];
  icon: string; // emoji placeholder – swap for SVG/icon lib later
};

export type Stat = {
  label: string;
  value: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  avatar: string; // initials
};

export type Feature = {
  title: string;
  description: string;
};

export type Booth = {
  id: string;
  hall: string;
  size: string;
  price: string;
  status: "available" | "reserved";
};

export type Lead = {
  id: string;
  contact: string;
  company: string;
  interest: string;
  score: "Hot" | "Warm" | "Cold";
};

export type Exhibitor = {
  id: string;
  name: string;
  industry: string;
  location: string;
  shortDescription: string;
};

/* ─── Event-level exhibitor & visitor types ─── */

export type ExhibitorStatus = "pending" | "approved" | "ignored" | "payment_pending" | "activated";

export type EventExhibitor = {
  id: string;
  eventId: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  boothType: string;
  boothNumber: string;
  industry: string;
  avatar: string;
  status: ExhibitorStatus;
  appliedDate: string;
  paymentDeadline?: string; // set on approval
  paidDate?: string;
};

export type BadgeStatus = "not_sent" | "sent";

export type BoothStatus = "empty" | "pending" | "approved" | "payment_pending" | "booked";

export type EventBooth = {
  boothNumber: string;
  eventId: string;
  hall: string;
  boothType: string;
  status: BoothStatus;
  orders: number; // number of exhibitor applications for this booth
};

export type EventVisitor = {
  id: string;
  eventId: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  avatar: string;
  active: boolean;
  badgeStatus: BadgeStatus;
  badgeSentDate?: string;
  registeredDate: string;
};

/* ─── Mock Users (credentials for all roles) ─── */

export const mockUsers: MockUser[] = [
  { id: "U-001", name: "Nagaraj Jayaraman", email: "nagaraj@etti.tech", password: "12345", roles: ["organiser", "exhibitor", "sponsor"], role: "organiser", avatar: "NJ", company: "Etti Technologies" },
  { id: "U-002", name: "Priya Sharma", email: "priya@exhibitor.com", password: "12345", roles: ["exhibitor", "visitor"], role: "exhibitor", avatar: "PS", company: "Nexa Systems" },
  { id: "U-003", name: "Alex Walker", email: "alex@visitor.com", password: "12345", roles: ["visitor"], role: "visitor", avatar: "AW" },
  { id: "U-004", name: "Sofia Martinez", email: "sofia@sponsor.com", password: "12345", roles: ["sponsor", "exhibitor"], role: "sponsor", avatar: "SM", company: "VoltGrid" },
  { id: "U-005", name: "Raj Patel", email: "raj@vendor.com", password: "12345", roles: ["vendor", "visitor"], role: "vendor", avatar: "RP", company: "BlueForge" },
];

/* ─── Mock Events ─── */

export const mockEvents: MockEvent[] = [
  {
    id: "EVT-001",
    title: "FutureTech Expo 2025",
    description: "Asia's largest B2B technology trade fair featuring industrial IoT, AI, and automation solutions.",
    venue: "Pragati Maidan",
    city: "New Delhi",
    startDate: "2025-08-15",
    endDate: "2025-08-18",
    status: "upcoming",
    exhibitors: 240,
    visitors: 12000,
    booths: 320,
    image: "from-indigo-500 to-purple-600",
  },
  {
    id: "EVT-002",
    title: "GreenBuild Summit",
    description: "Sustainable construction and green energy trade fair for the building industry.",
    venue: "RAI Amsterdam",
    city: "Amsterdam",
    startDate: "2025-07-01",
    endDate: "2025-07-03",
    status: "live",
    exhibitors: 180,
    visitors: 8500,
    booths: 210,
    image: "from-emerald-500 to-teal-600",
  },
  {
    id: "EVT-003",
    title: "AutoDrive World",
    description: "International autonomous driving and mobility technology trade fair.",
    venue: "Messe Berlin",
    city: "Berlin",
    startDate: "2025-03-10",
    endDate: "2025-03-12",
    status: "completed",
    exhibitors: 310,
    visitors: 18000,
    booths: 400,
    image: "from-orange-500 to-red-600",
  },
  {
    id: "EVT-004",
    title: "HealthTech Connect",
    description: "Medical devices, biotech and healthcare IT trade fair bringing together global health innovators.",
    venue: "Singapore Expo",
    city: "Singapore",
    startDate: "2025-09-22",
    endDate: "2025-09-25",
    status: "upcoming",
    exhibitors: 150,
    visitors: 6200,
    booths: 180,
    image: "from-cyan-500 to-blue-600",
  },
  {
    id: "EVT-005",
    title: "PackLogix International",
    description: "Packaging, logistics and supply chain trade fair with live machinery demonstrations.",
    venue: "McCormick Place",
    city: "Chicago",
    startDate: "2025-11-05",
    endDate: "2025-11-08",
    status: "draft",
    exhibitors: 0,
    visitors: 0,
    booths: 260,
    image: "from-violet-500 to-fuchsia-600",
  },
  {
    id: "EVT-006",
    title: "FoodPro Asia",
    description: "Food processing, packaging and agritech trade fair for the Asia-Pacific region.",
    venue: "BITEC Bangkok",
    city: "Bangkok",
    startDate: "2025-06-12",
    endDate: "2025-06-14",
    status: "completed",
    exhibitors: 200,
    visitors: 9800,
    booths: 250,
    image: "from-amber-500 to-orange-600",
  },
];

/* ─── Mock Event Exhibitors ─── */

export const mockEventExhibitors: EventExhibitor[] = [
  { id: "EEXH-001", eventId: "EVT-001", name: "Rahul Gupta", company: "Nexa Systems", email: "rahul@nexasystems.io", phone: "+91-98765-43210", boothType: "Premium 10x10", boothNumber: "A-12", industry: "Industrial IoT", avatar: "RG", status: "pending", appliedDate: "2025-06-20" },
  { id: "EEXH-002", eventId: "EVT-001", name: "Elena Vasquez", company: "VoltGrid", email: "elena@voltgrid.eu", phone: "+31-612-345678", boothType: "Standard 6x6", boothNumber: "B-04", industry: "Energy Tech", avatar: "EV", status: "approved", appliedDate: "2025-06-18", paymentDeadline: "2025-07-18" },
  { id: "EEXH-003", eventId: "EVT-001", name: "Tom Henderson", company: "Aria Mobility", email: "tom@ariamobility.se", phone: "+46-70-1234567", boothType: "Premium 10x10", boothNumber: "A-08", industry: "Mobility", avatar: "TH", status: "activated", appliedDate: "2025-06-15", paymentDeadline: "2025-07-15", paidDate: "2025-07-01" },
  { id: "EEXH-004", eventId: "EVT-001", name: "Amara Osei", company: "Hexa Industry", email: "amara@hexaindustry.ca", phone: "+1-416-555-0199", boothType: "Standard 6x6", boothNumber: "B-11", industry: "Automation", avatar: "AO", status: "pending", appliedDate: "2025-06-25" },
  { id: "EEXH-005", eventId: "EVT-001", name: "Kenji Tanaka", company: "BlueForge", email: "kenji@blueforge.us", phone: "+1-512-555-0188", boothType: "Large 12x12", boothNumber: "C-01", industry: "Manufacturing SaaS", avatar: "KT", status: "payment_pending", appliedDate: "2025-06-12", paymentDeadline: "2025-07-20" },
  { id: "EEXH-006", eventId: "EVT-001", name: "Fatima Al-Rashid", company: "AtlasBio", email: "fatima@atlasbio.sg", phone: "+65-9123-4567", boothType: "Standard 6x6", boothNumber: "B-07", industry: "Biotech", avatar: "FA", status: "ignored", appliedDate: "2025-06-22" },
  { id: "EEXH-007", eventId: "EVT-002", name: "Lukas Braun", company: "EcoBuild GmbH", email: "lukas@ecobuild.de", phone: "+49-30-12345678", boothType: "Premium 10x10", boothNumber: "A-03", industry: "Green Construction", avatar: "LB", status: "activated", appliedDate: "2025-05-10", paymentDeadline: "2025-06-10", paidDate: "2025-05-28" },
  { id: "EEXH-008", eventId: "EVT-002", name: "Ingrid Holm", company: "SolarNord", email: "ingrid@solarnord.no", phone: "+47-400-12345", boothType: "Standard 6x6", boothNumber: "B-09", industry: "Solar Energy", avatar: "IH", status: "pending", appliedDate: "2025-05-20" },
  { id: "EEXH-009", eventId: "EVT-003", name: "Marcus Weber", company: "DriveTech AI", email: "marcus@drivetech.de", phone: "+49-89-9876543", boothType: "Large 12x12", boothNumber: "C-05", industry: "Autonomous Driving", avatar: "MW", status: "activated", appliedDate: "2025-01-15", paymentDeadline: "2025-02-15", paidDate: "2025-01-30" },
  { id: "EEXH-010", eventId: "EVT-004", name: "Dr. Lin Wei", company: "MedScan Technologies", email: "lin.wei@medscan.sg", phone: "+65-8234-5678", boothType: "Premium 10x10", boothNumber: "A-15", industry: "Medical Devices", avatar: "LW", status: "pending", appliedDate: "2025-07-01" },
  { id: "EEXH-011", eventId: "EVT-004", name: "Rachel Kim", company: "BioSynth Labs", email: "rachel@biosynth.kr", phone: "+82-10-9876-5432", boothType: "Standard 6x6", boothNumber: "B-02", industry: "Biotech", avatar: "RK", status: "approved", appliedDate: "2025-06-28", paymentDeadline: "2025-07-28" },
  { id: "EEXH-012", eventId: "EVT-006", name: "Ananya Patel", company: "FarmFresh Tech", email: "ananya@farmfresh.in", phone: "+91-99887-76655", boothType: "Standard 6x6", boothNumber: "B-06", industry: "Agritech", avatar: "AP", status: "activated", appliedDate: "2025-04-10", paymentDeadline: "2025-05-10", paidDate: "2025-04-25" },
];

/* ─── Mock Event Booths ─── */

export const mockEventBooths: EventBooth[] = [
  // EVT-001 – FutureTech Expo (Hall A: Premium, Hall B: Standard, Hall C: Large)
  { boothNumber: "A-01", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-02", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-03", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-04", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-08", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "booked", orders: 1 },
  { boothNumber: "A-12", eventId: "EVT-001", hall: "A", boothType: "Premium 10x10", status: "pending", orders: 1 },
  { boothNumber: "B-01", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
  { boothNumber: "B-02", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
  { boothNumber: "B-03", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
  { boothNumber: "B-04", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "approved", orders: 1 },
  { boothNumber: "B-07", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 1 },
  { boothNumber: "B-11", eventId: "EVT-001", hall: "B", boothType: "Standard 6x6", status: "pending", orders: 1 },
  { boothNumber: "C-01", eventId: "EVT-001", hall: "C", boothType: "Large 12x12", status: "payment_pending", orders: 1 },
  { boothNumber: "C-02", eventId: "EVT-001", hall: "C", boothType: "Large 12x12", status: "empty", orders: 0 },
  { boothNumber: "C-03", eventId: "EVT-001", hall: "C", boothType: "Large 12x12", status: "empty", orders: 0 },
  // EVT-002 – GreenBuild Summit
  { boothNumber: "A-01", eventId: "EVT-002", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-02", eventId: "EVT-002", hall: "A", boothType: "Premium 10x10", status: "empty", orders: 0 },
  { boothNumber: "A-03", eventId: "EVT-002", hall: "A", boothType: "Premium 10x10", status: "booked", orders: 1 },
  { boothNumber: "B-09", eventId: "EVT-002", hall: "B", boothType: "Standard 6x6", status: "pending", orders: 1 },
  { boothNumber: "B-10", eventId: "EVT-002", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
  // EVT-003 – AutoDrive World
  { boothNumber: "C-05", eventId: "EVT-003", hall: "C", boothType: "Large 12x12", status: "booked", orders: 1 },
  { boothNumber: "C-06", eventId: "EVT-003", hall: "C", boothType: "Large 12x12", status: "empty", orders: 0 },
  // EVT-004 – HealthTech Connect
  { boothNumber: "A-15", eventId: "EVT-004", hall: "A", boothType: "Premium 10x10", status: "pending", orders: 1 },
  { boothNumber: "B-01", eventId: "EVT-004", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
  { boothNumber: "B-02", eventId: "EVT-004", hall: "B", boothType: "Standard 6x6", status: "approved", orders: 1 },
  // EVT-006 – FoodPro Asia
  { boothNumber: "B-06", eventId: "EVT-006", hall: "B", boothType: "Standard 6x6", status: "booked", orders: 1 },
  { boothNumber: "B-07", eventId: "EVT-006", hall: "B", boothType: "Standard 6x6", status: "empty", orders: 0 },
];

/* ─── Mock Event Visitors ─── */

export const mockEventVisitors: EventVisitor[] = [
  { id: "EVIS-001", eventId: "EVT-001", name: "Aisha Rahman", email: "aisha@techcorp.in", phone: "+91-98765-00001", company: "TechCorp India", avatar: "AR", active: true, badgeStatus: "sent", badgeSentDate: "2025-07-10", registeredDate: "2025-06-20" },
  { id: "EVIS-002", eventId: "EVT-001", name: "Dmitri Volkov", email: "dmitri@innovate.ru", phone: "+7-916-1234567", company: "Innovate Labs", avatar: "DV", active: true, badgeStatus: "not_sent", registeredDate: "2025-06-22" },
  { id: "EVIS-003", eventId: "EVT-001", name: "Maria Santos", email: "maria@verde.br", phone: "+55-11-98765432", company: "Verde Solutions", avatar: "MS", active: false, badgeStatus: "not_sent", registeredDate: "2025-06-25" },
  { id: "EVIS-004", eventId: "EVT-001", name: "James O'Brien", email: "james@dualtech.ie", phone: "+353-87-1234567", company: "DualTech Ireland", avatar: "JO", active: true, badgeStatus: "sent", badgeSentDate: "2025-07-10", registeredDate: "2025-06-18" },
  { id: "EVIS-005", eventId: "EVT-001", name: "Yuki Nakamura", email: "yuki@smartfab.jp", phone: "+81-90-12345678", company: "SmartFab Japan", avatar: "YN", active: true, badgeStatus: "not_sent", registeredDate: "2025-07-01" },
  { id: "EVIS-006", eventId: "EVT-001", name: "Chen Wei", email: "chen@globallink.cn", phone: "+86-138-12345678", company: "GlobalLink China", avatar: "CW", active: true, badgeStatus: "sent", badgeSentDate: "2025-07-12", registeredDate: "2025-06-28" },
  { id: "EVIS-007", eventId: "EVT-001", name: "Sarah Mitchell", email: "sarah@automize.us", phone: "+1-650-555-0134", company: "Automize Inc", avatar: "SM", active: false, badgeStatus: "not_sent", registeredDate: "2025-07-05" },
  { id: "EVIS-008", eventId: "EVT-001", name: "Ravi Krishnan", email: "ravi@datatrek.in", phone: "+91-94432-11223", company: "DataTrek", avatar: "RK", active: true, badgeStatus: "not_sent", registeredDate: "2025-07-08" },
  { id: "EVIS-009", eventId: "EVT-002", name: "Hans Muller", email: "hans@greenbau.de", phone: "+49-151-23456789", company: "GreenBau GmbH", avatar: "HM", active: true, badgeStatus: "sent", badgeSentDate: "2025-06-20", registeredDate: "2025-05-15" },
  { id: "EVIS-010", eventId: "EVT-002", name: "Anna Kowalski", email: "anna@ecodesign.pl", phone: "+48-500-123456", company: "EcoDesign Poland", avatar: "AK", active: true, badgeStatus: "not_sent", registeredDate: "2025-05-22" },
  { id: "EVIS-011", eventId: "EVT-003", name: "Felix Strauss", email: "felix@automotion.at", phone: "+43-660-1234567", company: "AutoMotion", avatar: "FS", active: true, badgeStatus: "sent", badgeSentDate: "2025-02-28", registeredDate: "2025-01-20" },
  { id: "EVIS-012", eventId: "EVT-004", name: "Mei Lin Tan", email: "meiling@healthnet.sg", phone: "+65-9234-5678", company: "HealthNet Asia", avatar: "MT", active: true, badgeStatus: "not_sent", registeredDate: "2025-07-15" },
  { id: "EVIS-013", eventId: "EVT-006", name: "Somchai Prasert", email: "somchai@foodinno.th", phone: "+66-81-2345678", company: "FoodInno Thailand", avatar: "SP", active: true, badgeStatus: "sent", badgeSentDate: "2025-05-20", registeredDate: "2025-04-18" },
];

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
  { href: "/contact", label: "Enquiry" },
];

/* ─── Hero stats ticker ─── */

export const heroStats: Stat[] = [
  { label: "Trade Fairs Hosted", value: "320+" },
  { label: "Exhibitors Onboarded", value: "12,000+" },
  { label: "Countries", value: "45" },
  { label: "Visitor Check-ins", value: "2.4M+" },
];

/* ─── Role cards ─── */

export const roleFeatures: RoleFeature[] = [
  {
    role: "Exhibitors",
    tagline: "Book your booth. Grow your pipeline.",
    icon: "🏗️",
    highlights: [
      "Browse & book stalls and booths at any trade fair",
      "Receive invoices & manage payments",
      "Track visitor engagement at your booth",
    ],
  },
  {
    role: "Organisers",
    tagline: "Run trade fairs like a pro.",
    icon: "📋",
    highlights: [
      "Create, edit & manage trade fairs end-to-end",
      "View exhibitors, visitors, sponsors & vendors",
      "Real-time dashboards & analytics",
    ],
  },
  {
    role: "Visitors",
    tagline: "Discover. Connect. Do business.",
    icon: "🎟️",
    highlights: [
      "Book trade fairs & receive QR-code e-tickets",
      "Browse exhibitor directory & fair details",
      "Message exhibitors or request a call",
    ],
  },
  {
    role: "Sponsors",
    tagline: "Maximise brand visibility at trade fairs.",
    icon: "💎",
    highlights: [
      "Browse available sponsorship packages per fair",
      "Claim & submit for organiser approval",
      "Secure payment after approval",
    ],
  },
  {
    role: "Vendors",
    tagline: "Deliver on time. Every trade fair.",
    icon: "🚚",
    highlights: [
      "View trade fair requirements & delivery timelines",
      "Ticket-based chat with organisers",
      "Close resolved tickets to track progress",
    ],
  },
];

/* ─── Platform features ─── */

export const features: Feature[] = [
  { title: "Unified Login", description: "One account, multiple roles. Sign in with email, Google, passkey, or SSO — then switch roles instantly." },
  { title: "Booth Booking", description: "Interactive stall and booth reservations at trade fairs with real-time availability and instant invoicing." },
  { title: "QR Ticketing", description: "Visitors receive QR-code e-tickets via email or SMS for frictionless trade fair check-in." },
  { title: "Smart Messaging", description: "In-platform direct messaging and call-request system between visitors and exhibitors." },
  { title: "Sponsorship Workflow", description: "End-to-end claim → approval → payment pipeline for trade fair sponsorships." },
  { title: "Vendor Ticket Board", description: "Kanban-style task boards for vendors with organiser chat and resolution tracking." },
];

/* ─── Testimonials ─── */

export const testimonials: Testimonial[] = [
  { quote: "We onboarded 200 exhibitors for our trade fair in under a week. The unified login made role management effortless.", name: "Natalie Chen", role: "Fair Director, FutureTech Expo", avatar: "NC" },
  { quote: "Sponsors loved the self-service claiming flow — it cut our trade fair sales cycle by 60%.", name: "Omar Rahman", role: "VP Partnerships, BuildSphere", avatar: "OR" },
  { quote: "Vendor coordination across trade fairs used to be chaos. The ticket board brought structure and accountability.", name: "Isabella Costa", role: "Head of Growth, Urban Industry Summit", avatar: "IC" },
];

export const booths: Booth[] = [
  { id: "A-01", hall: "Hall A", size: "6x6", price: "$1,400", status: "available" },
  { id: "A-02", hall: "Hall A", size: "6x6", price: "$1,400", status: "reserved" },
  { id: "A-03", hall: "Hall A", size: "6x6", price: "$1,400", status: "available" },
  { id: "B-10", hall: "Hall B", size: "8x8", price: "$2,100", status: "available" },
  { id: "B-11", hall: "Hall B", size: "8x8", price: "$2,100", status: "reserved" },
  { id: "C-04", hall: "Hall C", size: "10x10", price: "$2,900", status: "available" },
  { id: "C-05", hall: "Hall C", size: "10x10", price: "$2,900", status: "available" },
  { id: "D-07", hall: "Hall D", size: "12x12", price: "$3,600", status: "reserved" },
];

export const leads: Lead[] = [
  { id: "LD-1001", contact: "Avery Kim", company: "Nexa Systems", interest: "Enterprise kiosk setup", score: "Hot" },
  { id: "LD-1002", contact: "Liam Rossi", company: "VoltGrid", interest: "Distributor partnership", score: "Warm" },
  { id: "LD-1003", contact: "Mina Ahmed", company: "Aria Mobility", interest: "Smart booth analytics", score: "Hot" },
  { id: "LD-1004", contact: "Jonas Meyer", company: "Hexa Industry", interest: "Lead capture hardware", score: "Cold" },
];

export const exhibitors: Exhibitor[] = [
  { id: "EX-01", name: "Nexa Systems", industry: "Industrial IoT", location: "Berlin", shortDescription: "Connected machinery monitoring platform for modern factories." },
  { id: "EX-02", name: "VoltGrid", industry: "Energy Tech", location: "Amsterdam", shortDescription: "Smart infrastructure for EV charging and energy optimization." },
  { id: "EX-03", name: "Aria Mobility", industry: "Mobility", location: "Stockholm", shortDescription: "Autonomous fleet management with safety-first AI controls." },
  { id: "EX-04", name: "Hexa Industry", industry: "Automation", location: "Toronto", shortDescription: "Robotics and automation suites for warehouse operations." },
  { id: "EX-05", name: "BlueForge", industry: "Manufacturing SaaS", location: "Austin", shortDescription: "Production analytics and supplier collaboration workspace." },
  { id: "EX-06", name: "AtlasBio", industry: "Biotech", location: "Singapore", shortDescription: "Lab automation tools for scale-ready clinical research teams." },
];

export const organizerStats = [
  { label: "Total Visitors", value: "8,420", growth: "+11.2%" },
  { label: "Leads Captured", value: "2,184", growth: "+18.4%" },
  { label: "Meetings Booked", value: "712", growth: "+9.6%" },
];

export const pricingTiers = [
  {
    name: "Basic",
    price: "$99",
    description: "Best for small events launching digital workflows.",
    features: ["Up to 30 exhibitors", "Booth map view", "Core lead capture", "Email support"],
  },
  {
    name: "Pro",
    price: "$299",
    description: "For fast-growing events that need deeper engagement.",
    features: ["Up to 120 exhibitors", "Meeting scheduler", "Advanced lead scoring", "Performance analytics"],
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Tailored workflows and integrations for global exhibitions.",
    features: ["Unlimited exhibitors", "CRM integrations", "Custom branding", "Dedicated success manager"],
  },
];
