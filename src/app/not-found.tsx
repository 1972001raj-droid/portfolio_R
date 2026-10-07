import Link from 'next/link';

export default function NotFoundPage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-shell items-center justify-center px-4 py-20">
            <div className="max-w-xl text-center">
                <p className="text-[10px] font-medium uppercase tracking-[0.32em] text-accent">404</p>
                <h1 className="mt-6 text-display-2 font-medium text-ink">This page does not exist.</h1>
                <p className="mt-4 text-base text-muted">
                    The route you requested is unavailable, but the portfolio is still available to explore.
                </p>
                <Link href="/" className="mt-8 inline-flex items-center rounded-full bg-accent px-5 py-3 text-xs font-medium uppercase tracking-[0.2em] text-accent-ink transition hover:opacity-90">
                    Return home
                </Link>
            </div>
        </main>
    );
}
