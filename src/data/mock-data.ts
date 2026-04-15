export type Feature = {
  title: string;
  description: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
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

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/visitor-experience", label: "Visitors" },
  { href: "/pricing", label: "Pricing" },
  { href: "/contact", label: "Request Demo" },
  { href: "/login", label: "Login" },
];

export const features: Feature[] = [
  { title: "Booth Booking", description: "Interactive map-based booth reservations with instant availability updates." },
  { title: "Lead Capture", description: "Collect, score, and export high-intent buyer leads in one place." },
  { title: "Networking", description: "Streamline meeting requests between exhibitors, buyers, and partners." },
  { title: "Analytics", description: "Real-time dashboards for attendance, booth performance, and ROI tracking." },
];

export const testimonials: Testimonial[] = [
  { quote: "We cut exhibitor onboarding time by 40% in one event cycle.", name: "Natalie Chen", role: "Event Director, FutureTech Expo" },
  { quote: "Lead quality improved immediately thanks to structured meeting workflows.", name: "Omar Rahman", role: "VP Partnerships, BuildSphere" },
  { quote: "A polished experience that made sponsors confident from day one.", name: "Isabella Costa", role: "Head of Growth, Urban Industry Summit" },
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
