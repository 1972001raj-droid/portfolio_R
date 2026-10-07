'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Measures scroll progress across a tall section and exposes the pixel distance
 * that a pinned inner track should translate. Keeps the layout logic in one
 * place so sections stay presentational.
 */
export function usePinnedTrack<T extends HTMLElement>() {
    const sectionRef = useRef<T | null>(null);
    const trackRef = useRef<HTMLDivElement | null>(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const section = sectionRef.current;
        const track = trackRef.current;
        if (!section || !track) return;

        const media = window.matchMedia('(min-width: 1024px) and (prefers-reduced-motion: no-preference)');
        let distance = 0;
        let frame = 0;

        const measure = () => {
            const previous = track.style.transform;
            track.style.transform = 'translate3d(0px, 0, 0)';
            distance = Math.max(0, track.scrollWidth - window.innerWidth);
            track.style.transform = previous;
        };

        const apply = () => {
            frame = 0;
            const start = section.getBoundingClientRect().top + window.scrollY;
            const raw = distance === 0 ? 0 : (window.scrollY - start) / distance;
            const clamped = Math.min(1, Math.max(0, raw));
            track.style.transform = `translate3d(${-distance * clamped}px, 0, 0)`;
            setProgress((current) => (Math.abs(current - clamped) < 0.01 ? current : clamped));
        };

        const request = () => {
            if (!frame) frame = window.requestAnimationFrame(apply);
        };

        const sync = () => {
            measure();
            if (media.matches) {
                if (!section.style.height) {
                    section.style.height = `${window.innerHeight + distance}px`;
                } else {
                    section.style.height = `${window.innerHeight + distance}px`;
                }
            } else {
                section.style.removeProperty('height');
                track.style.transform = 'translate3d(0px, 0, 0)';
                setProgress(0);
            }
            request();
        };

        sync();
        window.addEventListener('scroll', request, { passive: true });
        window.addEventListener('resize', sync, { passive: true });
        media.addEventListener('change', sync);

        return () => {
            window.removeEventListener('scroll', request);
            window.removeEventListener('resize', sync);
            media.removeEventListener('change', sync);
            window.cancelAnimationFrame(frame);
            section.style.removeProperty('height');
            track.style.removeProperty('transform');
        };
    }, []);

    return { sectionRef, trackRef, progress };
}
