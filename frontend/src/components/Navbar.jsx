import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { PROJECTS } from '../data/projects';

const NAV_LINKS = [
  { label: 'Home', target: 'hero', count: null },
  { label: 'About', target: 'about', count: null },
  { label: 'Projects', target: 'works', count: String(PROJECTS.length).padStart(2, '0') },
  { label: 'Skills', target: 'skills', count: null },
  { label: 'Contact', target: 'contact', count: null },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const prefersReduced = useReducedMotion();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 28);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (targetId) => {
    setMobileOpen(false);
    if (location.pathname !== '/') {
      navigate(`/#${targetId}`);
      return;
    }
    const el = document.getElementById(targetId);
    if (el) {
      el.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'border-b border-black/10 bg-canvas/90 py-3.5 backdrop-blur-md'
            : 'bg-transparent py-5 md:py-6'
        }`}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 md:px-10">
          {/* Brand Identity + Availability Status Pill */}
          <div className="flex items-center gap-3.5">
            <Link
              to="/"
              onClick={() => handleNavClick('hero')}
              className="group flex items-center gap-2 font-display text-base font-bold tracking-[0.06em] text-obsidian sm:text-lg"
            >
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-obsidian text-xs font-bold text-canvas transition-colors group-hover:bg-lime group-hover:text-obsidian">
                S.
              </span>
              <span>SABARI P.</span>
            </Link>

            <div className="hidden items-center gap-2 rounded-full border border-black/10 bg-white px-3 py-1.5 shadow-sm lg:inline-flex">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-xs font-medium text-obsidian/80">
                Available for New Project
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links with Index Counters */}
          <nav aria-label="Main navigation" className="hidden items-center gap-8 md:flex">
            {NAV_LINKS.map((item) => (
              <button
                key={item.target}
                type="button"
                onClick={() => handleNavClick(item.target)}
                className="group relative flex items-baseline gap-1 text-sm font-medium text-obsidian/80 transition-colors hover:text-obsidian"
              >
                <span>{item.label}</span>
                {item.count && (
                  <span className="font-mono text-[10px] text-muted transition-colors group-hover:text-obsidian">
                    [{item.count}]
                  </span>
                )}
                <span className="absolute -bottom-1 left-0 h-[1.5px] w-0 bg-obsidian transition-all duration-300 group-hover:w-full" />
              </button>
            ))}
          </nav>

          {/* Right CTA + Mobile Trigger */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleNavClick('contact')}
              className="group hidden items-center gap-2 rounded-full bg-obsidian px-5 py-2.5 text-sm font-medium text-canvas transition-all duration-300 hover:bg-lime hover:text-obsidian sm:inline-flex"
            >
              <span>Let&apos;s Talk</span>
              <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/15 bg-white text-obsidian transition-colors hover:bg-obsidian hover:text-canvas md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Animated Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-drawer"
            initial={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '-8%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 0 } : { opacity: 0, y: '-8%' }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-between bg-obsidian px-6 pb-10 pt-24 text-canvas md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile Navigation"
          >
            <div>
              <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5">
                <span className="h-2 w-2 rounded-full bg-lime" />
                <span className="text-xs text-muted-light">Available for New Project</span>
              </div>

              <ul className="space-y-4">
                {NAV_LINKS.map((item, idx) => (
                  <motion.li
                    key={item.target}
                    initial={prefersReduced ? false : { opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + idx * 0.05 }}
                  >
                    <button
                      type="button"
                      onClick={() => handleNavClick(item.target)}
                      className="flex w-full items-baseline justify-between border-b border-white/10 pb-3 text-left font-display text-3xl font-bold tracking-tight transition-colors hover:text-lime"
                    >
                      <span>{item.label}</span>
                      <span className="font-mono text-xs text-lime">
                        {item.count ? `[${item.count}]` : `0${idx + 1}`}
                      </span>
                    </button>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div className="space-y-5">
              <button
                type="button"
                onClick={() => handleNavClick('contact')}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-lime px-6 py-4 font-display text-base font-bold text-obsidian"
              >
                <span>Let&apos;s Talk</span>
                <ArrowUpRight className="h-5 w-5" />
              </button>

              <div className="flex items-center justify-between text-xs text-muted-light">
                <span className="font-mono uppercase tracking-widest">
                  Think. Design. Experience.
                </span>
                <Link
                  to="/projects"
                  onClick={() => setMobileOpen(false)}
                  className="underline decoration-lime underline-offset-4 hover:text-lime"
                >
                  All Works
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
