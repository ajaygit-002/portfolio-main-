'use client';

import { SiGithub } from 'react-icons/si';
import { FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { HiHeart } from 'react-icons/hi';

const links = [
  { icon: <SiGithub size={16} />, href: 'https://github.com', label: 'GitHub' },
  { icon: <FaLinkedinIn size={16} />, href: 'https://linkedin.com', label: 'LinkedIn' },
  { icon: <FaXTwitter size={16} />, href: 'https://twitter.com', label: 'Twitter' },
];

export default function Footer() {
  return (
    <footer
      className="py-8 px-4 text-center"
      style={{
        borderTop: '1px solid var(--border-color)',
        background: 'var(--bg-secondary)',
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-center gap-4 mb-4">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
                color: 'var(--text-secondary)',
              }}
              aria-label={l.label}
            >
              {l.icon}
            </a>
          ))}
        </div>

        <p className="text-sm flex items-center justify-center gap-1" style={{ color: 'var(--text-muted)' }}>
          Built with <HiHeart className="text-red-500" size={14} /> by{' '}
          <span className="gradient-text font-semibold">Ajay S</span>
          {' '}© {new Date().getFullYear()}
        </p>
      </div>
    </footer>
  );
}
