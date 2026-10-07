"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  ArrowUpRight,
  Download,
  Github,
  Linkedin,
  Mail,
} from "lucide-react";
import { useEffect, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePinnedTrack } from "@/hooks/use-pinned-track";
import {
  metrics,
  site,
  skillGroups,
  experienceEntries,
  approachSteps,
  exploringTopics,
} from "@/data/site";
import { professionalProjects, projects } from "@/data/projects";
import { AiThinkingDrawer, TelemetryHud } from "@/components";

gsap.registerPlugin(ScrollTrigger);

export default function HomePage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);
  const {
    sectionRef: workSection,
    trackRef: workTrack,
    progress: workProgress,
  } = usePinnedTrack<HTMLElement>();

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsLoaded(true);
      setLoadProgress(100);
      gsap.set(".hero-line, .hero-copy, .hero-portrait, .reveal", {
        opacity: 1,
        clearProps: "transform",
      });
      return;
    }

    const interval = window.setInterval(() => {
      setLoadProgress((prev) => {
        if (prev >= 100) {
          window.clearInterval(interval);
          setTimeout(() => setIsLoaded(true), 150);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 12) + 8);
      });
    }, 40);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!isLoaded) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const seq = gsap.timeline();
      seq
        .fromTo(
          ".hero-line",
          { y: 28, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.12,
          },
        )
        .fromTo(
          ".hero-portrait",
          { opacity: 0, x: 36, scale: 1.04 },
          { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: "power3.out" },
          "-=0.5",
        )
        .fromTo(
          ".hero-copy",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" },
          "-=0.7",
        );

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((element) => {
        gsap.fromTo(
          element,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: element,
              start: "top 82%",
            },
          },
        );
      });
    });

    return () => ctx.revert();
  }, [isLoaded]);

  return (
    <>
      {!isLoaded && (
        <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg text-ink transition-opacity duration-300">
          <div className="w-full max-w-xs px-6 text-center">
            <p className="text-[11px] font-mono font-medium uppercase tracking-[0.4em] text-accent">
              {site.name}
            </p>
            <p className="mt-2 text-[10px] font-mono uppercase tracking-[0.24em] text-muted">
              {site.role}
            </p>
            <div className="mt-8 flex items-center justify-between font-mono text-[10px] text-muted">
              <span>INITIALIZING</span>
              <span className="text-accent font-semibold">{String(loadProgress).padStart(2, "0")}%</span>
            </div>
            <div className="mt-2 h-0.5 w-full overflow-hidden rounded-full bg-line">
              <div
                className="h-full bg-accent transition-all duration-75 ease-out"
                style={{ width: `${loadProgress}%` }}
              />
            </div>
          </div>
        </div>
      )}

      <main className="relative pb-20 text-ink">
        <div className="pointer-events-none absolute inset-0 grid-overlay opacity-40" />

        <section
          id="home"
          className="relative mx-auto max-w-shell px-4 pb-20 pt-28 sm:px-6 lg:px-8 lg:pb-28 lg:pt-36"
        >
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <div className="relative z-10">
              <div className="hero-line mb-5 inline-flex items-center gap-3 rounded-full border border-line bg-elev/70 px-3 py-2 opacity-0 backdrop-blur-sm">
                <span className="h-2 w-2 rounded-full bg-accent" />
                <span className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent">
                  {site.heroKicker}
                </span>
              </div>
              <h1 className="mt-2 text-display-1 font-medium leading-[0.9] text-ink">
                <span className="hero-line block text-accent font-semibold tracking-tight text-[clamp(2.5rem,7vw,6.5rem)] mb-2">
                  {site.name}
                </span>
                {site.roleLines.map((line) => (
                  <span key={line} className="hero-line block opacity-0">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="hero-copy mt-6 max-w-xl text-lg leading-8 text-muted opacity-0">
                {site.heroSupport}
              </p>
              <div className="hero-copy mt-8 flex flex-wrap items-center gap-4 opacity-0">
                <a
                  href="#work"
                  className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-ink shadow-[0_18px_40px_-18px_rgba(110,158,255,0.9)] transition hover:-translate-y-0.5 hover:opacity-95"
                >
                  View my work <ArrowRight size={14} />
                </a>
                <a
                  href="#contact"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink transition hover:border-line-strong hover:-translate-y-0.5"
                >
                  Let’s connect
                </a>
                <a
                  href={site.socials[0].href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink transition hover:border-line-strong hover:-translate-y-0.5"
                >
                  <Github size={14} /> GitHub
                </a>
              </div>

              <div className="hero-copy mt-6 flex items-center gap-2 text-[10px] font-mono uppercase tracking-[0.28em] text-muted opacity-0">
                <span>Scroll to explore</span>
                <span className="animate-bounce">↓</span>
              </div>

              <div className="hero-copy mt-10 grid max-w-lg gap-3 opacity-0 sm:grid-cols-3">
                <div className="rounded-[18px] border border-line bg-elev/70 p-3">
                  <div className="text-lg font-medium text-ink">3+</div>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted">
                    Years
                  </p>
                </div>
                <div className="rounded-[18px] border border-line bg-elev/70 p-3">
                  <div className="text-lg font-medium text-ink">25+</div>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted">
                    APIs
                  </p>
                </div>
                <div className="rounded-[18px] border border-line bg-elev/70 p-3">
                  <div className="text-lg font-medium text-ink">20K+</div>
                  <p className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted">
                    Records
                  </p>
                </div>
              </div>
            </div>

            <div className="hero-portrait relative opacity-0">
              <div className="editorial-card relative overflow-hidden rounded-[30px] border border-line bg-elev/90 p-3 pb-10 sm:pb-12">
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-accent/15 via-transparent to-transparent" />
                <div className="relative overflow-hidden rounded-[22px] bg-bg">
                  <Image
                    src={site.portrait.src}
                    alt={site.portrait.alt}
                    width={site.portrait.width}
                    height={site.portrait.height}
                    priority
                    className="aspect-[4/5] w-full rounded-[22px] object-cover object-[center_18%] contrast-[1.03] sm:aspect-[3/2] lg:aspect-[4/5] lg:max-h-[min(74vh,680px)]"
                  />
                </div>
              </div>

              <div className="floating-panel hidden rounded-[20px] border border-line bg-elev/90 p-4 shadow-lift md:block">
                <p className="text-[9px] uppercase tracking-[0.24em] text-accent">
                  Specialization
                </p>
                <p className="mt-3 text-sm font-medium text-ink">
                  Django • FastAPI • React.js
                </p>
                <p className="mt-2 text-xs text-muted">
                  3+ years • 3 enterprise platforms owned end-to-end.
                </p>
              </div>
            </div>
          </div>
        </section>

        <div className="reveal mx-auto max-w-shell px-4 pb-12 sm:px-6 lg:px-8">
          <TelemetryHud
            metrics={[
              { label: "Latency", value: "38ms" },
              { label: "WCAG", value: "4.8:1", unit: "AA" },
            ]}
          />
        </div>

        <section
          id="about"
          className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="reveal grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <p className="section-label">About</p>
              <h2 className="mt-4 max-w-md text-display-2 font-medium text-ink">
                Building software that solves real problems.
              </h2>
            </div>
            <div className="max-w-2xl text-lg leading-8 text-muted">
              Python Full Stack Developer with 3+ years of experience building production web applications using Django, Django REST Framework, FastAPI, and React.js. Independently owned architecture-to-delivery for three enterprise platforms (MDQMS, LMS, ATS) covering normalized database design, 25+ REST APIs, and responsive user interfaces.
            </div>
          </div>

          <div className="reveal mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-[22px] border border-line bg-elev/70 p-5 text-center sm:text-left"
              >
                <div className="text-display-4 font-medium text-ink">
                  {metric.value}
                </div>
                <p className="mt-2 text-[10px] uppercase tracking-[0.2em] text-muted">
                  {metric.label}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section id="work" ref={workSection} className="relative py-20 lg:py-0">
          <div className="project-sticky lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:overflow-hidden">
            <div className="mx-auto mb-6 flex w-full max-w-shell items-end justify-between gap-4 px-4 sm:px-6 lg:px-8 lg:mb-10">
              <div className="min-w-0">
                <p className="section-label">
                  Selected work · Personal projects
                </p>
                <h2 className="mt-4 max-w-2xl text-display-3 font-medium text-ink lg:text-display-2">
                  Systems built around real workflows.
                </h2>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-3 sm:flex-row sm:items-center">
                <span className="hidden text-[9px] uppercase tracking-[0.24em] text-muted lg:block">
                  {String(Math.round(workProgress * 100)).padStart(2, "0")}%
                </span>
                <Link
                  href="/projects"
                  className="hidden items-center gap-2 text-[10px] font-medium uppercase tracking-[0.24em] text-accent transition hover:text-ink sm:inline-flex"
                >
                  All projects <ArrowUpRight size={14} />
                </Link>
              </div>
            </div>

            <div className="overflow-hidden px-4 sm:px-6 lg:px-0">
              <div
                ref={workTrack}
                className="project-track mx-auto grid max-w-shell gap-5 lg:mx-0 lg:flex lg:w-max lg:max-w-none lg:gap-6 lg:pl-[max(2rem,calc((100vw-1280px)/2))] lg:pr-8"
              >
                {projects.map((project) => (
                  <article
                    key={project.slug}
                    data-project-card="true"
                    className="project-panel grid min-h-[32rem] overflow-hidden rounded-[26px] border border-line bg-elev/75 lg:min-h-[68vh] lg:w-[86vw] lg:max-w-[1120px] lg:shrink-0 lg:grid-cols-[0.78fr_1.22fr]"
                  >
                    <div className="flex flex-col justify-between p-5 sm:p-7 lg:p-9">
                      <div>
                        <div className="flex items-center justify-between gap-4 text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                          <span>
                            0{project.order} / 0{projects.length}
                          </span>
                          <span>{project.status}</span>
                        </div>
                        <p className="mt-8 text-[10px] uppercase tracking-[0.26em] text-accent lg:mt-12">
                          {project.category}
                        </p>
                        <h3 className="mt-4 text-[clamp(2.4rem,5vw,5.4rem)] font-medium leading-[0.94] text-ink">
                          {project.title}
                        </h3>
                        <p className="mt-5 max-w-md text-base leading-7 text-muted">
                          {project.summary}
                        </p>
                      </div>
                      <div className="mt-8">
                        <div className="mb-6 flex flex-wrap gap-2">
                          {project.stack.slice(0, 4).map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-line px-3 py-1.5 text-[9px] uppercase tracking-[0.16em] text-muted"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                        <div className="flex flex-wrap items-center gap-5">
                          <Link
                            href={`/projects/${project.slug}`}
                            className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-accent px-4 text-[10px] font-medium uppercase tracking-[0.2em] text-accent-ink transition hover:-translate-y-0.5"
                          >
                            Case study{" "}
                            <ArrowRight
                              size={13}
                              className="transition-transform group-hover:translate-x-1"
                            />
                          </Link>
                          {project.repo && (
                            <a
                              href={project.repo}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex min-h-11 items-center gap-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition hover:text-accent"
                            >
                              <Github size={14} /> Source
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <figure
                      aria-label={project.visual.caption}
                      className="project-architecture relative flex min-h-[16rem] flex-col justify-center overflow-hidden border-t border-line bg-surface/70 p-5 sm:p-7 lg:border-l lg:border-t-0 lg:p-10"
                    >
                      <div className="pointer-events-none absolute inset-0 grid-overlay opacity-30" />
                      <figcaption className="relative mb-5 flex items-center justify-between gap-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted">
                        <span>Conceptual architecture</span>
                        <span>Not a product screenshot</span>
                      </figcaption>
                      <div className="relative grid gap-3">
                        {project.architecture.layers.map((layer) => (
                          <div
                            key={layer.label}
                            className="architecture-node grid gap-1 border-l-2 border-accent/70 bg-bg/70 px-4 py-3 sm:grid-cols-[minmax(8rem,0.42fr)_1fr] sm:items-center"
                          >
                            <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-ink">
                              {layer.label}
                            </span>
                            <span className="text-xs leading-5 text-muted">
                              {layer.detail}
                            </span>
                          </div>
                        ))}
                      </div>
                    </figure>
                  </article>
                ))}
              </div>
            </div>

            <div className="mx-auto mt-5 flex max-w-shell items-center justify-between px-4 text-[9px] uppercase tracking-[0.22em] text-muted sm:px-6 lg:px-8">
              <span className="hidden lg:block">
                Scroll to move through the sequence
              </span>
              <span className="lg:hidden">Swipe / scroll to explore</span>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-accent sm:hidden"
              >
                All projects <ArrowUpRight size={13} />
              </Link>
            </div>
          </div>
        </section>

        <section
          id="skills"
          className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="reveal mb-10">
            <p className="section-label">Technical expertise</p>
            <h2 className="mt-4 text-display-2 font-medium text-ink">
              Core tools for full-stack delivery.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2 xl:grid-cols-3">
            {skillGroups.map((group) => (
              <div
                key={group.id}
                className="reveal rounded-[26px] border border-line bg-elev/75 p-6"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  {group.label}
                </p>
                <p className="mt-4 text-base text-muted">{group.blurb}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item.name}
                      title={item.context}
                      className="cursor-help rounded-full border border-line bg-surface/40 px-3 py-1 text-[10px] uppercase tracking-[0.18em] text-ink transition hover:border-accent hover:text-accent"
                    >
                      {item.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section
          id="experience"
          className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="reveal mb-12">
            <p className="section-label">Experience</p>
            <h2 className="mt-4 text-display-2 font-medium text-ink">
              A practical engineering path.
            </h2>
          </div>

          <div className="relative before:absolute before:left-[12px] before:top-2 before:h-[calc(100%-1rem)] before:w-px before:bg-line after:absolute after:left-[6px] after:top-0 after:h-5 after:w-5 after:rounded-full after:border after:border-accent after:bg-bg">
            <div className="space-y-8 pl-10">
              {experienceEntries.map((entry) => (
                <article
                  key={`${entry.company}-${entry.period}`}
                  className="reveal relative rounded-[24px] border border-line bg-elev/75 p-6"
                >
                  <span className="absolute -left-[1.8rem] top-7 h-3 w-3 rounded-full border border-accent bg-accent" />
                  <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                        {entry.startYear}
                      </p>
                      <h3 className="mt-2 text-display-4 font-medium text-ink">
                        {entry.company}
                      </h3>
                    </div>
                    <div className="text-right">
                      <p className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted">
                        {entry.role}
                      </p>
                      <p className="mt-2 text-sm text-muted">{entry.period}</p>
                    </div>
                  </div>
                  <p className="mt-5 max-w-2xl text-base leading-7 text-muted">
                    {entry.summary}
                  </p>
                  <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-muted">
                    {entry.responsibilities.map((resp) => (
                      <li key={resp}>{resp}</li>
                    ))}
                  </ul>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {entry.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="section-label">Engineering approach</p>
            <h2 className="mt-4 text-display-2 font-medium text-ink">
              How work is shaped.
            </h2>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {approachSteps.map((step) => (
              <div
                key={step.step}
                className="reveal rounded-[24px] border border-line bg-elev/75 p-6"
              >
                <p className="text-[10px] uppercase tracking-[0.28em] text-accent">
                  {step.step}
                </p>
                <h3 className="mt-4 text-display-4 font-medium text-ink">
                  {step.title}
                </h3>
                <p className="mt-4 text-base leading-7 text-muted">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal mb-10">
            <p className="section-label">Professional projects</p>
            <h2 className="mt-4 text-display-2 font-medium text-ink">
              Confidential business systems.
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {professionalProjects.map((project) => (
              <div
                key={project.title}
                className="reveal flex flex-col justify-between rounded-[26px] border border-line bg-elev/80 p-6 shadow-lift sm:p-7"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-mono uppercase tracking-[0.24em] text-accent">
                      {project.category}
                    </p>
                    <span className="rounded-full border border-line bg-bg/60 px-2.5 py-0.5 text-[9px] font-mono text-muted">
                      Enterprise
                    </span>
                  </div>
                  <h3 className="mt-4 text-display-4 font-medium text-ink">
                    {project.title}
                  </h3>
                  <p className="mt-1 text-xs font-mono text-muted">
                    {project.fullName}
                  </p>
                  <p className="mt-4 text-sm leading-6 text-muted">
                    {project.summary}
                  </p>
                </div>

                <div className="mt-6 space-y-3">
                  <div className="flex flex-wrap gap-1.5">
                    {project.highlights.map((h) => (
                      <span
                        key={h}
                        className="rounded-md border border-accent/20 bg-accent/10 px-2 py-0.5 text-[9px] font-mono text-accent"
                      >
                        {h}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1.5 border-t border-line/60 pt-3">
                    {project.stack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-full border border-line bg-bg/50 px-2.5 py-0.5 text-[9px] uppercase tracking-[0.16em] text-muted"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8">
          <div className="reveal rounded-[30px] border border-line bg-elev/75 p-6 sm:p-8">
            <p className="section-label">Currently exploring</p>
            <h2 className="mt-4 text-display-2 font-medium text-ink">
              Learning the systems that shape scalable software.
            </h2>
            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {exploringTopics.map((topic) => (
                <div
                  key={topic.title}
                  className="rounded-[20px] border border-line bg-bg/60 p-5"
                >
                  <p className="text-[10px] uppercase tracking-[0.22em] text-accent">
                    Explore
                  </p>
                  <h3 className="mt-3 text-lg font-medium text-ink">
                    {topic.title}
                  </h3>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    {topic.body}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <AiThinkingDrawer title="Reasoning DAG" durationMs={120} />
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="mx-auto max-w-shell px-4 py-20 sm:px-6 lg:px-8"
        >
          <div className="reveal rounded-[32px] border border-line bg-elev/80 p-8 shadow-lift sm:p-10 lg:p-14">
            <p className="section-label">Let’s connect</p>
            <h2 className="mt-4 max-w-3xl text-display-2 font-medium text-ink">
              Let’s build something useful.
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">
              Open to full-time opportunities, freelance projects, and
              interesting technical collaborations.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href={`mailto:${site.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-ink"
              >
                <Mail size={14} /> Email me
              </a>
              <a
                href={site.socials[0].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={site.socials[1].href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink"
              >
                <Linkedin size={14} /> LinkedIn
              </a>
              <a
                href={site.resumeHref}
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink"
              >
                <Download size={14} /> Download resume
              </a>
            </div>
          </div>
        </section>

        <footer className="mx-auto max-w-shell px-4 pb-8 pt-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-6 border-t border-line pt-8 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-display-4 font-medium text-ink">{site.name}</p>
              <p className="text-sm text-muted">{site.role}</p>
            </div>
            <div className="flex flex-wrap gap-4 text-[10px] uppercase tracking-[0.22em] text-muted">
              <a href={site.socials[1].href} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a href={site.socials[0].href} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a href={`mailto:${site.email}`}>Email</a>
            </div>
          </div>
          <div className="mt-5 flex flex-col gap-2 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
            <span>Chennai, India</span>
            <span>© 2026 Raj R</span>
          </div>
        </footer>
      </main>
    </>
  );
}
