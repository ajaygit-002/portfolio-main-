'use client';

import { useEffect, useRef } from 'react';
import styles from './Skills.module.css';

const skills = [
  {
    category: 'Frontend Development',
    items: [
      { name: 'React', percentage: 90 },
      { name: 'Next.js', percentage: 85 },
      { name: 'JavaScript', percentage: 92 },
      { name: 'CSS/SCSS', percentage: 88 },
      { name: 'Tailwind CSS', percentage: 87 },
    ],
  },
  {
    category: 'Backend Development',
    items: [
      { name: 'Node.js', percentage: 85 },
      { name: 'Express.js', percentage: 82 },
      { name: 'MongoDB', percentage: 80 },
      { name: 'PostgreSQL', percentage: 78 },
      { name: 'REST APIs', percentage: 85 },
    ],
  },
  {
    category: 'Programming Languages',
    items: [
      { name: 'JavaScript', percentage: 92 },
      { name: 'Python', percentage: 80 },
      { name: 'TypeScript', percentage: 84 },
      { name: 'HTML5', percentage: 95 },
      { name: 'CSS3', percentage: 88 },
    ],
  },
  {
    category: 'Tools & Technologies',
    items: [
      { name: 'Git/GitHub', percentage: 88 },
      { name: 'Docker', percentage: 75 },
      { name: 'Jest', percentage: 78 },
      { name: 'VS Code', percentage: 95 },
      { name: 'Figma', percentage: 72 },
    ],
  },
];

export default function Skills() {
  const progressRefs = useRef([]);

  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const progressBar = entry.target;
          const targetWidth = progressBar.dataset.width;
          setTimeout(() => {
            progressBar.style.width = targetWidth;
          }, 100);
        }
      });
    }, observerOptions);

    progressRefs.current.forEach((ref) => {
      if (ref) observer.observe(ref);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="skills" className={styles.skills}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Skills & Expertise</h2>
          <p className={styles.sectionSubtitle}>Technologies & Tools I Master</p>
        </div>

        <div className={styles.skillsGrid}>
          {skills.map((category, categoryIndex) => (
            <div key={categoryIndex} className={styles.skillCategory}>
              <h3 className={styles.categoryTitle}>{category.category}</h3>
              {category.items.map((skill, skillIndex) => (
                <div key={skillIndex} className={styles.skillItem}>
                  <div className={styles.skillName}>
                    <span>{skill.name}</span>
                    <span className={styles.skillPercentage}>{skill.percentage}%</span>
                  </div>
                  <div className={styles.progressBarContainer}>
                    <div
                      ref={(el) => {
                        if (
                          el &&
                          !progressRefs.current.includes(el)
                        ) {
                          progressRefs.current.push(el);
                        }
                      }}
                      className={styles.progressBar}
                      style={{ width: '0%' }}
                      data-width={`${skill.percentage}%`}
                    />
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
