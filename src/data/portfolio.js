// src/data/portfolio.js

export const personalInfo = {
  name: "Alex Nova",
  title: "Full Stack Developer",
  roles: [
    "Full Stack Developer",
    "UI Engineer",
    "React Specialist",
    "Three.js Artist",
    "Space Enthusiast",
  ],
  bio: `Navigating the digital cosmos for 5+ years, I build interfaces 
that feel alive. Obsessed with the intersection of performance and aesthetics — 
turning complex engineering challenges into experiences that feel effortless.`,
  bioExtra: `When I'm not deploying to production, I'm exploring generative art, 
contributing to open source, and dreaming up new ways to push the web forward.`,
  location: "Station Alpha, Earth Orbit",
  email: "alex@stellardev.io",
  github: "https://github.com/alexnova",
  linkedin: "https://linkedin.com/in/alexnova",
  twitter: "https://twitter.com/alexnova",
  stats: [
    { label: "YEARS ACTIVE", value: 5, suffix: "+" },
    { label: "PROJECTS SHIPPED", value: 32, suffix: "" },
    { label: "TECHNOLOGIES", value: 14, suffix: "" },
    { label: "CUPS OF COFFEE", value: 9847, suffix: "" },
  ],
};

export const projects = [
  {
    id: 1,
    title: "NebulaChat",
    category: "Full Stack",
    planet: "🔵",
    description:
      "Real-time messaging platform supporting 10k concurrent users with end-to-end encryption and sub-100ms latency.",
    longDescription:
      "NebulaChat was born out of frustration with existing platforms that sacrifice privacy for convenience. Built on a microservices architecture, it handles 10,000 concurrent connections with sub-100ms message delivery via WebSockets and Redis pub/sub. The UI features a dark-glass aesthetic with smooth message animations.",
    features: [
      "End-to-end encryption via libsodium",
      "File & media sharing with CDN delivery",
      "Voice & video channels via WebRTC",
      "Custom emoji & reaction system",
      "Full-text message search",
    ],
    tech: ["React", "Socket.io", "Node.js", "Redis", "PostgreSQL"],
    color: "#00f5ff",
    gradient: "from-cyan-900 to-blue-950",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 2,
    title: "OrbitDash",
    category: "Frontend",
    planet: "🟣",
    description:
      "Analytics dashboard with real-time data visualization, serving 2M data points with 60fps chart rendering.",
    longDescription:
      "OrbitDash transforms raw telemetry data into actionable insights. Built with a custom WebGL-accelerated rendering pipeline on top of D3.js, it handles 2 million data points without breaking a sweat. The dashboard updates in real-time via SSE streams.",
    features: [
      "WebGL-accelerated chart rendering",
      "Real-time SSE data streaming",
      "Custom drag-and-drop layout",
      "Multi-tenant data isolation",
      "Export to PDF/CSV/PNG",
    ],
    tech: ["Vue", "D3.js", "Python", "FastAPI", "PostgreSQL"],
    color: "#7b2fff",
    gradient: "from-violet-900 to-purple-950",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 3,
    title: "StarMap API",
    category: "Backend",
    planet: "🟠",
    description:
      "High-performance REST + GraphQL API serving 2M astronomy data points with intelligent caching.",
    longDescription:
      "StarMap API aggregates data from 12 astronomical databases and exposes it through a unified REST and GraphQL interface. Redis caching with intelligent cache invalidation keeps p99 latency under 50ms for 95% of queries.",
    features: [
      "REST + GraphQL dual interface",
      "Redis multi-layer caching",
      "Rate limiting per API key",
      "Webhook event subscriptions",
      "OpenAPI 3.0 documentation",
    ],
    tech: ["Python", "FastAPI", "Redis", "Docker", "AWS"],
    color: "#ff9a3c",
    gradient: "from-orange-900 to-amber-950",
    liveUrl: "#",
    githubUrl: "#",
  },
  {
    id: 4,
    title: "VoidCMS",
    category: "Full Stack",
    planet: "🟢",
    description:
      "Headless CMS with visual drag-and-drop page builder and real-time collaborative editing.",
    longDescription:
      "VoidCMS reimagines content management for developer-first teams. The visual page builder uses a block-based approach with a live preview pane. Collaborative editing is powered by CRDT (Yjs) for conflict-free merging.",
    features: [
      "Drag-and-drop block editor",
      "Real-time collaborative editing (CRDT)",
      "Custom field types & validations",
      "Multi-language content support",
      "One-click Vercel/Netlify deploy",
    ],
    tech: ["Next.js", "TypeScript", "Sanity", "Tailwind", "Vercel"],
    color: "#00ff88",
    gradient: "from-emerald-900 to-teal-950",
    liveUrl: "#",
    githubUrl: "#",
  },
];

export const skills = {
  inner: [
    { name: "React", icon: "⚛️", level: 95, color: "#61dafb" },
    { name: "Node.js", icon: "🟢", level: 88, color: "#68a063" },
    { name: "TypeScript", icon: "TS", level: 90, color: "#3178c6" },
    { name: "Python", icon: "🐍", level: 82, color: "#3572a5" },
    { name: "Three.js", icon: "3D", level: 75, color: "#00f5ff" },
  ],
  middle: [
    { name: "PostgreSQL", icon: "🐘", level: 85, color: "#336791" },
    { name: "MongoDB", icon: "🍃", level: 80, color: "#47a248" },
    { name: "Docker", icon: "🐳", level: 78, color: "#2496ed" },
    { name: "AWS", icon: "☁️", level: 72, color: "#ff9900" },
    { name: "Vue", icon: "V", level: 76, color: "#42b883" },
    { name: "GraphQL", icon: "◈", level: 70, color: "#e535ab" },
  ],
  outer: [
    { name: "Figma", icon: "F", level: 85, color: "#f24e1e" },
    { name: "Redis", icon: "R", level: 68, color: "#dc382d" },
    { name: "Next.js", icon: "▲", level: 88, color: "#ffffff" },
    { name: "FastAPI", icon: "⚡", level: 74, color: "#009688" },
  ],
};

export const experience = [
  {
    date: "2023 — Present",
    role: "Senior Frontend Developer",
    company: "NovaTech Industries",
    location: "Remote",
    type: "work",
    achievements: [
      "Led migration from CRA to Vite, 4x build speed improvement",
      "Built design system used across 8 product teams",
      "Mentored 3 junior developers to mid-level promotions",
      "Introduced WebGL visualizations, boosting engagement 40%",
    ],
    tech: ["React", "TypeScript", "Three.js", "AWS"],
  },
  {
    date: "2021 — 2023",
    role: "Full Stack Developer",
    company: "Orbital Systems",
    location: "San Francisco, CA",
    type: "work",
    achievements: [
      "Architected microservices handling 50k requests/minute",
      "Reduced API latency 60% with Redis caching strategy",
      "Shipped real-time analytics dashboard (2M data points)",
    ],
    tech: ["Vue", "Node.js", "PostgreSQL", "Docker"],
  },
  {
    date: "2020 — 2021",
    role: "Junior Developer",
    company: "Stargate Studios",
    location: "New York, NY",
    type: "work",
    achievements: [
      "Shipped 6 client projects on-time and under budget",
      "Built internal tooling that saved the team 10hr/week",
    ],
    tech: ["React", "Python", "Django"],
  },
  {
    date: "2016 — 2020",
    role: "B.Sc. Computer Science",
    company: "University of the Cosmos",
    location: "Boston, MA",
    type: "education",
    achievements: [
      "Graduated Summa Cum Laude (GPA 3.9/4.0)",
      "Thesis: WebGL Rendering Optimization for Real-Time Data",
    ],
    tech: ["C++", "OpenGL", "Python"],
  },
];
