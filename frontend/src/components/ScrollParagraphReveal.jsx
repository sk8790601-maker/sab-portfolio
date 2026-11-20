import { motion, useReducedMotion } from 'framer-motion';

/**
 * Additive scroll-triggered word-by-word fade-up reveal for selected paragraphs.
 * Separate from AnimatedText.jsx so existing animations remain untouched.
 */
export default function ScrollParagraphReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.014,
}) {
  const prefersReduced = useReducedMotion();
  const safeText = String(text || '');

  if (prefersReduced) {
    return <span className={className}>{safeText}</span>;
  }

  const words = safeText.split(' ');

  return (
    <span className={className} aria-label={safeText}>
      <span aria-hidden="true">
        {words.map((word, idx) => (
          <span key={`${word}-${idx}`}>
            <motion.span
              className="inline-block"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 'some' }}
              transition={{
                duration: 0.42,
                delay: delay + idx * stagger,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              {word}
            </motion.span>
            {idx < words.length - 1 ? ' ' : ''}
          </span>
        ))}
      </span>
    </span>
  );
}
