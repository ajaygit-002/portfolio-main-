'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import styles from './Hero.module.css';
import { FaReact, FaNode, FaDatabase, FaCode } from 'react-icons/fa';

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
        <p className={styles.titleSmall}>Welcome to my portfolio</p>
        <h1 className={styles.title}>Hi, I'm Ajay S</h1>
        <p className={styles.subtitle}>Full Stack Developer & Computer Science Enthusiast</p>
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
