import { motion, useReducedMotion } from 'framer-motion';

/**
 * Additive character-by-character reveal for selected headings.
 * Splits by word first so line breaks never split inside a word,
 * preserves screen-reader accessibility, and honors prefers-reduced-motion.
 */
export default function LetterReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.018,
  trigger = 'view',
}) {
  const prefersReduced = useReducedMotion();
  const safeText = String(text || '');

  if (prefersReduced) {
    return <span className={className}>{safeText}</span>;
  }

  const words = safeText.split(' ');
  let charIndex = 0;

  return (
    <span className={className} aria-label={safeText}>
      <span aria-hidden="true">
        {words.map((word, wIdx) => {
          const chars = Array.from(word);
          return (
            <span key={`${word}-${wIdx}`}>
              <span className="inline-block whitespace-nowrap">
                {chars.map((char, cIdx) => {
                  const currentDelay = delay + charIndex * stagger;
                  charIndex += 1;
                  return (
                    <motion.span
                      key={`${wIdx}-${cIdx}-${char}`}
                      className="inline-block"
                      initial={{ opacity: 0, y: 12 }}
                      {...(trigger === 'mount'
                        ? { animate: { opacity: 1, y: 0 } }
                        : {
                            whileInView: { opacity: 1, y: 0 },
                            viewport: { once: true, amount: 'some' },
                          })}
                      transition={{
                        duration: 0.42,
                        delay: currentDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {char}
                    </motion.span>
                  );
                })}
              </span>
              {wIdx < words.length - 1 ? ' ' : ''}
            </span>
          );
        })}
      </span>
    </span>
  );
}
