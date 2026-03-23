import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Skills from "@/components/Skills/Skills";
import Projects from "@/components/Projects/Projects";
import Experience from "@/components/Experience/Experience";
import Certifications from "@/components/Certifications/Certifications";
import Blog from "@/components/Blog/Blog";
import Contact from "@/components/Contact/Contact";
import AIAssistant from "@/components/AIAssistant/AIAssistant";
import ScrollReveal from "@/components/ScrollReveal/ScrollReveal";

export default function Home() {
  return (
    <>
      <AIAssistant />
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

      <div className="section-shell alt">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <About />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fadeUp" delay={0.1}>
        <Skills />
      </ScrollReveal>

      <div className="section-shell alt">
        <ScrollReveal variant="scaleUp" delay={0.1}>
          <Projects />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="fadeLeft" delay={0.1}>
        <Experience />
      </ScrollReveal>

      <div className="section-shell alt">
        <ScrollReveal variant="fadeRight" delay={0.1}>
          <Certifications />
        </ScrollReveal>
      </div>

      <ScrollReveal variant="blurIn" delay={0.1}>
        <Blog />
      </ScrollReveal>

      <div className="section-shell alt">
        <ScrollReveal variant="fadeUp" delay={0.1}>
          <Contact />
        </ScrollReveal>
      </div>
    </>
  );
}
