'use client';

import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
    const [theme, setTheme] = useState<'dark' | 'light'>('dark');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        const savedTheme = window.localStorage.getItem('raj-theme') as 'dark' | 'light' | null;
        const systemTheme = window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
        const nextTheme = savedTheme ?? systemTheme;
        setTheme(nextTheme);
        document.documentElement.dataset.theme = nextTheme;
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted) return;
        document.documentElement.dataset.theme = theme;
        window.localStorage.setItem('raj-theme', theme);
    }, [mounted, theme]);

    const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    return (
        <button
            type="button"
            aria-label="Toggle color theme"
            onClick={toggleTheme}
            className="inline-flex items-center gap-2 rounded-full border border-line bg-elev/80 px-3 py-2 text-[10px] font-medium uppercase tracking-[0.2em] text-ink transition hover:border-line-strong"
        >
            {mounted && theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
            <span>{mounted ? (theme === 'dark' ? 'Light' : 'Dark') : 'Theme'}</span>
        </button>
    );
}
