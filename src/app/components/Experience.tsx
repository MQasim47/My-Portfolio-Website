import { ExternalLink } from 'lucide-react';
import { Section, SectionHeading, MonoLabel, StatusDot, Rule } from './ui';

// Source: resume.pdf. Only claims present on the resume are kept.
const experiences = [
  {
    id: 'flacron',
    company: 'Flacron Enterprises LLC',
    companyUrl: 'https://flacronenterprises.com/',
    role: 'Full-Stack & Mobile Developer',
    period: '2025 — Present',
    highlights: [
      'Build and ship full-stack web applications end to end, from interface to API to production.',
      "Develop Flutter mobile applications for the company's products.",
      'Developed and deployed the live Flacron GameZone platform from scratch to production.',
      'Deploy and manage applications on AWS and Microsoft Azure, with CI/CD pipelines for automated delivery.',
      'Work with the development team and handle client communication directly with stakeholders.',
    ],
  },
];

export default function Experience() {
  return (
    <Section id="experience" labelledBy="experience-title">
      <SectionHeading id="experience-title" eyebrow="Career">
        Experience
      </SectionHeading>
      <div>
        {experiences.map((exp) => (
            <article key={exp.id} data-reveal>
              <div className="grid gap-6 py-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <MonoLabel as="p">{exp.period}</MonoLabel>
                  <div className="mt-3">
                    <StatusDot status="live" label="Current role" className="text-ink" />
                  </div>
                </div>
                <div className="lg:col-span-8">
                  <h3 className="flex items-center gap-2 text-title text-ink">
                    {exp.company}
                    <a
                      href={exp.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit ${exp.company}`}
                      className="inline-flex h-11 w-11 items-center justify-center text-accent"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </h3>
                  <p className="mb-5 text-body-l text-ink-soft">{exp.role}</p>
                  <ul className="space-y-2 text-body text-ink-soft">
                    {exp.highlights.map((point) => (
                      <li key={point} className="max-w-[62ch]">
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <Rule />
            </article>
        ))}
      </div>
    </Section>
  );
}
