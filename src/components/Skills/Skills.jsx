'use client';

import { useEffect } from 'react';
import styles from './Skills.module.css';
import { 
  FaReact, FaNode, FaPython, FaGit, FaDocker, FaGithub, FaHtml5, FaDatabase, FaJs, FaCode
} from 'react-icons/fa';
import {
  SiNextdotjs, SiTypescript, SiTailwindcss, SiExpress, SiMongodb, 
  SiPostgresql, SiMysql, SiFirebase, SiGraphql, SiRedis
} from 'react-icons/si';

const skills = [
  {
    category: 'Frontend Development',
    items: [
      { name: 'React', icon: <FaReact /> },
      { name: 'Next.js', icon: <SiNextdotjs /> },
      { name: 'JavaScript', icon: <FaJs /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
      { name: 'Tailwind CSS', icon: <SiTailwindcss /> },
    ],
  },
  {
    category: 'Backend Development',
    items: [
      { name: 'Node.js', icon: <FaNode /> },
      { name: 'Express.js', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <SiMongodb /> },
      { name: 'PostgreSQL', icon: <SiPostgresql /> },
      { name: 'Python', icon: <FaPython /> },
    ],
  },
  {
    category: 'Tools & Technologies',
    items: [
      { name: 'Git', icon: <FaGit /> },
      { name: 'Docker', icon: <FaDocker /> },
      { name: 'VS Code', icon: <FaCode /> },
      { name: 'GitHub', icon: <FaGithub /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
    ],
  },
  {
    category: 'Databases & APIs',
    items: [
      { name: 'MySQL', icon: <SiMysql /> },
      { name: 'Firebase', icon: <SiFirebase /> },
      { name: 'REST API', icon: <FaDatabase /> },
      { name: 'GraphQL', icon: <SiGraphql /> },
      { name: 'Redis', icon: <SiRedis /> },
    ],
  },
];

export default function Skills() {
  useEffect(() => {
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

    document.querySelectorAll(`.${styles.skillItem}`).forEach((el) => {
      observer.observe(el);
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
              <div className={styles.skillsItemGrid}>
                {category.items.map((skill, skillIndex) => (
                  <div key={skillIndex} className={styles.skillItem}>
                    <div className={styles.skillIconWrapper}>
                      <div className={styles.skillIcon}>
                        {skill.icon}
                      </div>
                    </div>
                    <h4 className={styles.skillName}>{skill.name}</h4>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
