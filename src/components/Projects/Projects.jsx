'use client';

import styles from './Projects.module.css';
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa';

const projects = [
  {
    icon: '🚀',
    title: 'E-Commerce Platform',
    description:
      'Full-stack e-commerce solution with real-time inventory management, payment integration, and advanced search features.',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    icon: '📱',
    title: 'Task Management App',
    description:
      'Collaborative task management application with real-time updates, team workspaces, and advanced scheduling features.',
    technologies: ['Next.js', 'Firebase', 'TypeScript'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    icon: '📊',
    title: 'Analytics Dashboard',
    description:
      'Data visualization dashboard with interactive charts, real-time metrics, and customizable widgets for business intelligence.',
    technologies: ['React', 'D3.js', 'Node.js', 'PostgreSQL'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    icon: '🎨',
    title: 'Design Portfolio',
    description:
      'Modern design showcase website featuring responsive layouts, smooth animations, and optimized performance.',
    technologies: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    icon: '🔐',
    title: 'Authentication System',
    description:
      'Secure authentication system with JWT, email verification, OAuth integration, and role-based access control.',
    technologies: ['Express.js', 'JWT', 'PostgreSQL', 'Redis'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
  {
    icon: '🤖',
    title: 'AI Chat Application',
    description:
      'Real-time chat application powered by AI, featuring message history, file sharing, and intelligent responses.',
    technologies: ['Next.js', 'WebSocket', 'OpenAI API', 'MongoDB'],
    demo: 'https://example.com',
    github: 'https://github.com',
  },
];

export default function Projects() {
  return (
    <section id="projects" className={styles.projects}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Featured Projects</h2>
          <p className={styles.sectionSubtitle}>Explore My Latest Work</p>
        </div>

        <div className={styles.projectsGrid}>
          {projects.map((project, index) => (
            <div key={index} className={styles.projectCard}>
              <div className={styles.projectIcon}>{project.icon}</div>
              <h3 className={styles.projectTitle}>{project.title}</h3>
              <p className={styles.projectDescription}>{project.description}</p>

              <div className={styles.techStack}>
                {project.technologies.map((tech, techIndex) => (
                  <span key={techIndex} className={styles.techTag}>
                    {tech}
                  </span>
                ))}
              </div>

              <div className={styles.projectButtons}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.projectLink} ${styles.demoButton}`}
                >
                  <FaExternalLinkAlt /> Demo
                </a>
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`${styles.projectLink} ${styles.githubButton}`}
                >
                  <FaGithub /> Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
