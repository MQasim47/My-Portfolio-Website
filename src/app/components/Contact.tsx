'use client';

import { useState, type SyntheticEvent } from 'react';
import { Download, Eye, Mail, Copy, Check } from 'lucide-react';
import dynamic from 'next/dynamic';
import { Section, SectionHeading, MonoLabel, StatusDot } from './ui';

// Loaded on first open — keeps the modal out of the first-load bundle.
const ResumeModal = dynamic(() => import('./resumemodal'));

const FORM_ENDPOINT = 'https://formspree.io/f/mojygwvj';
const CONTACT_EMAIL = 'aslamqasim126@gmail.com';

type FormStatus = 'idle' | 'loading' | 'success' | 'error' | 'invalid';

interface FieldProps {
  label: string;
  id: string;
  type?: string;
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  multiline?: boolean;
  required?: boolean;
}

function FormField({
  label,
  id,
  type = 'text',
  placeholder,
  value,
  onChange,
  multiline,
  required,
}: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id}>
        <MonoLabel>
          {label} {required && <span aria-hidden="true">*</span>}
        </MonoLabel>
      </label>
      {multiline ? (
        <textarea
          id={id}
          name={id}
          rows={5}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="input-field resize-none"
        />
      ) : (
        <input
          id={id}
          name={id}
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          required={required}
          className="input-field"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState<FormStatus>('idle');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [resumeEverOpened, setResumeEverOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim() || !/^\S+@\S+\.\S+$/.test(email.trim()) || !message.trim()) {
      setStatus('invalid');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim(), message: message.trim() }),
      });
      if (res.ok) {
        setStatus('success');
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <>
      <Section id="contact" labelledBy="contact-title" tone="paper-2">
        <SectionHeading id="contact-title" eyebrow="Contact">
          Let&apos;s work together
        </SectionHeading>

        <div data-reveal className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <div className="card p-6 sm:p-7">
              <h3 className="mb-3 text-title text-ink">
                Open to internships, junior roles and project work
              </h3>
              <p className="mb-6 text-body text-ink-soft">
                Need a web app or a Flutter mobile app built and shipped? Send a message or email me
                directly.
              </p>

              <div className="flex items-center justify-between gap-3 border border-rule p-3">
                <div className="flex min-w-0 items-center gap-2.5">
                  <Mail size={16} className="shrink-0 text-ink-soft" aria-hidden="true" />
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="link inline-flex min-h-[44px] items-center truncate font-mono text-mono-m"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </div>
                <button
                  onClick={copyEmail}
                  className="btn-ghost min-h-[44px] shrink-0 px-3 py-1.5 text-caption"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check size={14} aria-hidden="true" />
                      Copied
                    </>
                  ) : (
                    <>
                      <Copy size={14} aria-hidden="true" />
                      Copy
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="card flex flex-wrap items-center justify-between gap-4 p-5">
              <div>
                <p className="text-body font-semibold text-ink">Muhammad Qasim — CV</p>
                <MonoLabel as="p" className="mt-0.5 normal-case tracking-normal">
                  Resume (PDF)
                </MonoLabel>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setResumeEverOpened(true);
                    setResumeOpen(true);
                  }}
                  className="btn-outline px-3 py-2 text-caption"
                >
                  <Eye size={14} aria-hidden="true" />
                  Preview
                </button>
                <a
                  href="/resume.pdf"
                  download="Muhammad_Qasim_CV.pdf"
                  className="btn-primary px-3 py-2 text-caption"
                >
                  <Download size={14} aria-hidden="true" />
                  PDF
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <h3 className="mb-2 text-title text-ink">Send a message</h3>
              <p className="mb-6 text-caption text-ink-soft">Messages are sent to my email inbox.</p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField
                  label="Your name"
                  id="name"
                  placeholder="Your name"
                  value={name}
                  onChange={setName}
                  required
                />
                <FormField
                  label="Email"
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                  required
                />
                <FormField
                  label="Message"
                  id="message"
                  placeholder="What would you like to build or discuss?"
                  value={message}
                  onChange={setMessage}
                  multiline
                  required
                />

                <div aria-live="polite">
                  {status === 'invalid' && (
                    <p className="border border-fail p-4 text-caption text-fail">
                      <StatusDot status="fail" label="Please fill in your name, a valid email and a message." />
                    </p>
                  )}
                  {status === 'success' && (
                    <p className="border border-accent bg-accent-wash p-4 text-caption text-ink">
                      <StatusDot status="live" label="Message sent. Thank you — I'll reply by email." />
                    </p>
                  )}
                  {status === 'error' && (
                    <p className="border border-fail p-4 text-caption text-fail">
                      <StatusDot
                        status="fail"
                        label={`Message could not be sent. Please email me directly at ${CONTACT_EMAIL}.`}
                      />
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center"
                >
                  {status === 'loading' ? 'Sending…' : 'Send message'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Section>

      {resumeEverOpened && (
        <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
      )}
    </>
  );
}
