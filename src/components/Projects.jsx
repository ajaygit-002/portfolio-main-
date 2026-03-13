'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { HiExternalLink, HiCode } from 'react-icons/hi';
import { SiReact, SiNextdotjs, SiNodedotjs, SiTailwindcss, SiJavascript, SiPython } from 'react-icons/si';

const techIcons = {
  React: <SiReact />,
  'Next.js': <SiNextdotjs />,
  'Node.js': <SiNodedotjs />,
  'Tailwind CSS': <SiTailwindcss />,
  JavaScript: <SiJavascript />,
  Python: <SiPython />,
};

const projects = [
  {
    title: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce web app with product listings, cart management, user authentication, and payment integration.',
    tech: ['React', 'Node.js', 'Tailwind CSS'],
    image: '🛒',
    live: '#',
    github: '#',
    color: '#6366f1',
  },
  {
    title: 'AI Chat Application',
    description:
      'Real-time AI-powered chat application with intelligent responses, conversation history, and a sleek modern interface.',
    tech: ['Next.js', 'Python', 'Tailwind CSS'],
    image: '🤖',
    live: '#',
    github: '#',
    color: '#a855f7',
  },
  {
    title: 'Portfolio Dashboard',
    description:
      'Interactive personal dashboard for tracking projects, skills, and learning milestones with beautiful data visualizations.',
    tech: ['React', 'Tailwind CSS', 'JavaScript'],
    image: '📊',
    live: '#',
    github: '#',
    color: '#ec4899',
  },
  {
    title: 'Task Management App',
    description:
      'A collaborative task management tool with drag-and-drop interface, team management, and real-time updates.',
    tech: ['Next.js', 'Node.js', 'Tailwind CSS'],
    image: '✅',
    live: '#',
    github: '#',
    color: '#10b981',
  },
  {
    title: 'Weather Forecast App',
    description:
      'Beautiful weather application with location-based forecasts, interactive maps, and animated weather visualizations.',
    tech: ['React', 'JavaScript', 'Tailwind CSS'],
    image: '🌤️',
    live: '#',
    github: '#',
    color: '#f59e0b',
  },
  {
    title: 'Blog Platform',
    description:
      'Full-stack blogging platform with markdown support, SEO optimization, comment system, and content management.',
    tech: ['Next.js', 'Node.js', 'Tailwind CSS'],
    image: '📝',
    live: '#',
    github: '#',
    color: '#06b6d4',
  },
];

export default function Projects() {
  return (
    <SectionWrapper id="projects">
      <SectionTitle
        title="Featured Projects"
        subtitle="A selection of projects that showcase my skills and passion for development."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, i) => (
          <motion.div
            key={project.title}
            className="group glass rounded-2xl overflow-hidden transition-all duration-500 hover:scale-[1.03]"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            whileHover={{ y: -5 }}
          >
            {/* Image / Icon area */}
            <div
              className="h-48 flex items-center justify-center text-6xl relative overflow-hidden"
              style={{
                background: `linear-gradient(135deg, ${project.color}22, ${project.color}11)`,
              }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at center, ${project.color}30, transparent 70%)`,
                }}
              />
              <motion.span
                className="relative z-10"
                whileHover={{ scale: 1.2, rotate: 5 }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {project.image}
              </motion.span>
            </div>

            {/* Content */}
            <div className="p-6">
              <h3
                className="text-lg font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {project.title}
              </h3>
              <p
                className="text-sm leading-relaxed mb-4"
                style={{ color: 'var(--text-secondary)' }}
              >
                {project.description}
              </p>

              {/* Tech stack */}
              <div className="flex flex-wrap gap-2 mb-5">
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1 text-xs px-2.5 py-1 rounded-full font-medium"
                    style={{
                      background: `${project.color}15`,
                      color: project.color,
                      border: `1px solid ${project.color}30`,
                    }}
                  >
                    {techIcons[t] || null}
                    {t}
                  </span>
                ))}
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3">
                <a
                  href={project.live}
                  className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    background: `linear-gradient(135deg, ${project.color}, ${project.color}cc)`,
                    color: '#fff',
                  }}
                >
                  <HiExternalLink size={14} />
                  Live Demo
                </a>
                <a
                  href={project.github}
                  className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105"
                  style={{
                    border: `1px solid ${project.color}40`,
                    color: project.color,
                  }}
                >
                  <HiCode size={14} />
                  GitHub
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
