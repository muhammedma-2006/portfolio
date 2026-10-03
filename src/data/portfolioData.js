/**
 * Portfolio Data for Muhammed M A
 * 
 * Edit all portfolio content, links, project details, and skills from this single file.
 * To replace project mockups with real screenshots:
 * 1. Place your image file in the `public/projects/` directory (e.g., `public/projects/bloodlink.png`)
 * 2. Set the `image` property in the respective project object to `/projects/your-image.png`
 */

export const personalData = {
  name: "Muhammed M A",
  initials: "MA",
  headline: "Information Technology Student & Web Developer",
  status: "Open for Internships & Projects",
  location: "India",
  bio: {
    short: "I build responsive web applications and practical full-stack projects with React, Node.js, Express, and MongoDB.",
    aboutPrimary: "I am an Information Technology student in India focused on building practical, production-ready web software. Rather than treating web development as surface-level aesthetics, I focus on the end-to-end flow: from responsive, accessible interfaces to clean REST APIs, structured database schemas, and reliable authentication systems.",
    aboutSecondary: "My technical growth comes from building, debugging, and iterating on real applications. When something breaks, I trace the problem through server logs, network payloads, and database queries to understand why. I'm actively deepening my expertise in backend engineering, modular architecture, and modern full-stack workflows."
  },
  socialLinks: {
    github: "https://github.com/muhammedma-2006",
    linkedin: "https://www.linkedin.com/in/muhammed-m-a-8a8627264/",
    instagram: "https://www.instagram.com/_mishab_m_a/",
    email: "muhammedmaponnani@gmail.com", // EDIT: Update with your primary email address
    resume: "/resume.pdf", // EDIT: Place your resume PDF in `public/resume.pdf`
  },
  stats: [
    { label: "Focus", value: "Full-Stack & APIs" },
    { label: "Core Stack", value: "MERN" },
    { label: "Approach", value: "Product-Driven" },
    { label: "Status", value: "IT Student" },
  ]
};

export const navigationLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
];

export const focusAreas = [
  {
    title: "Backend APIs & Services",
    description: "Designing RESTful routes, modular controller architecture, request validation, and error-handling middleware in Node.js and Express.",
    icon: "Server"
  },
  {
    title: "Authentication & Security",
    description: "Implementing stateless JWT sessions, bcrypt password hashing, role-based route protection, and sanitized inputs.",
    icon: "ShieldCheck"
  },
  {
    title: "Database Modeling",
    description: "Structuring scalable MongoDB documents with Mongoose validation, indexing strategies, and relational schema designs in MySQL.",
    icon: "Database"
  },
  {
    title: "Responsive Frontend",
    description: "Creating accessible, high-performance interfaces with React, modern Tailwind CSS, clean component boundaries, and semantic HTML.",
    icon: "Layout"
  }
];

export const projects = [
  {
    id: "blood-link",
    title: "Blood Link",
    category: "Full-stack web application",
    badge: "Featured Full-Stack",
    description: "A blood donation and management platform designed to connect donors, recipients, and blood-bank workflows.",
    problemStatement: "During medical emergencies, finding verified blood donors with compatible blood types is critical. Blood Link streamlines this by creating a centralized registry with role-based access for donors, hospitals, and coordinators.",
    stack: ["Node.js", "Express.js", "MongoDB", "Mongoose", "JWT", "bcrypt", "REST API"],
    highlights: ["Authentication", "Database Design", "Backend API Development"],
    
    // PLACEHOLDER IMAGE URL:
    // To use your own screenshot, place the file in /public/projects/blood-link.png
    // and set image: "/projects/blood-link.png". If null/empty, a rich interactive browser mockup will render.
    image: "./projects/BloodLink.png", 
    mockupType: "bloodlink",
    
    liveUrl: "https://blood-link-gules.vercel.app/", // EDIT: Replace with deployed URL or set to null
    githubUrl: "https://github.com/muhammedma-2006/BloodLink", // EDIT: Add specific repo link if available
    featured: true
  },
  {
    id: "pocket-flow",
    title: "PocketFlow",
    category: "Personal finance application",
    badge: "Dashboard & UI",
    description: "A personal finance app for tracking income, expenses, and spending habits in one clear dashboard.",
    problemStatement: "Most budgeting tools are either overly complex or lack clear transaction categorization. PocketFlow provides an intuitive dashboard for immediate cash-flow visibility, budget limits, and expense distribution.",
    stack: ["React", "JavaScript", "Tailwind CSS", "Node.js", "Express.js", "MongoDB"],
    highlights: ["Dashboard Design", "Data Organization", "Responsive UI"],
    
    // PLACEHOLDER IMAGE URL:
    image: "./projects/PocketFlow.png", 
    mockupType: "pocketflow",
    
    liveUrl: "https://pocketwolf.lovable.app/", // EDIT: Replace with deployed URL or set to null
    githubUrl: "https://github.com/muhammedma-2006", // EDIT: Add specific repo link if available
    featured: true
  },
  {
    id: "movie-discovery-app",
    title: "Movie Discovery App",
    category: "React application",
    badge: "API Integration",
    description: "A movie discovery application with real-time search, popular titles, and detailed movie information.",
    problemStatement: "Demonstrates high-performance client-side API consumption, debounced search against TMDB endpoints, trending algorithm metrics saved in Appwrite, and responsive media grids.",
    stack: ["React", "Vite", "TMDB API", "Appwrite", "Tailwind CSS"],
    highlights: ["API Integration", "Search Interface", "State Management"],
    
    // PLACEHOLDER IMAGE URL:
    image: "./projects/movie-discovery.png",
    mockupType: "moviediscovery",
    
    liveUrl: "https://movie-app-gcnm.vercel.app/", // EDIT: Replace with deployed URL or set to null
    githubUrl: "https://github.com/muhammedma-2006/MovieApp", // EDIT: Add specific repo link if available
    featured: true
  }
];

export const experiments = [
  {
    id: "student-portal",
    title: "Student Portal",
    category: "Academic Management System",
    description: "A relational database-backed portal built to manage student course enrollments, grade records, and administrative approvals with role-based authentication.",
    stack: ["PHP", "MySQL", "XAMPP", "Apache", "Bootstrap"],
    highlights: ["Relational Schema Normalization", "Session Management", "Role-Based Access Control"],
    githubUrl: "https://github.com/muhammedma-2006/StudentPortal",
    mockupType: "studentportal",
    image: "./projects/student-portal.png", // Placeholder for future screenshot
  }
];

export const skillsData = {
  frontend: {
    category: "Frontend Development",
    description: "Building responsive, accessible, and performant user interfaces with modern web standards.",
    skills: [
      { name: "HTML5", highlight: "Semantic Structure" },
      { name: "CSS3", highlight: "Modern Layouts" },
      { name: "JavaScript (ES6+)", highlight: "Async / Fetch / DOM" },
      { name: "React", highlight: "Hooks & Component Architecture" },
      { name: "Tailwind CSS", highlight: "Design Systems & Utility CSS" },
      { name: "Vite", highlight: "Fast Build Tooling" },
      { name: "Responsive Design", highlight: "Mobile-First UX" }
    ]
  },
  backend: {
    category: "Backend Development",
    description: "Developing scalable servers, reliable REST APIs, database schemas, and secure authentication.",
    skills: [
      { name: "Node.js", highlight: "Runtime & Event Loop" },
      { name: "Express.js", highlight: "RESTful Routing & Controllers" },
      { name: "REST APIs", highlight: "JSON Contracts & Status Codes" },
      { name: "MongoDB", highlight: "Document Databases" },
      { name: "Mongoose", highlight: "Schemas & Validations" },
      { name: "JWT Authentication", highlight: "Token-based Sessions" },
      { name: "bcrypt", highlight: "Password Hashing" },
      { name: "Middleware", highlight: "CORS, Auth & Error Handling" }
    ]
  },
  tools: {
    category: "Tools & Platforms",
    description: "Developer tooling, cloud databases, version control, and hosting environments.",
    skills: [
      { name: "Git", highlight: "Version Control" },
      { name: "GitHub", highlight: "Collaboration & Repositories" },
      { name: "VS Code", highlight: "Primary IDE & Extensions" },
      { name: "Vercel", highlight: "Frontend Deployments" },
      { name: "MongoDB Atlas", highlight: "Cloud Database Clusters" },
      { name: "Appwrite", highlight: "Backend as a Service" },
      { name: "Supabase", highlight: "PostgreSQL & Auth" },
      { name: "XAMPP", highlight: "Local Apache & MySQL" }
    ]
  }
};

export const contactData = {
  heading: "Let’s build something useful.",
  description: "I’m open to internships, collaborations, and opportunities to learn from real-world software projects.",
  emailNote: "Feel free to reach out directly via email or drop a message below. I usually respond within 24 hours.",
  formActionUrl: "https://formspree.io/f/placeholder", // Optional endpoint or handled locally
};
