'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';
import { HiSun, HiMoon, HiMenuAlt3, HiX } from 'react-icons/hi';

const navLinks = [
  { name: 'Home', href: '#home' },
  { name: 'About', href: '#about' },
  { name: 'Skills', href: '#skills' },
  { name: 'Projects', href: '#projects' },
  { name: 'Experience', href: '#experience' },
  { name: 'Certifications', href: '#certifications' },
  { name: 'Blog', href: '#blog' },
  { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' }
    );
    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMobileOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'glass shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <a href="#home" className="relative group" onClick={(e) => handleClick(e, '#home')}>
            <span className="text-xl md:text-2xl font-bold gradient-text">
              Ajay S
            </span>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] group-hover:w-full transition-all duration-300" />
          </a>

          {/* Desktop Links */}
          <div className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className="relative px-3 py-2 text-sm font-medium transition-colors duration-200 group"
                style={{
                  color: activeSection === link.href.slice(1)
                    ? 'var(--accent)'
                    : 'var(--text-secondary)',
                }}
              >
                {link.name}
                <span
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] transition-all duration-300 rounded-full"
                  style={{
                    width: activeSection === link.href.slice(1) ? '60%' : '0%',
                  }}
                />
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[var(--gradient-start)] to-[var(--gradient-end)] group-hover:w-[60%] transition-all duration-300 rounded-full" />
              </a>
            ))}
          </div>

          {/* Theme Toggle + Mobile Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl transition-all duration-300 hover:scale-110"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
              aria-label="Toggle theme"
            >
              <motion.div
                key={theme}
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {theme === 'dark' ? (
                  <HiSun size={18} color="var(--accent)" />
                ) : (
                  <HiMoon size={18} color="var(--accent)" />
                )}
              </motion.div>
            </button>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 rounded-xl transition-all duration-300"
              style={{
                background: 'var(--glass-bg)',
                border: '1px solid var(--glass-border)',
              }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? (
                <HiX size={20} color="var(--text-primary)" />
              ) : (
                <HiMenuAlt3 size={20} color="var(--text-primary)" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden overflow-hidden glass"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleClick(e, link.href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="block px-4 py-3 rounded-lg text-sm font-medium transition-all duration-200"
                  style={{
                    color:
                      activeSection === link.href.slice(1)
                        ? 'var(--accent)'
                        : 'var(--text-secondary)',
                    background:
                      activeSection === link.href.slice(1)
                        ? 'var(--glow-color)'
                        : 'transparent',
                  }}
                >
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
