import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowUpRight,
  Check,
  Copy,
  Dribbble,
  Info,
  Instagram,
  Layers,
  Linkedin,
  Mail,
} from 'lucide-react';
import LetterReveal from '../components/LetterReveal';
import ScrollParagraphReveal from '../components/ScrollParagraphReveal';

const INITIAL_FORM = {
  name: '',
  email: '',
  subject: '',
  message: '',
};

const CONTACT_PILLS = [
  { label: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble },
  { label: 'Behance', href: 'https://www.behance.net', icon: Layers },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
];

export default function Contact() {
  const prefersReduced = useReducedMotion();
  const [form, setForm] = useState(INITIAL_FORM);
  const [errors, setErrors] = useState({});
  const [submittedPreview, setSubmittedPreview] = useState(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const placeholderEmail = 'hello@sabarip.design';

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim() || form.name.trim().length < 2) {
      nextErrors.name = 'Please enter your name (at least 2 characters).';
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.subject.trim() || form.subject.trim().length < 3) {
      nextErrors.subject = 'Please provide a brief project or inquiry subject.';
    }
    if (!form.message.trim() || form.message.trim().length < 10) {
      nextErrors.message = 'Please share a few details about your project (10+ characters).';
    }
    return nextErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setSubmittedPreview(null);
      return;
    }

    setErrors({});
    setSubmittedPreview({
      name: form.name.trim(),
      email: form.email.trim(),
      subject: form.subject.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
    setForm(INITIAL_FORM);
  };

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(placeholderEmail);
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <section
      id="contact"
      className="bg-mist-closing relative overflow-hidden border-t border-black/10 py-24 text-obsidian md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Dribbble Shot 5 Centered Opening Header */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.65 }}
          className="mx-auto mb-16 max-w-3xl text-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-1.5 shadow-sm">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs font-medium text-obsidian">
              Available for New Project
            </span>
          </div>

          <h2 className="mt-6 font-display text-4xl font-extrabold uppercase tracking-tightest text-obsidian sm:text-5xl md:text-6xl">
            <LetterReveal text="LET’S BUILD SOMETHING IMMERSIVE" />
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-muted md:text-base">
            <ScrollParagraphReveal text="Interested in gaming, virtual worlds and immersive digital experiences? Let's connect and explore new possibilities." />
          </p>
        </motion.div>

        {/* Contact Grid: Direct Channels + Validated Frontend Form */}
        <div className="grid gap-10 lg:grid-cols-12 lg:items-start">
          {/* Left Info Card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="space-y-6 border border-black/12 bg-white p-7 shadow-sm sm:p-9 lg:col-span-5"
          >
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                Direct Contact
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold text-obsidian">
                SABARI P.
              </h3>
              <p className="mt-1 text-sm text-muted">
                Gaming &amp; Metaverse · Think. Design. Experience.
              </p>
            </div>

            <div className="border-t border-black/10 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Demo Email Address
              </p>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-3">
                <a
                  href={`mailto:${placeholderEmail}`}
                  className="inline-flex items-center gap-2 font-display text-base font-semibold text-obsidian hover:underline sm:text-lg"
                >
                  <Mail className="h-4 w-4 text-muted" />
                  <span>{placeholderEmail}</span>
                </a>
                <button
                  type="button"
                  onClick={handleCopyEmail}
                  className="inline-flex items-center gap-1.5 rounded-full border border-black/15 px-3 py-1 font-mono text-[11px] text-obsidian transition-colors hover:bg-obsidian hover:text-canvas"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="h-3 w-3 text-emerald-600" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3 w-3" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="border-t border-black/10 pt-5">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted">
                Social &amp; Creative Profiles
              </p>
              <div className="mt-3 grid grid-cols-2 gap-2.5">
                {CONTACT_PILLS.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noreferrer"
                      className="group flex items-center justify-between rounded-full border border-black/12 bg-alabaster px-4 py-2.5 text-xs font-medium text-obsidian transition-all hover:border-obsidian hover:bg-obsidian hover:text-canvas"
                    >
                      <span className="inline-flex items-center gap-2">
                        <Icon className="h-3.5 w-3.5" />
                        <span>{social.label}</span>
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 opacity-60 group-hover:text-lime group-hover:opacity-100" />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55 }}
            className="border border-black/12 bg-obsidian p-7 text-canvas shadow-floating sm:p-9 lg:col-span-7"
          >
            <div className="mb-6 flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <h3 className="font-display text-xl font-bold text-canvas">
                Send a Project Inquiry
              </h3>
              <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-lime">
                Demo Validation Mode
              </span>
            </div>

            <form onSubmit={handleSubmit} noValidate className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-light"
                  >
                    Name *
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'error-name' : undefined}
                    className="w-full border border-white/15 bg-charcoal px-4 py-3 text-sm text-canvas placeholder:text-muted focus:border-lime focus:outline-none"
                  />
                  {errors.name && (
                    <p id="error-name" className="mt-1.5 text-xs text-lime">
                      {errors.name}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-light"
                  >
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="you@company.com"
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'error-email' : undefined}
                    className="w-full border border-white/15 bg-charcoal px-4 py-3 text-sm text-canvas placeholder:text-muted focus:border-lime focus:outline-none"
                  />
                  {errors.email && (
                    <p id="error-email" className="mt-1.5 text-xs text-lime">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-light"
                >
                  Subject *
                </label>
                <input
                  id="contact-subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Gaming, Virtual Worlds, VR/AR Exploration..."
                  aria-invalid={Boolean(errors.subject)}
                  aria-describedby={errors.subject ? 'error-subject' : undefined}
                  className="w-full border border-white/15 bg-charcoal px-4 py-3 text-sm text-canvas placeholder:text-muted focus:border-lime focus:outline-none"
                />
                {errors.subject && (
                  <p id="error-subject" className="mt-1.5 text-xs text-lime">
                    {errors.subject}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="mb-1.5 block font-mono text-[11px] uppercase tracking-wider text-muted-light"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="Share goals, timeline, and scope..."
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'error-message' : undefined}
                  className="w-full resize-none border border-white/15 bg-charcoal px-4 py-3 text-sm text-canvas placeholder:text-muted focus:border-lime focus:outline-none"
                />
                {errors.message && (
                  <p id="error-message" className="mt-1.5 text-xs text-lime">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2.5 rounded-full bg-lime px-7 py-3.5 font-display text-sm font-bold text-obsidian transition-all duration-300 hover:bg-lime-hover hover:shadow-lime"
                >
                  <span>Send Message</span>
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>

                <span className="font-mono text-[11px] text-muted-light">
                  Client-side demo validation only
                </span>
              </div>
            </form>

            {/* Honest Frontend Demo Submission State */}
            {submittedPreview && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                role="status"
                className="mt-6 border border-lime/50 bg-charcoal-elevated p-4 text-xs leading-relaxed text-canvas"
              >
                <div className="flex items-start gap-2.5">
                  <Info className="mt-0.5 h-4 w-4 shrink-0 text-lime" />
                  <div>
                    <p className="font-semibold text-lime">
                      Demo Validation Passed ({submittedPreview.timestamp}) — Frontend Only
                    </p>
                    <p className="mt-1 text-muted-light">
                      Thank you, <span className="text-canvas">{submittedPreview.name}</span>.
                      Your inquiry regarding &ldquo;{submittedPreview.subject}&rdquo; was
                      validated locally in preview mode. Because no backend API is connected in
                      this phase, this message was not sent or saved to a database.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>

        {/* Dribbble Shot 5 Bottom Social Pill Bar */}
        <div className="mt-16 flex flex-wrap items-center justify-center gap-3">
          <span className="inline-flex items-center gap-2.5 rounded-full bg-obsidian px-4 py-2 text-xs font-semibold text-canvas">
            <img
              src="/images/sabari-portrait.png"
              alt="Sabari P."
              className="h-5 w-5 rounded-full bg-white object-cover"
            />
            <span>Sabari P.</span>
          </span>

          {CONTACT_PILLS.map((pill) => {
            const Icon = pill.icon;
            return (
              <a
                key={pill.label}
                href={pill.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-obsidian shadow-sm transition-all hover:border-obsidian hover:bg-obsidian hover:text-canvas"
              >
                <Icon className="h-3.5 w-3.5" />
                <span>{pill.label}</span>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
