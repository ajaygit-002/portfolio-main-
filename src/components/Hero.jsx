'use client';

import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { HiArrowDown, HiDownload } from 'react-icons/hi';
import {
  SiReact, SiNodedotjs, SiNextdotjs, SiJavascript, SiPython,
} from 'react-icons/si';
import dynamic from 'next/dynamic';

const ParticleField = dynamic(() => import('./ParticleField'), { ssr: false });

const floatingIcons = [
  { Icon: SiReact, color: '#61DAFB', x: '10%', y: '20%', delay: 0 },
  { Icon: SiNodedotjs, color: '#339933', x: '85%', y: '15%', delay: 0.5 },
  { Icon: SiNextdotjs, color: '#ffffff', x: '75%', y: '70%', delay: 1.0 },
  { Icon: SiJavascript, color: '#F7DF1E', x: '15%', y: '75%', delay: 1.5 },
  { Icon: SiPython, color: '#3776AB', x: '90%', y: '45%', delay: 2.0 },
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 pt-20 pb-12 sm:px-6 md:pt-24"
    >
      {/* Gradient orbs */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute w-[500px] h-[500px] rounded-full opacity-20 blur-[120px] animated-gradient"
          style={{
            background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-mid))',
            top: '-10%',
            left: '-10%',
          }}
        />
        <div
          className="absolute w-[400px] h-[400px] rounded-full opacity-15 blur-[100px] animated-gradient"
          style={{
            background: 'linear-gradient(135deg, var(--gradient-mid), var(--gradient-end))',
            bottom: '-5%',
            right: '-5%',
            animationDelay: '4s',
          }}
        />
      </div>

      {/* Particle field */}
      <ParticleField />

      {/* Floating tech icons */}
      {floatingIcons.map(({ Icon, color, x, y, delay }, i) => (
        <motion.div
          key={i}
          className="absolute hidden md:block z-10 opacity-30"
          style={{ left: x, top: y }}
          animate={{
            y: [0, -15, 5, -10, 0],
            rotate: [0, 5, -3, 2, 0],
          }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay,
            ease: 'easeInOut',
          }}
        >
          <Icon size={36} color={color} />
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 text-center w-full max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-xs sm:text-sm md:text-base font-medium tracking-[0.22em] uppercase mb-4"
            style={{ color: 'var(--accent)' }}
          >
            Welcome to my portfolio
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-5 md:mb-6"
        >
          Hi, I&apos;m{' '}
          <span className="gradient-text">Ajay S</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-xl sm:text-2xl md:text-3xl font-semibold mb-6 md:mb-8"
          style={{ color: 'var(--text-secondary)' }}
        >
          <TypeAnimation
            sequence={[
              'Full Stack Developer', 2000,
              'React Developer', 2000,
              'Problem Solver', 2000,
              'Tech Enthusiast', 2000,
              'Computer Science Student', 2000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-sm sm:text-base md:text-lg max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed"
          style={{ color: 'var(--text-muted)' }}
        >
          Passionate about building cutting-edge web applications with modern
          technologies. Turning ideas into elegant, performant digital experiences.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            onClick={(e) => {
              e.preventDefault();
              document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="group relative w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl"
            style={{
              background:
                'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            }}
          >
            <span className="relative z-10 flex items-center gap-2">
              View Projects
              <HiArrowDown className="group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>

          <a
            href="/resume.pdf"
            download
            className="group w-full sm:w-auto px-8 py-3.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 gradient-border"
            style={{
              color: 'var(--text-primary)',
              background: 'var(--bg-card)',
            }}
          >
            <span className="flex items-center gap-2">
              Download Resume
              <HiDownload className="group-hover:translate-y-0.5 transition-transform" />
            </span>
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div
          className="w-6 h-10 rounded-full flex justify-center pt-2"
          style={{ border: '2px solid var(--border-color)' }}
        >
          <motion.div
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: 'var(--accent)' }}
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </section>
  );
}
