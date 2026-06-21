import { Outlet, useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect } from "react";

// Routes where the user should land on the form, not the hero
const FORM_ROUTES = ["/apply", "/volunteer", "/contact"];

const ScrollManager = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // 1) Hash links (e.g. /#about) — scroll to the element with that id
    if (hash) {
      requestAnimationFrame(() => {
        const id = hash.replace("#", "");
        const el = document.getElementById(id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return;
    }

    // 2) Form pages — scroll past the PageHero to the first content section
    if (FORM_ROUTES.includes(pathname)) {
      requestAnimationFrame(() => {
        // Sections render in order: <PageHero> (section), then the form section.
        // Pick the second <section> on the page.
        const sections = document.querySelectorAll("main section");
        const target = sections[1] ?? sections[0];
        if (target) {
          const top = target.getBoundingClientRect().top + window.scrollY - 80;
          window.scrollTo({ top, behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, left: 0, behavior: "auto" });
        }
      });
      return;
    }

    // 3) Default — jump straight to the top instantly
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname, hash]);

  return null;
};

const Layout = () => {
  return (
    <div className="min-h-screen">
      <ScrollManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
