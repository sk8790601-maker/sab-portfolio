import { motion, useReducedMotion } from 'framer-motion';
import ScrollParagraphReveal from '../components/ScrollParagraphReveal';
import SectionHeading from '../components/SectionHeading';
import { SkillLabelReveal, ToolIconReveal } from '../components/SkillStagger';
import ToolLogo from '../components/ToolLogo';
import useScrollAnimation from '../hooks/useScrollAnimation';
import { DESIGN_SKILLS_CONTENT } from '../data/skills';

export default function Skills() {
  const prefersReduced = useReducedMotion();
  const { kicker, title, lead, intro, tools, uiSkills, approach } =
    DESIGN_SKILLS_CONTENT;

  const scopeRef = useScrollAnimation((gsap) => {
    gsap.fromTo(
      '.approach-progress-line',
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '#design-approach-bar',
          start: 'top 90%',
          once: true,
          invalidateOnRefresh: true,
        },
      }
    );
  }, []);

  return (
    <section
      id="skills"
      ref={scopeRef}
      className="relative overflow-hidden bg-charcoal py-24 text-canvas md:py-32"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          watermark="SKILLS"
          kicker={kicker}
          title={title}
          theme="dark"
          align="left"
        />

        {/* Lead Bold Statement & Introduction */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.55 }}
          className="-mt-6 mb-14 max-w-3xl space-y-4 md:-mt-8"
        >
          <p className="font-display text-xl font-bold leading-snug tracking-tight text-canvas sm:text-2xl md:text-3xl">
            {lead}
          </p>
          <p className="text-sm leading-relaxed text-muted-light md:text-base">
            <ScrollParagraphReveal text={intro} />
          </p>
        </motion.div>

        {/* /01 — ENGINES & 3D TOOLS */}
        <motion.div
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55 }}
          className="border border-white/10 bg-obsidian p-6 sm:p-8"
        >
          <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-lime">
              /01 — ENGINES & 3D TOOLS
            </h3>
            <span className="font-mono text-[11px] text-muted-light">
              0{tools.length} Exploration Areas
            </span>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {tools.map((tool, index) => (
              <div
                key={tool.id}
                className="group flex flex-col justify-between border border-white/10 bg-charcoal p-5 transition-colors duration-300 hover:border-lime/50"
              >
                <div className="flex items-start justify-between gap-3">
                  <ToolIconReveal index={index}>
                    <ToolLogo className="h-11 w-11" />
                  </ToolIconReveal>
                  <span className="font-mono text-[11px] text-muted-light transition-colors group-hover:text-lime">
                    0{index + 1}
                  </span>
                </div>

                <div className="mt-6">
                  <h4 className="font-display text-lg font-bold text-canvas">
                    {tool.name}
                  </h4>
                  <p className="mt-1 text-xs leading-relaxed text-muted-light">
                    {tool.role}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Immersive Technologies */}
        <div className="mt-8 grid gap-8">
          {/* /02 — IMMERSIVE TECHNOLOGIES */}
          <motion.div
            initial={prefersReduced ? false : { opacity: 0, y: 22 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.1 }}
            className="border border-white/10 bg-obsidian p-6 sm:p-8"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-white/10 pb-4">
              <h3 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-lime">
                /02 — IMMERSIVE TECHNOLOGIES
              </h3>
              <span className="font-mono text-[11px] text-muted-light">
                0{uiSkills.length} Exploration Areas
              </span>
            </div>

            <ul className="mt-4 divide-y divide-white/10">
              {uiSkills.map((skill, idx) => (
                <li
                  key={skill}
                  className="group flex items-center justify-between gap-4 py-3.5 transition-colors"
                >
                  <SkillLabelReveal index={idx} className="flex items-center gap-4">
                    <span className="font-mono text-[11px] text-lime/80">
                      0{idx + 1}
                    </span>
                    <span className="font-display text-sm font-semibold text-canvas transition-colors group-hover:text-lime sm:text-base">
                      {skill}
                    </span>
                  </SkillLabelReveal>
                  <span
                    aria-hidden="true"
                    className="h-1.5 w-1.5 rounded-full bg-white/20 transition-colors group-hover:bg-lime"
                  />
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* /03 — EXPLORATION ROADMAP */}
        <motion.div
          id="design-approach-bar"
          initial={prefersReduced ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, delay: 0.08 }}
          className="mt-8 border border-white/10 bg-obsidian p-6 sm:p-10"
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-5">
            <h3 className="font-mono text-xs font-medium uppercase tracking-[0.22em] text-lime">
              /03 — EXPLORATION ROADMAP
            </h3>
            <span className="font-mono text-xs text-muted-light">
              Think. Design. Experience.
            </span>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-2 sm:gap-3">
            {approach.steps.map((step, index) => (
              <div key={step} className="flex items-center gap-2 sm:gap-3">
                <span className="border border-white/12 bg-charcoal px-4 py-2 font-display text-base font-bold tracking-tight text-canvas transition-colors hover:border-lime hover:text-lime sm:px-5 sm:py-2.5 sm:text-xl">
                  {step}
                </span>
                {index < approach.steps.length - 1 && (
                  <span className="font-display text-lg font-bold text-lime sm:text-xl">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 h-[1px] w-full overflow-hidden bg-white/10">
            <div className="approach-progress-line h-full w-full origin-left bg-lime/70" />
          </div>

          <p className="mt-6 max-w-3xl text-sm leading-relaxed text-muted-light md:text-base">
            <ScrollParagraphReveal text={approach.statement} />
          </p>
        </motion.div>
      </div>
    </section>
  );
}
