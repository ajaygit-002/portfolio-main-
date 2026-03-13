'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import {
  SiReact, SiNextdotjs, SiHtml5, SiCss, SiTailwindcss,
  SiNodedotjs, SiExpress,
  SiJavascript, SiPython, SiTypescript,
  SiGit, SiGithub,
} from 'react-icons/si';
import { HiServer, HiCode } from 'react-icons/hi';

const categories = [
  {
    title: 'Frontend Development',
    skills: [
      { name: 'React', icon: <SiReact />, color: '#61DAFB', level: 90 },
      { name: 'Next.js', icon: <SiNextdotjs />, color: '#fff', level: 85 },
      { name: 'HTML5', icon: <SiHtml5 />, color: '#E34F26', level: 95 },
      { name: 'CSS3', icon: <SiCss />, color: '#1572B6', level: 90 },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4', level: 88 },
    ],
  },
  {
    title: 'Backend Development',
    skills: [
      { name: 'Node.js', icon: <SiNodedotjs />, color: '#339933', level: 82 },
      { name: 'Express', icon: <SiExpress />, color: '#fff', level: 78 },
      { name: 'REST APIs', icon: <HiServer />, color: '#818cf8', level: 80 },
    ],
  },
  {
    title: 'Programming Languages',
    skills: [
      { name: 'JavaScript', icon: <SiJavascript />, color: '#F7DF1E', level: 92 },
      { name: 'Python', icon: <SiPython />, color: '#3776AB', level: 80 },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6', level: 75 },
    ],
  },
  {
    title: 'Tools & Technologies',
    skills: [
      { name: 'Git', icon: <SiGit />, color: '#F05032', level: 85 },
      { name: 'GitHub', icon: <SiGithub />, color: '#fff', level: 88 },
      { name: 'VS Code', icon: <HiCode />, color: '#007ACC', level: 90 },
    ],
  },
];

export default function Skills() {
  return (
    <SectionWrapper id="skills">
      <SectionTitle
        title="Technical Skills"
        subtitle="Technologies and tools I use to bring ideas to life."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {categories.map((cat, ci) => (
          <motion.div
            key={cat.title}
            className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02]"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: ci * 0.1 }}
          >
            <h3 className="text-lg font-bold mb-5 gradient-text inline-block">
              {cat.title}
            </h3>

            <div className="space-y-4">
              {cat.skills.map((skill, si) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: ci * 0.1 + si * 0.05 }}
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2.5">
                      <span style={{ color: skill.color, fontSize: '1.2rem' }}>
                        {skill.icon}
                      </span>
                      <span
                        className="text-sm font-medium"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {skill.name}
                      </span>
                    </div>
                    <span
                      className="text-xs font-semibold"
                      style={{ color: 'var(--text-muted)' }}
                    >
                      {skill.level}%
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div
                    className="h-2 rounded-full overflow-hidden"
                    style={{ background: 'var(--bg-secondary)' }}
                  >
                    <motion.div
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${skill.color}, var(--gradient-end))`,
                      }}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: ci * 0.1 + si * 0.08, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
