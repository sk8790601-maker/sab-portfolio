import { Link, useParams } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import {
  ArrowLeft,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';
import LetterReveal from '../components/LetterReveal';
import ProjectCard from '../components/ProjectCard';
import ProjectImageReveal from '../components/ProjectImageReveal';
import ScrollParagraphReveal from '../components/ScrollParagraphReveal';
import { getProjectBySlug, getRelatedProjects } from '../data/projects';

export default function ProjectDetails() {
  const { slug } = useParams();
  const prefersReduced = useReducedMotion();

  const project = getProjectBySlug(slug);
  const related = getRelatedProjects(project);

  if (!project) {
    return (
      <main className="flex min-h-[75vh] flex-col items-center justify-center bg-canvas px-6 pt-28 text-center text-obsidian">
        <p className="font-mono text-xs uppercase tracking-widest text-muted">404 / Not Found</p>
        <h1 className="mt-3 font-display text-4xl font-bold">Project Not Found</h1>
        <p className="mt-2 max-w-md text-sm text-muted">
          The requested project could not be located in the current portfolio dataset.
        </p>
        <Link
          to="/projects"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-obsidian px-6 py-3 text-sm font-semibold text-canvas hover:bg-lime hover:text-obsidian"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Browse All Works</span>
        </Link>
      </main>
    );
  }

  return (
    <motion.main
      initial={prefersReduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="bg-canvas pb-24 pt-28 text-obsidian md:pt-36"
    >
      <div className="mx-auto max-w-7xl px-5 md:px-10">
        {/* Top Back Navigation + Sample Notice */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted transition-colors hover:text-obsidian"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>All Featured Projects</span>
          </Link>

          <span className="rounded-full border border-black/15 bg-alabaster px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-obsidian">
            {project.isSample ? 'Concept Study' : project.category}
          </span>
        </div>

        {/* Project Hero Header */}
        <div className="border-b border-black/10 pb-10">
          <div className="flex flex-wrap gap-2">
            <span className="rounded-full bg-obsidian px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wider text-lime">
              {project.category}
            </span>
            {project.secondaryCategories?.map((cat) => (
              <span
                key={cat}
                className="rounded-full border border-black/12 bg-white px-3.5 py-1 font-mono text-[11px] uppercase tracking-wider text-muted"
              >
                {cat}
              </span>
            ))}
          </div>

          <h1 className="mt-5 font-display text-3xl font-extrabold tracking-tightest text-obsidian sm:text-5xl md:text-6xl">
            <LetterReveal text={project.title} trigger="mount" delay={0.12} />
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-relaxed text-muted md:text-lg">
            <ScrollParagraphReveal text={project.overview} />
          </p>

  
        </div>

        {/* Hero Mockup Image */}
        <div className="my-12 overflow-hidden border border-black/10 bg-alabaster">
          <ProjectImageReveal enableHoverZoom className="w-full">
            <img
              src={project.thumbnail}
              alt={project.title}
              className="aspect-[16/10] w-full object-cover"
            />
          </ProjectImageReveal>
        </div>

        {/* Problem Statement & Exploration Goals */}
        <div className="grid gap-10 border-b border-black/10 pb-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              01 / Challenge
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Problem Statement
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted md:text-base">
              <ScrollParagraphReveal text={project.problemStatement} />
            </p>
          </div>

          <div className="lg:col-span-7 lg:border-l lg:border-black/10 lg:pl-10">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
              02 / Objectives
            </p>
            <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
              Exploration Goals
            </h2>
            <ul className="mt-5 grid gap-4 sm:grid-cols-2">
              {project.designGoals.map((goal, idx) => (
                <li
                  key={goal}
                  className="border border-black/10 bg-alabaster p-4 text-sm leading-relaxed text-obsidian"
                >
                  <div className="mb-2 flex items-center gap-2 font-mono text-[11px] font-semibold text-muted">
                    <CheckCircle2 className="h-4 w-4 text-obsidian" />
                    <span>GOAL 0{idx + 1}</span>
                  </div>
                  {goal}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Planned Exploration Breakdown */}
        <div className="border-b border-black/10 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            03 / Execution
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Planned Exploration
          </h2>

          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {project.designProcess.map((step) => (
              <div
                key={step.phase}
                className="border border-black/10 bg-white p-6 transition-colors hover:border-obsidian"
              >
                <p className="font-mono text-xs font-semibold uppercase tracking-wider text-obsidian">
                  {step.phase}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-muted">{step.summary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Wireframes Showcase */}
        <div className="border-b border-black/10 py-16">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                04 / Structural Architecture
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                World Concepts &amp; Spatial Studies
              </h2>
            </div>
            <span className="font-mono text-xs text-muted">
              AI-Generated Concept Visuals
            </span>
          </div>

          <div className="overflow-hidden border border-black/12 bg-alabaster">
            <ProjectImageReveal enableHoverZoom className="w-full">
              <img
                src={project.wireframeImage}
                alt={`${project.title} illustrative environment concept`}
                loading="lazy"
                className="w-full object-cover"
              />
            </ProjectImageReveal>
          </div>
        </div>

        {/* Environment Concept Gallery & Gallery */}
        <div className="border-b border-black/10 py-16">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
            05 / Visual Direction
          </p>
          <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
            Environment Concept Gallery
          </h2>

          <div className="mt-8 space-y-10">
            {project.finalScreens.map((screen) => (
              <figure
                key={screen.caption}
                className="overflow-hidden border border-black/12 bg-alabaster"
              >
                <ProjectImageReveal enableHoverZoom className="w-full">
                  <img
                    src={screen.src}
                    alt={screen.caption}
                    loading="lazy"
                    className="w-full object-cover"
                  />
                </ProjectImageReveal>
                <figcaption className="border-t border-black/10 bg-white px-5 py-3 font-mono text-xs text-muted">
                  {screen.caption}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>

        {/* Related Projects */}
        <div className="pt-16">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                Continue Exploring
              </p>
              <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                Related Projects
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-obsidian hover:underline"
            >
              <span>All Projects</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {related.map((rel, idx) => (
              <ProjectCard key={rel._id} project={rel} index={idx} />
            ))}
          </div>
        </div>
      </div>

    </motion.main>
  );
}
