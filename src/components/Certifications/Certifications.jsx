'use client';

import styles from './Certifications.module.css';
import { FaExternalLinkAlt } from 'react-icons/fa';

const certifications = [
  {
    icon: '🎓',
    name: 'Full Stack Web Development',
    platform: 'Udemy',
    date: 'Completed Jan 2024',
    link: 'https://udemy.com',
  },
  {
    icon: '⚛️',
    name: 'React Complete Guide',
    platform: 'Coursera',
    date: 'Completed Feb 2024',
    link: 'https://coursera.com',
  },
  {
    icon: '📜',
    name: 'JavaScript Algorithms',
    platform: 'freeCodeCamp',
    date: 'Completed Mar 2024',
    link: 'https://freecodecamp.com',
  },
  {
    icon: '🚀',
    name: 'Next.js & TypeScript',
    platform: 'LinkedIn Learning',
    date: 'Completed Feb 2024',
    link: 'https://linkedin.com/learning',
  },
  {
    icon: '🗄️',
    name: 'Database Design',
    platform: 'Pluralsight',
    date: 'Completed Jan 2024',
    link: 'https://pluralsight.com',
  },
  {
    icon: '🔐',
    name: 'Web Security Masterclass',
    platform: 'Udemy',
    date: 'Completed Dec 2023',
    link: 'https://udemy.com',
  },
];

export default function Certifications() {
  return (
    <section id="certifications" className={styles.certifications}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Certifications</h2>
          <p className={styles.sectionSubtitle}>Professional Credentials</p>
        </div>

        <div className={styles.certificationsGrid}>
          {certifications.map((cert, index) => (
            <div key={index} className={styles.certCard}>
              <div className={styles.certIcon}>{cert.icon}</div>
              <h3 className={styles.certName}>{cert.name}</h3>
              <p className={styles.certPlatform}>{cert.platform}</p>
              <p className={styles.certDate}>{cert.date}</p>
              <a href={cert.link} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                View Certificate <FaExternalLinkAlt />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
