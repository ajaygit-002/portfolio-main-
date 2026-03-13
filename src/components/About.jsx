'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { HiAcademicCap, HiCode, HiLightBulb, HiStar } from 'react-icons/hi';

const timeline = [
  {
    icon: <HiLightBulb size={22} />,
    year: '2020',
    title: 'Spark of Curiosity',
    description:
      'Discovered the world of programming and fell in love with the idea of building things that live on the internet. Started learning HTML, CSS, and JavaScript.',
  },
  {
    icon: <HiAcademicCap size={22} />,
    year: '2021',
    title: 'Computer Science Journey Begins',
    description:
      'Enrolled in Computer Science, diving deep into data structures, algorithms, and software engineering fundamentals that form the bedrock of modern development.',
  },
  {
    icon: <HiCode size={22} />,
    year: '2022 – 2023',
    title: 'Full-Stack Exploration',
    description:
      'Built full-stack projects using React, Node.js, and Next.js. Participated in hackathons, contributed to open-source, and sharpened problem-solving skills on LeetCode.',
  },
  {
    icon: <HiStar size={22} />,
    year: '2024 – Present',
    title: 'Aspiring Professional',
    description:
      'Focused on mastering advanced web technologies, cloud services, and scalable architectures. Actively seeking opportunities to contribute to impactful projects.',
  },
];

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionTitle
        title="About Me"
        subtitle="A glimpse into my journey as a developer, student, and lifelong learner."
      />

      {/* Intro */}
      <motion.div
        className="max-w-3xl mx-auto text-center mb-16"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-lg leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
          I&apos;m <span className="gradient-text font-semibold">Ajay S</span>, a Computer Science
          student with a deep passion for crafting beautiful, high-performance web
          applications. I thrive at the intersection of design and engineering, and
          I&apos;m on a mission to build software that makes a real difference.
        </p>
      </motion.div>

      {/* Timeline */}
      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div
          className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px"
          style={{
            background:
              'linear-gradient(180deg, var(--gradient-start), var(--gradient-mid), var(--gradient-end))',
          }}
        />

        {timeline.map((item, i) => {
          const isLeft = i % 2 === 0;
          return (
            <motion.div
              key={i}
              className={`relative flex items-start mb-12 ${
                isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
              initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              {/* Dot on line */}
              <div
                className="absolute left-6 md:left-1/2 -translate-x-1/2 w-12 h-12 rounded-full flex items-center justify-center z-10 glow"
                style={{
                  background: 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
                  color: '#fff',
                }}
              >
                {item.icon}
              </div>

              {/* Card */}
              <div
                className={`ml-20 md:ml-0 md:w-[calc(50%-2.5rem)] glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] ${
                  isLeft ? 'md:mr-auto md:pr-8' : 'md:ml-auto md:pl-8'
                }`}
              >
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: 'var(--accent)' }}
                >
                  {item.year}
                </span>
                <h3
                  className="text-lg font-bold mt-1 mb-2"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </SectionWrapper>
  );
}
