import Hero from "@/components/Hero";
import About from "@/components/About";
import Skills from "@/components/Skills";
import Projects from "@/components/Projects";
import Experience from "@/components/Experience";
import Certifications from "@/components/Certifications";
import Blog from "@/components/Blog";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Hero />

      {/* Wave divider */}
      <div className="wave-divider" style={{ marginTop: '-2px' }}>
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
          <path
            d="M0 40L48 36C96 32 192 24 288 28C384 32 480 48 576 52C672 56 768 48 864 40C960 32 1056 24 1152 28C1248 32 1344 48 1392 56L1440 64V80H1392C1344 80 1248 80 1152 80C1056 80 960 80 864 80C768 80 672 80 576 80C480 80 384 80 288 80C192 80 96 80 48 80H0V40Z"
            fill="var(--bg-secondary)"
          />
        </svg>
      </div>

      <div style={{ background: 'var(--bg-secondary)' }}>
        <About />
      </div>

      <Skills />

      <div style={{ background: 'var(--bg-secondary)' }}>
        <Projects />
      </div>

      <Experience />

      <div style={{ background: 'var(--bg-secondary)' }}>
        <Certifications />
      </div>

      <Blog />

      <div style={{ background: 'var(--bg-secondary)' }}>
        <Contact />
      </div>
    </>
  );
}
