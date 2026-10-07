import Link from 'next/link';
import { Mail, Github, Linkedin } from 'lucide-react';

export default function ContactPage() {
    return (
        <main className="mx-auto flex min-h-screen max-w-shell items-center px-4 pb-24 pt-32 sm:px-6 lg:px-8">
            <div className="w-full rounded-[32px] border border-line bg-elev/80 p-8 shadow-lift sm:p-10 lg:p-14">
                <p className="section-label">Contact</p>
                <h1 className="mt-4 max-w-3xl text-display-2 font-medium text-ink">Let’s build something useful.</h1>
                <p className="mt-6 max-w-xl text-lg text-muted">
                    Open to full-time opportunities, freelance projects, and interesting technical collaborations.
                </p>

                <div className="mt-10 flex flex-wrap gap-4">
                    <a href="mailto:ashieeraj1901@gmail.com" className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-accent-ink">
                        <Mail size={14} /> Email me
                    </a>
                    <a href="https://linkedin.com/in/raj-r-498335259" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink">
                        <Linkedin size={14} /> LinkedIn
                    </a>
                    <a href="https://github.com/1972001raj-droid" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-[10px] font-medium uppercase tracking-[0.22em] text-ink">
                        <Github size={14} /> GitHub
                    </a>
                </div>

                <div className="mt-12 flex justify-start">
                    <Link href="/" className="text-[10px] font-medium uppercase tracking-[0.24em] text-accent">
                        Back to portfolio
                    </Link>
                </div>
            </div>
        </main>
    );
}
