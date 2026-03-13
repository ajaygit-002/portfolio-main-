'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { HiBriefcase, HiLightningBolt, HiGlobe, HiBookOpen } from 'react-icons/hi';

const items = [
  {
    icon: <HiBriefcase size={20} />,
    type: 'Internship',
    title: 'Frontend Developer Intern',
    org: 'Tech Startup',
    period: 'Summer 2023',
    description:
      'Developed responsive web interfaces using React and Tailwind CSS. Collaborated with the design team to implement pixel-perfect UI components and improved page load performance by 30%.',
    color: '#6366f1',
  },
  {
    icon: <HiLightningBolt size={20} />,
    type: 'Hackathon',
    title: 'Smart India Hackathon',
    org: 'National Level',
    period: '2023',
    description:
      'Built an innovative solution for real-time data processing and visualization. Our team secured a top position among 500+ competing teams from across the country.',
    color: '#f59e0b',
  },
  {
    icon: <HiGlobe size={20} />,
    type: 'Open Source',
    title: 'Open Source Contributor',
    org: 'GitHub Community',
    period: '2022 – Present',
    description:
      'Actively contributed to open-source projects including UI component libraries and developer tools. Submitted bug fixes, documentation improvements, and feature enhancements.',
    color: '#10b981',
  },
  {
    icon: <HiBookOpen size={20} />,
    type: 'Milestone',
    title: '500+ DSA Problems Solved',
    org: 'LeetCode & GeeksforGeeks',
    period: '2022 – Present',
    description:
      'Strengthened algorithmic thinking and problem-solving skills by solving 500+ problems across multiple coding platforms, focusing on arrays, trees, graphs, and dynamic programming.',
    color: '#ec4899',
  },
];

export default function Experience() {
  return (
    <SectionWrapper id="experience">
      <SectionTitle
        title="Experience & Journey"
        subtitle="Key milestones and learning experiences that have shaped my development career."
      />

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical connector */}
        <div
          className="absolute left-6 md:left-8 top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(180deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
          }}
        />

        <div className="space-y-8">
          {items.map((item, i) => (
            <motion.div
              key={i}
              className="relative pl-16 md:pl-20"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
            >
              {/* Icon dot */}
              <div
                className="absolute left-0 md:left-2 w-12 h-12 rounded-full flex items-center justify-center z-10"
                style={{
                  background: `${item.color}20`,
                  border: `2px solid ${item.color}`,
                  color: item.color,
                }}
              >
                {item.icon}
              </div>

              {/* Card */}
              <div className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] group">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span
                    className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full"
                    style={{
                      background: `${item.color}15`,
                      color: item.color,
                      border: `1px solid ${item.color}30`,
                    }}
                  >
                    {item.type}
                  </span>
                  <span
                    className="text-xs font-medium"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    {item.period}
                  </span>
                </div>

                <h3
                  className="text-lg font-bold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p
                  className="text-sm font-medium mb-3"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.org}
                </p>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {item.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
}
