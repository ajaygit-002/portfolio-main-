'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';
import { FaGithub, FaLinkedin, FaTwitter, FaPalette } from 'react-icons/fa';

const colors = [
  { 
    name: 'Dark', 
    value: '#050816', 
    accent: '#8b5cf6',
    secondary: '#0f1629',
    text: '#ffffff'
  },
  { 
    name: 'White', 
    value: '#ffffff', 
    accent: '#8b5cf6',
    secondary: '#f8fafc',
    text: '#050816'
  },
  { 
    name: 'Navy', 
    value: '#0f172a', 
    accent: '#3b82f6',
    secondary: '#1e293b',
    text: '#ffffff'
  },
  { 
    name: 'Slate', 
    value: '#1e293b', 
    accent: '#8b5cf6',
    secondary: '#334155',
    text: '#ffffff'
  },
  { 
    name: 'Charcoal', 
    value: '#0f0f1a', 
    accent: '#a78bfa',
    secondary: '#1a1a2e',
    text: '#ffffff'
  },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isColorMenuOpen, setIsColorMenuOpen] = useState(false);
  const [selectedColor, setSelectedColor] = useState(colors[0]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleColorChange = (color) => {
    setSelectedColor(color);
    
    // Apply all color theme variables
    const root = document.documentElement;
    root.style.setProperty('--bg-primary', color.value);
    root.style.setProperty('--bg-secondary', color.secondary);
    root.style.setProperty('--accent-primary', color.accent);
    root.style.setProperty('--text-primary', color.text);
    
    // Update card background based on theme
    if (color.name === 'White') {
      root.style.setProperty('--card-bg', 'rgba(248, 250, 252, 0.75)');
      root.style.setProperty('--text-secondary', '#475569');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-glow', 'rgba(0, 0, 0, 0.05)');
    } else {
      root.style.setProperty('--card-bg', 'rgba(17, 25, 40, 0.75)');
      root.style.setProperty('--text-secondary', '#94a3b8');
      root.style.setProperty('--text-muted', '#64748b');
      root.style.setProperty('--border-glow', 'rgba(255, 255, 255, 0.1)');
    }
    
    // Save to localStorage
    localStorage.setItem('portfolioTheme', JSON.stringify(color));
    setIsColorMenuOpen(false);
  };

  useEffect(() => {
    const saved = localStorage.getItem('portfolioTheme');
    if (saved) {
      try {
        const color = JSON.parse(saved);
        setSelectedColor(color);
        
        // Apply saved theme
        const root = document.documentElement;
        root.style.setProperty('--bg-primary', color.value);
        root.style.setProperty('--bg-secondary', color.secondary);
        root.style.setProperty('--accent-primary', color.accent);
        root.style.setProperty('--text-primary', color.text);
        
        if (color.name === 'White') {
          root.style.setProperty('--card-bg', 'rgba(248, 250, 252, 0.75)');
          root.style.setProperty('--text-secondary', '#475569');
          root.style.setProperty('--text-muted', '#64748b');
          root.style.setProperty('--border-glow', 'rgba(0, 0, 0, 0.05)');
        } else {
          root.style.setProperty('--card-bg', 'rgba(17, 25, 40, 0.75)');
          root.style.setProperty('--text-secondary', '#94a3b8');
          root.style.setProperty('--text-muted', '#64748b');
          root.style.setProperty('--border-glow', 'rgba(255, 255, 255, 0.1)');
        }
      } catch (error) {
        console.error('Theme error:', error);
      }
    }
  }, []);

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Blog', href: '#blog' },
    { label: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e) => {
    const href = e.currentTarget.getAttribute('href');
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`${styles.navbar} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.logo}>
          {'<AS/>'}
        </Link>

        <ul className={`${styles.navLinks} ${isMenuOpen ? styles.open : ''}`}>
          {navItems.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className={styles.navLink}
                onClick={handleNavClick}
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className={styles.navIcons}>
          <div className={styles.colorPicker}>
            <button
              className={styles.colorButton}
              onClick={() => setIsColorMenuOpen(!isColorMenuOpen)}
              aria-label="Color options"
            >
              <FaPalette />
            </button>
            {isColorMenuOpen && (
              <div className={styles.colorMenu}>
                {colors.map((color) => (
                  <button
                    key={color.name}
                    className={`${styles.colorOption} ${selectedColor.name === color.name ? styles.active : ''}`}
                    onClick={() => handleColorChange(color)}
                    title={color.name}
                  >
                    <span 
                      className={styles.colorPreview}
                      style={{ 
                        backgroundColor: color.value,
                        border: color.name === 'White' ? '2px solid #e5e7eb' : '2px solid transparent'
                      }}
                    />
                    <span className={styles.colorLabel}>{color.name}</span>
                    {selectedColor.name === color.name && <span className={styles.checkmark}>✓</span>}
                  </button>
                ))}
              </div>
            )}
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="GitHub"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="LinkedIn"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.iconButton}
            aria-label="Twitter"
          >
            <FaTwitter />
          </a>
        </div>

        <button
          className={`${styles.hamburger} ${isMenuOpen ? styles.active : ''}`}
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
