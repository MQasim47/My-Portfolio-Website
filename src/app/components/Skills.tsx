import { Section, SectionHeading, MonoLabel } from './ui';

// Technologies confirmed as used in production (see QUESTIONS.md).
// No proficiency labels, bars or numbers — context is a short factual note only.
const SKILL_GROUPS = [
  {
    id: 'frontend',
    title: 'Frontend',
    tools: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS'],
    note: 'Used on Flacron GameZone.',
  },
  { id: 'backend', title: 'Backend', tools: ['Node.js', 'Express', 'REST APIs'], note: '' },
  {
    id: 'mobile',
    title: 'Mobile',
    tools: ['Flutter', 'Dart', 'Firebase', 'Firestore', 'Sqflite'],
    note: 'Used on M Hassan Traders.',
  },
  { id: 'database', title: 'Database', tools: ['PostgreSQL', 'Firestore', 'Sqflite'], note: '' },
  {
    id: 'cloud-devops',
    title: 'Cloud & Delivery',
    tools: ['AWS', 'Azure App Service', 'Docker', 'GitHub Actions', 'Git'],
    note: '',
  },
];

export default function Skills() {
  return (
    <Section id="skills" labelledBy="skills-title">
      <SectionHeading id="skills-title" eyebrow="Technical stack">
        What I build with
      </SectionHeading>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {SKILL_GROUPS.map((skill) => (
            <article key={skill.id} className="card draw-border flex h-full flex-col justify-between p-6 sm:p-7">
              <div>
                <h3 className="mb-4 text-title text-ink">{skill.title}</h3>
                <ul className="flex flex-wrap gap-1.5" aria-label={`${skill.title} technologies`}>
                  {skill.tools.map((tool) => (
                    <li key={tool} className="tech-tag">
                      {tool}
                    </li>
                  ))}
                </ul>
              </div>
              {skill.note && (
                <MonoLabel
                  as="p"
                  className="mt-5 border-t border-rule pt-4 normal-case tracking-normal"
                >
                  {skill.note}
                </MonoLabel>
              )}
            </article>
        ))}
      </div>
    </Section>
  );
}
