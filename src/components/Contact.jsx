'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import SectionWrapper, { SectionTitle } from './SectionWrapper';
import {
  HiMail, HiUser, HiChat, HiPaperAirplane,
} from 'react-icons/hi';
import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';

const socials = [
  { icon: <SiGithub size={20} />, label: 'GitHub', href: 'https://github.com', color: '#fff' },
  { icon: <FaLinkedinIn size={20} />, label: 'LinkedIn', href: 'https://linkedin.com', color: '#0A66C2' },
  { icon: <FaXTwitter size={20} />, label: 'Twitter', href: 'https://twitter.com', color: '#1DA1F2' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <SectionWrapper id="contact">
      <SectionTitle
        title="Get In Touch"
        subtitle="Have a project in mind or want to collaborate? Let's talk!"
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
        {/* Form */}
        <motion.form
          onSubmit={submit}
          className="glass rounded-2xl p-8 space-y-5"
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Name */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              <HiUser size={14} style={{ color: 'var(--accent)' }} /> Name
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handle}
              required
              placeholder="Your name"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                '--tw-ring-color': 'var(--accent)',
              }}
            />
          </div>

          {/* Email */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              <HiMail size={14} style={{ color: 'var(--accent)' }} /> Email
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handle}
              required
              placeholder="your@email.com"
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 focus:ring-2"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                '--tw-ring-color': 'var(--accent)',
              }}
            />
          </div>

          {/* Message */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium mb-2" style={{ color: 'var(--text-secondary)' }}>
              <HiChat size={14} style={{ color: 'var(--accent)' }} /> Message
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handle}
              required
              rows={5}
              placeholder="Tell me about your project..."
              className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all duration-300 resize-none focus:ring-2"
              style={{
                background: 'var(--bg-secondary)',
                color: 'var(--text-primary)',
                border: '1px solid var(--border-color)',
                '--tw-ring-color': 'var(--accent)',
              }}
            />
          </div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-full py-3.5 rounded-xl font-semibold text-white flex items-center justify-center gap-2 transition-all duration-300"
            style={{
              background: submitted
                ? '#10b981'
                : 'linear-gradient(135deg, var(--gradient-start), var(--gradient-end))',
            }}
          >
            {submitted ? (
              <>✓ Message Sent!</>
            ) : (
              <>
                Send Message
                <HiPaperAirplane size={16} className="rotate-90" />
              </>
            )}
          </motion.button>
        </motion.form>

        {/* Info + Socials */}
        <motion.div
          className="flex flex-col justify-center"
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold mb-4" style={{ color: 'var(--text-primary)' }}>
            Let&apos;s Build Something{' '}
            <span className="gradient-text">Amazing</span> Together
          </h3>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--text-secondary)' }}>
            I&apos;m always open to discussing new projects, creative ideas, or
            opportunities to be part of your vision. Feel free to reach out
            through the form or connect with me on social media.
          </p>

          <div className="flex items-center gap-4">
            {socials.map((s, i) => (
              <motion.a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl glass flex items-center justify-center transition-all duration-300 hover:scale-110"
                style={{ color: s.color }}
                whileHover={{ y: -3 }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                aria-label={s.label}
              >
                {s.icon}
              </motion.a>
            ))}
          </div>

          <div className="mt-8 glass rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <HiMail size={18} style={{ color: 'var(--accent)' }} />
              <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
                ajays.dev@email.com
              </span>
            </div>
            <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
              Usually responds within 24 hours
            </p>
          </div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
