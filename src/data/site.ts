import type { SocialLink } from '@/types/content';

export const site = {
    name: 'Raj R',
    shortName: 'Raj R',
    role: 'Python Full-Stack Developer',
    roleLines: ['Python', 'Full-Stack', 'Developer'] as const,
    specialization: 'Django | FastAPI | React.js',
    experienceLabel: '3+ Years Experience',
    location: 'Chennai, Tamil Nadu, India',
    locationShort: 'Chennai, India',
    availability: 'Available • 1 Month Notice',
    noticePeriod: '1 Month',
    email: 'ashieeraj1901@gmail.com',
    phone: '+91 87544 79944',
    phoneHref: 'tel:+918754479944',
    positioning:
        'Python Full Stack Developer with 3+ years of experience building production web applications with Django, Django REST Framework, FastAPI, and React.js. Independently owned architecture-to-delivery for three enterprise platforms (MDQMS, LMS, ATS) covering database design, 25+ REST APIs, and React.js user interfaces.',
    heroSupport:
        'Building production web applications with Django, FastAPI, and React.js — from normalized database design and 25+ REST APIs to performant, responsive user interfaces.',
    heroKicker: 'Chennai, India • 3+ years • 1 Month Notice',
    resumeHref: '/raj-r-resume.pdf',
    portrait: {
        src: '/raj-r-portrait.jpeg',
        alt: 'Portrait of Raj R, Python Full-Stack Developer',
        width: 1024,
        height: 1536,
    },
    url: 'https://rajr.dev',
    title: 'Raj R — Python Full-Stack Developer | Django | FastAPI | React.js',
    description:
        'Portfolio of Raj R, Python Full-Stack Developer with 3+ years of experience building production web applications with Django, FastAPI, React.js, and REST APIs.',
    keywords: [
        'Raj R',
        'Python Full-Stack Developer',
        'Django Developer',
        'FastAPI Developer',
        'React Developer',
        'REST APIs Developer',
        'Python Developer Chennai',
        'Django REST Framework',
        'Full Stack Developer Portfolio',
    ],
    socials: [
        {
            label: 'GitHub',
            href: 'https://github.com/1972001raj-droid',
            handle: '@1972001raj-droid',
            icon: 'github',
        },
        {
            label: 'LinkedIn',
            href: 'https://linkedin.com/in/raj-r-498335259',
            handle: 'in/raj-r-498335259',
            icon: 'linkedin',
        },
        {
            label: 'Email',
            href: 'mailto:ashieeraj1901@gmail.com',
            handle: 'ashieeraj1901@gmail.com',
            icon: 'mail',
        },
    ] satisfies readonly SocialLink[],
} as const;

export const navItems = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Work', href: '#work', id: 'work' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Contact', href: '#contact', id: 'contact' },
] as const;

export type NavItem = (typeof navItems)[number];

export const metrics = [
    { value: '3+', label: 'Years Experience' },
    { value: '25+', label: 'REST APIs Built' },
    { value: '3', label: 'Enterprise Platforms' },
    { value: '20K+', label: 'Records Handled' },
    { value: '500+', label: 'Active Learners' },
    { value: '25%', label: 'Query Latency Cut' },
] as const;

export const skillGroups = [
    {
        id: 'languages',
        label: 'Languages',
        blurb: 'Core programming and database query languages used across production systems.',
        items: [
            { name: 'Python', context: 'Server-side logic, Django, FastAPI, and data workflows' },
            { name: 'JavaScript', context: 'Frontend dynamic features and React application state' },
            { name: 'TypeScript', context: 'Type-safe interfaces, API schemas, and component architecture' },
            { name: 'SQL', context: 'Schema design, complex joins, indexing, and query optimization' },
        ],
    },
    {
        id: 'backend',
        label: 'Backend',
        blurb: 'Enterprise services, REST APIs, authentication, and validation layers.',
        items: [
            { name: 'Django', context: 'Enterprise application architecture and ORM workflows' },
            { name: 'Django REST Framework', context: 'REST APIs, serializers, and permission classes' },
            { name: 'FastAPI', context: 'High-performance async APIs, dependency injection, and OpenAPI' },
            { name: 'Flask', context: 'Microservice endpoints and lightweight API layers' },
            { name: 'Pydantic', context: 'Data validation and schema parsing for REST APIs' },
            { name: 'REST APIs', context: 'API design, endpoint contracts, and status handling' },
            { name: 'JWT Authentication', context: 'Stateless secure authentication and session tokens' },
            { name: 'Node.js', context: 'Server-side JavaScript services and tooling' },
            { name: 'Express.js', context: 'REST routing and middleware integration' },
        ],
    },
    {
        id: 'frontend',
        label: 'Frontend',
        blurb: 'Responsive, accessible component architectures built with React and modern CSS.',
        items: [
            { name: 'React.js', context: 'Component-driven user interfaces, hooks, and lifecycle' },
            { name: 'Redux Toolkit', context: 'Predictable centralized application state management' },
            { name: 'Context API', context: 'Role-based access, authentication, and local view state' },
            { name: 'Tailwind CSS', context: 'Modern responsive design and utility styling' },
            { name: 'Material UI', context: 'Consistent enterprise component systems and theme styling' },
            { name: 'HTML5', context: 'Semantic markup, SEO, and accessible document structure' },
            { name: 'CSS3', context: 'Modern styling, CSS variables, and layout systems' },
        ],
    },
    {
        id: 'databases',
        label: 'Databases',
        blurb: 'Relational and document storage with normalization, indexing, and performance tuning.',
        items: [
            { name: 'MySQL', context: 'Schema normalization (12+ tables), indexing, and query tuning' },
            { name: 'PostgreSQL', context: 'Structured persistence and ACID-compliant relational modeling' },
            { name: 'MongoDB', context: 'Document-oriented storage for flexible schemas' },
            { name: 'Redis', context: 'In-memory caching and session acceleration' },
            { name: 'Firebase', context: 'Real-time database and identity integration' },
            { name: 'Database Design', context: 'Entity relationships, 3NF normalization, and foreign keys' },
            { name: 'Query Optimization', context: 'select_related, prefetch_related, and execution indexing' },
        ],
    },
    {
        id: 'devops',
        label: 'Cloud & DevOps',
        blurb: 'Cloud infrastructure, containerization, and continuous delivery pipelines.',
        items: [
            { name: 'AWS (EC2, S3, VPC, IAM)', context: 'Cloud hosting, secure networking, and bucket storage' },
            { name: 'Docker', context: 'Containerized environments for consistent development and deployment' },
            { name: 'CI/CD', context: 'Automated test, build, and deployment workflows' },
            { name: 'GitHub Actions', context: 'Automated pipeline triggers and lint/test verification' },
            { name: 'Jenkins', context: 'Build automation and continuous integration jobs' },
            { name: 'Git & GitHub', context: 'Structured Git branching, code reviews, and version control' },
        ],
    },
    {
        id: 'practices',
        label: 'Practices & Tools',
        blurb: 'Software engineering methodologies, testing, API documentation, and modern AI tooling.',
        items: [
            { name: 'Agile & Scrum', context: 'Sprint planning, daily stand-ups, code reviews, retrospectives' },
            { name: 'Role-Based Access Control', context: 'Multi-role permission states (Admin, QA, Reviewer, Learner)' },
            { name: 'Postman', context: 'REST API testing, collections, and contract documentation' },
            { name: 'VS Code', context: 'Development environment with linting, debugging, and extensions' },
            { name: 'LangChain', context: 'AI workflow orchestration and structured reasoning' },
            { name: 'RAG (Basic Exposure)', context: 'Document-grounded retrieval and semantic context integration' },
        ],
    },
] as const;

export const experienceEntries = [
    {
        company: 'IATT Solutions',
        role: 'Full Stack Developer',
        period: 'Jul 2025 – Present',
        startYear: '2025',
        location: 'Chennai, India',
        summary:
            'Independently developing enterprise modules for medical compliance (MDQMS) and learning management (LMS) using Python, Django, FastAPI, and React.js.',
        responsibilities: [
            'Developing document control, CAPA (Corrective and Preventive Action), and audit-trail modules for a medical device Quality Management System (MDQMS) using Python and Django, covering 5+ workflow states across 3 user roles (Admin, QA, Reviewer).',
            'Implemented versioned document-control workflows in Django with approval routing and audit-trail logging, supporting regulatory traceability for QA and compliance stakeholders.',
            'Designed a normalized MySQL schema (12+ tables) and built 25+ REST APIs with Python and FastAPI for a Learning Management System (LMS) covering courses, enrollments, assessments, and grading, using Pydantic validation and JWT authentication.',
            'Built the LMS React.js frontend end to end, including course catalog, enrollment flows, grading workflows, and role-based dashboards, supporting 500+ active learners.',
        ],
        technologies: ['Python', 'Django', 'FastAPI', 'React.js', 'MySQL', 'Pydantic', 'JWT', 'REST APIs'],
        current: true,
    },
    {
        company: 'Wisdom Infotech',
        role: 'Full Stack Developer',
        period: 'Dec 2023 – Jun 2025',
        startYear: '2023',
        location: 'Chennai, India',
        summary:
            'Owned an Applicant Tracking System (ATS) end to end from architecture through delivery, optimizing queries and scaling to 20,000+ records.',
        responsibilities: [
            'Owned an Applicant Tracking System (ATS) end to end from architecture through delivery: designed the MySQL schema and REST APIs with Python and Django REST Framework, and built the React.js frontend (Hooks, Context API) for job postings, candidate pipelines, and interview scheduling.',
            'Optimized MySQL queries using indexing and Django ORM query restructuring (select_related, prefetch_related), reducing average query and API response time by 25% as data volume grew to 20,000+ records.',
            'Added reusable UI components and client-side validation across multiple sprints; used Postman for API testing and documentation and maintained structured GitHub branching through project handover.',
            'Collaborated in an Agile team through sprint planning, daily stand-ups, code reviews, and retrospectives.',
        ],
        technologies: ['Python', 'Django REST Framework', 'React.js', 'MySQL', 'Context API', 'Postman', 'Git', 'Agile'],
    },
    {
        company: 'Prostaff Infotech',
        role: 'Web Developer Intern',
        period: 'Aug 2023 – Nov 2023',
        startYear: '2023',
        location: 'Chennai, India',
        summary:
            'Built and supported web application features spanning frontend, backend integration, and relational database design, strengthening REST API and full-stack fundamentals.',
        responsibilities: [
            'Built and supported web application features spanning frontend, backend integration, and relational database design.',
            'Strengthened REST API integration, data modeling, and full-stack software development fundamentals.',
            'Worked with relational databases, component design, and end-to-end data flow validation.',
        ],
        technologies: ['Python', 'React.js', 'JavaScript', 'SQL', 'REST APIs'],
    },
] as const;

export const approachSteps = [
    { step: '01', title: 'Understand', body: 'Clarify the business problem, compliance constraints, and the real-world outcome the software needs to deliver.' },
    { step: '02', title: 'Design', body: 'Plan normalized schemas, API contracts (FastAPI / DRF), role-based permissions, and frontend component hierarchies.' },
    { step: '03', title: 'Build', body: 'Develop robust backend services with Pydantic validation and clean React.js frontend experiences.' },
    { step: '04', title: 'Integrate', body: 'Connect databases, JWT auth, endpoints, and UI into a secure, cohesive end-to-end system.' },
    { step: '05', title: 'Test', body: 'Validate data flow, edge cases, role permissions, and API contracts with Postman and automated tests.' },
    { step: '06', title: 'Improve', body: 'Optimize database queries (select_related, indexing), refine UI performance, and ensure audit logging.' },
] as const;

export const exploringTopics = [
    { title: 'Python backend architecture', body: 'Improving service design, async FastAPI patterns, and maintainable enterprise business logic.' },
    { title: 'System design & query tuning', body: 'Query optimization, schema normalization, and architectural scalability for high-data workloads.' },
    { title: 'Automation & CI/CD', body: 'Building reliable operational workflows, Dockerized environments, and GitHub Actions pipelines.' },
    { title: 'AI integrations & RAG', body: 'Exploring LangChain, retrieval-augmented generation (RAG), and deterministic AI reasoning DAGs.' },
] as const;
