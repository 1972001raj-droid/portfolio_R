'use client';

import Link from 'next/link';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { navItems, site } from '@/data/site';
import { ThemeToggle } from '@/components/theme-toggle';
import { CustomCursor } from '@/components/custom-cursor';

export function SiteShell({ children }: { children: React.ReactNode }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

        const lenis = new Lenis({
            duration: 1.2,
            smoothWheel: true,
            wheelMultiplier: 0.9,
            lerp: 0.08,
        });

        const raf = (time: number) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };

        const handleScroll = () => setScrolled(window.scrollY > 16);

        requestAnimationFrame(raf);
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();

        return () => {
            window.removeEventListener('scroll', handleScroll);
            lenis.destroy();
        };
    }, []);

    return (
        <div className="min-h-screen bg-bg text-ink">
            <CustomCursor />
            <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${scrolled ? 'bg-bg/80 backdrop-blur-md shadow-[0_1px_0_rgba(255,255,255,0.04)]' : 'bg-transparent'}`}>
                <div className="mx-auto flex max-w-shell items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
                    <Link href="/" className="text-sm font-medium uppercase tracking-[0.28em] text-ink">
                        {site.shortName}
                    </Link>

                    <nav className="hidden items-center gap-6 md:flex">
                        {navItems.map((item) => (
                            <a key={item.href} href={item.href} className="text-[10px] font-medium uppercase tracking-[0.24em] text-muted transition hover:text-ink">
                                {item.label}
                            </a>
                        ))}
                    </nav>

                    <div className="hidden items-center gap-3 md:flex">
                        <span className="text-[9px] font-medium uppercase tracking-[0.24em] text-muted">{site.availability}</span>
                        <ThemeToggle />
                    </div>

                    <div className="flex items-center gap-2 md:hidden">
                        <ThemeToggle />
                        <button
                            type="button"
                            aria-label="Open menu"
                            onClick={() => setMobileOpen((value) => !value)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-elev/80 text-ink"
                        >
                            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>
                    </div>
                </div>

                {mobileOpen && (
                    <div className="border-t border-line bg-bg/95 px-4 py-4 backdrop-blur-md md:hidden">
                        <nav className="flex flex-col gap-4">
                            {navItems.map((item) => (
                                <a
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setMobileOpen(false)}
                                    className="text-sm font-medium uppercase tracking-[0.24em] text-ink"
                                >
                                    {item.label}
                                </a>
                            ))}
                            <Link href="/projects" onClick={() => setMobileOpen(false)} className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.24em] text-accent">
                                View projects <ArrowUpRight size={14} />
                            </Link>
                        </nav>
                    </div>
                )}
            </header>

            {children}
        </div>
    );
}
