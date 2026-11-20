import { useLayoutEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/** Owns only the new scene layers, never existing Motion/GSAP targets.
 * Normal-flow wrappers preserve the grid and scroll length; no global scroll handlers.
 */
export default function ProjectScrollScene({ children, index = 0 }) {
  const root = useRef(null);

  useLayoutEffect(() => {
    const node = root.current;
    if (!node) return undefined;
    const media = gsap.matchMedia();
    media.add({
      desktop: '(min-width: 1024px)',
      tablet: '(min-width: 768px) and (max-width: 1023px)',
      mobile: '(max-width: 767px)',
      reduced: '(prefers-reduced-motion: reduce)',
    }, ({ conditions }) => {
      if (conditions.reduced) return;
      const small = conditions.mobile;
      const distance = small ? 10 : conditions.tablet ? 18 : 30;
      const direction = index % 2 ? 1 : -1;
      const layer = node.querySelector('[data-scroll-project-layer]');
      const image = node.querySelector('[data-scroll-project-image]');
      const title = node.querySelector('[data-scroll-project-title]');
      const description = node.querySelector('[data-scroll-project-description]');
      if (!layer || !image || !title || !description) return;
      const timeline = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          id: `featured-scene-${index}`,
          trigger: node,
          start: 'top bottom',
          end: 'bottom top',
          scrub: small ? 0.35 : 0.65,
          invalidateOnRefresh: true,
        },
      });
      timeline
        .fromTo(layer,
          { y: distance, x: small ? 0 : direction * 10 },
          { y: -distance, x: small ? 0 : -direction * 10, duration: 1 }, 0)
        .fromTo(image,
          { yPercent: index % 2 ? 2 : 3, scale: 0.98 },
          { yPercent: index % 2 ? -2 : -3, scale: 1, duration: 0.7 }, index % 2 ? 0.06 : 0)
        .fromTo(title,
          { y: small ? 8 : 14, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 0.25 }, 0.03)
        .fromTo(description,
          { y: small ? 6 : 12, opacity: 0.65 },
          { y: 0, opacity: 1, duration: 0.28 }, 0.08);
    }, node);
    // Refresh only our own triggers after lazy images settle, with full cleanup.
    const refreshScene = () => {
      ScrollTrigger.getById(`featured-scene-${index}`)?.refresh();
    };
    const images = [...node.querySelectorAll('img')];
    images.forEach(image => image.addEventListener('load', refreshScene));
    return () => {
      images.forEach(image => image.removeEventListener('load', refreshScene));
      media.revert();
    };
  }, [index]);

  return <div ref={root}><div data-scroll-project-layer>{children}</div></div>;
}
