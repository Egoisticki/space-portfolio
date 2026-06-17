export const personalInfo = {
name: "Mohamed Hamidat",
fullName: "Mohamed Abdallah Hamidat",
initials: "MH",
title: "Full-Stack Developer",
tagline: "Full-Stack Developer & Aspiring AI Engineer",
roles: [
"Full-Stack Developer",
"Software Developer",
"Aspiring AI Engineer",
],
location: "Algeria / building globally",
email: "moha15252@gmail.com",
phone: "+213 655 016 316",
github: "https://github.com/Egoisticki",
linkedin: "https://www.linkedin.com/in/mohamed-abdallah-hamidat",
website: "https://hamidatmohamedabdallah.dev",
stats: [
{ label: "Experience", value: "2+ years" },
{ label: "Focus", value: "Full-stack products" },
{ label: "Strength", value: "Enterprise workflows" },
{ label: "Now", value: "AI engineering" },
],
}

export const sectionHeadings = {
skills: {
label: "Capabilities",
title: "A stack shaped around real products.",
subtitle:
"Frontend polish, backend reliability, data structure, AI experimentation, and product thinking working together.",
},
experience: {
label: "Experience",
title: "Real systems, real teams, real workflows.",
subtitle:
"Enterprise platforms, internships, club leadership, and production-minded software delivery.",
},
education: {
label: "Education",
title: "Academic foundation for intelligent software.",
subtitle:
"Computer science, artificial intelligence, deep learning, and software engineering at USTHB.",
},
blog: {
label: "Blog",
title: "Notes, events, and certificates.",
subtitle:
"A social-style feed of what I am learning, building, organizing, and sharing.",
},
}

export const about = {
eyebrow: "ABOUT",
title: "Mohamed Hamidat",
caption: "Full-stack developer",
location: "Based in Algeria",
portrait: "/profile.jpg",
portraitAlt: "Portrait of Mohamed Hamidat",
portraitFallback: "Add src/assets/profile.jpg",
description: [
"I’m a full-stack developer and Master’s student focused on building SaaS platforms, enterprise systems, and AI tools.",
"I care about turning real workflows into clean, reliable products from interface design to backend architecture and deployment.",
],
focus:
"Currently focused on Charikti, enterprise business software, and development workflows.",
chips: [
"SaaS Platforms",
"Enterprise Systems",
"AI Tools",
"Frontend",
"Backend APIs",
"Product UI",
],
currentlyTitle: "Currently",
currently: [
"Building Charikti",
"Studying AI at USTHB",
"Contributing to Open Minds Club",
"Exploring AI and Deep Learning",
],
}

export const projects = [
{
id: "charikti",
title: "Charikti",
category: "SaaS",
type: "Business Management Platform",
period: "2026 — Present",
description:
"A SaaS platform designed to simplify company management through workflows, teams, requests, control, and reporting.",
longDescription:
"Charikti is my long-term SaaS project focused on helping companies manage internal operations from one clean workspace. The product direction includes administrative requests, team management, workflows, control layers, and reporting — built around the idea of making business management simpler and more structured.",
features: [
"Business workflow management direction",
"Team and employee organization modules",
"Requests and approvals concept",
"Reports and control dashboard direction",
"Custom visual identity and app branding",
"Designed as a scalable Algerian-friendly SaaS product",
],
tech: ["React", "Vue.js", "NestJS", "PostgreSQL", "TypeScript", "SaaS"],
image: "/projects/charikti-brand.png",
imageAlt: "Charikti visual identity and SaaS branding",
liveUrl: "",
githubUrl: "",
privateRepo: true,
status: "In Development",
color: "#2563eb",
gradient: "from-blue-950 via-slate-950 to-cyan-950",
},
{
id: "bea-management-platform",
title: "BEA Administrative & Leave Platform",
category: "Enterprise",
type: "Internship Project",
period: "Jan 2025 — Jun 2025",
description:
"A full-stack enterprise platform built during my BEA internship to digitize internal correspondence and employee leave workflows.",
longDescription:
"Developed during my internship at Banque Extérieure d'Algérie, this platform digitizes internal correspondence management and employee leave workflows. It includes role-based access, document tracking, assignment workflows, leave management, live status updates, and real-time SSE notifications for a smoother paperless administrative process.",
features: [
"Employee leave management workflows",
"Internal correspondence digitization",
"Role-based access control",
"Document tracking and assignment flows",
"Real-time notifications with SSE",
"Responsive interface for HR staff, managers, and employees",
],
tech: ["Spring Boot", "Next.js", "PostgreSQL", "JWT Auth", "SSE", "REST APIs"],
image: "/projects/bea-platform.png",
imageAlt: "BEA administrative and leave management platform login screen",
liveUrl: "https://bea-gestion.netlify.app/login",
githubUrl: "",
privateRepo: true,
status: "Private Repository",
color: "#2563eb",
gradient: "from-blue-950 via-slate-950 to-sky-950",
},
{
id: "mp-industry-mission-orders",
title: "2MP Industry Mission Order Platform",
category: "Enterprise",
type: "Internal Business System",
period: "Jun 2024 — Dec 2024",
description:
"A custom internal platform for 2MP Industry that replaced paper-based mission orders with digital workflows, tracking, and PDF generation.",
longDescription:
"As IT Manager and Software Developer at 2MP Industry, I designed and developed an internal platform for mission order management. The system replaced manual paper-based workflows with digital creation, validation, tracking, PDF generation, archiving, and administrative monitoring.",
features: [
"Mission order creation workflow",
"Multi-step validation and approval",
"Automated PDF generation",
"Mission history and tracking dashboards",
"Secure archiving of administrative records",
"User onboarding, training, and system maintenance",
],
tech: ["NestJS", "JavaScript", "PostgreSQL", "PDF Generation", "RBAC"],
image: "/projects/2mp-mission-order.png",
imageAlt: "2MP Industry mission order management system showcase",
liveUrl: "",
githubUrl: "",
privateRepo: true,
status: "Private Enterprise Project",
color: "#f59e0b",
gradient: "from-yellow-950 via-slate-950 to-zinc-950",
},
{
id: "hilex-medical-ecommerce",
title: "HiLex Medical E-Commerce",
category: "E-Commerce",
type: "Client-Facing Platform",
period: "2025",
description:
"A medical-device e-commerce platform for hearing aids, prosthetic products, and healthcare accessories with a complete admin dashboard.",
longDescription:
"HiLex is a client-facing e-commerce platform built for a medical device business specializing in hearing aids and related healthcare products. The platform includes product browsing, cart and checkout flows, dynamic product management, and an administration dashboard for managing products, orders, customers, and categories.",
features: [
"Responsive medical e-commerce storefront",
"Dynamic product catalog and filtering",
"Cart and checkout experience",
"Product detail pages for hearing devices",
"Admin dashboard for products, orders, customers, and categories",
"Backend API and database structure for business operations",
],
tech: ["Vue.js", "NestJS", "PostgreSQL", "TypeORM", "JWT Auth", "Admin Dashboard"],
image: "/projects/hilex-medical.png",
imageAlt:
"HiLex medical e-commerce platform showcase with storefront and admin dashboard screens",
liveUrl: "",
githubUrl: "",
privateRepo: true,
status: "Private Repository",
color: "#2563eb",
gradient: "from-blue-950 via-slate-950 to-orange-950",
},
{
id: "hypertempnet",
title: "HyperTempNet",
category: "AI / Deep Learning",
type: "Master’s Thesis Project",
period: "2024 — 2025",
description:
"A deep learning research project for crop mapping from multitemporal Sentinel-2 satellite imagery using environmental covariates and FiLM conditioning.",
longDescription:
"HyperTempNet is a research project focused on automatic agricultural crop classification from Sentinel-2 time-series data. The work reproduces MCTNet, studies environmental covariate integration, then proposes a new architecture using SpectralSE, DAPSF, FiLM conditioning, HyperNet, and LTAE to improve crop mapping performance on imbalanced datasets.",
features: [
"Reimplemented MCTNet for satellite time-series crop classification",
"Integrated 12 environmental covariates including climate, soil, and topography",
"Designed HyperTempNet with SpectralSE, DAPSF, FiLM, HyperNet, and LTAE",
"Achieved 89.28% OA and 90.00% F1-macro on California",
"Compared Arkansas and California results through ablation studies",
],
tech: [
"Python",
"PyTorch",
"Deep Learning",
"CNN",
"Transformer",
"Computer Vision",
"Sentinel-2",
"Remote Sensing",
],
metrics: [
"89.28% OA on California",
"90.00% F1-macro on California",
"95.88% OA on Arkansas",
"0.959 F1-macro on Arkansas",
],
image: "/projects/hypertempnet.png",
imageAlt:
"Abstract satellite crop mapping visualization with neural network overlays",
liveUrl: "",
githubUrl: "https://github.com/Egoisticki/project-ReseauNeur",
privateRepo: false,
color: "#22d3ee",
gradient: "from-emerald-950 via-slate-950 to-cyan-950",
},
{
id: "pexelis-hackathon-2026",
title: "PEXELIS Hackathon 2026 Platform",
category: "Event Platform",
type: "Community & Web Development",
period: "February 2026",
description:
"Official platform for PEXELIS Hackathon 2026, supporting participant experience, event operations, and digital engagement.",
longDescription:
"As Organizer and Co-Main Developer of PEXELIS Hackathon 2026, I contributed to both the operational management and technical development of the event. I helped architect and build the official platform using React and Vite, focusing on performance, modularity, and a responsive production-ready experience for participants.",
features: [
"Responsive event website",
"Performance-optimized React architecture",
"Modular component structure",
"Participant-facing interface",
"Production deployment",
"Hackathon digital presence",
],
tech: ["React", "Vite", "JavaScript", "CSS", "Responsive Design"],
role: ["Organizer", "Co-Main Developer"],
image: "/projects/pexelis.png",
imageAlt: "PEXELIS Hackathon 2026 official website",
liveUrl: "https://pexelis.openmindsclub.net/",
githubUrl: "",
privateRepo: true,
status: "Club Project",
color: "#8b5cf6",
gradient: "from-violet-950 via-slate-950 to-cyan-950",
},
{
id: "imprimerie-calculator",
title: "Imprimerie Calculator",
category: "Desktop Application",
type: "Business Tool",
period: "2025",
description:
"A desktop application for printing houses that optimizes paper layouts, calculates production costs, and estimates printing resources for book manufacturing.",
longDescription:
"Imprimerie Calculator is a PySide6 desktop application designed for printing businesses. It computes optimal sheet layouts, paper usage, plate requirements, and printing costs based on book dimensions, page counts, margins, and color configurations. The system helps reduce waste and streamline production planning.",
features: [
"Optimal sheet layout computation",
"Automatic paper usage calculation",
"Printing plate estimation",
"Production cost calculation",
"Support for 1, 2, and 4-color printing",
"Arabic user interface for local businesses",
"Book manufacturing optimization",
],
tech: ["Python", "PySide6", "Desktop Development", "Algorithms", "UI Design"],
image: "/projects/imprimerie-calculator.png",
imageAlt: "Arabic desktop application for printing optimization and cost calculation",
liveUrl: "",
githubUrl: "",
privateRepo: true,
status: "Private Repository",
color: "#38bdf8",
gradient: "from-sky-950 via-slate-950 to-blue-950",
},
{
id: "thyroid-nodule-prediction",
title: "Thyroid Nodule Prediction Platform",
category: "AI Healthcare",
type: "Medical AI Application",
period: "2024",
description:
"A web platform for thyroid nodule analysis using deep learning models for medical image prediction and segmentation.",
longDescription:
"This project combines deep learning and healthcare to assist in thyroid nodule analysis. The system allows users to upload medical images, perform automated prediction, and use segmentation models for enhanced interpretation. The platform integrates trained PyTorch models into a Flask-based web application.",
features: [
"Medical image upload workflow",
"AI-powered thyroid nodule prediction",
"Image segmentation using U-Net",
"User authentication system",
"Model inference through PyTorch",
"Interactive web interface",
],
tech: ["Python", "Flask", "PyTorch", "U-Net", "Computer Vision", "Deep Learning"],
image: "/projects/thyroid-ai.png",
imageAlt: "AI-powered medical image analysis for thyroid nodules",
liveUrl: "",
githubUrl: "",
privateRepo: true,
status: "Private Repository",
color: "#3b82f6",
gradient: "from-blue-950 via-slate-950 to-sky-950",
},
{
id: "tcp-udp-port-scanner",
title: "TCP/UDP Port Scanner",
category: "Networking",
type: "Desktop Utility",
period: "2024",
description:
"A desktop application for scanning TCP and UDP ports on local machines or devices within the same network.",
longDescription:
"A GUI-based network utility built with Python and the socket library. It allows users to scan TCP and UDP ports within a specified range, detect open services, and inspect basic responses from local or same-network devices. The project demonstrates networking fundamentals, socket programming, and desktop GUI development.",
features: [
"TCP port scanning",
"UDP port scanning",
"Custom port range selection",
"Open/closed port detection",
"Service response inspection",
"Graphical desktop interface",
],
tech: ["Python", "Sockets", "Networking", "GUI Development"],
image: "/projects/port-scanner.png",
imageAlt: "TCP and UDP port scanner desktop application",
liveUrl: "",
githubUrl: "https://github.com/Egoisticki/portScanner",
privateRepo: false,
color: "#22d3ee",
gradient: "from-cyan-950 via-slate-950 to-blue-950",
},
]

export const skills = {
groups: [
{
title: "Frontend Engineering",
description:
"Modern interfaces with responsive layouts, clean component structure, and polished user experience.",
items: ["HTML5", "CSS3 / SCSS", "TailwindCSS", "JavaScript", "TypeScript", "Vue.js", "React", "Next.js"],
},
{
title: "Backend and APIs",
description:
"Secure APIs, role-based workflows, business logic, and deployment-ready backend structure.",
items: ["Node.js", "NestJS", "Express.js", "Spring Boot", "Flask", "JWT Auth", "REST APIs"],
},
{
title: "Data and Infrastructure",
description:
"Database schemas, persistence layers, tooling, and infrastructure choices for real applications.",
items: ["PostgreSQL", "MongoDB", "MySQL", "TypeORM", "Docker", "Linux", "Azure VMs"],
},
{
title: "AI and Computer Vision",
description:
"Deep learning experimentation, model training, medical image analysis, and remote-sensing research.",
items: ["PyTorch", "CNN", "Conv2D", "Conv3D", "U-Net", "Computer Vision", "Data Preprocessing"],
},
{
title: "Product and Systems Thinking",
description:
"Turning workflows into structured interfaces, reliable systems, and software people can use every day.",
items: ["System Design", "Design Patterns", "SSE", "WebSockets", "Dashboards", "Enterprise Workflows"],
},
],
}

export const education = [
{
degree: "Master’s Degree in Artificial Intelligence",
institution: "University of Science and Technology Houari Boumediene (USTHB)",
period: "2025 — Present",
description:
"In progress, focused on artificial intelligence, deep learning, intelligent systems, and advanced computing.",
},
{
degree: "Bachelor’s Degree in Computer Science",
institution: "University of Science and Technology Houari Boumediene (USTHB)",
period: "Completed 2025",
description:
"Foundation in algorithms, databases, operating systems, software engineering, web development, and computer science fundamentals.",
},
]

export const experience = [
{
role: "IT Manager & Software Developer",
organization: "2MP Industry",
location: "Blida, Algeria",
period: "Jun 2024 — Dec 2024",
bullets: [
"Oversaw IT infrastructure, internal systems, and digital tools supporting daily company operations.",
"Designed and developed a custom mission order management platform to replace paper-based workflows.",
"Implemented mission creation, multi-step approval, real-time tracking, PDF generation, and secure archiving.",
"Built role-based access, mission history dashboards, and monitoring panels for management and compliance.",
"Handled user onboarding, training, maintenance, and operational support during the project lifecycle.",
],
tags: ["Enterprise", "NestJS", "PostgreSQL", "Workflow Automation"],
},
{
role: "Full-Stack Developer Intern",
organization: "Banque Extérieure d'Algérie (BEA)",
location: "Algeria",
period: "Jan 2025 — Jun 2025",
bullets: [
"Developed a full-stack enterprise platform for internal correspondence and employee leave workflows.",
"Built Spring Boot REST APIs with role-based access control and PostgreSQL database design.",
"Implemented a responsive Next.js interface for HR staff, managers, and employees.",
"Integrated real-time SSE notifications, document tracking, assignment workflows, and live status updates.",
"Collaborated with stakeholders to gather requirements, iterate on features, and deliver within a 6-month internship.",
],
tags: ["Spring Boot", "Next.js", "PostgreSQL", "SSE"],
},
{
role: "IT Member & Event Organizer",
organization: "Open Minds Club — USTHB",
location: "Algiers, Algeria",
period: "Sep 2024 — Present",
bullets: [
"Active member of the IT division of Open Minds, a scientific and tech-focused student club at USTHB.",
"Designed and developed official websites for major club events including PEXELIS and Ideathon.",
"Contributed to event planning, logistics, on-site coordination, and digital execution.",
"Collaborated with design, communication, and logistics teams to deliver strong event experiences.",
"Supported the club’s technical capabilities through web development and IT-related assistance.",
],
tags: ["Open Minds Club", "React", "Events", "Community"],
},
]

export const blogPosts = [

{
  id: "pexelis-hackathon-2026",
  type: "Event",
  title: "Organizer & Co-Main Developer — PEXELIS Hackathon 2026",
  date: "Feb 2026",
  author: "Mohamed Hamidat",
  excerpt:
    "Served as Organizer and Co-Main Developer for PEXELIS Hackathon 2026, contributing to both event operations and development of the official platform.",
  content: [
    "I had the privilege of serving as an Organizer and Co-Main Developer for PEXELIS Hackathon 2026, contributing to both the operational execution and the digital backbone of the event.",
    "Being involved at both strategic and technical levels allowed me to combine coordination, leadership, and hands-on development to help deliver a high-impact tech experience.",
    "As Co-Main Developer of the official website, I helped architect and build the platform using React and Vite, focusing on performance, modularity, and a production-ready user experience.",
    "This experience strengthened my skills in software engineering, teamwork, event organization, and technical leadership."
  ],
  tags: [
    "PEXELIS",
    "Open Minds Club",
    "React",
    "Vite",
    "Hackathon",
    "Leadership"
  ],
  image: "/blog/pexelis.png",
  gallery: [
    "/blog/pexelis-certificate.png",
    "/blog/pexelis.png"
  ],
  link:
    "https://www.linkedin.com/posts/mohamed-abdallah-hamidat_openmindclub-pexelis-hackathon-ugcPost-7430606022697754624-_V6S/",
  featured: true
},
{
  id: "ideathon-open-minds-2025",
  type: "Event",
  title: "Organizer at IDEATHON by Open Minds Club",
  date: "2025",
  author: "Mohamed Hamidat",
  excerpt:
    "Contributed as an organizer for IDEATHON by Open Minds Club, helping create an environment that encourages innovation and collaboration.",

  content: [
    "I contributed as an Organizer in the IDEATHON event organized by Open Minds Club.",
    "Being part of the organizing team strengthened my skills in teamwork, coordination, and event management while supporting an environment that encourages innovation, creativity, and problem-solving.",
    "This experience taught me how technical communities are built and how impactful events rely on strong collaboration and organization.",
    "I look forward to contributing to more initiatives that bring students and technology together."
  ],

  tags: [
    "Open Minds Club",
    "IDEATHON",
    "Event Organization",
    "Leadership",
    "Community"
  ],

  image: "/blog/ideathon-omc.png",

  gallery: [
    "/blog/ideathon-omc.png",
    "/blog/ideathon-certificate.png"
  ],

  link:
    "https://www.linkedin.com/posts/mohamed-abdallah-hamidat_ideathon-openmindsclub-eventorganization-activity-7409592367529291777-2xKg?utm_source=share&utm_medium=member_ios",

  featured: true
},
{
  id: "usthb-graduation-bea",
  type: "Achievement",
  title: "Graduating in Computer Science and Delivering the BEA Project",
  date: "Jun 2025",
  author: "Mohamed Hamidat",

  excerpt:
    "Graduated with a Bachelor's degree in Computer Science from USTHB while delivering a full-stack enterprise platform in collaboration with Banque Extérieure d'Algérie.",

  content: [
    "I officially graduated with a Bachelor's degree in Computer Science from USTHB.",
    "As our final-year project, our team developed a full-stack platform for managing administrative correspondence, leave requests, and employee absences in collaboration with Banque Extérieure d'Algérie (BEA).",
    "This project allowed me to apply software engineering principles in a real professional environment while strengthening my skills in backend development, architecture, teamwork, and project delivery.",
    "I am grateful to my teammates, supervisors, and BEA for providing an enriching and impactful experience."
  ],

  tags: [
    "USTHB",
    "Graduation",
    "Computer Science",
    "BEA",
    "Full-Stack",
    "Enterprise Software"
  ],

  image: "/blog/usthb-graduation.png",

  gallery: [
    "/blog/usthb-graduation.png",
    "/blog/bea-report-cover.png"
  ],

  link:
    "https://www.linkedin.com/posts/mohamed-abdallah-hamidat_usthb-license-computerscience-activity-7337911444799115266-nx5e",

  featured: true
},
{
  id: "regional-judo-referee-2025",
  type: "Achievement",
  title: "Official Referee at Regional Judo Championships",
  date: "Feb 2025",
  author: "Mohamed Hamidat",

  excerpt:
    "Served as an official referee during regional judo championships, combining discipline, fairness, and leadership in competitive sports.",

  content: [
    "I had the honor of officiating as a referee at the Regional Judo Championships held in Blida Province during February 2025.",
    "The events included both individual and team competitions across junior and senior categories.",
    "Being a referee requires concentration, integrity, quick decision-making, and responsibility under pressure.",
    "Beyond software engineering, judo has helped shape my discipline, leadership, and commitment to continuous improvement."
  ],

  tags: [
    "Judo",
    "Referee",
    "Leadership",
    "Discipline",
    "Sports"
  ],

  image: "/blog/judo-competition.png",

  gallery: [
    "/blog/judo-referee-2025.png",
    "/blog/judo-competition.png"
  ],

  link:
    "https://www.linkedin.com/posts/mohamed-abdallah-hamidat_judo-activity-7294052178518839296-Ltxn",

  featured: false
}
]
