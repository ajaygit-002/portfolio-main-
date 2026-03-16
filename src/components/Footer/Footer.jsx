'use client';

import styles from './Footer.module.css';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiLeetcode } from 'react-icons/si';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.socialLinks}>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://leetcode.com/"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.socialLink}
            aria-label="LeetCode"
          >
            <SiLeetcode />
          </a>
        </div>

        <div className={styles.divider} />

        <div className={styles.copyright}>
          <p>
            Built with <span className={styles.heart}>❤️</span> by Ajay S
            <span className={styles.year}> © {currentYear}</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
