'use client';

import styles from './Blog.module.css';
import { FaArrowRight } from 'react-icons/fa';

const blogs = [
  {
    tag: 'React',
    title: 'Advanced React Patterns for Scalable Applications',
    excerpt:
      'Explore advanced React patterns and best practices for building scalable, maintainable applications with hooks and context API.',
    date: 'Mar 10, 2024',
    readTime: '8 min read',
    link: 'https://example.com',
  },
  {
    tag: 'Next.js',
    title: 'Optimizing Next.js Performance',
    excerpt:
      'A comprehensive guide to optimizing your Next.js applications for better performance, SEO, and user experience.',
    date: 'Mar 5, 2024',
    readTime: '6 min read',
    link: 'https://example.com',
  },
  {
    tag: 'JavaScript',
    title: 'Mastering Async/Await in JavaScript',
    excerpt:
      'Deep dive into asynchronous programming in JavaScript with practical examples and common pitfalls to avoid.',
    date: 'Feb 28, 2024',
    readTime: '10 min read',
    link: 'https://example.com',
  },
  {
    tag: 'Node.js',
    title: 'Building RESTful APIs with Express.js',
    excerpt:
      'Learn how to build robust and scalable RESTful APIs using Express.js, middleware, and best practices.',
    date: 'Feb 20, 2024',
    readTime: '9 min read',
    link: 'https://example.com',
  },
  {
    tag: 'CSS',
    title: 'Modern CSS Grid Layout Techniques',
    excerpt:
      'Master CSS Grid for creating responsive layouts. Includes practical examples and advanced techniques.',
    date: 'Feb 15, 2024',
    readTime: '7 min read',
    link: 'https://example.com',
  },
  {
    tag: 'Development',
    title: 'Web Development Best Practices',
    excerpt:
      'Essential best practices for modern web development covering performance, accessibility, and security.',
    date: 'Feb 10, 2024',
    readTime: '12 min read',
    link: 'https://example.com',
  },
];

export default function Blog() {
  return (
    <section id="blog" className={styles.blog}>
      <div className={styles.container}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest Articles</h2>
          <p className={styles.sectionSubtitle}>Insights & Knowledge Sharing</p>
        </div>

        <div className={styles.blogGrid}>
          {blogs.map((post, index) => (
            <article key={index} className={styles.blogCard}>
              <span className={styles.blogTag}>{post.tag}</span>
              <h3 className={styles.blogTitle}>{post.title}</h3>
              <p className={styles.blogExcerpt}>{post.excerpt}</p>

              <div className={styles.blogMeta}>
                <span className={styles.blogDate}>{post.date}</span>
                <span className={styles.readTime}>{post.readTime}</span>
              </div>

              <a href={post.link} target="_blank" rel="noopener noreferrer" className={styles.blogLink}>
                Read More <FaArrowRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
