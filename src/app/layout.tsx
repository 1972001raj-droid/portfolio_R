import type { Metadata } from 'next';
import { GeistMono } from 'geist/font/mono';
import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { SiteShell } from '@/components/site-shell';
import { site } from '@/data/site';

export const metadata: Metadata = {
    metadataBase: new URL('https://rajr.dev'),
    title: site.title,
    description: site.description,
    keywords: [...site.keywords],
    openGraph: {
        title: site.title,
        description: site.description,
        url: site.url,
        siteName: site.name,
        type: 'website',
    },
    twitter: {
        card: 'summary_large_image',
        title: site.title,
        description: site.description,
    },
    alternates: {
        canonical: '/',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
                <SiteShell>{children}</SiteShell>
            </body>
        </html>
    );
}
