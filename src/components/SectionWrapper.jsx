'use client';

import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function SectionWrapper({ children, id, className = '' }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id={id} ref={ref} className={`section-padding ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="max-w-7xl mx-auto"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-16">
      <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text inline-block">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-lg max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
