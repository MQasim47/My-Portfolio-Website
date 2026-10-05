'use client';

import { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send, Download, Eye, CheckCircle, AlertCircle,
  Loader2, Mail, Copy, Check, Clock, Sparkles,
  MapPin, ShieldCheck, ArrowRight, FileText
} from 'lucide-react';
import AnimatedSection from './AnimatedSection';
import ResumeModal from './resumemodal';

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
      <label htmlFor={id} className="text-xs font-mono text-text-secondary uppercase tracking-wider font-semibold">
        {label} {required && <span className="text-cyan-400">*</span>}
      </label>
      {multiline ? (
        <textarea
          id={id}
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
  const [name, setName]       = useState('');
  const [email, setEmail]     = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus]   = useState<FormStatus>('idle');
  const [resumeOpen, setResumeOpen] = useState(false);
  const [copied, setCopied]   = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(CONTACT_EMAIL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = async (e: FormEvent) => {
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
      <AnimatedSection
        id="contact"
        eyebrow="Contact"
        heading="Let's Work Together"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 max-w-5xl mx-auto items-start">

          {/* ═══════════════════════════════════════════════════════════════
              LEFT: EXECUTIVE VALUE & DIRECT ACCESS
             ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Header info card */}
            <div className="card p-6 sm:p-7 relative overflow-hidden">
              <h3 className="font-display font-bold text-xl text-white mb-3">
                Open to internships, junior roles and project work
              </h3>

              <p className="text-text-secondary text-sm leading-relaxed mb-6">
                Need a web app or a Flutter mobile app built and shipped? Send a message or email me directly.
              </p>

              {/* 1-Click Copy Email Button */}
              <div className="p-3 rounded-xl bg-white/[0.03] border border-white/10 flex items-center justify-between gap-3">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                    <Mail size={15} />
                  </div>
                  <span className="text-xs sm:text-sm font-mono text-white truncate">
                    {CONTACT_EMAIL}
                  </span>
                </div>

                <button
                  onClick={copyEmail}
                  className="px-3 py-1.5 rounded-lg bg-white/[0.06] hover:bg-white/10 border border-white/15 text-xs text-text-primary flex items-center gap-1.5 transition-all flex-shrink-0 cursor-pointer"
                  title="Copy email to clipboard"
                >
                  {copied ? (
                    <>
                      <Check size={13} className="text-emerald-400" />
                      <span className="text-emerald-400 font-medium">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={13} className="text-cyan-400" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Resume Action Card */}
            <div className="card p-5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-400 flex-shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <p className="text-sm font-bold text-white leading-tight">
                    Muhammad Qasim — CV
                  </p>
                  <p className="text-xs text-text-muted mt-0.5">
                    Resume (PDF)
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setResumeOpen(true)}
                  className="btn-outline text-xs py-2 px-3 cursor-pointer"
                >
                  <Eye size={12} />
                  Preview
                </button>
                <a
                  href="/resume.pdf"
                  download="Muhammad_Qasim_CV.pdf"
                  className="btn-primary text-xs py-2 px-3"
                >
                  <Download size={12} />
                  PDF
                </a>
              </div>
            </div>

          </div>

          {/* ═══════════════════════════════════════════════════════════════
              RIGHT: FROSTED GLASS FORM
             ═══════════════════════════════════════════════════════════════ */}
          <div className="lg:col-span-7">
            <div className="card p-6 sm:p-8">
              <h4 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
                <Sparkles size={16} className="text-cyan-400" />
                Send a Message
              </h4>
              <p className="text-text-muted text-xs mb-6">
                Messages are sent to my email inbox.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <FormField
                  label="Your Name"
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

                <div aria-live="polite" className="space-y-5">
                {status === 'invalid' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-red-400 font-medium"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Please fill in your name, a valid email and a message.
                  </motion.div>
                )}

                {status === 'success' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-emerald-400 font-medium"
                  >
                    <CheckCircle size={16} className="flex-shrink-0" />
                    Message sent. Thank you — I'll reply by email.
                  </motion.div>
                )}

                {status === 'error' && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 flex items-center gap-2.5 text-xs sm:text-sm text-red-400 font-medium"
                  >
                    <AlertCircle size={16} className="flex-shrink-0" />
                    Message could not be sent. Please email me directly at {CONTACT_EMAIL}.
                  </motion.div>
                )}
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="btn-primary w-full justify-center py-3 text-sm font-semibold cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <Loader2 size={16} className="animate-spin" />
                      Sending…
                    </>
                  ) : (
                    <>
                      <Send size={15} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>
      </AnimatedSection>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
