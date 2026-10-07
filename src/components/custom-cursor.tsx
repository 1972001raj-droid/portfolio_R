'use client';

import { useEffect, useState } from 'react';

export function CustomCursor() {
    const [position, setPosition] = useState({ x: -100, y: -100 });
    const [isHovering, setIsHovering] = useState(false);
    const [isProjectHover, setIsProjectHover] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Disable on touch devices or reduced motion
        if (
            window.matchMedia('(pointer: coarse)').matches ||
            window.matchMedia('(prefers-reduced-motion: reduce)').matches
        ) {
            return;
        }

        const handleMouseMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX, y: e.clientY });
            if (!isVisible) setIsVisible(true);

            const target = e.target as HTMLElement | null;
            if (target) {
                const clickable = target.closest('a, button, input, [role="button"]');
                const projectCard = target.closest('[data-project-card="true"]');
                setIsHovering(Boolean(clickable));
                setIsProjectHover(Boolean(projectCard));
            }
        };

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        document.body.addEventListener('mouseleave', handleMouseLeave);
        document.body.addEventListener('mouseenter', handleMouseEnter);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            document.body.removeEventListener('mouseleave', handleMouseLeave);
            document.body.removeEventListener('mouseenter', handleMouseEnter);
        };
    }, [isVisible]);

    if (!isVisible) return null;

    return (
        <div
            aria-hidden="true"
            className="pointer-events-none fixed top-0 left-0 z-[9999] transition-transform duration-75 ease-out"
            style={{
                transform: `translate3d(${position.x}px, ${position.y}px, 0)`,
            }}
        >
            <div
                className={`-translate-x-1/2 -translate-y-1/2 flex items-center justify-center rounded-full transition-all duration-200 ${
                    isProjectHover
                        ? 'h-16 w-16 bg-accent text-[9px] font-mono uppercase tracking-[0.2em] text-accent-ink font-bold shadow-lift'
                        : isHovering
                        ? 'h-8 w-8 bg-accent/20 border border-accent backdrop-blur-xs'
                        : 'h-2.5 w-2.5 bg-accent ring-4 ring-accent/20'
                }`}
            >
                {isProjectHover && 'VIEW'}
            </div>
        </div>
    );
}
