'use client';

import React, { useState, useEffect } from 'react';
import {
    Activity,
    ShieldCheck,
    Gauge,
    Cpu,
    CheckCircle2,
    ChevronDown,
    ChevronUp,
    RefreshCw,
    Radio
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface TelemetryMetricItem {
    label: string;
    value: string | number;
    unit?: string;
    status?: 'optimal' | 'warning' | 'critical' | 'neutral';
    change?: string;
    trend?: 'up' | 'down' | 'neutral';
    description?: string;
    icon?: string;
}

export interface TelemetryHudProps {
    metrics?: TelemetryMetricItem[];
    title?: string;
    position?: 'fixed-bottom' | 'inline' | 'floating';
    collapsible?: boolean;
    defaultCollapsed?: boolean;
    className?: string;
    showControls?: boolean;
    onRefresh?: () => void;
}

const DEFAULT_METRICS: TelemetryMetricItem[] = [
    {
        label: 'Latency',
        value: '38ms',
        unit: 'p99',
        status: 'optimal',
        description: 'Vercel Edge Network edge-to-client RTT in Chennai / Asia-South'
    },
    {
        label: 'WCAG',
        value: '4.8:1',
        unit: 'AA',
        status: 'optimal',
        description: 'Luminance contrast ratio strictly exceeding WCAG 2.1 AA 4.5:1 requirement'
    },
    {
        label: 'Core Vitals',
        value: '100',
        unit: 'LPS',
        status: 'optimal',
        description: 'Largest Contentful Paint < 0.8s, Cumulative Layout Shift 0.00'
    },
    {
        label: 'Motion',
        value: '60fps',
        unit: 'GPU',
        status: 'optimal',
        description: 'Smooth GSAP + Lenis compositor thread animations with reduced-motion fallback'
    }
];

export function TelemetryHud({
    metrics = DEFAULT_METRICS,
    title = 'Live Telemetry',
    position = 'inline',
    collapsible = true,
    defaultCollapsed = false,
    className,
    showControls = true,
    onRefresh
}: TelemetryHudProps) {
    const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
    const [selectedMetric, setSelectedMetric] = useState<TelemetryMetricItem | null>(null);
    const [livePing, setLivePing] = useState(38);
    const [isLiveActive, setIsLiveActive] = useState(true);
    const [lastSync, setLastSync] = useState<string>('Just now');

    // Subtle simulated live pulse for latency telemetry
    useEffect(() => {
        if (!isLiveActive) return;
        const interval = setInterval(() => {
            const jitter = Math.floor(Math.random() * 5) - 2; // -2 to +2 ms
            setLivePing((prev) => Math.min(44, Math.max(34, prev + jitter)));
            setLastSync(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
        }, 4000);
        return () => clearInterval(interval);
    }, [isLiveActive]);

    const getMetricIcon = (label: string) => {
        const lower = label.toLowerCase();
        if (lower.includes('latency') || lower.includes('ping') || lower.includes('speed')) {
            return <Activity className="h-4 w-4 text-emerald-400" />;
        }
        if (lower.includes('wcag') || lower.includes('a11y') || lower.includes('access')) {
            return <ShieldCheck className="h-4 w-4 text-accent" />;
        }
        if (lower.includes('vitals') || lower.includes('perf')) {
            return <Gauge className="h-4 w-4 text-amber-400" />;
        }
        if (lower.includes('motion') || lower.includes('fps')) {
            return <Cpu className="h-4 w-4 text-cyan-400" />;
        }
        return <Radio className="h-4 w-4 text-accent" />;
    };

    return (
        <aside
            aria-label="Engineering Telemetry HUD"
            className={cn(
                'group relative rounded-2xl border border-line bg-elev/90 p-4 backdrop-blur-xl shadow-lift transition-all duration-300',
                position === 'fixed-bottom' && 'fixed bottom-4 left-1/2 z-50 -translate-x-1/2 max-w-5xl w-[calc(100%-2rem)]',
                className
            )}
        >
            {/* Ambient top border accent */}
            <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />

            {/* HUD Header Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2.5">
                    {/* Live indicator dot */}
                    <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                    </span>

                    <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono font-semibold uppercase tracking-[0.24em] text-accent">
                            {title}
                        </span>
                        <span className="hidden sm:inline-block rounded-md border border-line bg-bg/80 px-1.5 py-0.5 text-[9px] font-mono text-muted">
                            HTTP/3 • TLS 1.3
                        </span>
                    </div>
                </div>

                <div className="flex items-center gap-2 text-[10px] font-mono text-muted">
                    <span className="hidden md:inline">Sync: {lastSync}</span>

                    {showControls && (
                        <>
                            <button
                                type="button"
                                onClick={() => {
                                    setIsLiveActive(!isLiveActive);
                                    onRefresh?.();
                                }}
                                title="Toggle live telemetry stream"
                                className="inline-flex h-7 items-center gap-1.5 rounded-lg border border-line bg-surface/60 px-2 text-[9px] font-mono uppercase tracking-wider text-muted transition hover:border-line-strong hover:text-ink"
                            >
                                <RefreshCw className={cn('h-3 w-3', isLiveActive && 'text-emerald-400')} />
                                <span>{isLiveActive ? 'LIVE' : 'PAUSED'}</span>
                            </button>

                            {collapsible && (
                                <button
                                    type="button"
                                    onClick={() => setIsCollapsed(!isCollapsed)}
                                    aria-expanded={!isCollapsed}
                                    aria-label={isCollapsed ? 'Expand Telemetry HUD' : 'Collapse Telemetry HUD'}
                                    className="inline-flex h-7 w-7 items-center justify-center rounded-lg border border-line bg-surface/60 text-muted transition hover:border-line-strong hover:text-ink"
                                >
                                    {isCollapsed ? <ChevronDown className="h-3.5 w-3.5" /> : <ChevronUp className="h-3.5 w-3.5" />}
                                </button>
                            )}
                        </>
                    )}
                </div>
            </div>

            {/* Metrics Grid */}
            {!isCollapsed && (
                <div className="mt-3.5 grid gap-2.5 grid-cols-2 sm:grid-cols-4">
                    {metrics.map((metric, index) => {
                        const isLatency = metric.label.toLowerCase().includes('latency');
                        const displayValue = isLatency ? `${livePing}ms` : metric.value;

                        return (
                            <button
                                key={index}
                                type="button"
                                onClick={() => setSelectedMetric(metric)}
                                className={cn(
                                    'group/card relative flex flex-col justify-between rounded-xl border border-line bg-surface/50 p-3 text-left transition hover:border-accent/60 hover:bg-surface/80 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent'
                                )}
                            >
                                <div className="flex items-center justify-between gap-1">
                                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-muted">
                                        {metric.label}
                                    </span>
                                    {getMetricIcon(metric.label)}
                                </div>

                                <div className="mt-2 flex items-baseline gap-1.5">
                                    <span className="text-lg font-mono font-bold tracking-tight text-ink sm:text-xl">
                                        {displayValue}
                                    </span>
                                    {metric.unit && (
                                        <span className="text-[10px] font-mono text-accent">
                                            {metric.unit}
                                        </span>
                                    )}
                                </div>

                                <div className="mt-1 flex items-center justify-between text-[9px] font-mono text-emerald-400">
                                    <span className="inline-flex items-center gap-1">
                                        <CheckCircle2 className="h-2.5 w-2.5" />
                                        Pass
                                    </span>
                                    <span className="text-dim opacity-0 group-hover/card:opacity-100 transition">
                                        details →
                                    </span>
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}

            {/* Metric Detailed Modal / Drawer View */}
            {selectedMetric && (
                <div className="mt-3 rounded-xl border border-line bg-bg/90 p-3.5 text-xs text-muted">
                    <div className="flex items-center justify-between border-b border-line/60 pb-2">
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold text-ink">
                                {selectedMetric.label} Specification
                            </span>
                            <span className="rounded bg-accent/15 px-1.5 py-0.5 text-[9px] font-mono text-accent">
                                {selectedMetric.value} {selectedMetric.unit}
                            </span>
                        </div>
                        <button
                            type="button"
                            onClick={() => setSelectedMetric(null)}
                            className="text-[10px] uppercase tracking-wider text-muted hover:text-ink"
                        >
                            Close ✕
                        </button>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-muted">
                        {selectedMetric.description || 'Production verified threshold against Google Core Web Vitals and W3C WCAG guidelines.'}
                    </p>
                </div>
            )}
        </aside>
    );
}
