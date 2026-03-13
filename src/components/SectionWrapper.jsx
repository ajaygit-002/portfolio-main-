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
        className="content-shell"
      >
        {children}
      </motion.div>
    </section>
  );
}

export function SectionTitle({ title, subtitle }) {
  return (
    <div className="text-center mb-12 md:mb-14">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 gradient-text inline-block leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-secondary)] text-base md:text-lg max-w-2xl mx-auto leading-relaxed px-2">
          {subtitle}
        </p>
      )}
    </div>
  );
}
