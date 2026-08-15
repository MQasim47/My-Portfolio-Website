// ─────────────────────────────────────────────────────────────────────────────
// Shared TypeScript types for the portfolio
// ─────────────────────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
}

export interface Skill {
  id: string;
  title: string;
  icon: string; // Lucide icon name
  proficiency: string; // e.g. "Advanced", "Intermediate"
  bullets: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  techStack: string[];
  liveUrl: string;   // TODO: replace with real URL
  imageAlt: string;
}

export interface ExperienceEntry {
  id: string;
  company: string;
  role: string;
  highlights: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export type SectionId = 'hero' | 'skills' | 'projects' | 'experience' | 'contact';