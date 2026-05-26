export type NavItem = {
  label: string;
  href: string;
};

export type HeroCta = {
  label: string;
  href: string;
  variant: "default" | "secondary" | "outline";
  download?: boolean;
};

export type StatItem = {
  value: string;
  label: string;
};

export type ProjectPreviewVariant =
  | "enterprise"
  | "education"
  | "telegram"
  | "commerce"
  | "landing"
  | "kanban";

export type ProjectAction = {
  label: "Case Study" | "Demo" | "GitHub";
  href: string;
};

export type ProjectMedia = {
  kind: "image" | "video";
  src: string;
  alt: string;
  poster?: string;
};

export type Project = {
  title: string;
  company?: string;
  type: string;
  role: string;
  stack: string[];
  description: string;
  highlights: string[];
  preview: ProjectPreviewVariant;
  media?: ProjectMedia;
  actions: ProjectAction[];
};

export type Skill = {
  name: string;
  description: string;
};

export type SkillGroup = {
  title: string;
  summary: string;
  accent: "cyan" | "violet" | "blue" | "emerald" | "amber";
  skills: Skill[];
};

export type SkillStory = {
  id: "frontend" | "backend" | "pm" | "lead";
  title: string;
  shortTitle: string;
  eyebrow: string;
  summary: string;
  accent: "cyan" | "violet" | "blue" | "emerald" | "amber";
  signal: string;
  stack: string[];
  examples: {
    company: string;
    role: string;
    period: string;
    title: string;
    impact: string;
    tasks: string[];
    tools: string[];
  }[];
};

export type ExperienceType =
  | "Commercial"
  | "Startup"
  | "CMS"
  | "Project Management"
  | "Technical Administration";

export type ExperienceItem = {
  company: string;
  department?: string;
  role: string;
  period: string;
  type: ExperienceType;
  points: string[];
  stack: string[];
};

export type AboutCard = {
  title: string;
  description: string;
  icon: "product" | "delivery" | "ai";
};

export type WorkStep = {
  title: string;
  description: string;
};

export type ContactItem = {
  label: string;
  value: string;
  href: string;
  icon: "mail" | "telegram" | "github" | "linkedin";
};

export const navItems: NavItem[] = [
  { label: "Frontend", href: "#skill-frontend" },
  { label: "Backend", href: "#skill-backend" },
  { label: "PM", href: "#skill-pm" },
  { label: "Lead", href: "#skill-lead" },
  { label: "Workplaces", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export const hero = {
  name: "Andrey Dmitriev",
  title: "Full Stack Developer with product and lead range",
  subtitle:
    "I build interfaces, APIs, AI-powered services and internal systems, then help turn vague requirements into shipped product increments.",
  badges: ["React", "Next.js", "NestJS", "FastAPI", "Docker", "PostgreSQL"],
  terminalLines: [
    "> building enterprise systems...",
    "> shipping AI services...",
    "> deploying with Docker...",
    "> scaling frontend architectures...",
  ],
  floatingBadges: ["RBAC", "REST", "CI/CD", "AI", "SQL"],
  ctas: [
    { label: "View Projects", href: "#projects", variant: "default" },
    { label: "Contact Me", href: "#contact", variant: "secondary" },
    // TODO: Add the real CV PDF to /public/Andrey-Dmitriev-CV.pdf.
    {
      label: "Download CV",
      href: "/Andrey-Dmitriev-CV.pdf",
      variant: "outline",
      download: true,
    },
  ] satisfies HeroCta[],
};

export const profile = {
  initials: "AD",
  photoSrc: "/assets/photo.jpg",
  photoAlt: "Andrey Dmitriev portrait",
};

export const stats: StatItem[] = [
  { value: "6+", label: "projects" },
  { value: "3+", label: "domains" },
  { value: "Full", label: "stack" },
  { value: "AI / Web / CMS", label: "focus" },
];

const placeholderActions: ProjectAction[] = [
  // TODO: Replace href="#" with a real case study URL.
  { label: "Case Study", href: "#" },
  // TODO: Replace href="#" with a real demo URL.
  { label: "Demo", href: "#" },
  // TODO: Replace href="#" with a real GitHub URL when the repository can be public.
  { label: "GitHub", href: "#" },
];

export const projects: Project[] = [
  {
    title: "Enterprise Internal Systems",
    company: "Research Institute Gazekonomika",
    type: "Commercial / Enterprise",
    role: "Full Stack Developer",
    stack: ["NestJS", "React", "TypeScript", "REST API", "RBAC", "Microfrontends"],
    description:
      "Internal digital systems and enterprise web applications with role-based access, REST APIs and modular frontend integration.",
    highlights: [
      "Built full stack features with NestJS and React",
      "Implemented REST API endpoints and business logic",
      "Worked with RBAC and enterprise security flows",
    ],
    preview: "enterprise",
    actions: placeholderActions,
  },
  {
    title: "SENAT AI Educational Platform",
    type: "Team Lead / Full Stack",
    role: "Team Lead / Full Stack Developer",
    stack: ["React", "Vue", "TypeScript", "Node.js", "Python"],
    description:
      "Digital platform for an educational institution with admin panels, content management flows and external service integrations.",
    highlights: [
      "Led development team",
      "Converted client requirements into technical tasks",
      "Built responsive UI and admin interfaces",
    ],
    preview: "education",
    actions: placeholderActions,
  },
  {
    title: "Telegram AI Service",
    company: "ITMO University Startup Project",
    type: "Startup MVP",
    role: "Full Stack Developer / DevOps",
    stack: [
      "FastAPI",
      "Telegram Bot API",
      "Next.js",
      "MongoDB",
      "Docker Compose",
      "GitHub Actions",
      "WebSocket patterns",
    ],
    description:
      "Telegram-based AI service for natural language driven 3D character customization. Project won 2nd place in a startup competition.",
    highlights: [
      "Integrated LLM logic through FastAPI",
      "Built Telegram bot and backend API",
      "Set up Docker Compose and CI/CD",
    ],
    preview: "telegram",
    actions: placeholderActions,
  },
  {
    title: "Commercial Web Projects",
    company: "Leadmakers",
    type: "CMS / Full Stack",
    role: "1C-Bitrix Developer / Full Stack Developer",
    stack: ["PHP", "1C-Bitrix", "JavaScript", "jQuery", "AJAX", "SQL", "Caching"],
    description:
      "Custom functionality and production support for commercial Bitrix-based web projects.",
    highlights: [
      "Optimized SQL queries",
      "Configured server-side caching",
      "Improved frontend interactions with AJAX",
    ],
    preview: "commerce",
    actions: placeholderActions,
  },
  {
    title: "Driving School Website",
    company: "Driving School of Unified Standard",
    type: "WordPress / Technical Administration",
    role: "Full Stack Developer / Technical Administrator",
    stack: ["WordPress", "PHP", "Google Analytics", "SEO", "SSL", "Hosting"],
    description:
      "Corporate website with adaptive layout, analytics, SEO optimization and technical administration.",
    highlights: [
      "Launched corporate website",
      "Integrated analytics and contact forms",
      "Managed hosting, SSL and backups",
    ],
    preview: "landing",
    actions: placeholderActions,
  },
  {
    title: "Digital Workflow Optimization",
    company: "Petersburg Pharmacies",
    type: "Project Management / Digital Operations",
    role: "Project Manager",
    stack: ["Technical Specifications", "Analytics", "Website Improvements", "Integrations"],
    description:
      "Digital project coordination, stakeholder requirements, task decomposition and workflow optimization for pharmacy business processes.",
    highlights: [
      "Prepared technical specifications",
      "Coordinated developers and business users",
      "Improved operational digital workflows",
    ],
    preview: "kanban",
    actions: placeholderActions,
  },
];

export const skillStories: SkillStory[] = [
  {
    id: "frontend",
    title: "Frontend skills",
    shortTitle: "Frontend",
    eyebrow: "Interfaces, architecture and product UI",
    summary:
      "Frontend experience is grouped by where it happened: enterprise apps, education platform UI, CMS projects and a production website.",
    accent: "cyan",
    signal: "UI",
    stack: ["React", "Next.js", "Vue", "TypeScript", "FSD", "Microfrontends", "HTML", "CSS", "AJAX"],
    examples: [
      {
        company: "Gazprom / Gazekonomika",
        role: "Middle Full Stack Developer",
        period: "September 2025 - Now",
        title: "Enterprise frontend architecture",
        impact:
          "Built internal product interfaces that had to stay maintainable inside a larger enterprise system.",
        tasks: [
          "Created React application modules using Feature-Sliced Design principles.",
          "Worked with microfrontend-style integration and modular UI boundaries.",
          "Built role-aware screens connected to REST APIs and RBAC flows.",
        ],
        tools: ["React", "TypeScript", "FSD", "Microfrontends", "REST API", "RBAC"],
      },
      {
        company: "SENAT AI",
        role: "Team Lead / Full Stack Developer",
        period: "February 2025 - January 2026",
        title: "Education platform UI and admin flows",
        impact:
          "Turned client requirements into usable platform screens, admin panels and responsive product flows.",
        tasks: [
          "Built React and Vue interfaces for educational workflows.",
          "Designed admin forms, content screens and reusable UI states.",
          "Translated unclear client requests into concrete frontend tasks.",
        ],
        tools: ["React", "Vue", "TypeScript", "Responsive UI", "Admin panels"],
      },
      {
        company: "Leadmakers",
        role: "1C-Bitrix Developer / Full Stack Developer",
        period: "May 2024 - October 2024",
        title: "Commercial CMS frontend",
        impact:
          "Improved production web projects where frontend behavior lived inside CMS constraints.",
        tasks: [
          "Added interactive UI behavior with JavaScript, jQuery and AJAX.",
          "Updated commercial website layouts and product pages.",
          "Connected frontend interactions to Bitrix backend responses.",
        ],
        tools: ["JavaScript", "jQuery", "AJAX", "1C-Bitrix", "HTML", "CSS"],
      },
      {
        company: "Driving School of Unified Standard",
        role: "Full Stack Developer / Technical Administrator",
        period: "November 2022 - December 2024",
        title: "Responsive corporate website",
        impact:
          "Launched and maintained a website that needed to be practical for real users, forms and local SEO.",
        tasks: [
          "Built adaptive pages and landing-style sections on WordPress.",
          "Configured contact forms, analytics and visible conversion paths.",
          "Maintained layout quality while handling content and technical updates.",
        ],
        tools: ["WordPress", "HTML", "CSS", "PHP", "Google Analytics", "SEO"],
      },
    ],
  },
  {
    id: "backend",
    title: "Backend skills",
    shortTitle: "Backend",
    eyebrow: "APIs, business logic and integrations",
    summary:
      "Backend work is shown through API development, AI service integration, CMS backend work and data-heavy production tasks.",
    accent: "violet",
    signal: "API",
    stack: ["NestJS", "Node.js", "FastAPI", "PHP", "REST API", "PostgreSQL", "MongoDB", "Docker Compose"],
    examples: [
      {
        company: "Gazprom / Gazekonomika",
        role: "Middle Full Stack Developer",
        period: "September 2025 - Now",
        title: "Internal REST APIs and RBAC logic",
        impact:
          "Implemented backend pieces for enterprise systems where permissions, data contracts and reliability mattered.",
        tasks: [
          "Built NestJS modules, controllers and services for internal workflows.",
          "Implemented REST endpoints consumed by React applications.",
          "Worked with role-based access logic and enterprise data constraints.",
        ],
        tools: ["NestJS", "Node.js", "TypeScript", "REST API", "RBAC", "PostgreSQL"],
      },
      {
        company: "ITMO University Startup Project",
        role: "Full Stack Developer / DevOps",
        period: "November 2024 - May 2025",
        title: "AI service backend and Telegram bot",
        impact:
          "Built the backend for an MVP where natural language controlled 3D character customization.",
        tasks: [
          "Created FastAPI endpoints for AI-driven product logic.",
          "Integrated Telegram Bot API with backend service flows.",
          "Connected MongoDB storage and prepared Docker Compose environment.",
        ],
        tools: ["FastAPI", "Python", "Telegram Bot API", "MongoDB", "Docker Compose", "LLM"],
      },
      {
        company: "Leadmakers",
        role: "1C-Bitrix Developer / Full Stack Developer",
        period: "May 2024 - October 2024",
        title: "Bitrix backend and performance fixes",
        impact:
          "Supported commercial websites where custom PHP logic, SQL and caching directly affected page behavior.",
        tasks: [
          "Built custom functionality for Bitrix-based websites.",
          "Optimized SQL queries and adjusted server-side caching.",
          "Connected backend data with AJAX-driven frontend interactions.",
        ],
        tools: ["PHP", "1C-Bitrix", "SQL", "MySQL", "Caching", "AJAX"],
      },
    ],
  },
  {
    id: "pm",
    title: "PM skills",
    shortTitle: "PM",
    eyebrow: "Requirements, planning and delivery shape",
    summary:
      "PM experience is separated from coding so it is clear where I handled requirements, scope, coordination and product decisions.",
    accent: "amber",
    signal: "PM",
    stack: ["Technical specifications", "Backlog decomposition", "Stakeholder interviews", "Analytics", "Acceptance criteria"],
    examples: [
      {
        company: "Petersburg Pharmacies",
        role: "Project Manager",
        period: "September 2025 - April 2026",
        title: "Digital workflow and website improvements",
        impact:
          "Helped business users and developers move from loose requests to structured implementation tasks.",
        tasks: [
          "Collected stakeholder requirements and turned them into technical specifications.",
          "Coordinated developers and business users around website improvements.",
          "Split digital workflow changes into understandable delivery steps.",
        ],
        tools: ["Technical specifications", "Analytics", "Task decomposition", "Integrations"],
      },
      {
        company: "SENAT AI",
        role: "Team Lead / Full Stack Developer",
        period: "February 2025 - January 2026",
        title: "Client requirements to platform tasks",
        impact:
          "Kept the product work clear by turning client expectations into frontend, backend and admin-panel tasks.",
        tasks: [
          "Clarified what the client wanted before starting implementation.",
          "Prepared tasks for UI, admin flows and service integrations.",
          "Kept technical decisions connected to the education platform workflow.",
        ],
        tools: ["Requirements analysis", "Backlog", "Acceptance criteria", "Admin workflows"],
      },
      {
        company: "Driving School of Unified Standard",
        role: "Full Stack Developer / Technical Administrator",
        period: "November 2022 - December 2024",
        title: "Website ownership and operations",
        impact:
          "Managed the practical product layer around a public website: launch, analytics, SEO basics and support.",
        tasks: [
          "Planned and launched the website structure around real customer actions.",
          "Integrated analytics and contact forms to make results visible.",
          "Handled hosting, SSL, backups and recurring site updates.",
        ],
        tools: ["Google Analytics", "SEO", "Hosting", "SSL", "WordPress"],
      },
    ],
  },
  {
    id: "lead",
    title: "Lead skills",
    shortTitle: "Lead",
    eyebrow: "Team rhythm, ownership and technical direction",
    summary:
      "Lead experience is shown as implementation ownership: decomposing work, keeping the team aligned and protecting technical coherence.",
    accent: "emerald",
    signal: "LEAD",
    stack: ["Task breakdown", "Code review", "Architecture discussion", "Delivery planning", "AI-assisted prototyping"],
    examples: [
      {
        company: "SENAT AI",
        role: "Team Lead / Full Stack Developer",
        period: "February 2025 - January 2026",
        title: "Implementation lead for platform delivery",
        impact:
          "Helped the team move from client requests to working features without losing structure.",
        tasks: [
          "Split requirements into frontend, backend and integration tasks.",
          "Guided implementation decisions across React, Vue, Node.js and Python work.",
          "Kept admin workflows and client-facing screens aligned with product goals.",
        ],
        tools: ["Task breakdown", "React", "Vue", "Node.js", "Python", "Review"],
      },
      {
        company: "ITMO University Startup Project",
        role: "Full Stack Developer / DevOps",
        period: "November 2024 - May 2025",
        title: "MVP ownership under startup constraints",
        impact:
          "Balanced speed and structure for an AI MVP that won 2nd place in a startup competition.",
        tasks: [
          "Connected bot, backend, frontend and deployment tasks into one delivery flow.",
          "Made pragmatic architecture decisions for the MVP phase.",
          "Set up repeatable delivery basics with Docker Compose and GitHub Actions.",
        ],
        tools: ["FastAPI", "Next.js", "Docker Compose", "GitHub Actions", "MVP planning"],
      },
      {
        company: "Cross-functional product work",
        role: "Full Stack / Product-minded Engineer",
        period: "Ongoing",
        title: "Making ownership visible",
        impact:
          "Kept delivery understandable by separating scope, blockers and technical ownership before implementation got messy.",
        tasks: [
          "Defined clear boundaries between interface, API, data and deployment work.",
          "Used AI-assisted prototyping for speed, then reviewed architecture manually.",
          "Kept product context visible while moving across the stack.",
        ],
        tools: ["Architecture discussion", "Delivery planning", "AI-assisted prototyping", "Code review"],
      },
    ],
  },
];

export const skillGroups: SkillGroup[] = [
  {
    title: "Frontend",
    summary: "Product interfaces, admin panels and responsive client apps.",
    accent: "cyan",
    skills: [
      { name: "React", description: "Component architecture and stateful product UI." },
      { name: "Next.js", description: "App Router, routing, metadata and production builds." },
      { name: "Vue", description: "Admin and educational platform interfaces." },
      { name: "TypeScript", description: "Typed contracts across UI and API boundaries." },
      { name: "JavaScript", description: "Production frontend behavior and integrations." },
      { name: "HTML", description: "Semantic structure and accessible page foundations." },
      { name: "CSS", description: "Responsive layouts, motion and design systems." },
      { name: "React Native", description: "Mobile-oriented component thinking." },
      { name: "AJAX", description: "Interactive flows without full page reloads." },
    ],
  },
  {
    title: "Backend",
    summary: "APIs, business logic and integration layers for practical systems.",
    accent: "violet",
    skills: [
      { name: "Node.js", description: "Server-side JavaScript for web services." },
      { name: "NestJS", description: "Structured backend modules, services and controllers." },
      { name: "FastAPI", description: "Python APIs for AI and data-driven services." },
      { name: "Express", description: "Lightweight REST services and middleware." },
      { name: "PHP", description: "CMS and commercial website backend work." },
      { name: "REST API", description: "Resource contracts for internal and external clients." },
      { name: "WebSocket", description: "Realtime interaction patterns and service updates." },
    ],
  },
  {
    title: "Databases",
    summary: "Relational and document data design with performance awareness.",
    accent: "blue",
    skills: [
      { name: "PostgreSQL", description: "Relational schemas and transactional data." },
      { name: "MySQL", description: "CMS and commercial project database work." },
      { name: "MongoDB", description: "Document storage for MVP and AI services." },
      { name: "SQL", description: "Queries, joins, filters and data manipulation." },
      { name: "Database Design", description: "Modeling entities around product requirements." },
      { name: "Query Optimization", description: "Indexes, query shape and bottleneck analysis." },
    ],
  },
  {
    title: "DevOps",
    summary: "Reliable delivery basics for MVPs, internal tools and websites.",
    accent: "emerald",
    skills: [
      { name: "Git", description: "Branching, reviews and collaborative delivery." },
      { name: "Docker", description: "Containerized local and deployment environments." },
      { name: "Docker Compose", description: "Multi-service application orchestration." },
      { name: "CI/CD", description: "Repeatable build and deploy pipelines." },
      { name: "GitHub Actions", description: "Automation for checks and delivery tasks." },
      { name: "Server Configuration", description: "Hosting setup and runtime configuration." },
      { name: "SSL", description: "HTTPS setup and certificate handling." },
    ],
  },
  {
    title: "Tools & Practices",
    summary: "How work moves from unclear request to shipped product increment.",
    accent: "amber",
    skills: [
      { name: "Microfrontends", description: "Modular frontend integration for larger systems." },
      { name: "Refactoring", description: "Improving structure without changing behavior." },
      { name: "Prototyping", description: "Quickly turning ideas into testable UI." },
      { name: "Code Review", description: "Catching defects and improving maintainability." },
      { name: "Technical Specifications", description: "Breaking business needs into buildable tasks." },
      { name: "SEO", description: "Technical foundations for discoverable websites." },
      { name: "Google Analytics", description: "Traffic measurement and conversion visibility." },
    ],
  },
  {
    title: "CMS & Messaging",
    summary: "Practical platform work around CMS ecosystems and async systems.",
    accent: "violet",
    skills: [
      { name: "1C-Bitrix", description: "Commercial website development and maintenance." },
      { name: "WordPress", description: "Corporate site launch and administration." },
      { name: "RabbitMQ", description: "Message queue concepts for async processing." },
      { name: "Kafka", description: "Event streaming concepts for scalable systems." },
    ],
  },
];

export const experience: ExperienceItem[] = [
  {
    company: "Research Institute Gazekonomika",
    department: "Center for Digital Information",
    role: "Middle Full Stack Developer",
    period: "September 2025 - Now",
    type: "Commercial",
    points: [
      "Developed internal enterprise systems with React and NestJS.",
      "Worked on REST APIs, RBAC flows and modular frontend integration.",
      "Delivered features inside practical business and security constraints.",
    ],
    stack: ["React", "NestJS", "TypeScript", "REST API", "RBAC"],
  },
  {
    company: "SENAT AI",
    role: "Team Lead / Full Stack Developer",
    period: "February 2025 - January 2026",
    type: "Commercial",
    points: [
      "Led implementation work for an educational digital platform.",
      "Translated client requirements into clear technical tasks.",
      "Built responsive interfaces and admin workflows.",
    ],
    stack: ["React", "Vue", "TypeScript", "Node.js", "Python"],
  },
  {
    company: "ITMO University Startup Project",
    role: "Full Stack Developer / DevOps",
    period: "November 2024 - May 2025",
    type: "Startup",
    points: [
      "Built Telegram bot and FastAPI backend for an AI-driven MVP.",
      "Integrated LLM behavior for natural language character customization.",
      "Set up Docker Compose and GitHub Actions for repeatable delivery.",
    ],
    stack: ["FastAPI", "Next.js", "MongoDB", "Docker", "GitHub Actions"],
  },
  {
    company: "Petersburg Pharmacies",
    role: "Project Manager",
    period: "September 2025 - April 2026",
    type: "Project Management",
    points: [
      "Collected stakeholder requirements and prepared technical specifications.",
      "Coordinated developers and business users on website improvements.",
      "Helped improve digital workflows around operational processes.",
    ],
    stack: ["Analytics", "Specifications", "Integrations", "Workflow"],
  },
  {
    company: "Leadmakers",
    role: "1C-Bitrix Developer / Full Stack Developer",
    period: "May 2024 - October 2024",
    type: "Commercial",
    points: [
      "Built custom functionality for Bitrix-based commercial websites.",
      "Improved frontend interactions with JavaScript, jQuery and AJAX.",
      "Optimized SQL queries and configured caching where needed.",
    ],
    stack: ["PHP", "1C-Bitrix", "JavaScript", "SQL", "Caching"],
  },
  {
    company: "Driving School of Unified Standard",
    role: "Full Stack Developer / Technical Administrator",
    period: "November 2022-December 2024",
    type: "Commercial",
    points: [
      "Launched and maintained an adaptive WordPress corporate website.",
      "Integrated analytics, forms and SEO basics.",
      "Handled hosting, SSL, backups and technical administration.",
    ],
    stack: ["WordPress", "PHP", "SEO", "SSL", "Analytics"],
  },
];

export const about = {
  text:
    "Full stack developer focused on building practical web platforms: internal enterprise systems, educational products, AI services and commercial websites. I combine frontend implementation, backend API design, database work, deployment basics and technical task decomposition.",
  cards: [
    {
      title: "Product-minded engineering",
      description:
        "I connect technical decisions with the real workflow, users and business rules behind the product.",
      icon: "product",
    },
    {
      title: "Full stack delivery",
      description:
        "I can move between interface, API, database and deployment tasks without losing product context.",
      icon: "delivery",
    },
    {
      title: "AI-assisted development",
      description:
        "I use AI as a prototyping and productivity layer while keeping architecture, review and delivery grounded.",
      icon: "ai",
    },
  ] satisfies AboutCard[],
};

export const workSteps: WorkStep[] = [
  {
    title: "Requirements analysis",
    description: "Clarify users, constraints, roles and the business workflow.",
  },
  {
    title: "Architecture and data modeling",
    description: "Shape API boundaries, entities and integration points.",
  },
  {
    title: "Frontend implementation",
    description: "Build responsive, typed and polished product interfaces.",
  },
  {
    title: "Backend API development",
    description: "Implement business logic, endpoints and service contracts.",
  },
  {
    title: "Deployment and CI/CD",
    description: "Prepare repeatable environments and delivery automation.",
  },
  {
    title: "Iteration with AI-assisted prototyping",
    description: "Prototype faster, review carefully and improve the product loop.",
  },
];

export const contacts: ContactItem[] = [
  {
    label: "Email",
    value: "andrey.dmitriev@example.com",
    href: "mailto:andrey.dmitriev@example.com",
    icon: "mail",
  },
  // TODO: Replace placeholders with real public profile links.
  {
    label: "Telegram",
    value: "@telegram_placeholder",
    href: "#",
    icon: "telegram",
  },
  {
    label: "GitHub",
    value: "github.com/andrey-placeholder",
    href: "#",
    icon: "github",
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/andrey-placeholder",
    href: "#",
    icon: "linkedin",
  },
];
