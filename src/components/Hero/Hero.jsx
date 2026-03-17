'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import { FaReact, FaNode, FaDatabase, FaCode, FaEnvelope } from 'react-icons/fa';
import { TypeAnimation } from 'react-type-animation';

export default function Hero() {
  useEffect(() => {
    // Add fade-in animation to hero elements
    const container = document.querySelector(`.${styles.heroContent}`);
    if (container) {
      container.style.animation = 'fadeIn 0.8s ease-out';
    }
  }, []);

  return (
    <section id="hero" className={styles.hero}>
      <video
        autoPlay
        muted
        loop
        playsInline
        className={styles.videoBg}
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-abstract-technology-blue-lines-4137-large.mp4" type="video/mp4" />
      </video>
      <div className={styles.videoOverlay}></div>

      <div className={styles.floatingIcons}>
        <div className={styles.icon}>
          <FaReact />
        </div>
        <div className={styles.icon}>
          <FaNode />
        </div>
        <div className={styles.icon}>
          <FaDatabase />
        </div>
        <div className={styles.icon}>
          <FaCode />
        </div>
      </div>

      <div className={styles.heroContent}>
        <div className={styles.contentWrapper}>
          <p className={styles.titleSmall}>Welcome to my portfolio</p>
          <h1 className={styles.title}>Hi, I'm Ajay S</h1>
          <p className={styles.subtitle}>
            <TypeAnimation
              sequence={[
                'Full Stack Developer',
                2000,
                'Computer Science Enthusiast',
                2000,
                'Problem Solver',
                2000,
                'Software Engineer',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </p>
          <p className={styles.description}>
            I build modern web applications with cutting-edge technologies. Passionate about creating
            scalable, responsive, and user-friendly digital experiences that make an impact.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="#projects" className={styles.primaryButton}>
              View Projects
            </Link>
            <a href="/resume.pdf" className={styles.secondaryButton}>
              Download Resume
            </a>
            <Link href="#contact" className={styles.contactButton}>
              <FaEnvelope /> Contact Me
            </Link>
          </div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <svg viewBox="0 0 24 24">
          <path d="M12 2v16m0 6l-7-7m7 7l7-7" />
        </svg>
      </div>
    </section>
  );
}
