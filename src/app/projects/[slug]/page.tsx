import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, ArrowUpRight, Github } from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectDetailPage({ params }: { params: { slug: string } }) {
    const project = projects.find((entry) => entry.slug === params.slug);

    if (!project) {
        notFound();
    }

    const currentIndex = projects.findIndex((entry) => entry.slug === project.slug);
    const previous = currentIndex > 0 ? projects[currentIndex - 1] : null;
    const next = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

    return (
        <main className="mx-auto max-w-shell px-4 pb-24 pt-32 sm:px-6 lg:px-8">
            <Link href="/projects" className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                <ArrowLeft size={14} /> Back to projects
            </Link>

            <section className="mt-10 overflow-hidden rounded-[30px] border border-line bg-elev/80 p-6 shadow-lift sm:p-8">
                <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-end">
                    <div>
                        <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-accent">{project.category}</p>
                        <h1 className="mt-4 text-display-2 font-medium text-ink">{project.title}</h1>
                        <p className="mt-5 max-w-xl text-lg leading-8 text-muted">{project.tagline}</p>
                    </div>
                    <div className="space-y-3">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-muted">Stack</p>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                                <span key={item} className="rounded-full border border-line px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted">
                                    {item}
                                </span>
                            ))}
                        </div>
                        {project.repo && (
                            <a href={project.repo} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-accent transition hover:text-ink">
                                <Github size={14} /> View source <ArrowUpRight size={13} />
                            </a>
                        )}
                    </div>
                </div>
            </section>

            <section className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Overview</p>
                    {project.overview.map((paragraph) => (
                        <p key={paragraph} className="mt-4 text-base leading-7 text-muted">{paragraph}</p>
                    ))}
                </div>

                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">The problem</p>
                    {project.problem.map((point) => (
                        <p key={point} className="mt-4 text-base leading-7 text-muted">{point}</p>
                    ))}
                </div>
            </section>

            <section className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">My role</p>
                    {project.myRole.map((point) => (
                        <p key={point} className="mt-4 text-base leading-7 text-muted">{point}</p>
                    ))}
                </div>

                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Architecture</p>
                    <p className="mt-4 text-base leading-7 text-muted">{project.architecture.summary}</p>
                    <ul className="mt-5 space-y-3">
                        {project.architecture.layers.map((layer) => (
                            <li key={layer.label} className="rounded-2xl border border-line bg-bg/40 p-3">
                                <span className="text-[10px] uppercase tracking-[0.24em] text-accent">{layer.label}</span>
                                <p className="mt-2 text-sm leading-6 text-muted">{layer.detail}</p>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            <section className="mt-12 grid gap-6 lg:grid-cols-2 xl:grid-cols-4">
                {project.features.map((feature) => (
                    <div key={feature.title} className="rounded-[22px] border border-line bg-elev/80 p-5">
                        <p className="text-[10px] uppercase tracking-[0.24em] text-accent">Feature</p>
                        <h2 className="mt-3 text-lg font-medium text-ink">{feature.title}</h2>
                        <p className="mt-3 text-sm leading-6 text-muted">{feature.detail}</p>
                    </div>
                ))}
            </section>

            <section className="mt-12 grid gap-8 lg:grid-cols-2">
                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Technical challenges</p>
                    {project.challenges.map((challenge) => (
                        <div key={challenge.title} className="mt-5">
                            <h3 className="text-lg font-medium text-ink">{challenge.title}</h3>
                            <p className="mt-2 text-sm leading-6 text-muted">{challenge.detail}</p>
                        </div>
                    ))}
                </div>

                <div className="rounded-[24px] border border-line bg-elev/80 p-6">
                    <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Implementation</p>
                    {project.implementation.map((block) => (
                        <div key={block.heading} className="mt-5">
                            <h3 className="text-lg font-medium text-ink">{block.heading}</h3>
                            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-muted">
                                {block.body.map((item) => (
                                    <li key={item}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>
            </section>

            <section className="mt-12 rounded-[24px] border border-line bg-elev/80 p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Outcome</p>
                <div className="mt-5 grid gap-4 lg:grid-cols-2">
                    {project.outcome.map((point) => (
                        <p key={point} className="text-base leading-7 text-muted">{point}</p>
                    ))}
                </div>
            </section>

            <section className="mt-12 rounded-[24px] border border-line bg-elev/80 p-6">
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">Technical facts</p>
                <div className="mt-5 grid gap-4 md:grid-cols-3">
                    {project.facts.map((fact) => (
                        <div key={fact.label} className="rounded-2xl border border-line bg-bg/40 p-4">
                            <div className="text-lg font-medium text-ink">{fact.value}</div>
                            <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted">{fact.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    {previous ? (
                        <Link href={`/projects/${previous.slug}`} className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                            <ArrowLeft size={14} /> Previous project
                        </Link>
                    ) : null}
                </div>
                <div>
                    {next ? (
                        <Link href={`/projects/${next.slug}`} className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                            Next project <ArrowRight size={14} />
                        </Link>
                    ) : null}
                </div>
            </div>
        </main>
    );
}
