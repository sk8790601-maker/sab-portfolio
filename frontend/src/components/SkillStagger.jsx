import { motion, useReducedMotion } from 'framer-motion';

/**
 * Sequential reveal wrapper for tool logos inside /01 — DESIGN TOOLS.
 */
export function ToolIconReveal({ children, index = 0, className = '' }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.76, y: 12 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.48,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Subtle staggered reveal wrapper for skill labels inside /02 and /03 skill lists.
 */
export function SkillLabelReveal({ children, index = 0, className = '' }) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 'some' }}
      transition={{
        duration: 0.42,
        delay: index * 0.055,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
