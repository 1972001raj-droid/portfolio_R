import Link from 'next/link';

export default function AboutPage() {
    return (
        <main className="mx-auto max-w-shell px-4 pb-24 pt-32 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
                <p className="section-label">About</p>
                <h1 className="mt-4 text-display-2 font-medium text-ink">Building software that solves real problems.</h1>
            </div>

            <div className="mt-12 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
                <div className="space-y-6 text-lg leading-8 text-muted">
                    <p>
                        I am a Python Full-Stack Developer with 3+ years of experience building production web applications using Django, Django REST Framework, FastAPI, and React.js.
                    </p>
                    <p>
                        I have independently owned architecture-to-delivery for three enterprise platforms: a regulatory compliance system (MDQMS), a learning management system (LMS), and an applicant tracking system (ATS) — covering normalized database design, 25+ REST APIs, and responsive React.js user interfaces.
                    </p>
                    <p>
                        My engineering focus centers on clean architecture, performance optimization, data accuracy, and reliable business workflows across Python backends and modern frontend experiences.
                    </p>
                </div>

                <div className="rounded-[26px] border border-line bg-elev/80 p-6 sm:p-8">
                    <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-accent">Core Focus</p>
                    <ul className="mt-5 space-y-3.5 text-sm text-muted">
                        <li>• Python backend engineering with Django & FastAPI</li>
                        <li>• Enterprise REST APIs with Pydantic validation & JWT</li>
                        <li>• Database design, normalization, & query optimization</li>
                        <li>• Component-driven React.js frontends & role dashboards</li>
                        <li>• Regulatory compliance workflows & audit-trail logging</li>
                        <li>• Cloud deployment with AWS, Docker, & CI/CD automation</li>
                    </ul>
                </div>
            </div>

            <div className="mt-14 flex justify-center">
                <Link href="/" className="inline-flex items-center rounded-full bg-accent px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-ink">
                    Back to homepage
                </Link>
            </div>
        </main>
    );
}
