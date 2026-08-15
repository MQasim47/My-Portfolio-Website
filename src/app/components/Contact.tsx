'use client';

import { useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { Send, Download, Eye, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import AnimatedSection, { childVariants } from './AnimatedSection';
import ResumeModal from './resumemodal';

const FORM_ENDPOINT = 'https://formspree.io/f/mojygwvj'; // FORMSPREE_ENDPOINT

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

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

function FormField({ label, id, type = 'text', placeholder, value, onChange, multiline, required }: FieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-text-secondary">
        {label} {required && <span className="text-mint">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id} rows={5} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} required={required}
          className="input-field resize-none"
        />
      ) : (
        <input
          id={id} type={type} placeholder={placeholder} value={value}
          onChange={(e) => onChange(e.target.value)} required={required}
          className="input-field"
        />
      )}
    </div>
  );
}

export default function Contact() {
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<FormStatus>('idle');
  const [resumeOpen, setResumeOpen] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    if (FORM_ENDPOINT === 'https://formspree.io/f/mojygwvj') {
      await new Promise((r) => setTimeout(r, 1000));
      setStatus('success');
      setName(''); setEmail(''); setMessage('');
      return;
    }
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });
      if (res.ok) { setStatus('success'); setName(''); setEmail(''); setMessage(''); }
      else setStatus('error');
    } catch { setStatus('error'); }
  };

  return (
    <>
      <AnimatedSection id="contact" eyebrow="Let's work together" heading="Get in Touch">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-4xl mx-auto">

          {/* ── Contact form ─────────────────────────────────────────── */}
          <motion.div variants={childVariants}>
            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <FormField label="Name"    id="name"    placeholder="Rao Qasim"           value={name}    onChange={setName}    required />
              <FormField label="Email"   id="email"   type="email" placeholder="qasim@example.com" value={email} onChange={setEmail} required />
              <FormField label="Message" id="message" placeholder="Tell me about your project or just say hi!" value={message} onChange={setMessage} multiline required />

              {status === 'success' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-mint font-medium">
                  <CheckCircle size={16} /> Message sent! I&apos;ll get back to you soon.
                </motion.div>
              )}
              {status === 'error' && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-red-400 font-medium">
                  <AlertCircle size={16} /> Something went wrong. Please try again.
                </motion.div>
              )}

              <motion.button type="submit" disabled={status === 'loading'}
                whileHover={{ scale: status === 'loading' ? 1 : 1.03 }} whileTap={{ scale: 0.97 }}
                className="btn-primary w-full justify-center disabled:opacity-60 disabled:cursor-not-allowed">
                {status === 'loading' ? (
                  <><Loader2 size={16} className="animate-spin" /> Sending…</>
                ) : (
                  <><Send size={16} /> Send Message</>
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* ── Info + Resume ────────────────────────────────────────── */}
          <motion.div variants={childVariants} className="flex flex-col justify-between gap-8">
            <div>
              <h3 className="font-display font-bold text-xl text-text-primary mb-3">
                Open to new opportunities
              </h3>
              <p className="text-text-secondary text-sm leading-relaxed">
                Whether you have a full-time role, freelance project, or just want to
                collaborate — my inbox is always open. I typically respond within 24 hours.
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { label: 'Response time', value: '&lt; 24 hours' },
                  { label: 'Availability',  value: 'Open to remote &amp; on-site' },
                  { label: 'Stack',         value: 'Next.js · Azure · Flutter' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between items-center py-2.5 border-b border-card-border last:border-0">
                    <span className="text-text-secondary text-sm">{label}</span>
                    <span className="text-text-primary text-sm font-medium" dangerouslySetInnerHTML={{ __html: value }} />
                  </div>
                ))}
              </div>
            </div>

            {/* Resume card with preview + download */}
            <div className="card p-5 space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-card-border flex items-center justify-center flex-shrink-0">
                  <Download size={18} className="text-mint" />
                </div>
                <div>
                  <p className="text-text-primary font-semibold text-sm leading-tight">
                    Muhammad Qasim — CV
                  </p>
                  <p className="text-text-secondary text-xs mt-0.5">
                    DevOps &amp; Full-Stack Developer
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                {/* Preview button */}
                <motion.button
                  onClick={() => setResumeOpen(true)}
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-outline flex-1 justify-center text-sm py-2.5"
                >
                  <Eye size={14} />
                  Preview
                </motion.button>

                {/* Download button */}
                <motion.a
                  href="/resume.pdf"              /* TODO: RESUME_PATH */
                  download="Muhammad_Qasim_CV.pdf"
                  whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                  className="btn-primary flex-1 justify-center text-sm py-2.5"
                >
                  <Download size={14} />
                  Download
                </motion.a>
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Resume modal — shared with navbar */}
      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}