import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export default function Loader({ onComplete }) {
  const prefersReduced = useReducedMotion();
  const [progress, setProgress] = useState(prefersReduced ? 100 : 0);
  const [visible, setVisible] = useState(!prefersReduced);

  useEffect(() => {
    if (prefersReduced) {
      onComplete?.();
      return undefined;
    }

    let frame;
    let fallbackTimer;
    let closeTimer;
    const start = performance.now();
    const duration = 1250;

    // Guarantee loader always clears even if rAF is throttled inside an iframe
    fallbackTimer = setTimeout(() => {
      setProgress(100);
      setVisible(false);
      onComplete?.();
    }, 1800);

    const tick = (now) => {
      const elapsed = now - start;
      const t = Math.min(1, elapsed / duration);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - t, 3);
      setProgress(Math.round(eased * 100));

      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        closeTimer = setTimeout(() => {
          clearTimeout(fallbackTimer);
          setVisible(false);
          onComplete?.();
        }, 220);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      clearTimeout(fallbackTimer);
      clearTimeout(closeTimer);
    };
  }, [prefersReduced, onComplete]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="portfolio-loader"
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          className="fixed inset-0 z-[100] flex flex-col justify-between bg-obsidian px-6 py-8 text-canvas md:px-12 md:py-10"
          aria-label="Loading portfolio"
          role="status"
        >
          <div className="flex items-center justify-between font-mono text-xs uppercase tracking-[0.2em] text-muted-light">
            <span>Portfolio / 2026</span>
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-lime" />
              Gaming &amp; Metaverse
            </span>
          </div>

          <div className="my-auto flex flex-col items-start gap-3">
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-mono text-xs uppercase tracking-[0.28em] text-lime"
            >
              Think. Design. Experience.
            </motion.p>
            <div className="overflow-hidden">
              <motion.h1
                initial={{ y: '100%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className="font-display text-5xl font-bold tracking-tightest sm:text-7xl md:text-8xl"
              >
                SABARI <span className="text-outline-light">P.</span>
              </motion.h1>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-end justify-between">
              <span className="font-mono text-xs uppercase tracking-widest text-muted-light">
                Initializing Experience
              </span>
              <span className="font-display text-3xl font-bold tabular-nums text-lime md:text-5xl">
                {String(progress).padStart(2, '0')}%
              </span>
            </div>
            <div className="h-[2px] w-full overflow-hidden bg-white/15">
              <div
                className="h-full bg-lime transition-[width] duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
