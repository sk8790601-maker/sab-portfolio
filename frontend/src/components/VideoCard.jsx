import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Film, Play } from 'lucide-react';

export default function VideoCard({ video, index = 0, onSelect }) {
  const prefersReduced = useReducedMotion();
  const videoPreviewRef = useRef(null);
  const [isHovering, setIsHovering] = useState(false);
  const [canHover, setCanHover] = useState(false);
  const [posterError, setPosterError] = useState(false);

  const previewSrc =
    video.previewUrl || (video.sourceType === 'mp4' ? video.videoUrl : video.fallbackMp4 || null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    setCanHover(window.matchMedia('(hover: hover) and (pointer: fine)').matches);
  }, []);

  useEffect(() => {
    const el = videoPreviewRef.current;
    if (!el || !isHovering) return;
    el.play().catch(() => {});
    return () => el.pause();
  }, [isHovering]);

  const handleMouseEnter = () => {
    if (!canHover || prefersReduced || !previewSrc) return;
    setIsHovering(true);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    const el = videoPreviewRef.current;
    if (el) {
      el.pause();
    }
  };

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.55, delay: (index % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col border border-white/10 bg-charcoal transition-colors duration-300 hover:border-lime/50"
    >
      <button
        type="button"
        onClick={() => onSelect(video)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        data-cursor="play"
        data-cursor-label="PLAY"
        aria-label={`Play video: ${video.title}`}
        className="relative aspect-video w-full overflow-hidden bg-obsidian text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-lime"
      >
        {/* Poster Image */}
        {!posterError ? (
          <img
            src={video.posterUrl}
            alt={`${video.title} poster thumbnail`}
            loading="lazy"
            onError={() => setPosterError(true)}
            className={`h-full w-full object-cover transition-all duration-700 ${
              isHovering && previewSrc ? 'scale-105 opacity-0' : 'opacity-90 group-hover:scale-105'
            }`}
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-charcoal-elevated">
            <Film className="h-8 w-8 text-lime" />
          </div>
        )}

        {/* Desktop Hover Video Preview */}
        {canHover && previewSrc && (
          <video
            ref={videoPreviewRef}
            src={isHovering ? previewSrc : undefined}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            className={`pointer-events-none absolute inset-0 h-full w-full transition-opacity duration-300 ${
              video.aspectRatio === '9:16' ? 'bg-obsidian object-contain' : 'object-cover'
            } ${
              isHovering ? 'opacity-100' : 'opacity-0'
            }`}
          />
        )}

        {/* Vignette Overlay */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-black/30" />

        {/* Top Badges */}
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between gap-2">
          <span className="rounded-full border border-white/15 bg-black/65 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-canvas backdrop-blur-sm">
            {video.category}
          </span>
          <span className="rounded-full bg-black/70 px-2.5 py-1 font-mono text-[10px] text-lime backdrop-blur-sm">
            {video.sourceType.toUpperCase()} · {video.duration}
          </span>
        </div>

        {/* Play Button */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-white/25 bg-black/60 text-canvas backdrop-blur-md transition-all duration-300 group-hover:scale-110 group-hover:border-lime group-hover:bg-lime group-hover:text-obsidian">
            <Play className="h-5 w-5 translate-x-0.5 fill-current" />
          </span>
        </div>

        {/* Desktop Hover Prompt */}
        {canHover && previewSrc && (
          <span className="pointer-events-none absolute bottom-3 left-4 font-mono text-[10px] uppercase tracking-[0.2em] text-white/75 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
            {isHovering ? 'Previewing Motion — Click for Full Player' : 'Hover to Preview'}
          </span>
        )}
      </button>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-5">
        <div>
          <div className="mb-2 flex items-center justify-between gap-2">
            <span className="font-mono text-[10px] uppercase tracking-widest text-lime">
              {video.isSample ? 'Concept Preview' : 'Featured Reel'}
            </span>
            <span className="font-mono text-[10px] text-muted-light">
              #{String(index + 1).padStart(2, '0')}
            </span>
          </div>
          <h3 className="font-display text-lg font-semibold leading-snug text-canvas transition-colors group-hover:text-lime">
            {video.title}
          </h3>
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-light">
            {video.description}
          </p>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3.5">
          <div className="flex flex-wrap gap-1.5">
            {video.tools?.map((tool) => (
              <span
                key={tool}
                className="border border-white/10 bg-white/5 px-2.5 py-0.5 font-mono text-[10px] text-white/75"
              >
                {tool}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => onSelect(video)}
            className="font-mono text-[11px] uppercase tracking-wider text-lime hover:underline"
          >
            Watch Preview
          </button>
        </div>
      </div>
    </motion.article>
  );
}
