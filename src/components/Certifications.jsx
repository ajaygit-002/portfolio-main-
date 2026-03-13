'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { HiAcademicCap, HiCalendar, HiBadgeCheck } from 'react-icons/hi';

const certs = [
  {
    title: 'Full-Stack Web Development',
    platform: 'Udemy',
    date: 'August 2023',
    color: '#a855f7',
  },
  {
    title: 'React — The Complete Guide',
    platform: 'Coursera',
    date: 'June 2023',
    color: '#6366f1',
  },
  {
    title: 'JavaScript Algorithms & Data Structures',
    platform: 'freeCodeCamp',
    date: 'March 2023',
    color: '#10b981',
  },
  {
    title: 'Python for Data Science',
    platform: 'edX',
    date: 'January 2023',
    color: '#f59e0b',
  },
  {
    title: 'Responsive Web Design',
    platform: 'freeCodeCamp',
    date: 'November 2022',
    color: '#ec4899',
  },
  {
    title: 'Git & GitHub Masterclass',
    platform: 'Udemy',
    date: 'September 2022',
    color: '#06b6d4',
  },
];

export default function Certifications() {
  return (
    <SectionWrapper id="certifications">
      <SectionTitle
        title="Certifications"
        subtitle="Courses and certifications that have strengthened my technical expertise."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {certs.map((cert, i) => (
          <motion.div
            key={i}
            className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.04] group relative overflow-hidden"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
          >
            {/* Glow on hover */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: `radial-gradient(circle at 50% 0%, ${cert.color}15, transparent 70%)`,
              }}
            />

            <div className="relative z-10">
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{
                  background: `${cert.color}15`,
                  border: `1px solid ${cert.color}30`,
                  color: cert.color,
                }}
              >
                <HiBadgeCheck size={24} />
              </div>

              <h3
                className="text-base font-bold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {cert.title}
              </h3>

              <div className="flex items-center gap-1.5 mb-1">
                <HiAcademicCap size={14} style={{ color: cert.color }} />
                <span className="text-sm font-medium" style={{ color: cert.color }}>
                  {cert.platform}
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <HiCalendar size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {cert.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
