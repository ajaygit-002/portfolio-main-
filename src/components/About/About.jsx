'use client';

import { useEffect } from 'react';
import styles from './About.module.css';

export default function About() {
  useEffect(() => {
    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'slideUp 0.8s ease-out';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll(
      `.${styles.timelineItem}, .${styles.textContent}`
    );
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const timeline = [
    {
      year: '2021',
      label: 'Spark of Curiosity',
      description:
        'Started my journey into programming, discovering the power of code to solve real-world problems.',
    },
    {
      year: '2022',
      label: 'Computer Science Exploration',
      description:
        'Began my formal education in Computer Science, diving deep into fundamentals and algorithms.',
    },
    {
      year: '2023',
      label: 'Full Stack Development',
      description:
        'Discovered my passion for full-stack development, mastering React, Node.js, and modern frameworks.',
    },
    {
      year: '2024',
      label: 'Aspiring Professional',
      description:
        'Building production-grade applications and contributing to open-source projects.',
    },
  ];

  return (
    <section id="about" className={styles.about}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About Me</h2>
          <p className={styles.sectionSubtitle}>My Journey & Growth</p>
        </div>

        <div className={styles.content}>
          <div className={styles.textContent}>
            <p className={styles.aboutText}>
              I'm a passionate full-stack developer with a keen interest in creating beautiful,
              functional, and scalable web applications. My journey in tech has been driven by
              curiosity and a desire to build solutions that matter.
            </p>
            <p className={styles.aboutText}>
              With expertise in modern web technologies, I focus on delivering high-quality
              code and exceptional user experiences. I believe in continuous learning and
              staying updated with the latest industry trends.
            </p>
            <p className={styles.aboutText}>
              When I'm not coding, you'll find me contributing to open-source projects,
              writing technical blogs, or exploring new technologies.
            </p>
          </div>

          <div className={styles.timeline}>
            {timeline.map((item, index) => (
              <div key={index} className={styles.timelineItem}>
                <div className={styles.timelineYear}>{item.year}</div>
                <div className={styles.timelineLabel}>{item.label}</div>
                <p className={styles.timelineDescription}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
