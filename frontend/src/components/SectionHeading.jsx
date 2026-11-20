import { motion, useReducedMotion } from 'framer-motion';

/**
 * Signature Dribbble-inspired editorial section header:
 * Giant muted watermark word behind crisp `/SECTION TITLE` foreground heading.
 */
export default function SectionHeading({
  watermark,
  kicker,
  title,
  description,
  theme = 'light',
  align = 'center',
  rightSlot = null,
}) {
  const prefersReduced = useReducedMotion();
  const isDark = theme === 'dark';

  return (
    <div
      className={`relative mb-12 md:mb-16 ${
        align === 'center' ? 'text-center' : 'text-left'
      }`}
    >
      {/* Oversized Watermark Typography */}
      {watermark && (
        <div
          aria-hidden="true"
          className={`pointer-events-none select-none font-display text-[3.5rem] font-extrabold uppercase leading-none tracking-tightest sm:text-[6.2rem] md:text-[8.5rem] lg:text-[10.5rem] ${
            isDark ? 'text-watermark-dark' : 'text-watermark-light'
          }`}
        >
          {watermark}
        </div>
      )}

      {/* Foreground Section Kicker & Title */}
      <motion.div
        initial={prefersReduced ? false : { opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`${watermark ? '-mt-6 sm:-mt-10 md:-mt-14' : ''} relative z-10 flex flex-col gap-4 ${
          align === 'center'
            ? 'items-center'
            : 'md:flex-row md:items-end md:justify-between'
        }`}
      >
        <div>
          {kicker && (
            <p
              className={`mb-2 font-mono text-xs uppercase tracking-[0.22em] ${
                isDark ? 'text-lime' : 'text-muted'
              }`}
            >
              {kicker}
            </p>
          )}
          <h2
            className={`font-display text-3xl font-bold uppercase tracking-editorial sm:text-4xl md:text-5xl ${
              isDark ? 'text-canvas' : 'text-obsidian'
            }`}
          >
            /{title}
          </h2>
          {description && (
            <p
              className={`mt-3 max-w-2xl text-sm leading-relaxed md:text-base ${
                align === 'center' ? 'mx-auto' : ''
              } ${isDark ? 'text-muted-light' : 'text-muted'}`}
            >
              {description}
            </p>
          )}
        </div>

        {rightSlot && <div className="shrink-0">{rightSlot}</div>}
      </motion.div>
    </div>
  );
}
