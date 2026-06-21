import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface RevealProps {
  children: React.ReactNode;
  staggerChildren?: boolean;
  className?: string;
}

export const Reveal = ({ children, staggerChildren = false, className = "" }: RevealProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      const elements = staggerChildren 
        ? gsap.utils.toArray(containerRef.current?.children || [])
        : [containerRef.current];

      gsap.fromTo(
        elements,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: staggerChildren ? 0.15 : 0,
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 85%",
            toggleActions: "play none none none"
          }
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [staggerChildren]);

  return (
    <div ref={containerRef} className={`reveal-container ${className}`}>
      {children}
    </div>
  );
};

export default Reveal;
