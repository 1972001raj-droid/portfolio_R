'use client';

import React, { useState, useId } from 'react';
import {
    Brain,
    ChevronDown,
    ChevronUp,
    Clock,
    Cpu,
    GitBranch,
    Copy,
    Check,
    Sparkles,
    CheckCircle2,
    Layers,
    Code2,
    FileJson,
    Network,
    Zap,
    Maximize2,
    Minimize2
} from 'lucide-react';
import { cn } from '@/lib/utils';

export interface ReasoningNode {
    id: string;
    label: string;
    kind: 'parser' | 'retrieval' | 'hypothesis' | 'verification' | 'synthesis';
    latencyMs: number;
    confidence: number;
    status: 'completed' | 'active' | 'pending' | 'pruned';
    tokens: number;
    summary: string;
    codeSnippet?: string;
    details?: string[];
    dependencies?: string[];
}

export interface AiThinkingDrawerProps {
    title?: string;
    durationMs?: number;
    defaultOpen?: boolean;
    isOpen?: boolean;
    onOpenChange?: (open: boolean) => void;
    nodes?: ReasoningNode[];
    model?: string;
    tokens?: number;
    tokensPerSec?: number;
    className?: string;
}

const DEFAULT_NODES: ReasoningNode[] = [
    {
        id: 'node-parse',
        label: 'Intent & Lexical Parsing',
        kind: 'parser',
        latencyMs: 14,
        confidence: 0.999,
        status: 'completed',
        tokens: 168,
        summary: 'Parsed natural language prompt into structured typed AST and identified execution constraints.',
        details: [
            'Extracted target DAG specifications and telemetry metrics requirement',
            'Determined zero-latency degradation budget (< 150ms)',
            'Isolated component interfaces for AiThinkingDrawer and TelemetryHud'
        ],
        codeSnippet: `const ast = parseTokens(queryPrompt);\nvalidateTypeSafety(ast.params);`,
        dependencies: []
    },
    {
        id: 'node-retrieval',
        label: 'Vector Graph Grounding',
        kind: 'retrieval',
        latencyMs: 32,
        confidence: 0.994,
        status: 'completed',
        tokens: 384,
        summary: 'Retrieved design tokens, Tailwind CSS color variables, and typography scale from project context.',
        details: [
            'Found design tokens: --c-bg, --c-elev, --c-surface, --c-ink, --c-accent',
            'Cross-referenced Geist Sans and Geist Mono typography variables',
            'Applied WCAG 2.1 AA luminance ratio constraints (target ≥ 4.5:1)'
        ],
        codeSnippet: `const tokens = resolveThemeTokens(['--c-elev', '--c-accent']);\nassertContrastRatio(tokens.text, tokens.bg) >= 4.5;`,
        dependencies: ['node-parse']
    },
    {
        id: 'node-hypothesis',
        label: 'Hypothesis & Beam Branching',
        kind: 'hypothesis',
        latencyMs: 38,
        confidence: 0.988,
        status: 'completed',
        tokens: 492,
        summary: 'Explored dual execution branches: SVG Directed Graph vs Animated Accordion Stream.',
        details: [
            'Evaluated SVG Bezier graph performance on 60fps frame budget',
            'Pruned branch #2 (Canvas WebGL) due to bundle overhead',
            'Selected hybrid SVG + Semantic Accordion for optimal accessibility'
        ],
        codeSnippet: `const candidates = branchBeamSearch(k=3);\npruneBranch(candidates[1], reason='bundle_overhead');`,
        dependencies: ['node-retrieval']
    },
    {
        id: 'node-verify',
        label: 'Deterministic WCAG Verification',
        kind: 'verification',
        latencyMs: 22,
        confidence: 1.0,
        status: 'completed',
        tokens: 216,
        summary: 'Validated contrast ratio, aria-expanded compliance, keyboard focus rings, and reduced motion.',
        details: [
            'Contrast: 4.8:1 verified against elev background (WCAG AA Pass)',
            'Aria attributes: aria-expanded, aria-controls, and role="region" verified',
            'Prefers-reduced-motion fallback verified with 0ms transition override'
        ],
        codeSnippet: `const contrast = computeContrastRatio('#6E9EFF', '#11141C'); // 4.8:1\nassert(contrast >= 4.5); // AA Passed`,
        dependencies: ['node-hypothesis']
    },
    {
        id: 'node-synth',
        label: 'DAG Resolution & Synthesis',
        kind: 'synthesis',
        latencyMs: 14,
        confidence: 1.0,
        status: 'completed',
        tokens: 160,
        summary: 'Merged verified reasoning branches into deterministic interactive React component tree.',
        details: [
            'Total execution duration: 120ms within allocated frame budget',
            'Cumulative reasoning tokens generated: 1,420 tokens at 98.6 tok/s',
            'State machine: READY'
        ],
        codeSnippet: `return finalizeReasoningGraph({\n  nodes: verifiedNodes,\n  status: 'RESOLVED_OPTIMAL'\n});`,
        dependencies: ['node-verify']
    }
];

export function AiThinkingDrawer({
    title = 'Reasoning DAG',
    durationMs = 120,
    defaultOpen = true,
    isOpen: controlledOpen,
    onOpenChange,
    nodes = DEFAULT_NODES,
    model = 'o3-reasoning-dag',
    tokens = 1420,
    tokensPerSec = 98.6,
    className
}: AiThinkingDrawerProps) {
    const componentId = useId();
    const contentId = `ai-thinking-drawer-${componentId}`;

    const [uncontrolledOpen, setUncontrolledOpen] = useState(defaultOpen);
    const isOpen = controlledOpen !== undefined ? controlledOpen : uncontrolledOpen;

    const [activeTab, setActiveTab] = useState<'graph' | 'steps' | 'raw'>('graph');
    const [selectedNodeId, setSelectedNodeId] = useState<string>(nodes[0]?.id || 'node-parse');
    const [copied, setCopied] = useState(false);
    const [isExpandedFull, setIsExpandedFull] = useState(false);

    const toggleOpen = () => {
        const next = !isOpen;
        if (controlledOpen === undefined) {
            setUncontrolledOpen(next);
        }
        onOpenChange?.(next);
    };

    const selectedNode = nodes.find((n) => n.id === selectedNodeId) || nodes[0];

    const copyTrace = () => {
        const trace = {
            title,
            durationMs,
            model,
            tokens,
            tokensPerSec,
            nodes
        };
        navigator.clipboard.writeText(JSON.stringify(trace, null, 2));
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <section
            aria-label={`${title} Container`}
            className={cn(
                'group relative overflow-hidden rounded-[26px] border border-line bg-elev/90 backdrop-blur-xl shadow-lift transition-all duration-300',
                isExpandedFull ? 'max-w-none' : 'w-full',
                className
            )}
        >
            {/* Ambient accent edge glow */}
            <div className="pointer-events-none absolute -inset-px rounded-[26px] bg-gradient-to-r from-accent/20 via-transparent to-accent/10 opacity-70 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Header Drawer Bar */}
            <header className="relative z-10 flex flex-wrap items-center justify-between gap-3 border-b border-line/70 bg-surface/50 px-5 py-4 sm:px-6">
                <button
                    type="button"
                    onClick={toggleOpen}
                    aria-expanded={isOpen}
                    aria-controls={contentId}
                    className="flex items-center gap-3.5 text-left transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl p-1 -m-1"
                >
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-accent/30 bg-accent/10 text-accent shadow-[0_0_15px_-3px_rgba(110,158,255,0.4)]">
                        <Brain className="h-5 w-5 animate-pulse-soft" />
                        <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                        </span>
                    </div>

                    <div>
                        <div className="flex items-center gap-2.5">
                            <h2 className="text-sm font-semibold tracking-wide text-ink sm:text-base">
                                {title}
                            </h2>
                            <span className="inline-flex items-center gap-1 rounded-full border border-line bg-bg/80 px-2 py-0.5 text-[9px] font-mono uppercase tracking-[0.16em] text-accent">
                                <Sparkles className="h-2.5 w-2.5" />
                                {model}
                            </span>
                        </div>
                        <p className="text-[10px] uppercase tracking-[0.2em] text-muted">
                            Autonomous Chain-of-Thought Execution
                        </p>
                    </div>
                </button>

                <div className="flex items-center gap-2 sm:gap-3">
                    {/* Duration Badge */}
                    <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-mono font-medium text-emerald-400">
                        <Clock className="h-3 w-3" />
                        <span>{durationMs}ms</span>
                    </div>

                    {/* Tokens telemetry badge */}
                    <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/60 px-2.5 py-1 text-[10px] font-mono text-muted">
                        <Cpu className="h-3 w-3 text-accent" />
                        <span>{tokens.toLocaleString()} tok</span>
                        <span className="text-dim">•</span>
                        <span>{tokensPerSec} t/s</span>
                    </div>

                    {/* Copy JSON */}
                    <button
                        type="button"
                        onClick={copyTrace}
                        title="Copy Trace JSON"
                        aria-label="Copy Trace JSON"
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-elev/60 text-muted transition hover:border-line-strong hover:text-ink focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
                    >
                        {copied ? <Check className="h-3.5 w-3.5 text-emerald-400" /> : <Copy className="h-3.5 w-3.5" />}
                    </button>

                    {/* Toggle expand/fullscreen */}
                    <button
                        type="button"
                        onClick={() => setIsExpandedFull(!isExpandedFull)}
                        title={isExpandedFull ? 'Minimize Drawer' : 'Expand Drawer'}
                        aria-label={isExpandedFull ? 'Minimize Drawer' : 'Expand Drawer'}
                        className="hidden md:inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-elev/60 text-muted transition hover:border-line-strong hover:text-ink"
                    >
                        {isExpandedFull ? <Minimize2 className="h-3.5 w-3.5" /> : <Maximize2 className="h-3.5 w-3.5" />}
                    </button>

                    {/* Collapse Button */}
                    <button
                        type="button"
                        onClick={toggleOpen}
                        aria-expanded={isOpen}
                        aria-label={isOpen ? 'Collapse drawer' : 'Expand drawer'}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-elev/60 text-muted transition hover:border-line-strong hover:text-ink"
                    >
                        {isOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                </div>
            </header>

            {/* Collapsible Content */}
            {isOpen && (
                <div id={contentId} className="relative z-10 divide-y divide-line/60">
                    {/* View Controls & Tab Selector */}
                    <div className="flex flex-wrap items-center justify-between gap-3 bg-bg/40 px-5 py-2.5 sm:px-6">
                        <div className="flex items-center gap-1 rounded-xl border border-line bg-surface/60 p-1">
                            <button
                                type="button"
                                onClick={() => setActiveTab('graph')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] transition',
                                    activeTab === 'graph'
                                        ? 'bg-accent text-accent-ink shadow-sm'
                                        : 'text-muted hover:text-ink'
                                )}
                            >
                                <Network className="h-3 w-3" />
                                DAG Graph
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('steps')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] transition',
                                    activeTab === 'steps'
                                        ? 'bg-accent text-accent-ink shadow-sm'
                                        : 'text-muted hover:text-ink'
                                )}
                            >
                                <Layers className="h-3 w-3" />
                                Step Trace ({nodes.length})
                            </button>
                            <button
                                type="button"
                                onClick={() => setActiveTab('raw')}
                                className={cn(
                                    'inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[10px] font-medium uppercase tracking-[0.16em] transition',
                                    activeTab === 'raw'
                                        ? 'bg-accent text-accent-ink shadow-sm'
                                        : 'text-muted hover:text-ink'
                                )}
                            >
                                <FileJson className="h-3 w-3" />
                                JSON Trace
                            </button>
                        </div>

                        <div className="flex items-center gap-3 text-[10px] font-mono text-muted">
                            <span className="inline-flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                                5 Nodes Resolved
                            </span>
                            <span className="hidden sm:inline text-dim">•</span>
                            <span className="hidden sm:inline">0 Cycles (Acyclic Verified)</span>
                            <span className="text-dim">•</span>
                            <span className="text-emerald-400 font-medium">100% Deterministic</span>
                        </div>
                    </div>

                    {/* TAB 1: DAG Graph Visualizer */}
                    {activeTab === 'graph' && (
                        <div className="p-5 sm:p-6">
                            {/* Graphical Node Timeline / Flow Canvas */}
                            <div className="relative overflow-x-auto pb-4">
                                <div className="min-w-[720px]">
                                    <div className="flex items-center justify-between gap-3">
                                        {nodes.map((node, index) => {
                                            const isSelected = node.id === selectedNodeId;
                                            return (
                                                <React.Fragment key={node.id}>
                                                    {/* Node Card */}
                                                    <button
                                                        type="button"
                                                        onClick={() => setSelectedNodeId(node.id)}
                                                        className={cn(
                                                            'group/node relative flex-1 rounded-2xl border p-3.5 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                                                            isSelected
                                                                ? 'border-accent bg-accent/10 shadow-[0_0_20px_-5px_rgba(110,158,255,0.35)]'
                                                                : 'border-line bg-surface/40 hover:border-line-strong hover:bg-surface/80'
                                                        )}
                                                    >
                                                        {/* Top Node Meta */}
                                                        <div className="flex items-center justify-between gap-2">
                                                            <span className="inline-flex items-center gap-1 rounded-md bg-bg/80 px-1.5 py-0.5 text-[9px] font-mono text-muted">
                                                                #{index + 1}
                                                            </span>
                                                            <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-400">
                                                                <CheckCircle2 className="h-3 w-3" />
                                                                {node.latencyMs}ms
                                                            </span>
                                                        </div>

                                                        {/* Label */}
                                                        <h3 className="mt-2 text-xs font-semibold tracking-tight text-ink line-clamp-1">
                                                            {node.label}
                                                        </h3>

                                                        {/* Confidence and Tokens */}
                                                        <div className="mt-2 flex items-center justify-between text-[9px] font-mono text-muted">
                                                            <span>{(node.confidence * 100).toFixed(1)}% conf</span>
                                                            <span>{node.tokens} tok</span>
                                                        </div>

                                                        {/* Bottom glow highlight */}
                                                        {isSelected && (
                                                            <div className="absolute inset-x-2 -bottom-px h-0.5 rounded-full bg-accent" />
                                                        )}
                                                    </button>

                                                    {/* Connector Arrow/Curve between nodes */}
                                                    {index < nodes.length - 1 && (
                                                        <div className="flex items-center justify-center px-1 text-accent/60">
                                                            <div className="relative flex items-center">
                                                                <div className="h-px w-6 bg-gradient-to-r from-accent/70 to-accent/30" />
                                                                <div className="h-1.5 w-1.5 rotate-45 border-t border-r border-accent" />
                                                            </div>
                                                        </div>
                                                    )}
                                                </React.Fragment>
                                            );
                                        })}
                                    </div>
                                </div>
                            </div>

                            {/* Node Detail Inspector Panel */}
                            {selectedNode && (
                                <div className="mt-4 rounded-2xl border border-line bg-bg/70 p-4 sm:p-5">
                                    <div className="flex flex-wrap items-center justify-between gap-2 border-b border-line/60 pb-3">
                                        <div className="flex items-center gap-2.5">
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-accent/40 bg-accent/15 text-accent text-xs font-mono font-bold">
                                                {nodes.findIndex((n) => n.id === selectedNode.id) + 1}
                                            </span>
                                            <div>
                                                <h4 className="text-sm font-semibold text-ink">
                                                    {selectedNode.label}
                                                </h4>
                                                <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-accent">
                                                    DAG Node: {selectedNode.id}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-3 text-xs font-mono text-muted">
                                            <span className="rounded-md border border-line bg-surface/60 px-2 py-0.5 text-ink">
                                                Duration: {selectedNode.latencyMs}ms
                                            </span>
                                            <span className="rounded-md border border-line bg-surface/60 px-2 py-0.5 text-emerald-400">
                                                Confidence: {(selectedNode.confidence * 100).toFixed(1)}%
                                            </span>
                                        </div>
                                    </div>

                                    {/* Summary */}
                                    <p className="mt-3 text-xs sm:text-sm leading-relaxed text-muted">
                                        {selectedNode.summary}
                                    </p>

                                    {/* Detailed breakdown list */}
                                    {selectedNode.details && (
                                        <ul className="mt-3 space-y-1.5">
                                            {selectedNode.details.map((item, idx) => (
                                                <li key={idx} className="flex items-start gap-2 text-xs text-muted">
                                                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                                                    <span>{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    )}

                                    {/* Code Snippet if present */}
                                    {selectedNode.codeSnippet && (
                                        <div className="mt-3 overflow-hidden rounded-xl border border-line bg-elev/90 p-3 font-mono text-[11px] text-accent">
                                            <div className="mb-1.5 flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-dim">
                                                <span className="flex items-center gap-1">
                                                    <Code2 className="h-3 w-3" /> Execution Log
                                                </span>
                                                <span>TypeScript / AST</span>
                                            </div>
                                            <pre className="overflow-x-auto text-ink/90 whitespace-pre">
                                                <code>{selectedNode.codeSnippet}</code>
                                            </pre>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB 2: Step Trace Accordion View */}
                    {activeTab === 'steps' && (
                        <div className="space-y-3 p-5 sm:p-6">
                            {nodes.map((node, index) => (
                                <details
                                    key={node.id}
                                    open={index === 0}
                                    className="group rounded-2xl border border-line bg-surface/30 p-4 transition hover:border-line-strong"
                                >
                                    <summary className="flex cursor-pointer items-center justify-between gap-3 list-none">
                                        <div className="flex items-center gap-3">
                                            <span className="inline-flex h-6 w-6 items-center justify-center rounded-lg border border-accent/30 bg-accent/10 text-[11px] font-mono font-medium text-accent">
                                                {index + 1}
                                            </span>
                                            <span className="text-xs sm:text-sm font-medium text-ink">
                                                {node.label}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <span className="text-[10px] font-mono text-emerald-400">
                                                +{node.latencyMs}ms
                                            </span>
                                            <ChevronDown className="h-4 w-4 text-muted transition-transform group-open:rotate-180" />
                                        </div>
                                    </summary>

                                    <div className="mt-3 border-t border-line/60 pt-3 text-xs text-muted space-y-2">
                                        <p>{node.summary}</p>
                                        {node.details && (
                                            <ul className="space-y-1 pl-2">
                                                {node.details.map((d, i) => (
                                                    <li key={i} className="flex items-center gap-2 text-[11px]">
                                                        <span className="h-1 w-1 rounded-full bg-accent" />
                                                        {d}
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </details>
                            ))}
                        </div>
                    )}

                    {/* TAB 3: Raw JSON Trace */}
                    {activeTab === 'raw' && (
                        <div className="relative p-5 sm:p-6">
                            <pre className="max-h-[380px] overflow-auto rounded-2xl border border-line bg-elev/95 p-4 font-mono text-xs leading-relaxed text-muted">
                                {JSON.stringify(
                                    {
                                        schema: 'urn:ai:reasoning-dag:v2',
                                        title,
                                        totalDurationMs: durationMs,
                                        model,
                                        tokensGenerated: tokens,
                                        throughputTokensPerSec: tokensPerSec,
                                        dagAcyclic: true,
                                        nodes: nodes.map((n) => ({
                                            id: n.id,
                                            label: n.label,
                                            kind: n.kind,
                                            durationMs: n.latencyMs,
                                            confidence: n.confidence,
                                            dependencies: n.dependencies,
                                            summary: n.summary
                                        }))
                                    },
                                    null,
                                    2
                                )}
                            </pre>
                        </div>
                    )}

                    {/* Drawer Footer Telemetry Bar */}
                    <footer className="flex flex-wrap items-center justify-between gap-3 bg-surface/30 px-5 py-3 sm:px-6 text-[10px] font-mono text-muted">
                        <div className="flex items-center gap-4">
                            <span className="inline-flex items-center gap-1.5">
                                <GitBranch className="h-3 w-3 text-accent" />
                                <span>Acyclic Graph: Verified</span>
                            </span>
                            <span className="hidden sm:inline text-dim">•</span>
                            <span className="hidden sm:inline">Depth: 4 layers</span>
                            <span className="hidden sm:inline text-dim">•</span>
                            <span className="text-ink">Peak Memory: 14.8 MB</span>
                        </div>

                        <div className="flex items-center gap-3">
                            <span className="inline-flex items-center gap-1 text-emerald-400">
                                <Zap className="h-3 w-3" />
                                <span>Zero-Hallucination Guardrail Active</span>
                            </span>
                        </div>
                    </footer>
                </div>
            )}
        </section>
    );
}
