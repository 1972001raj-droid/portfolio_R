import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class', '[data-theme="dark"]'],
    content: ['./src/**/*.{ts,tsx,mdx}'],
    theme: {
        extend: {
            colors: {
                bg: 'rgb(var(--c-bg) / <alpha-value>)',
                elev: 'rgb(var(--c-elev) / <alpha-value>)',
                surface: 'rgb(var(--c-surface) / <alpha-value>)',
                ink: 'rgb(var(--c-ink) / <alpha-value>)',
                muted: 'rgb(var(--c-muted) / <alpha-value>)',
                dim: 'rgb(var(--c-dim) / <alpha-value>)',
                line: 'rgb(var(--c-line) / <alpha-value>)',
                'line-strong': 'rgb(var(--c-line-strong) / <alpha-value>)',
                accent: 'rgb(var(--c-accent) / <alpha-value>)',
                'accent-ink': 'rgb(var(--c-accent-ink) / <alpha-value>)',
            },
            fontFamily: {
                sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
                mono: ['var(--font-geist-mono)', 'ui-monospace', 'SFMono-Regular', 'monospace'],
            },
            fontSize: {
                'display-1': ['clamp(3rem, 10.5vw, 9.5rem)', { lineHeight: '0.88', letterSpacing: '-0.045em' }],
                'display-2': ['clamp(2.25rem, 6.2vw, 4.75rem)', { lineHeight: '0.95', letterSpacing: '-0.035em' }],
                'display-3': ['clamp(1.75rem, 3.8vw, 2.75rem)', { lineHeight: '1.05', letterSpacing: '-0.025em' }],
                'display-4': ['clamp(1.35rem, 2.4vw, 1.75rem)', { lineHeight: '1.2', letterSpacing: '-0.02em' }],
                micro: ['0.6875rem', { lineHeight: '1', letterSpacing: '0.2em' }],
                'micro-sm': ['0.625rem', { lineHeight: '1', letterSpacing: '0.24em' }],
            },
            borderRadius: {
                xs: '2px',
                sm: '4px',
                md: '6px',
                lg: '10px',
                xl: '14px',
                pill: '999px',
            },
            maxWidth: {
                shell: '1560px',
                prose: '68ch',
            },
            spacing: {
                gut: 'clamp(1.25rem, 5vw, 6rem)',
                section: 'clamp(5rem, 12vw, 11rem)',
            },
            screens: {
                xs: '420px',
                '3xl': '1800px',
            },
            transitionTimingFunction: {
                out: 'cubic-bezier(0.16, 1, 0.3, 1)',
                inout: 'cubic-bezier(0.65, 0, 0.35, 1)',
                soft: 'cubic-bezier(0.32, 0.72, 0, 1)',
            },
            boxShadow: {
                lift: '0 24px 60px -30px rgb(0 0 0 / 0.55)',
            },
            keyframes: {
                marquee: {
                    from: { transform: 'translate3d(0,0,0)' },
                    to: { transform: 'translate3d(-50%,0,0)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.35' },
                },
            },
            animation: {
                marquee: 'marquee var(--marquee-duration, 38s) linear infinite',
                'pulse-soft': 'pulse-soft 2.4s cubic-bezier(0.4,0,0.6,1) infinite',
            },
        },
    },
    plugins: [],
};

export default config;
