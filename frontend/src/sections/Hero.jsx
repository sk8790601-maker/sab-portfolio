import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowDown, ArrowUpRight, Dribbble, Instagram, Layers, Linkedin } from 'lucide-react';
import LetterReveal from '../components/LetterReveal';
import useScrollAnimation from '../hooks/useScrollAnimation';

const HERO_SOCIALS = [
  { label: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble },
  { label: 'Behance', href: 'https://www.behance.net', icon: Layers },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Instagram', href: 'https://www.instagram.com', icon: Instagram },
];

export default function Hero() {
  const prefersReduced = useReducedMotion();
  const [portraitErr, setPortraitErr] = useState(false);

  const heroScopeRef = useScrollAnimation((gsap, _ST, rootEl) => {
    gsap.to('.hero-portrait-parallax', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: rootEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });

    gsap.to('.hero-display-parallax', {
      yPercent: -12,
      ease: 'none',
      scrollTrigger: {
        trigger: rootEl,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <section
      id="hero"
      ref={heroScopeRef}
      className="bg-mist-hero relative flex min-h-screen flex-col justify-between overflow-hidden pt-24 md:pt-28"
    >
      {/* Subtle Architectural Grid Overlay */}
      <div
        aria-hidden="true"
        className="bg-grid-architectural pointer-events-none absolute inset-0 opacity-60"
      />

      {/* Ambient Subtle Animated Radial Pulse */}
      {!prefersReduced && (
        <motion.div
          aria-hidden="true"
          animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.55, 0.35] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-24 top-1/4 h-96 w-96 rounded-full bg-lime/15 blur-3xl"
        />
      )}

      <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-between px-5 pb-10 md:px-10 md:pb-12">
        {/* Top Tagline Bar */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex flex-wrap items-center justify-between gap-3 border-b border-black/8 pb-4"
        >
          <div className="flex items-center gap-2.5">
            <span className="h-2 w-2 rounded-full bg-lime ring-2 ring-obsidian/20" />
            <span className="font-mono text-[11px] font-medium uppercase tracking-[0.24em] text-obsidian">
              Think. Design. Experience.
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted">
            Portfolio / Gaming &amp; Metaverse
          </span>
        </motion.div>

        {/* Oversized Centered Hero Typography */}
        <div className="hero-display-parallax relative z-0 mt-6 md:mt-8">
          <div className="overflow-hidden">
            <motion.div
              initial={prefersReduced ? false : { y: '100%' }}
              animate={{ y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="flex w-full select-none items-center justify-center"
            >
              <span className="font-display text-[clamp(3.75rem,18vw,14.5rem)] font-extrabold uppercase leading-[0.86] tracking-tightest text-outline-dark">
                SABARI
              </span>
            </motion.div>
          </div>
        </div>

        {/* Center-Lower Editorial Composition: Left Intro + Center Portrait + Right Social Pills */}
        <div className="relative z-10 mt-4 grid flex-1 items-end gap-8 lg:mt-0 lg:grid-cols-12 lg:gap-6">
          {/* Left Column: Main Heading, Intro & CTAs */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="order-2 z-20 space-y-5 pb-2 lg:order-1 lg:col-span-5 lg:pb-8"
          >
            <div>
              <span className="inline-flex items-center gap-2 border border-black/15 bg-white px-3 py-1 font-mono text-[11px] font-medium uppercase tracking-widest text-obsidian">
                <span className="h-1.5 w-1.5 rounded-full bg-lime ring-1 ring-obsidian" />
                Gaming & Metaverse
              </span>
              <h1 className="mt-4 font-display text-2xl font-bold uppercase leading-[1.08] tracking-tight text-obsidian sm:text-3xl md:text-[2.15rem]">
                <LetterReveal
                  text="EXPLORING THE FUTURE OF GAMING & METAVERSE"
                  trigger="mount"
                  delay={0.38}
                />
              </h1>
            </div>

            <p className="max-w-md text-sm leading-relaxed text-muted md:text-[15px]">
              Hello, I&apos;m Sabari P., passionate about gaming, virtual worlds, immersive
              technologies and the future of digital experiences. Exploring interactive
              possibilities and the worlds we can imagine together.
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-1">
              <button
                type="button"
                onClick={() => scrollToSection('works')}
                className="group inline-flex items-center gap-2.5 rounded-full bg-obsidian px-6 py-3.5 text-sm font-semibold text-canvas transition-all duration-300 hover:bg-lime hover:text-obsidian hover:shadow-lime"
              >
                <span>Explore My Work</span>
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollToSection('contact')}
                className="inline-flex items-center gap-2 rounded-full border border-black/20 bg-white px-6 py-3.5 text-sm font-semibold text-obsidian transition-all duration-300 hover:border-obsidian hover:bg-alabaster"
              >
                <span>Let&apos;s Connect</span>
              </button>
            </div>
          </motion.div>

          {/* Center Column: Stylized Studio Portrait Rising Behind Typography */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="hero-portrait-parallax order-1 relative flex justify-center lg:order-2 lg:col-span-5 lg:-mt-28 xl:-mt-36"
          >
            <div className="relative flex w-full max-w-[340px] items-end justify-center sm:max-w-[400px] lg:max-w-[460px]">
              {!portraitErr ? (
                <img
                  src="/images/sabari-hero-cutout.png"
                  alt="Sabari P. — gaming and metaverse explorer portrait"
                  onError={() => setPortraitErr(true)}
                  className="relative z-10 max-h-[380px] w-auto object-contain object-bottom mix-blend-multiply sm:max-h-[440px] lg:max-h-[520px]"
                />
              ) : (
                <div className="flex h-80 w-64 items-center justify-center rounded-t-full border border-black/15 bg-alabaster font-display text-4xl font-bold text-obsidian">
                  SP.
                </div>
              )}

              {/* Subtle bottom dissolve fade */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-16 bg-gradient-to-t from-[#FDFDFD] via-[#FDFDFD]/70 to-transparent"
              />
            </div>
          </motion.div>

          {/* Right Column: Dribbble-Style Social Pill Stack + Scroll Indicator */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="order-3 z-20 flex flex-col justify-between gap-6 pb-2 lg:col-span-2 lg:items-end lg:pb-8"
          >
            <div className="flex flex-wrap gap-2.5 lg:flex-col lg:items-end">
              {HERO_SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    className="group inline-flex items-center gap-2.5 rounded-full border border-black/10 bg-white px-4 py-2 text-xs font-medium text-obsidian shadow-sm transition-all duration-300 hover:-translate-x-1 hover:border-obsidian hover:bg-obsidian hover:text-canvas"
                  >
                    <Icon className="h-3.5 w-3.5 text-obsidian/70 transition-colors group-hover:text-lime" />
                    <span>{social.label}</span>
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => scrollToSection('about')}
              className="group inline-flex w-fit items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-muted transition-colors hover:text-obsidian"
            >
              <span>Scroll</span>
              <span className="flex h-7 w-7 items-center justify-center rounded-full border border-black/15 bg-white transition-all group-hover:border-obsidian group-hover:bg-lime">
                <ArrowDown className="h-3.5 w-3.5 text-obsidian animate-bounce" />
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
