import { useEffect, useRef, useState } from "react";
import { useLocation, useOutlet } from "react-router-dom";
import gsap from "gsap";

const FORM_ROUTES = ["/apply", "/volunteer", "/contact"];

const executeScrollLogic = (pathname: string, hash: string, isInstant: boolean) => {
  const behavior = isInstant ? "auto" : "smooth";
  
  if (hash) {
    const id = hash.replace("#", "");
    const el = document.getElementById(id);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    return;
  }

  if (FORM_ROUTES.includes(pathname)) {
    const sections = document.querySelectorAll("main section");
    const target = sections[1] ?? sections[0];
    if (target) {
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior });
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    }
    return;
  }

  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
};

export const AnimatedOutlet = () => {
  const location = useLocation();
  const currentOutlet = useOutlet();
  
  const [displayLocation, setDisplayLocation] = useState(location);
  const [displayOutlet, setDisplayOutlet] = useState(currentOutlet);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialRender = useRef(true);

  useEffect(() => {
    // Skip animation on first render, just run scroll logic
    if (isInitialRender.current) {
      isInitialRender.current = false;
      setTimeout(() => {
        executeScrollLogic(location.pathname, location.hash, true);
      }, 50);
      return;
    }

    if (location.pathname !== displayLocation.pathname) {
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setDisplayLocation(location);
        setDisplayOutlet(currentOutlet);
        setTimeout(() => {
            executeScrollLogic(location.pathname, location.hash, true);
        }, 50);
      } else {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 0.3,
          ease: "power2.inOut",
          onComplete: () => {
            setDisplayLocation(location);
            setDisplayOutlet(currentOutlet);
            
            // Wait a tick for the new route to render so document.querySelectorAll finds the new elements
            setTimeout(() => {
              executeScrollLogic(location.pathname, location.hash, true);
              
              gsap.to(containerRef.current, {
                opacity: 1,
                duration: 0.4,
                ease: "power2.out",
                clearProps: "all"
              });
            }, 50);
          }
        });
      }
    } else if (location.hash !== displayLocation.hash) {
      // Same page hash change
      setDisplayLocation(location);
      setTimeout(() => {
        executeScrollLogic(location.pathname, location.hash, false);
      }, 50);
    }
  }, [location.pathname, location.hash, currentOutlet, displayLocation.pathname, displayLocation.hash]);

  return (
    <div ref={containerRef}>
      {displayOutlet}
    </div>
  );
};

export default AnimatedOutlet;
