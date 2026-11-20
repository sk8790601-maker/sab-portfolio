import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Compass, MapPin, Sparkles, X } from 'lucide-react';
import AnimatedText from '../components/AnimatedText';
import LetterReveal from '../components/LetterReveal';
import ScrollParagraphReveal from '../components/ScrollParagraphReveal';
import SectionHeading from '../components/SectionHeading';
import { CAPABILITY_ROWS } from '../data/skills';

const PILLARS = [
  { label: 'Focus', value: 'Gaming & Metaverse' },
  { label: 'Craft', value: 'Worlds & Interaction' },
  { label: 'Mantra', value: 'Think. Design. Experience.' },
];

const DESIGN_TOOLS = [
  { name: 'Unity / Unreal Engine', category: 'Exploration' },
  { name: 'Blender / Maya', category: 'Exploration' },
  { name: 'VR / AR Technologies', category: 'Exploration' },
];

const CORE_UX_SKILLS = [
  'Gaming Exploration', 'Virtual Worlds', 'Immersive Storytelling',
  'Emerging Technologies', 'Interactive Experiences',
];

const QUICK_DETAILS = [
  { label: 'Location', value: 'India · Available Worldwide', hasIcon: true },
  { label: 'Discipline', value: 'Gaming & Metaverse', hasIcon: false },
  { label: 'Availability', value: 'Available for New Project', isLive: true },
];

export default function About() {
  const prefersReduced = useReducedMotion();
  const [activeServiceId, setActiveServiceId] = useState('uiux');
  const [imgErr, setImgErr] = useState(false);

  return (
    <section
      id="about"
      className="bg-grid-dark relative overflow-hidden bg-obsidian py-24 text-canvas md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          watermark="THE VISION"
          kicker="Immersive Worlds & Emerging Technologies"
          title="ABOUT THE VISION"
          theme="dark"
          align="left"
        />

        {/* Top Editorial Row: Left Quick Details | Right Intro & Philosophy */}
        <div className="grid gap-10 border-b border-white/12 pb-16 lg:grid-cols-12 lg:items-start">
          {/* Left Side: Small Details */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5"
          >
            <div className="space-y-3">
              {QUICK_DETAILS.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-wrap items-center justify-between gap-2 border border-white/10 bg-charcoal px-4 py-3"
                >
                  <span className="font-mono text-[11px] uppercase tracking-wider text-muted-light">
                    {detail.label}
                  </span>
                  <span className="inline-flex items-center gap-2 text-xs font-semibold text-canvas">
                    {detail.isLive && (
                      <span className="h-2 w-2 rounded-full bg-lime" />
                    )}
                    {detail.hasIcon && (
                      <MapPin className="h-3.5 w-3.5 text-lime" />
                    )}
                    <span>{detail.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Side: Sabari's Introduction & Design Philosophy */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="space-y-6 lg:col-span-7 lg:pl-6"
          >
            <AnimatedText
              as="h4"
              text="Building immersive digital worlds and interactive experiences."
              className="font-display text-2xl font-bold leading-snug tracking-tight text-canvas sm:text-3xl md:text-[2.1rem]"
            />

            <div className="space-y-4 text-sm leading-relaxed text-muted-light md:text-base">
              <p>
                Hey, I&apos;m <strong className="font-semibold text-canvas">Sabari</strong>, a
                gaming and metaverse enthusiast exploring how creativity, emerging
                technology and interactive worlds can open new possibilities.
              </p>

              <p>
                <ScrollParagraphReveal
                  text="My vision is to explore gaming, metaverse spaces, virtual reality and augmented reality as new canvases for human connection. From atmospheric 3D environments to interactive experiences, I am curious about the technologies that bring imagined worlds closer to reality."
                />
              </p>

              <p className="text-canvas/90">
                <ScrollParagraphReveal
                  text="For me, an immersive world is more than a visual spectacle — it is a place to explore, connect and discover new perspectives."
                />
              </p>
            </div>

            <div className="border-l-2 border-lime bg-charcoal p-5">
              <p className="text-sm leading-relaxed text-canvas md:text-base">
                <strong className="font-display font-bold text-lime">My goal:</strong> To create
                meaningful immersive experiences that inspire curiosity and connection.
              </p>
            </div>
          </motion.div>
        </div>

        {/* Below: Creative Portrait Card (Unchanged) + Bottom Tools & Skills */}
        <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:items-end">
          {/* Portrait Photo Section — Preserved As-Is */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            className="lg:col-span-5"
          >
            <div className="relative overflow-hidden border border-white/12 bg-charcoal p-5 sm:p-6">
              <div className="mb-4 flex items-center justify-between font-mono text-[11px] uppercase tracking-widest text-muted-light">
                <span>Profile // Sabari P.</span>
                <span className="inline-flex items-center gap-1.5 text-lime">
                  <Sparkles className="h-3.5 w-3.5" />
                  Gaming Explorer
                </span>
              </div>

              <div className="relative aspect-[4/4.6] overflow-hidden bg-[#ECECEF]">
                {!imgErr ? (
                  <img
                    src="/images/sabari-profile.jpeg"
                    alt="Sabari P. creative portrait"
                    loading="lazy"
                    onError={() => setImgErr(true)}
                    className="h-full w-full object-cover object-top grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  />
                ) : (
                  <div className="flex h-full w-full items-center justify-center bg-charcoal-elevated font-display text-5xl font-bold text-lime">
                    SP.
                  </div>
                )}

                {/* Corner Neon Lime Accent Marker */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between border border-white/15 bg-obsidian/90 px-4 py-3 backdrop-blur-md">
                  <div>
                    <p className="font-display text-sm font-bold text-canvas">SABARI P.</p>
                    <p className="font-mono text-[10px] uppercase tracking-widest text-lime">
                      Think. Design. Experience.
                    </p>
                  </div>
                  <Compass className="h-5 w-5 text-lime" />
                </div>
              </div>

              {/* Quick Pillars Row */}
              <div className="mt-5 grid grid-cols-3 gap-3 border-t border-white/10 pt-4">
                {PILLARS.map((item) => (
                  <div key={item.label}>
                    <p className="font-mono text-[10px] uppercase tracking-wider text-muted-light">
                      {item.label}
                    </p>
                    <p className="mt-1 text-xs font-semibold text-canvas">{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom: Design Tools & Core Skills */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="space-y-8 lg:col-span-7 lg:pl-6"
          >
            <div className="border border-white/12 bg-charcoal p-6 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime">
                  01 / Technology Roadmap
                </p>
                <span className="font-mono text-[11px] text-muted-light">
                  Exploration Interests
                </span>
              </div>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {DESIGN_TOOLS.map((tool) => (
                  <div
                    key={tool.name}
                    className="flex items-center justify-between border border-white/10 bg-obsidian px-4 py-3.5 transition-colors hover:border-lime/50"
                  >
                    <span className="font-display text-sm font-bold text-canvas">
                      {tool.name}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-lime">
                      {tool.category}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-8 border-t border-white/10 pt-6">
                <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-light">
                  02 / Exploration Interests
                </p>
                <div className="mt-4 flex flex-wrap gap-2.5">
                  {CORE_UX_SKILLS.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-white/15 bg-obsidian px-4 py-1.5 text-xs font-medium text-canvas transition-colors hover:border-lime hover:text-lime"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Dribbble-Inspired Interactive /SERVICES Accordion with Tilted Preview Card */}
        <div className="mt-20 border-t border-white/12 pt-16">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-lime">
                Interactive Overview
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
                /<LetterReveal text="LEARNING & EXPLORATION" />
              </h3>
            </div>
            <p className="font-mono text-xs text-muted-light">
              Select or hover a discipline to inspect sample preview
            </p>
          </div>

          <div className="divide-y divide-white/10 border-y border-white/10">
            {CAPABILITY_ROWS.map((row) => {
              const isActive = activeServiceId === row.id;
              return (
                <div
                  key={row.id}
                  onMouseEnter={() => setActiveServiceId(row.id)}
                  className={`relative transition-colors duration-300 ${
                    isActive
                      ? 'bg-charcoal-elevated px-5 py-7 sm:px-8'
                      : 'px-2 py-6 hover:bg-white/[0.02]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setActiveServiceId(isActive ? '' : row.id)}
                    aria-expanded={isActive}
                    className="flex w-full items-center justify-between gap-6 text-left focus:outline-none"
                  >
                    <div className="max-w-2xl">
                      <h4
                        className={`font-display text-2xl font-bold tracking-tight transition-colors sm:text-4xl ${
                          isActive ? 'text-lime' : 'text-canvas'
                        }`}
                      >
                        {row.title}
                      </h4>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={prefersReduced ? false : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.28 }}
                            className="overflow-hidden"
                          >
                            <p className="mt-3 text-sm leading-relaxed text-muted-light">
                              {row.description}
                            </p>
                            <div className="mt-4 flex flex-wrap gap-2">
                              {row.highlights.map((hl) => (
                                <span
                                  key={hl}
                                  className="rounded-full border border-white/15 bg-obsidian px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-canvas"
                                >
                                  {hl}
                                </span>
                              ))}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    <div className="flex items-center gap-6">
                      {/* Floating Tilted Preview Card on Desktop (matching Dribbble Shot 3) */}
                      <AnimatePresence>
                        {isActive && (
                          <motion.div
                            initial={
                              prefersReduced ? false : { opacity: 0, scale: 0.9, rotate: -6 }
                            }
                            animate={{ opacity: 1, scale: 1, rotate: -3 }}
                            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.9 }}
                            transition={{ duration: 0.3 }}
                            className="hidden w-52 overflow-hidden border-2 border-lime/60 bg-white p-1 shadow-floating-dark md:block lg:w-60"
                          >
                            <img
                              src={row.previewImage}
                              alt={`${row.title} concept environment preview`}
                              className="aspect-[16/10] w-full object-cover"
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>

                      <span
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full border transition-colors ${
                          isActive
                            ? 'border-lime bg-lime text-obsidian'
                            : 'border-white/20 text-canvas'
                        }`}
                      >
                        {isActive ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <ArrowUpRight className="h-4 w-4" />
                        )}
                      </span>
                    </div>
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
