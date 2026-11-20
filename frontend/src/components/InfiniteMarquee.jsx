const MARQUEE_PHRASES = [
  'EXPLORE NEW WORLDS',
  'CREATE NEW REALITIES',
];

function MarqueeTrack({ hidden = false }) {
  const repeats = [0, 1, 2, 3];
  return (
    <div className="flex shrink-0 items-center" aria-hidden={hidden || undefined}>
      {repeats.map((rIdx) => (
        <div key={rIdx} className="flex shrink-0 items-center">
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-canvas sm:text-base md:text-lg">
            {MARQUEE_PHRASES[0]}{' '}
          </span>
          <span className="mx-5 text-base font-bold text-lime sm:mx-8 sm:text-lg md:text-xl">
            ✳{' '}
          </span>
          <span className="font-display text-sm font-bold uppercase tracking-[0.2em] text-canvas sm:text-base md:text-lg">
            {MARQUEE_PHRASES[1]}{' '}
          </span>
          <span className="mx-5 text-base font-bold text-lime sm:mx-8 sm:text-lg md:text-xl">
            ✳{' '}
          </span>
        </div>
      ))}
    </div>
  );
}

/**
 * Seamless infinite horizontal marquee strip matching the existing obsidian & neon-lime palette.
 * Respects prefers-reduced-motion via CSS media query in index.css.
 */
export default function InfiniteMarquee() {
  return (
    <div
      className="relative w-full overflow-hidden border-y border-white/10 bg-obsidian py-4 text-canvas sm:py-5"
      aria-label="EXPLORE NEW WORLDS ✳ CREATE NEW REALITIES ✳"
    >
      <div className="animate-marquee-track flex w-max">
        <MarqueeTrack />
        <MarqueeTrack hidden />
      </div>
    </div>
  );
}
