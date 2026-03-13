'use client';

import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import { HiClock, HiArrowRight } from 'react-icons/hi';

const posts = [
  {
    title: 'Building Scalable Apps with Next.js App Router',
    excerpt:
      'A deep dive into the Next.js App Router, server components, and how to structure large-scale applications for maximum performance.',
    tags: ['Next.js', 'React', 'Performance'],
    readTime: '8 min read',
    color: '#6366f1',
  },
  {
    title: 'Understanding JavaScript Closures & Scope',
    excerpt:
      'Closures are one of the most powerful features in JavaScript. Learn how they work under the hood and practical use cases in modern development.',
    tags: ['JavaScript', 'Concepts'],
    readTime: '6 min read',
    color: '#a855f7',
  },
  {
    title: 'Modern CSS Techniques Every Developer Should Know',
    excerpt:
      'From container queries to CSS grid subgrid, explore the latest CSS features that will transform how you build responsive layouts.',
    tags: ['CSS', 'Web Dev'],
    readTime: '5 min read',
    color: '#ec4899',
  },
  {
    title: 'Solving LeetCode: Two Pointer Technique Explained',
    excerpt:
      'A comprehensive guide to the two-pointer technique with step-by-step solutions to common interview problems and visual explanations.',
    tags: ['DSA', 'LeetCode', 'Interview'],
    readTime: '10 min read',
    color: '#10b981',
  },
];

export default function Blog() {
  return (
    <SectionWrapper id="blog">
      <SectionTitle
        title="Blog & Articles"
        subtitle="Sharing knowledge and insights from my development journey."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
        {posts.map((post, i) => (
          <motion.article
            key={i}
            className="glass rounded-2xl p-6 transition-all duration-300 hover:scale-[1.02] group cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 rounded-full font-medium"
                  style={{
                    background: `${post.color}15`,
                    color: post.color,
                    border: `1px solid ${post.color}25`,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <h3
              className="text-lg font-bold mb-2 group-hover:gradient-text transition-all duration-300"
              style={{ color: 'var(--text-primary)' }}
            >
              {post.title}
            </h3>

            <p
              className="text-sm leading-relaxed mb-4"
              style={{ color: 'var(--text-secondary)' }}
            >
              {post.excerpt}
            </p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <HiClock size={14} style={{ color: 'var(--text-muted)' }} />
                <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
                  {post.readTime}
                </span>
              </div>

              <span
                className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all duration-300"
                style={{ color: post.color }}
              >
                Read More
                <HiArrowRight size={14} />
              </span>
            </div>
          </motion.article>
        ))}
      </div>
    </SectionWrapper>
  );
}
