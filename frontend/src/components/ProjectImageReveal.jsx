import { motion, useReducedMotion } from 'framer-motion';

/**
 * Additive viewport clip-path image reveal wrapper (and optional hover zoom)
 * designed to layer smoothly without altering existing ProjectCard motion props.
 */
export default function ProjectImageReveal({
  children,
  className = '',
  enableHoverZoom = false,
}) {
  const prefersReduced = useReducedMotion();

  if (prefersReduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      initial={{ opacity: 0.15, clipPath: 'inset(12% 0% 12% 0%)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
      viewport={{ once: true, amount: 'some' }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className={`overflow-hidden ${className}`}
    >
      {enableHoverZoom ? (
        <div className="project-image-hover-zoom h-full w-full">{children}</div>
      ) : (
        children
      )}
    </motion.div>
  );
}
