import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowUpRight, Layers } from 'lucide-react';
import ProjectImageReveal from './ProjectImageReveal';

export default function ProjectCard({ project, index = 0, asymmetricOffset = false, scrollScene = false }) {
  const prefersReduced = useReducedMotion();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.article
      initial={prefersReduced ? false : { opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.18 }}
      transition={{ duration: 0.6, delay: (index % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={`group relative ${asymmetricOffset ? 'md:mt-16' : ''}`}
    >
      <Link
        to={`/projects/${project.slug}`}
        data-cursor="view"
        data-cursor-label="CASE"
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-obsidian"
      >
        {/* Thumbnail Frame */}
        <div className="relative overflow-hidden border border-black/10 bg-alabaster">
          {/* Top-left sample/category badge matching Dribbble shot card tag */}
          <div className="absolute left-4 top-4 z-20 flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-white/95 px-3 py-1 font-mono text-[10px] font-medium uppercase tracking-wider text-obsidian shadow-sm backdrop-blur-sm">
              {project.isSample ? 'Concept Study' : project.category}
            </span>
          </div>

          {/* Center floating arrow icon appearing cleanly on hover (Dribbble style) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          >
            <span className="flex h-14 w-14 scale-75 items-center justify-center rounded-full bg-white text-obsidian shadow-floating transition-transform duration-300 group-hover:scale-100">
              <ArrowUpRight className="h-5 w-5" />
            </span>
          </div>

          <div className="aspect-[16/11] w-full overflow-hidden bg-alabaster">
            {!imgError ? (
              <div data-scroll-project-image={scrollScene ? '' : undefined} className="h-full w-full">
              <ProjectImageReveal className="h-full w-full">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} illustrative gaming concept thumbnail`}
                  loading="lazy"
                  onError={() => setImgError(true)}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
                />
              </ProjectImageReveal>
              </div>
            ) : (
              <div className="flex h-full w-full flex-col items-center justify-center gap-2 bg-charcoal text-canvas">
                <Layers className="h-8 w-8 text-lime" />
                <span className="font-mono text-xs uppercase tracking-widest text-muted-light">
                  {project.title}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Metadata & Title */}
        <div className="mt-5 flex items-start justify-between gap-4">
          <div className="space-y-2">
            <h3 className="font-display text-xl font-bold tracking-tight text-obsidian transition-colors group-hover:text-obsidian/75 sm:text-2xl">
              <span data-scroll-project-title={scrollScene ? '' : undefined} className="inline-block">{project.title}</span>
            </h3>
            <p className="line-clamp-2 max-w-xl text-sm leading-relaxed text-muted">
              <span data-scroll-project-description={scrollScene ? '' : undefined} className="block">{project.shortDescription}</span>
            </p>
          </div>
          <span className="mt-1 hidden shrink-0 font-mono text-xs text-muted sm:inline-block">
            {project.year}
          </span>
        </div>

        {/* Bottom Category Pills + View Project Link */}
        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-black/8 pt-4">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full border border-black/12 bg-white px-3.5 py-1 text-xs font-medium text-obsidian/80">
              {project.category}
            </span>
            {project.secondaryCategories?.[0] && (
              <span className="rounded-full border border-black/10 bg-alabaster px-3.5 py-1 text-xs font-medium text-muted">
                {project.secondaryCategories[0]}
              </span>
            )}
          </div>

          <span className="inline-flex items-center gap-1.5 font-mono text-xs font-medium uppercase tracking-wider text-obsidian transition-transform duration-300 group-hover:translate-x-1">
            <span>View Project</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
