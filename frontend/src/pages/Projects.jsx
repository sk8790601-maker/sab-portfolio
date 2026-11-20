import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import { ArrowLeft, Search } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import SectionHeading from '../components/SectionHeading';
import { PROJECT_CATEGORIES, PROJECTS } from '../data/projects';

export default function Projects() {
  const prefersReduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return PROJECTS.filter((project) => {
      const matchesCat =
        activeCategory === 'All' ||
        project.category === activeCategory ||
        project.secondaryCategories?.includes(activeCategory);

      const matchesQuery =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.shortDescription.toLowerCase().includes(q) ||
        project.category.toLowerCase().includes(q);

      return matchesCat && matchesQuery;
    });
  }, [activeCategory, searchQuery]);

  return (
    <motion.main
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="min-h-screen bg-canvas pb-24 pt-28 text-obsidian md:pt-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <div className="mb-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-obsidian"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <SectionHeading
          watermark="ARCHIVE"
          kicker="Gaming & Metaverse Explorations"
          title="ALL PROJECTS"
          description="Browse gaming, virtual world, VR/AR and interactive concept studies. AI-generated imagery illustrates creative directions."
          theme="light"
          align="left"
        />

        {/* Search + Category Filters */}
        <div className="mb-10 space-y-5 border-y border-black/10 py-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search projects by title or focus..."
              aria-label="Search projects"
              className="w-full rounded-full border border-black/15 bg-white py-2.5 pl-11 pr-4 text-sm text-obsidian placeholder:text-muted focus:border-obsidian focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            {PROJECT_CATEGORIES.map((category) => {
              const active = activeCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setActiveCategory(category)}
                  className={`rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'bg-obsidian text-canvas'
                      : 'border border-black/12 bg-white text-muted hover:border-obsidian hover:text-obsidian'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length > 0 ? (
          <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
            {filtered.map((project, idx) => (
              <ProjectCard
                key={project._id}
                project={project}
                index={idx}
                asymmetricOffset={idx % 2 === 1}
              />
            ))}
          </div>
        ) : (
          <div className="border border-black/10 bg-alabaster p-12 text-center">
            <p className="font-display text-xl font-bold text-obsidian">
              No matching sample projects found.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 rounded-full bg-obsidian px-5 py-2.5 text-xs font-semibold text-canvas hover:bg-lime hover:text-obsidian"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </motion.main>
  );
}
