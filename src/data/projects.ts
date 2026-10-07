export type ProjectData = {
  slug: string;
  order: number;
  title: string;
  category: string;
  tagline: string;
  year: string;
  role: string;
  status: "Personal Project" | "Professional Project";
  stack: readonly string[];
  repo?: string;
  live?: string;
  summary: string;
  overview: readonly string[];
  problem: readonly string[];
  myRole: readonly string[];
  architecture: {
    summary: string;
    layers: readonly { label: string; detail: string }[];
  };
  features: readonly { title: string; detail: string }[];
  challenges: readonly { title: string; detail: string }[];
  implementation: readonly { heading: string; body: readonly string[] }[];
  outcome: readonly string[];
  visual: {
    kind:
      | "mail-pipeline"
      | "marketplace"
      | "issue-board"
      | "quality-docs"
      | "course-flow"
      | "hiring-pipeline";
    caption: string;
  };
  facts: readonly { value: string; label: string }[];
};

export const projects: readonly ProjectData[] = [
  {
    slug: "bulk-mail-sender",
    order: 1,
    title: "Bulk Mail Sender",
    category: "Email Automation / Communication Platform",
    tagline:
      "Campaign orchestration, contact workflows, and SMTP-driven delivery.",
    year: "2024",
    role: "Full-stack product build",
    status: "Personal Project",
    stack: [
      "Next.js 14",
      "TypeScript",
      "Prisma",
      "SQLite",
      "Nodemailer",
      "Resend",
      "Tailwind CSS",
    ],
    repo: "https://github.com/1972001raj-droid/bulk-mail-sender",
    summary:
      "A full-stack email automation platform for organizing recipients, composing campaigns, managing templates, and sending bulk outreach through provider integrations.",
    overview: [
      "The project is a bulk email outreach platform built around campaign management, contact organization, and provider-driven delivery workflows.",
      "The repository shows a Next.js app using Prisma and a modern dashboard interface with campaign, sender, and contact layers connected through API routes and server-side processing.",
    ],
    problem: [
      "Bulk email communication often breaks down when sender data, campaign templates, and delivery flows are spread across disconnected tools or manual steps.",
      "The goal was to centralize outreach workflows so audiences, templates, and scheduling could be managed from one system.",
    ],
    myRole: [
      "Built the application structure around recipient management, campaign configuration, sender accounts, and template-driven email workflows.",
      "Connected the frontend to Prisma-backed data models and implemented the operational flow for sending, tracking, and follow-up management.",
    ],
    architecture: {
      summary:
        "The app is organized around organizations, senders, contacts, contact lists, templates, campaigns, queue jobs, and tracking metadata.",
      layers: [
        {
          label: "Frontend",
          detail:
            "Next.js dashboard for campaign creation, audience management, and monitoring state.",
        },
        {
          label: "API layer",
          detail:
            "Route-based application logic for campaigns, contacts, templates, and sending workflows.",
        },
        {
          label: "Data layer",
          detail:
            "Prisma models for organizations, senders, content, queue jobs, and tracking events.",
        },
        {
          label: "Delivery layer",
          detail:
            "Nodemailer and Resend integrations for provider-based email sending and delivery tracking.",
        },
      ],
    },
    features: [
      {
        title: "Campaign orchestration",
        detail:
          "Compose, schedule, and manage campaign lifecycle states for bulk outreach.",
      },
      {
        title: "Audience management",
        detail:
          "Contacts and segmented lists support structured recipient handling and list-based sending.",
      },
      {
        title: "Provider integrations",
        detail:
          "SMTP, Resend, and multi-provider sender support are part of the product design.",
      },
      {
        title: "Queue and delivery",
        detail:
          "The project includes rate-limiting and queue logic to support controlled sending and retry workflows.",
      },
    ],
    challenges: [
      {
        title: "Reliable delivery",
        detail:
          "Working within provider constraints and handling rate limits, retries, and bounce-sensitive flows.",
      },
      {
        title: "Operational scale",
        detail:
          "Designing campaign and recipient systems that can support larger outreach operations without losing clarity.",
      },
    ],
    implementation: [
      {
        heading: "System design",
        body: [
          "The data model centers on organizations with senders, contacts, lists, templates, campaigns, and queue jobs so the product can support real operational use.",
          "This keeps campaign configuration separated from send execution, which makes queue management and tracking easier to reason about.",
        ],
      },
      {
        heading: "Provider and workflow logic",
        body: [
          "The app includes provider-aware sending logic and queue handling to distribute outbound work without overwhelming SMTP or provider quotas.",
          "The repository includes token-based open, click, and unsubscribe tracking endpoints that connect campaign activity to stored tracking metadata.",
        ],
      },
    ],
    outcome: [
      "The project demonstrates practical engineering work around communication systems, data organization, and automated mail delivery workflows.",
      "It is a strong example of Raj’s ability to combine backend processing, database modeling, and a polished frontend in a business-focused product.",
    ],
    visual: {
      kind: "mail-pipeline",
      caption:
        "Campaign, contact, sender, and queue architecture for bulk communication.",
    },
    facts: [
      { value: "Next.js 14", label: "Framework" },
      { value: "Prisma", label: "Database layer" },
      { value: "SMTP + Resend", label: "Delivery providers" },
    ],
  },
  {
    slug: "mv-ecommerce",
    order: 2,
    title: "MV E-Commerce",
    category: "Multi-Vendor Marketplace",
    tagline:
      "Marketplace workflows, buyer checkout, vendor management, and admin oversight.",
    year: "2024",
    role: "Full-stack marketplace build",
    status: "Personal Project",
    stack: [
      "Next.js 14",
      "JSON file persistence",
      "Stripe",
      "JWT",
      "bcryptjs",
      "Tailwind CSS",
    ],
    repo: "https://github.com/1972001raj-droid/mv-e-commerce-",
    summary:
      "A multi-vendor e-commerce marketplace where buyers can browse products, manage carts, and complete checkout while vendors and admins maintain products, status, and operations.",
    overview: [
      "The project is designed around the marketplace model described in the PRD: buyer, vendor, and admin roles with separate flows and platform-managed processing.",
      "The repository includes a Next.js storefront, product APIs, checkout flows, and vendor/admin workflow support. The current local data layer persists marketplace state in a JSON file, with JWT-based authentication.",
    ],
    problem: [
      "Marketplace platforms need to coordinate buyer behavior, vendor status, inventory validation, and fulfilment flows across one checkout and multiple vendor-specific orders.",
      "The requirement was to keep roles and ownership separated while making the platform feel coherent to a customer.",
    ],
    myRole: [
      "Designed a multi-role architecture that separates buyer, vendor, and admin responsibilities while preserving shared marketplace logic.",
      "Built the product and cart flows, along with auth and API patterns that support marketplace operations and checkout validation.",
    ],
    architecture: {
      summary:
        "The platform follows a marketplace structure with shared buyer cart logic, vendor-specific order ownership, and admin controls over status and approvals.",
      layers: [
        {
          label: "Buyer flow",
          detail:
            "Browse products, manage cart, select address, and complete checkout using the shared marketplace flow.",
        },
        {
          label: "Vendor flow",
          detail:
            "Register, manage products, publish or draft, and process vendor-specific order activity.",
        },
        {
          label: "Admin flow",
          detail:
            "Review vendors, manage products, categories, and orders within a marketplace-level control layer.",
        },
      ],
    },
    features: [
      {
        title: "Multi-vendor cart",
        detail:
          "Buyer carts can include products from several vendors while preserving ownership and checkout separation.",
      },
      {
        title: "Vendor approval",
        detail:
          "The platform supports the pending-to-active vendor lifecycle described in the project requirement docs.",
      },
      {
        title: "Checkout and payment",
        detail:
          "Stripe PaymentIntent support is present; local checkout also includes a simulated payment path when provider configuration is unavailable.",
      },
      {
        title: "Order structure",
        detail:
          "Each fulfillment process keeps a parent order and vendor-specific order structure for accurate tracking.",
      },
    ],
    challenges: [
      {
        title: "Complex role logic",
        detail:
          "Keeping buyer, vendor, and admin workflows consistent without cross-access between marketplace entities.",
      },
      {
        title: "Checkout integrity",
        detail:
          "Revalidating status, inventory, and payment conditions before creating orders and fulfillment records.",
      },
    ],
    implementation: [
      {
        heading: "Marketplace model",
        body: [
          "The repository supports a multi-role architecture with vendor approval, product lifecycle status, and buyer-side checkout flows consistent with the PRD.",
          "The system is structured to process a single buyer order while splitting fulfillment across participating vendors.",
        ],
      },
      {
        heading: "Operational API flow",
        body: [
          "Authentication uses JWT and bcrypt-based security, while server-side routes handle product access, address, cart, and order operations.",
          "Checkout includes Stripe PaymentIntent support and a simulated local path; the application currently persists its marketplace data to a JSON file.",
        ],
      },
    ],
    outcome: [
      "This project shows Raj’s ability to build a more complex product architecture with ownership boundaries, payment logic, and multi-role business flows.",
      "It is a strong example of e-commerce and marketplace product thinking grounded in real application behavior, not just UI work.",
    ],
    visual: {
      kind: "marketplace",
      caption:
        "Marketplace architecture for buyer, vendor, and admin journeys.",
    },
    facts: [
      { value: "JWT", label: "Auth" },
      { value: "JSON file", label: "Persistence" },
      { value: "Stripe", label: "Payments" },
    ],
  },
  {
    slug: "ji-task-assigning",
    order: 3,
    title: "JI Task Assigning Application",
    category: "Project & Task Management",
    tagline:
      "Role-based planning, issue tracking, sprint flow, and workflow validation.",
    year: "2025",
    role: "FastAPI + React workflow system",
    status: "Personal Project",
    stack: [
      "FastAPI",
      "PostgreSQL",
      "React",
      "TypeScript",
      "Vite",
      "SQLAlchemy",
      "Alembic",
    ],
    repo: "https://github.com/1972001raj-droid/ji-task-assigning-apllication-",
    summary:
      "A full-stack project management system with role-based access, issue hierarchies, sprint planning, dashboards, and workflow validation across tasks, stories, and epics.",
    overview: [
      "The repository describes a role-based issue tracking and project planning platform designed for admins, managers, developers, and testers.",
      "It combines a FastAPI backend with a React front end to support sprint workflows, Kanban movement, audit logs, and reporting views.",
    ],
    problem: [
      "Product teams need more than a simple task list. They need a workflow engine that enforces how work moves from backlog to review to completion.",
      "The product needed to keep dependencies, acceptance criteria, and roles aligned without allowing inconsistent transitions.",
    ],
    myRole: [
      "Built a project management system with clear role-based access and workflow rules around epics, stories, tasks, bugs, and subtasks.",
      "Implemented backend enforcement and a frontend board experience to make the work lifecycle visible and governable.",
    ],
    architecture: {
      summary:
        "The project separates backend domain logic from a role-aware frontend experience, with a workflow engine and reporting layer built on top of FastAPI and PostgreSQL.",
      layers: [
        {
          label: "Backend",
          detail:
            "FastAPI services, repositories, schemas, workflow logic, and PostgreSQL persistence.",
        },
        {
          label: "Workflow engine",
          detail:
            "Rules for issue movement, story completion, and parent-child propagation between work items.",
        },
        {
          label: "Frontend",
          detail:
            "React dashboard, Kanban board, reporting views, and role-based project interactions.",
        },
      ],
    },
    features: [
      {
        title: "Role-based access",
        detail:
          "Admin, manager, and developer/tester permissions are enforced by the backend and reflected in the UI.",
      },
      {
        title: "Issue hierarchy",
        detail:
          "Epics, stories, tasks, bugs, and subtasks are modeled as connected work items with validation rules.",
      },
      {
        title: "Kanban and sprint tooling",
        detail:
          "The system supports movement between board states, sprint creation, and issue lifecycle management.",
      },
      {
        title: "Observability and reporting",
        detail:
          "Dashboards, audit logs, notifications, and workload reporting support operational visibility.",
      },
    ],
    challenges: [
      {
        title: "Transition rules",
        detail:
          "Ensuring work only advances when dependent tasks and acceptance criteria are actually complete.",
      },
      {
        title: "Multi-role workflow clarity",
        detail:
          "Making the experience usable for managers, developers, and testers without weakening the backend enforcement rules.",
      },
    ],
    implementation: [
      {
        heading: "Role and permission layer",
        body: [
          "The project is designed to enforce permissions on the server and use role-aware views in the client to prevent unauthorized actions.",
          "This approach creates a stronger product model than a UI-only permissions system because the workflow rules remain consistent at the API layer.",
        ],
      },
      {
        heading: "Workflow engine",
        body: [
          "The readme explicitly documents task and story propagation rules, review requirements, and optimistic locking to keep board transitions safe.",
          "This is a good example of system thinking in a product that goes beyond basic CRUD and into predictable operational behavior.",
        ],
      },
    ],
    outcome: [
      "This project demonstrates Raj’s ability to work with higher-order planning systems, backend validation rules, and structured user workflows.",
      "It reinforces his fit for business software, internal tooling, and role-driven product architecture.",
    ],
    visual: {
      kind: "issue-board",
      caption:
        "Issue board with workflow states, sprint planning, and role-based project operations.",
    },
    facts: [
      { value: "FastAPI", label: "Backend" },
      { value: "PostgreSQL", label: "Database" },
      { value: "Kanban + sprints", label: "Workflow model" },
    ],
  },
];

export const professionalProjects = [
  {
    title: "MDQMS",
    fullName: "Medical Device Quality Management System",
    category: "Professional Project • IATT Solutions",
    summary:
      "Python/Django compliance platform for versioned document control, CAPA (Corrective and Preventive Action) tracking, and audit-trail logging, built for regulatory traceability across 5+ workflow states and 3 user roles (Admin, QA, Reviewer).",
    stack: ["Python", "Django", "MySQL", "Role-Based Access", "Audit Trails"],
    highlights: ["5+ Workflow States", "3 User Roles (Admin, QA, Reviewer)", "Regulatory Audit Logging"],
  },
  {
    title: "LMS",
    fullName: "Learning Management System",
    category: "Professional Project • IATT Solutions",
    summary:
      "FastAPI and React.js course delivery platform covering courses, enrollments, assessments, and grading. Built end-to-end with a normalized 12+ table MySQL schema, 25+ REST APIs with Pydantic validation, JWT authentication, and role-based dashboards supporting 500+ active learners.",
    stack: ["Python", "FastAPI", "React.js", "MySQL", "Pydantic", "JWT"],
    highlights: ["500+ Active Learners", "25+ REST APIs", "12+ Table Schema"],
  },
  {
    title: "ATS",
    fullName: "Applicant Tracking System",
    category: "Professional Project • Wisdom Infotech",
    summary:
      "Django REST Framework and React.js recruitment platform covering job postings, candidate pipelines, and interview scheduling, owned from architecture through handover. Optimized queries via indexing and select_related / prefetch_related, reducing response time by 25% across 20,000+ records.",
    stack: ["Python", "Django REST Framework", "React.js", "MySQL", "Query Optimization"],
    highlights: ["20,000+ Records", "25% Latency Reduction", "End-to-End Ownership"],
  },
] as const;
