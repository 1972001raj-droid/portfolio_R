export type ThemeName = "dark" | "light";

export type ProjectVisualKind =
  | "mail-pipeline"
  | "marketplace"
  | "issue-board"
  | "quality-docs"
  | "course-flow"
  | "hiring-pipeline";

export interface SocialLink {
  readonly label: string;
  readonly href: string;
  readonly handle: string;
  readonly icon: "github" | "linkedin" | "mail";
}

export interface Metric {
  readonly value: string;
  readonly label: string;
  readonly note?: string;
}

export interface StackGroup {
  readonly id: string;
  readonly label: string;
  readonly blurb: string;
  readonly items: readonly SkillItem[];
}

export interface SkillItem {
  readonly name: string;
  readonly context: string;
}

export interface ExperienceEntry {
  readonly company: string;
  readonly role: string;
  readonly period: string;
  readonly startYear: string;
  readonly location: string;
  readonly summary: string;
  readonly responsibilities: readonly string[];
  readonly technologies: readonly string[];
  readonly current?: boolean;
}

export interface ApproachStep {
  readonly step: string;
  readonly title: string;
  readonly body: string;
}

export interface ExploringTopic {
  readonly title: string;
  readonly body: string;
}

export interface ArchitectureLayer {
  readonly label: string;
  readonly detail: string;
}

export interface FeatureBlock {
  readonly title: string;
  readonly detail: string;
}

export interface ChallengeBlock {
  readonly title: string;
  readonly detail: string;
}

export interface ImplementationBlock {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface CaseSection {
  readonly heading: string;
  readonly body: readonly string[];
}

export interface Project {
  readonly slug: string;
  readonly order: number;
  readonly title: string;
  readonly category: string;
  readonly tagline: string;
  readonly year: string;
  readonly role: string;
  readonly status: "Personal Project" | "Professional Project";
  readonly confidentiality?: string;
  readonly stack: readonly string[];
  readonly repo?: string;
  readonly live?: string;
  readonly summary: string;
  readonly overview: readonly string[];
  readonly problem: readonly string[];
  readonly myRole: readonly string[];
  readonly architecture: {
    readonly summary: string;
    readonly layers: readonly ArchitectureLayer[];
  };
  readonly features: readonly FeatureBlock[];
  readonly challenges: readonly ChallengeBlock[];
  readonly implementation: readonly ImplementationBlock[];
  readonly outcome: readonly string[];
  readonly visual: {
    readonly kind: ProjectVisualKind;
    readonly caption: string;
  };
  readonly facts: readonly Metric[];
}
