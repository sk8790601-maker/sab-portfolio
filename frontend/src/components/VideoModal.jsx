import { useEffect } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X } from 'lucide-react';
import VideoPlayer from './VideoPlayer';

export default function VideoModal({ video, onClose }) {
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    if (!video) return undefined;

    const handleKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [video, onClose]);

  return (
    <AnimatePresence>
      {video && (
        <motion.div
          key="video-modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={onClose}
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md sm:p-6 md:p-10"
          role="dialog"
          aria-modal="true"
          aria-labelledby="video-modal-title"
        >
          <motion.div
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-5xl overflow-hidden border border-white/15 bg-charcoal shadow-floating-dark"
          >
            {/* Modal Header */}
            <div className="flex items-start justify-between gap-4 border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-lime px-2.5 py-0.5 font-mono text-[10px] font-semibold uppercase tracking-wider text-obsidian">
                    {video.category}
                  </span>
                  {video.isSample && (
                    <span className="font-mono text-[10px] uppercase tracking-wider text-muted-light">
                      AI Concept Preview
                    </span>
                  )}
                </div>
                <h3
                  id="video-modal-title"
                  className="mt-2 font-display text-lg font-bold text-canvas sm:text-xl"
                >
                  {video.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close video player modal"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/5 text-canvas transition-colors hover:border-lime hover:bg-lime hover:text-obsidian"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Reusable Player */}
            <VideoPlayer video={video} autoPlay />

            {/* Modal Description Footer */}
            <div className="flex flex-col justify-between gap-4 border-t border-white/10 px-5 py-4 sm:flex-row sm:items-center sm:px-6">
              <p className="max-w-2xl text-xs leading-relaxed text-muted-light sm:text-sm">
                {video.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {video.tools?.map((tool) => (
                  <span
                    key={tool}
                    className="border border-white/15 bg-obsidian px-3 py-1 font-mono text-[11px] text-lime"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
