'use client';

import AnimatedSection from './AnimatedSection';

export default function About() {
  return (
    <AnimatedSection id="about" eyebrow="About" heading="Building and Shipping Products">
      <div className="max-w-2xl mx-auto space-y-4 text-text-secondary leading-relaxed text-center sm:text-left">
        <p>
          I&apos;m a Software Engineering student at QUEST, Nawabshah, and I work at Flacron
          Enterprises, where I build and ship products.
        </p>
        <p>
          I build web applications and Flutter mobile apps, put them in front of real users, and
          handle the deployment side myself.
        </p>
      </div>
    </AnimatedSection>
  );
}
