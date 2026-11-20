import { useEffect, useState } from 'react';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const prefersReduced = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [cursorVariant, setCursorVariant] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  const smoothX = useSpring(mouseX, { stiffness: 420, damping: 32, mass: 0.45 });
  const smoothY = useSpring(mouseY, { stiffness: 420, damping: 32, mass: 0.45 });

  useEffect(() => {
    if (prefersReduced || typeof window === 'undefined') return undefined;

    const finePointerQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const checkPointer = () => {
      const active = finePointerQuery.matches;
      setEnabled(active);
      if (active) {
        document.body.classList.add('has-custom-cursor');
      } else {
        document.body.classList.remove('has-custom-cursor');
      }
    };

    checkPointer();
    finePointerQuery.addEventListener('change', checkPointer);

    const handleMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setIsVisible((prev) => (prev ? prev : true));

      const target = e.target instanceof Element ? e.target : null;
      const cursorEl = target?.closest('[data-cursor]');
      if (cursorEl) {
        const type = cursorEl.getAttribute('data-cursor') || 'link';
        const label = cursorEl.getAttribute('data-cursor-label') || '';
        setCursorVariant(type);
        setCursorText(label || (type === 'view' ? 'VIEW' : type === 'play' ? 'PLAY' : ''));
      } else if (target?.closest('a, button, input, textarea, select')) {
        setCursorVariant('interactive');
        setCursorText('');
      } else {
        setCursorVariant('default');
        setCursorText('');
      }
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener('mousemove', handleMove, { passive: true });
    document.addEventListener('mouseleave', handleLeave);

    return () => {
      finePointerQuery.removeEventListener('change', checkPointer);
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
      document.body.classList.remove('has-custom-cursor');
    };
  }, [prefersReduced, mouseX, mouseY]);

  if (!enabled || !isVisible) return null;

  const isExpanded = cursorVariant === 'view' || cursorVariant === 'play';
  const isInteractive = cursorVariant === 'interactive';

  return (
    <motion.div
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[90] flex items-center justify-center rounded-full"
      style={{
        x: smoothX,
        y: smoothY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      animate={{
        width: isExpanded ? 74 : isInteractive ? 36 : 14,
        height: isExpanded ? 74 : isInteractive ? 36 : 14,
        backgroundColor: isExpanded
          ? '#C6FF00'
          : isInteractive
            ? 'rgba(198, 255, 0, 0.18)'
            : '#C6FF00',
        border: isInteractive ? '1.5px solid #C6FF00' : '1px solid rgba(10, 9, 9, 0.25)',
        mixBlendMode: isExpanded || isInteractive ? 'normal' : 'difference',
      }}
      transition={{ duration: 0.18, ease: 'easeOut' }}
    >
      {isExpanded && (
        <span className="font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-obsidian">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
