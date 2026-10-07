import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '@/data/projects';

export default function ProjectsOverviewPage() {
    return (
        <main className="mx-auto max-w-shell px-4 pb-24 pt-32 sm:px-6 lg:px-8">
            <div className="mb-12 max-w-3xl">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent">Selected work</p>
                <h1 className="mt-4 text-display-2 font-medium text-ink">Project case studies.</h1>
            </div>

            <div className="space-y-8">
                {projects.map((project) => (
                    <article key={project.slug} data-project-card="true" className="rounded-[28px] border border-line bg-elev/60 p-6 shadow-lift sm:p-8">
                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                            <div>
                                <p className="text-[10px] font-medium uppercase tracking-[0.28em] text-muted">{project.category}</p>
                                <h2 className="mt-3 text-display-4 font-medium text-ink">{project.title}</h2>
                            </div>
                            <Link href={`/projects/${project.slug}`} className="inline-flex items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                                View project <ArrowUpRight size={14} />
                            </Link>
                        </div>
                        <p className="mt-5 max-w-2xl text-base text-muted">{project.summary}</p>
                        <div className="mt-6 flex flex-wrap gap-2">
                            {project.stack.slice(0, 4).map((item) => (
                                <span key={item} className="rounded-full border border-line px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-muted">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </article>
                ))}
            </div>
        </main>
    );
}
