import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Reusable GSAP ScrollTrigger hook respecting prefers-reduced-motion.
 * Automatically cleans up all contexts on unmount.
 */
export function useScrollAnimation(setupFn, deps = []) {
  const scopeRef = useRef(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced || !scopeRef.current) return undefined;

    const ctx = gsap.context(() => {
      if (typeof setupFn === 'function') {
        setupFn(gsap, ScrollTrigger, scopeRef.current);
      }
    }, scopeRef);

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return scopeRef;
}

export default useScrollAnimation;
