// Neutral icon shared by the current technology exploration cards.
export default function ToolLogo({ className = 'h-10 w-10' }) {
  return (
        <div
          className={`inline-flex shrink-0 items-center justify-center rounded-[10px] bg-charcoal-elevated/90 p-1.5 ring-1 ring-white/10 ${className}`}
          aria-hidden="true"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" className="h-full w-full">
            <path d="M12 2 22 7.5v9L12 22 2 16.5v-9L12 2Z M2 7.5 12 13l10-5.5 M12 13v9" />
          </svg>
        </div>
  );
}
