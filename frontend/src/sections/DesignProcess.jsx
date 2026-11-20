import { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';
import SectionHeading from '../components/SectionHeading';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { DESIGN_PROCESS_STEPS } from '../data/skills';

export default function DesignProcess() {
  const prefersReduced = useReducedMotion();
  const [activeStepIndex, setActiveStepIndex] = useState(0);

  const scopeRef = useScrollAnimation((gsap) => {
    gsap.fromTo(
      '.process-progress-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '#process-timeline',
          start: 'top 75%',
          end: 'bottom 60%',
          scrub: true,
        },
      }
    );
  }, []);

  const activeStep = DESIGN_PROCESS_STEPS[activeStepIndex];

  return (
    <section
      id="process"
      ref={scopeRef}
      className="relative overflow-hidden bg-canvas py-24 text-obsidian md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          watermark="WORKFLOW"
          kicker="Learning, Development & Exploration"
          title="EXPLORATION JOURNEY"
          description="A forward-looking learning roadmap for gaming and immersive technologies. Verified projects and experience will be added as they develop."
          theme="light"
          align="center"
        />

        {/* Interactive Step Selector Bar + GSAP Scroll Progress Line */}
        <div id="process-timeline" className="relative mb-10">
          <div className="hidden h-[2px] w-full bg-black/10 md:block">
            <div className="process-progress-line h-full w-full origin-left bg-obsidian" />
          </div>

          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
            {DESIGN_PROCESS_STEPS.map((step, index) => {
              const isActive = index === activeStepIndex;
              return (
                <motion.button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStepIndex(index)}
                  initial={prefersReduced ? false : { opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className={`group flex flex-col items-start border p-4 text-left transition-all duration-300 ${
                    isActive
                      ? 'border-obsidian bg-obsidian text-canvas shadow-floating'
                      : 'border-black/12 bg-white text-obsidian hover:border-obsidian hover:bg-alabaster'
                  }`}
                >
                  <div className="flex w-full items-center justify-between">
                    <span
                      className={`font-mono text-xs font-semibold ${
                        isActive ? 'text-lime' : 'text-muted'
                      }`}
                    >
                      {step.number}
                    </span>
                    <span
                      className={`h-2 w-2 rounded-full transition-colors ${
                        isActive ? 'bg-lime' : 'bg-black/15 group-hover:bg-obsidian'
                      }`}
                    />
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold tracking-tight">
                    {step.title}
                  </h3>
                  <p
                    className={`mt-1 line-clamp-2 text-xs leading-relaxed ${
                      isActive ? 'text-muted-light' : 'text-muted'
                    }`}
                  >
                    {step.headline}
                  </p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Active Step Detailed Stage Card */}
        <motion.div
          key={activeStep.number}
          initial={prefersReduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border border-black/12 bg-alabaster p-6 sm:p-10 lg:grid-cols-12 lg:items-center"
        >
          <div className="lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-obsidian px-3.5 py-1 font-mono text-[11px] uppercase tracking-widest text-lime">
              <span>Stage {activeStep.number}</span>
              <span>/</span>
              <span>{activeStep.title}</span>
            </div>
            <h3 className="mt-4 font-display text-2xl font-bold tracking-tight text-obsidian sm:text-3xl">
              {activeStep.headline}
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              {activeStep.description}
            </p>
          </div>

          <div className="border-t border-black/10 pt-6 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
            <p className="font-mono text-xs uppercase tracking-widest text-muted">
              Learning Focus
            </p>
            <ul className="mt-4 space-y-2.5">
              {activeStep.deliverables.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm font-medium text-obsidian">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-obsidian" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
