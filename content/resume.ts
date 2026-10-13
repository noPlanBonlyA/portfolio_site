// Resume texts — verbatim from the PDFs in /public (source of truth).
// EN: public/Andrey_Dmitriev_CV.pdf, RU: public/Andrey_Dmitriev_CV_RU.pdf.
// The RU CV is a separate document (Backend/Python positioning), not a translation.
// `**text**` marks bold fragments, exactly as they are bold in the PDF.
// content/resume.test.ts checks every string here against the PDF text.

export type Lang = "en" | "ru";

export type JobId =
  | "gazekonomika"
  | "pharmacies"
  | "senat"
  | "itmo"
  | "leadmakers"
  | "driving";

export interface Job {
  id: JobId;
  role: string;
  company: string;
  period: string;
  bullets: string[];
}

export interface SkillGroup {
  label: string;
  value: string;
}

export interface Resume {
  lang: Lang;
  name: string;
  title: string;
  titleStack: string;
  location: string;
  headings: { summary: string; skills: string; experience: string; education: string };
  summary: string;
  skills: SkillGroup[];
  jobs: Job[];
  education: SkillGroup;
  languages: SkillGroup;
  pdf: { href: string; filename: string };
}

export const resumeEn: Resume = {
  lang: "en",
  name: "Andrey Dmitriev",
  title: "Full Stack Developer",
  titleStack: "(React / Node.js / NestJS)",
  location: "Saint Petersburg",
  headings: {
    summary: "SUMMARY",
    skills: "SKILLS",
    experience: "EXPERIENCE",
    education: "EDUCATION & LANGUAGES",
  },
  summary:
    "Full Stack Developer working in web development since 2022. Currently responsible for development and support of 5+ internal services (NestJS, React) used daily by 200-300 enterprise users; previously led a team of 7 on an educational platform. I cover the full cycle: API and database design, frontend, CI/CD and deployment. Comfortable running several projects in parallel and using AI tools to speed up prototyping, debugging and testing.",
  skills: [
    { label: "Frontend", value: "React, Next.js, Vue, TypeScript, JavaScript, Feature-Sliced Design, HTML/CSS" },
    { label: "Backend", value: "Node.js, NestJS, Express, Python, FastAPI, REST API (Swagger), WebSocket, TypeORM" },
    { label: "Databases", value: "PostgreSQL, MySQL, MongoDB, Redis, SQL optimization" },
    { label: "DevOps & tools", value: "Docker, Docker Compose, GitHub Actions (CI/CD), Nginx, Linux, SSL, Git, Postman" },
    { label: "Practices", value: "unit / API / integration testing, code review, microfrontends, technical specs" },
    { label: "Also worked with", value: "PHP, 1C-Bitrix, WordPress, jQuery" },
  ],
  jobs: [
    {
      id: "gazekonomika",
      role: "Full Stack Developer (Middle+)",
      company: "Research Institute Gazekonomika, Center for Digital Information",
      period: "Sep 2025 – Present",
      bullets: [
        "Responsible for development and support of 5+ internal services (React, NestJS) used daily by 200-300 employees, including a corporate chatbot and workflow-optimization tools.",
        "Design REST APIs, data models and business logic; build React modules using Feature-Sliced Design.",
        "Implemented authentication and role-based access control (RBAC); integrated microfrontends into a unified enterprise platform.",
        "Run seminars across company centers on using AI for analysis, implementation, testing and documentation.",
      ],
    },
    {
      id: "pharmacies",
      role: "Project Manager",
      company: "Petersburg Pharmacies",
      period: "Sep 2025 – Apr 2026",
      bullets: [
        "Coordinated website improvements: gathered stakeholder requirements, wrote task specs for developers and tracked deadlines.",
      ],
    },
    {
      id: "senat",
      role: "Team Lead / Full Stack Developer",
      company: "SENAT AI",
      period: "Feb 2025 – Jan 2026",
      bullets: [
        "Led a team of 7 developers through a 6-month project, delivering an educational platform to the client.",
        "Turned client requirements into technical specs and tasks for the team.",
        "Worked across the stack: Python/FastAPI and Node.js backend services with tests (about a year on the Python backend), React/Vue/TypeScript UIs and admin panels, external integrations.",
        "Set up CI/CD, server configuration and deployment; mentored teammates through code reviews.",
      ],
    },
    {
      id: "itmo",
      role: "Full Stack Developer / DevOps",
      company: "ITMO University Startup Project",
      period: "Nov 2024 – May 2025",
      bullets: [
        "Built an MVP of a Telegram-based AI service for 3D character customization via natural language; **2nd place** in a startup competition.",
        "Integrated LLM logic through FastAPI; built the Telegram bot and backend (REST + WebSocket).",
        "Ran DevOps: Docker Compose and GitHub Actions CI/CD; prototyped with Next.js and MongoDB.",
      ],
    },
    {
      id: "leadmakers",
      role: "1C-Bitrix / Full Stack Developer",
      company: "Leadmakers",
      period: "May 2024 – Oct 2024",
      bullets: [
        "Optimized SQL queries and set up server-side caching: page load time dropped from 10-20 s to ~1 s.",
        "Contributed to raising Google PageSpeed from 40 to 97 on commercial projects.",
        "Developed custom PHP / 1C-Bitrix functionality and AJAX/jQuery features; maintained production components.",
      ],
    },
    {
      id: "driving",
      role: "Full Stack Developer / Technical Administrator",
      company: "Driving School of Unified Standard",
      period: "Nov 2022 – Dec 2024",
      bullets: [
        "Built and launched the company site on WordPress (SEO-optimized, Google Analytics, call tracking); handled hosting, SSL and backups.",
      ],
    },
  ],
  education: { label: "Education", value: "B.Sc., ITMO University, 2026" },
  languages: { label: "Languages", value: "Russian (native), English (B2)" },
  pdf: { href: "/Andrey_Dmitriev_CV.pdf", filename: "Andrey_Dmitriev_CV.pdf" },
};

export const resumeRu: Resume = {
  lang: "ru",
  name: "Андрей Дмитриев",
  title: "Backend / Full Stack разработчик",
  titleStack: "(Python / FastAPI, React)",
  location: "Санкт-Петербург",
  headings: {
    summary: "О СЕБЕ",
    skills: "НАВЫКИ",
    experience: "ОПЫТ РАБОТЫ",
    education: "ОБРАЗОВАНИЕ И ЯЗЫКИ",
  },
  summary:
    "Backend / Full Stack разработчик, в веб-разработке с 2022 года. Около года вёл Python/FastAPI-backend образовательной платформы, сделал backend ИИ-сервиса (REST API, WebSocket, интеграция LLM; 2 место на конкурсе стартапов), параллельно отвечаю за 5+ внутренних сервисов (NestJS, React) с 200-300 ежедневными пользователями. Быстро разбираюсь в новых системах, проектирую API и интеграции с внешними сервисами, довожу задачи до релиза (Docker, CI/CD). Активно использую AI-инструменты в разработке (генерация кода, рефакторинг, отладка, тесты) и провожу семинары по этому для разработчиков. Бакалавр ИТМО (2026).",
  skills: [
    { label: "Backend", value: "Python, FastAPI, REST API (OpenAPI / Swagger), WebSocket, интеграции с внешними сервисами, Node.js, NestJS, TypeORM" },
    { label: "Базы данных", value: "PostgreSQL, Redis, MongoDB, MySQL, оптимизация SQL" },
    { label: "Инфраструктура", value: "Docker, Docker Compose, GitHub Actions (CI/CD), Nginx, Linux, Git" },
    { label: "Frontend", value: "React, TypeScript, Next.js, Vue, JavaScript, Feature-Sliced Design, микрофронтенды" },
    { label: "AI в разработке", value: "генерация кода, рефакторинг, отладка и тесты с помощью AI-инструментов; LLM-интеграции" },
    { label: "Практики", value: "unit / API тестирование, code review, технические задания, декомпозиция задач" },
  ],
  jobs: [
    {
      id: "gazekonomika",
      role: "Full Stack разработчик (Middle+)",
      company: "НИИгазэкономика, Центр цифровой информации",
      period: "сен 2025 – настоящее время",
      bullets: [
        "Отвечаю за разработку и поддержку 5+ внутренних сервисов (React, NestJS) с 200-300 ежедневными пользователями, включая корпоративный чат-бот и сервисы оптимизации процессов.",
        "Проектирую REST API, модели данных и бизнес-логику; строю React-модули по Feature-Sliced Design.",
        "Реализовал аутентификацию и ролевой доступ (RBAC); интегрировал микрофронтенды в единую корпоративную платформу.",
        "Провожу семинары в центрах компании по использованию AI для анализа, разработки, тестирования и документации.",
      ],
    },
    {
      id: "pharmacies",
      role: "Руководитель проекта",
      company: "Петербургские аптеки",
      period: "сен 2025 – апр 2026",
      bullets: [
        "Координировал улучшения сайта: собирал требования заинтересованных сторон, писал ТЗ для разработчиков и следил за сроками.",
      ],
    },
    {
      id: "senat",
      role: "Team Lead / Full Stack разработчик",
      company: "SENAT AI",
      period: "фев 2025 – янв 2026",
      bullets: [
        "Около года вёл Python/FastAPI-backend образовательной платформы: REST API, интеграции с внешними сервисами, тесты; параллельно писал UI и админ-панели на React/Vue/TypeScript.",
        "Руководил командой из 7 разработчиков в 6-месячном проекте: платформа сдана заказчику; превращал требования заказчика в технические задания и задачи.",
        "Настраивал CI/CD, серверы и деплой; наставлял коллег через code review.",
      ],
    },
    {
      id: "itmo",
      role: "Full Stack разработчик / DevOps",
      company: "стартап-проект Университета ИТМО",
      period: "ноя 2024 – май 2025",
      bullets: [
        "Разработал backend ИИ-сервиса в Telegram на Python/FastAPI (REST API, WebSocket): LLM-логика превращала команды на естественном языке в изменения 3D-персонажа; **2 место** на конкурсе стартапов.",
        "Сделал Telegram-бота и его интеграцию с backend-сервисами.",
        "DevOps: Docker Compose и CI/CD на GitHub Actions; прототипирование на Next.js и MongoDB.",
      ],
    },
    {
      id: "leadmakers",
      role: "Разработчик 1C-Битрикс / Full Stack",
      company: "Leadmakers",
      period: "май 2024 – окт 2024",
      bullets: [
        "Оптимизировал SQL-запросы и настроил серверное кеширование: время загрузки страниц сократилось с 10-20 с до ~1 с.",
        "Участвовал в повышении оценки Google PageSpeed с 40 до 97 на коммерческих проектах.",
        "Разрабатывал функционал на PHP / 1C-Битрикс и AJAX/jQuery; поддерживал компоненты в production.",
      ],
    },
    {
      id: "driving",
      role: "Full Stack разработчик / технический администратор",
      company: "Автошкола «Единый стандарт»",
      period: "ноя 2022 – дек 2024",
      bullets: [
        "Создал и запустил сайт компании на WordPress (SEO, Google Analytics, коллтрекинг); отвечал за хостинг, SSL и бэкапы.",
      ],
    },
  ],
  education: { label: "Образование", value: "бакалавр, Университет ИТМО, 2026" },
  languages: { label: "Языки", value: "русский (родной), английский (B2)" },
  pdf: { href: "/Andrey_Dmitriev_CV_RU.pdf", filename: "Andrey_Dmitriev_CV_RU.pdf" },
};

export const resumes: Record<Lang, Resume> = { en: resumeEn, ru: resumeRu };

/** Machine-friendly dates for experience.log (`2025-09 → now`). */
export const jobDates: Record<JobId, { from: string; to: string | null }> = {
  gazekonomika: { from: "2025-09", to: null },
  pharmacies: { from: "2025-09", to: "2026-04" },
  senat: { from: "2025-02", to: "2026-01" },
  itmo: { from: "2024-11", to: "2025-05" },
  leadmakers: { from: "2024-05", to: "2024-10" },
  driving: { from: "2022-11", to: "2024-12" },
};

/** EN skill groups as arrays, keyed like `stack.ts` in the IDE. */
export const stackKeys = ["frontend", "backend", "databases", "devops", "practices", "alsoWorkedWith"] as const;
export const stack = resumeEn.skills.map((g, i) => ({
  key: stackKeys[i],
  label: g.label,
  items: g.value.split(", "),
}));
