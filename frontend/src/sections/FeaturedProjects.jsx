import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import ProjectCard from '../components/ProjectCard';
import ProjectScrollScene from '../components/ProjectScrollScene';
import SectionHeading from '../components/SectionHeading';
import { PROJECTS } from '../data/projects';

const FEATURED_FILTERS = [
  'All',
  'Game Development',
  'Metaverse Environments',
  'Virtual Reality',
  'Augmented Reality',
  '3D Interactive Worlds',
  'Game UI',
];

export default function FeaturedProjects() {
  const [selectedCategory, setSelectedCategory] = useState('All');

  const filteredProjects = useMemo(() => {
    if (selectedCategory === 'All') return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.category === selectedCategory ||
        p.secondaryCategories?.includes(selectedCategory)
    );
  }, [selectedCategory]);

  return (
    <section id="works" className="relative bg-canvas py-24 text-obsidian md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        <SectionHeading
          watermark="PORTFOLIO"
          kicker="Concepts & Future Explorations"
          title="FEATURED PROJECTS"
          description="Concept explorations in gaming, metaverse, VR/AR, 3D worlds and game UI. AI-generated visuals illustrate creative directions, not completed projects."
          theme="light"
          align="center"
        />

        {/* Sample Content Disclosure + Filter Strip + View All Button (Dribbble Shot 2 Style) */}
        <div className="mb-12 flex flex-col gap-5 border-y border-black/10 py-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            {FEATURED_FILTERS.map((category) => {
              const active = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    active
                      ? 'bg-obsidian text-canvas'
                      : 'border border-black/10 bg-white text-muted hover:border-obsidian hover:text-obsidian'
                  }`}
                >
                  {category}
                </button>
              );
            })}
          </div>

          <Link
            to="/projects"
            className="group inline-flex w-fit shrink-0 items-center gap-2 rounded-full border border-black/15 bg-white px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-obsidian transition-all hover:border-obsidian hover:bg-lime"
          >
            <span>View All Work</span>
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Asymmetrical 2-Column Project Showcase Grid */}
        <div className="grid gap-x-10 gap-y-14 md:grid-cols-2">
          {filteredProjects.map((project, idx) => (
            <ProjectScrollScene key={project._id} index={idx}>
            <ProjectCard
              scrollScene
              project={project}
              index={idx}
              asymmetricOffset={idx % 2 === 1}
            />
            </ProjectScrollScene>
          ))}
        </div>
      </div>
    </section>
  );
}
