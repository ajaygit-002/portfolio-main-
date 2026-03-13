'use client';

import styles from './Experience.module.css';

const experiences = [
  {
    type: 'Internship',
    title: 'Junior Frontend Developer',
    organization: 'Tech Startup Inc.',
    year: '2023-2024',
    description:
      'Developed and maintained React components for the main application. Collaborated with designers to implement UI/UX improvements and optimized performance.',
  },
  {
    type: 'Hackathon',
    title: '1st Place Winner - AI Hackathon',
    organization: 'TechFest 2024',
    year: '2024',
    description:
      'Built an AI-powered web application that won first place among 50+ teams. Implemented machine learning integration and responsive design.',
  },
  {
    type: 'Open Source',
    title: 'Open Source Contributor',
    organization: 'Various Projects',
    year: '2023-Present',
    description:
      'Contributing to multiple open-source projects including React components and Node.js libraries. Merged 15+ pull requests.',
  },
  {
    type: 'Milestone',
    title: 'DSA Mastery',
    organization: 'Self-Learning',
    year: '2023',
    description:
      'Completed comprehensive data structures and algorithms course. Solved 500+ coding problems and achieved 5-star rating on competitive platforms.',
  },
];

export default function Experience() {
  return (
    <section id="experience" className={styles.experience}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Experience</h2>
          <p className={styles.sectionSubtitle}>My Professional Journey</p>
        </div>

        <div className={styles.timeline}>
          {experiences.map((item, index) => (
            <div key={index} className={styles.experienceItem}>
              <div className={styles.card}>
                <div className={styles.type}>{item.type}</div>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.organization}>{item.organization}</p>
                <p className={styles.year}>{item.year}</p>
                <p className={styles.description}>{item.description}</p>
              </div>
              <div className={styles.dot} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
