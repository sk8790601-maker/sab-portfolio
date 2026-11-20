import { motion, useReducedMotion } from 'framer-motion';
import InfiniteMarquee from '../components/InfiniteMarquee';
import Hero from '../sections/Hero';
import About from '../sections/About';
import FeaturedProjects from '../sections/FeaturedProjects';
import VideoShowcase from '../sections/VideoShowcase';
import Skills from '../sections/Skills';
import DesignProcess from '../sections/DesignProcess';
import Contact from '../sections/Contact';

export default function Home() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.main
      initial={false}
      animate={{ opacity: 1 }}
      exit={prefersReduced ? { opacity: 0 } : { opacity: 0 }}
      transition={{ duration: 0.25 }}
    >
      <Hero />
      <InfiniteMarquee />
      <About />
      <FeaturedProjects />
      <VideoShowcase />
      <Skills />
      <DesignProcess />
      <Contact />
    </motion.main>
  );
}
