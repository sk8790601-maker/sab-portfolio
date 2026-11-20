import { ArrowUp, ArrowUpRight, Dribbble, Globe, Layers, Linkedin } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import ScrollParagraphReveal from './ScrollParagraphReveal';

const FOOTER_NAV = [
  { label: 'Home', id: 'hero' },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'works' },
  { label: 'Experiences', id: 'videos' },
  { label: 'Skills', id: 'skills' },
  { label: 'Journey', id: 'process' },
  { label: 'Contact', id: 'contact' },
];

const SOCIALS = [
  { label: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble },
  { label: 'Behance', href: 'https://www.behance.net', icon: Layers },
  { label: 'LinkedIn', href: 'https://www.linkedin.com', icon: Linkedin },
  { label: 'Portfolio', href: 'https://dribbble.com/shots/26995447-Personal-Portfolio-Website-Animations', icon: Globe },
];

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollTo = (id) => {
    if (location.pathname !== '/') {
      navigate(`/#${id}`);
      return;
    }
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-white/10 bg-obsidian text-canvas">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-10 md:py-20">
        <div className="grid gap-12 border-b border-white/10 pb-14 md:grid-cols-12 md:items-end">
          <div className="md:col-span-6">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-lime">
              Think. Design. Experience.
            </p>
            <h2 className="mt-4 font-display text-4xl font-bold tracking-tightest sm:text-5xl md:text-6xl">
              SABARI <span className="text-outline-light">P.</span>
            </h2>
            <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-light">
              <ScrollParagraphReveal text="Exploring gaming, metaverse environments and immersive technologies. A space for virtual worlds, creative discovery and future interactive experiences." />
            </p>
          </div>

          <div className="md:col-span-6 md:flex md:flex-col md:items-end">
            <div className="flex flex-wrap gap-2.5">
              {SOCIALS.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={social.label}
                    className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-charcoal px-4 py-2 text-xs font-medium text-canvas/85 transition-all hover:border-lime hover:bg-lime hover:text-obsidian"
                  >
                    <Icon className="h-3.5 w-3.5" />
                    <span>{social.label}</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  </a>
                );
              })}
            </div>

            <button
              type="button"
              onClick={scrollToTop}
              className="group mt-8 inline-flex items-center gap-2.5 rounded-full border border-white/15 px-5 py-2.5 font-mono text-xs uppercase tracking-widest text-canvas transition-all hover:border-lime hover:text-lime"
            >
              <span>Back to Top</span>
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-white/10 transition-colors group-hover:bg-lime group-hover:text-obsidian">
                <ArrowUp className="h-3.5 w-3.5" />
              </span>
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-col justify-between gap-6 sm:flex-row sm:items-center">
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-2">
            {FOOTER_NAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleScrollTo(item.id)}
                className="text-xs font-medium text-muted-light transition-colors hover:text-lime"
              >
                {item.label}
              </button>
            ))}
          </nav>

          <p className="font-mono text-xs text-muted-light">
            © {new Date().getFullYear()} SABARI P. — Gaming &amp; Metaverse. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
