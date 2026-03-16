import json
import os
from typing import Dict, List, Any, Optional
from datetime import datetime


class PortfolioLoader:
    """Loads portfolio data from various sources including the Next.js app structure."""
    
    def __init__(self, portfolio_path: str = "../src"):
        self.portfolio_path = portfolio_path
        self.about_data = self._load_about()
        self.contact_data = self._load_contact()
        self.projects_data = self._load_projects()
        self.skills_data = self._load_skills()
        self.blog_data = self._load_blog_posts()
        self.experience_data = self._load_experience()
        self.certifications_data = self._load_certifications()
    
    def _load_about(self) -> Dict[str, Any]:
        """Load Ajay's comprehensive background information."""
        return {
            "name": "Ajay",
            "title": "Senior Full Stack Developer",
            "bio": "Highly skilled and experienced full-stack developer with a passion for building innovative solutions. With a strong background in both frontend and backend development, I have worked on a diverse range of projects, from e-commerce platforms and AI-powered task management systems to data visualization dashboards, social media APIs, and mobile applications.",
            "summary": "With over 5 years of professional experience, I've developed a unique understanding of the entire development process, from concept to deployment. I'm committed to pushing the boundaries of what's possible with technology and delivering exceptional results that exceed expectations.",
            "key_strengths": [
                "Full-stack development expertise (frontend & backend)",
                "AI/ML integration and intelligent systems",
                "Scalable architecture design and optimization",
                "Team leadership and mentoring",
                "DevOps and deployment automation",
                "Cross-platform mobile development",
                "Data visualization and analytics"
            ],
            "passion": "Building innovative solutions that solve real-world problems and make a positive impact through technology",
            "years_of_experience": 5,
            "projects_completed": 20,
            "team_members_mentored": 5,
            "open_source_contributions": 8,
            "current_focus": [
                "AI-powered applications",
                "Scalable cloud architecture",
                "Performance optimization",
                "Open source contributions"
            ]
        }
    
    def _load_contact(self) -> Dict[str, Any]:
        """Load Ajay's contact information."""
        return {
            "email": "ajay.dev@example.com",
            "phone": "+91 98765 43210",
            "location": "India",
            "github": "https://github.com/ajaygit-002",
            "linkedin": "https://linkedin.com/in/ajay-s-dev",
            "twitter": "https://twitter.com/ajay_dev",
            "website": "https://ajay-portfolio.vercel.app",
            "availability": "Open to full-time, freelance, and collaboration opportunities",
            "preferred_contact": "Email or LinkedIn for professional inquiries"
        }
    
    def _load_projects(self) -> List[Dict[str, Any]]:
        """Load projects from hardcoded portfolio data."""
        return [
            {
                "id": "project_1",
                "title": "E-Commerce Platform",
                "description": "A full-stack e-commerce platform with React frontend and Node.js backend",
                "technologies": ["React", "Node.js", "MongoDB", "Express.js", "Stripe"],
                "link": "https://example.com/ecommerce",
                "github": "https://github.com/example/ecommerce",
                "image": "/projects/ecommerce.jpg",
                "metrics": {
                    "users": 1500,
                    "transactions": 5000,
                    "revenue": 50000
                },
                "difficulty": "Hard",
                "tags": ["full-stack", "payment-integration", "database-design"]
            },
            {
                "id": "project_2",
                "title": "AI Task Manager",
                "description": "Intelligent task management system with AI-powered suggestions",
                "technologies": ["Next.js", "TypeScript", "OpenAI", "PostgreSQL", "Tailwind CSS"],
                "link": "https://example.com/taskmanager",
                "github": "https://github.com/example/ai-task-manager",
                "image": "/projects/taskmanager.jpg",
                "metrics": {
                    "users": 800,
                    "tasks_created": 12000,
                    "ai_suggestions": 45000
                },
                "difficulty": "Hard",
                "tags": ["ai-integration", "productivity", "modern-stack"]
            },
            {
                "id": "project_3",
                "title": "Data Visualization Dashboard",
                "description": "Interactive dashboard for real-time data visualization and analytics",
                "technologies": ["React", "D3.js", "Express.js", "MySQL", "Docker"],
                "link": "https://example.com/dashboard",
                "github": "https://github.com/example/visualization-dashboard",
                "image": "/projects/dashboard.jpg",
                "metrics": {
                    "data_points": 1000000,
                    "avg_response_time_ms": 200,
                    "uptime_percent": 99.9
                },
                "difficulty": "Medium",
                "tags": ["data-visualization", "performance", "scalability"]
            },
            {
                "id": "project_4",
                "title": "Social Media API",
                "description": "RESTful API for a social media platform with real-time features",
                "technologies": ["Node.js", "Express.js", "MongoDB", "WebSocket", "JWT"],
                "link": "https://example.com/social-api",
                "github": "https://github.com/example/social-api",
                "image": "/projects/social-api.jpg",
                "metrics": {
                    "api_calls_daily": 500000,
                    "active_users": 5000,
                    "average_latency_ms": 50
                },
                "difficulty": "Hard",
                "tags": ["backend", "api-design", "authentication"]
            },
            {
                "id": "project_5",
                "title": "Mobile Weather App",
                "description": "Cross-platform weather application with real-time updates",
                "technologies": ["React Native", "TypeScript", "OpenWeather API", "Firebase"],
                "link": "https://example.com/weather-app",
                "github": "https://github.com/example/weather-app",
                "image": "/projects/weather-app.jpg",
                "metrics": {
                    "downloads": 50000,
                    "rating": 4.8,
                    "active_users": 8000
                },
                "difficulty": "Medium",
                "tags": ["mobile", "cross-platform", "api-integration"]
            },
            {
                "id": "project_6",
                "title": "DevOps Automation Tool",
                "description": "CLI tool for automating deployment and infrastructure management",
                "technologies": ["Python", "Docker", "Kubernetes", "GitHub Actions", "CLI"],
                "link": "https://example.com/devops-tool",
                "github": "https://github.com/example/devops-tool",
                "image": "/projects/devops-tool.jpg",
                "metrics": {
                    "github_stars": 250,
                    "downloads": 5000,
                    "contributors": 12
                },
                "difficulty": "Hard",
                "tags": ["devops", "automation", "open-source"]
            }
        ]
    
    def _load_skills(self) -> Dict[str, List[Dict[str, Any]]]:
        """Load skills data."""
        return {
            "frontend": [
                {"name": "React", "proficiency": "Expert", "projects": 8, "years": 3},
                {"name": "Next.js", "proficiency": "Expert", "projects": 6, "years": 2.5},
                {"name": "TypeScript", "proficiency": "Advanced", "projects": 6, "years": 2},
                {"name": "JavaScript", "proficiency": "Expert", "projects": 10, "years": 4},
                {"name": "Tailwind CSS", "proficiency": "Advanced", "projects": 7, "years": 2},
                {"name": "HTML5", "proficiency": "Expert", "projects": 10, "years": 5},
            ],
            "backend": [
                {"name": "Node.js", "proficiency": "Expert", "projects": 8, "years": 3.5},
                {"name": "Express.js", "proficiency": "Advanced", "projects": 6, "years": 3},
                {"name": "Python", "proficiency": "Advanced", "projects": 4, "years": 2},
                {"name": "PostgreSQL", "proficiency": "Advanced", "projects": 5, "years": 2.5},
                {"name": "MongoDB", "proficiency": "Advanced", "projects": 7, "years": 3},
            ],
            "tools": [
                {"name": "Git", "proficiency": "Expert", "projects": 15, "years": 5},
                {"name": "Docker", "proficiency": "Advanced", "projects": 4, "years": 2},
                {"name": "VS Code", "proficiency": "Expert", "projects": 15, "years": 5},
                {"name": "GitHub", "proficiency": "Expert", "projects": 15, "years": 5},
            ],
            "databases": [
                {"name": "MySQL", "proficiency": "Advanced", "projects": 5, "years": 3},
                {"name": "Firebase", "proficiency": "Advanced", "projects": 3, "years": 1.5},
                {"name": "GraphQL", "proficiency": "Intermediate", "projects": 2, "years": 1},
                {"name": "Redis", "proficiency": "Intermediate", "projects": 1, "years": 0.5},
            ]
        }
    
    def _load_blog_posts(self) -> List[Dict[str, Any]]:
        """Load blog posts data."""
        return [
            {
                "id": "blog_1",
                "title": "Building Scalable Node.js Applications",
                "excerpt": "A comprehensive guide to building high-performance Node.js applications",
                "content": "In this article, we explore best practices for building scalable Node.js applications. Learn about clustering, load balancing, and optimization techniques...",
                "tags": ["nodejs", "performance", "backend", "scalability"],
                "published_date": "2024-01-15",
                "read_time": 8
            },
            {
                "id": "blog_2",
                "title": "React Hooks: A Deep Dive",
                "excerpt": "Understanding React Hooks and how to use them effectively in your projects",
                "content": "React Hooks have revolutionized how we write React components. This article covers useState, useEffect, useContext and custom hooks...",
                "tags": ["react", "javascript", "frontend", "hooks"],
                "published_date": "2024-02-10",
                "read_time": 10
            },
            {
                "id": "blog_3",
                "title": "TypeScript Best Practices",
                "excerpt": "Essential TypeScript patterns and practices for production-ready code",
                "content": "TypeScript is becoming the standard for JavaScript development. Learn advanced typing patterns, generics, and decorators...",
                "tags": ["typescript", "javascript", "best-practices"],
                "published_date": "2024-02-20",
                "read_time": 12
            },
            {
                "id": "blog_4",
                "title": "Introduction to Docker",
                "excerpt": "Getting started with containerization using Docker",
                "content": "Docker containers have become essential for deployment. Learn how to containerize your applications and deploy them efficiently...",
                "tags": ["docker", "devops", "deployment"],
                "published_date": "2024-03-01",
                "read_time": 7
            },
            {
                "id": "blog_5",
                "title": "JavaScript Performance Optimization",
                "excerpt": "Techniques for optimizing JavaScript performance in modern web applications",
                "content": "Learn about critical rendering paths, lazy loading, code splitting, and other performance optimization techniques...",
                "tags": ["javascript", "performance", "frontend", "optimization"],
                "published_date": "2024-03-10",
                "read_time": 9
            },
            {
                "id": "blog_6",
                "title": "REST API Design Patterns",
                "excerpt": "Best practices for designing robust and scalable REST APIs",
                "content": "Explore REST API design patterns, versioning strategies, error handling, and security considerations...",
                "tags": ["api", "backend", "design", "rest"],
                "published_date": "2024-03-15",
                "read_time": 11
            }
        ]
    
    def _load_experience(self) -> List[Dict[str, Any]]:
        """Load experience data."""
        return [
            {
                "id": "exp_1",
                "company": "Tech Startup Inc",
                "position": "Senior Full Stack Developer",
                "duration": "2022 - Present",
                "description": "Led development of multiple full-stack projects using React and Node.js",
                "achievements": [
                    "Increased application performance by 40%",
                    "Led team of 3 junior developers",
                    "Implemented CI/CD pipeline reducing deployment time by 60%"
                ],
                "technologies": ["React", "Node.js", "Docker", "PostgreSQL", "TypeScript"]
            },
            {
                "id": "exp_2",
                "company": "Web Solutions Ltd",
                "position": "Full Stack Developer",
                "duration": "2020 - 2022",
                "description": "Developed and maintained multiple web applications for various clients",
                "achievements": [
                    "Built 8 production applications",
                    "Improved code quality with automated testing",
                    "Mentored 2 junior developers"
                ],
                "technologies": ["React", "JavaScript", "Node.js", "MongoDB", "AWS"]
            },
            {
                "id": "exp_3",
                "company": "Digital Agency Co",
                "position": "Junior Developer",
                "duration": "2019 - 2020",
                "description": "Started career working on frontend development and learning backend technologies",
                "achievements": [
                    "Developed 15+ responsive web pages",
                    "Learned React and JavaScript fundamentals",
                    "Contributed to open source projects"
                ],
                "technologies": ["HTML", "CSS", "JavaScript", "jQuery", "Bootstrap"]
            }
        ]
    
    def _load_certifications(self) -> List[Dict[str, Any]]:
        """Load certifications data."""
        return [
            {
                "id": "cert_1",
                "title": "AWS Certified Solutions Architect",
                "issuer": "Amazon Web Services",
                "issue_date": "2023-06",
                "credential_id": "AWS-SA-001",
                "credential_url": "https://aws.amazon.com/verification"
            },
            {
                "id": "cert_2",
                "title": "Full Stack Web Development Bootcamp",
                "issuer": "Udemy",
                "issue_date": "2020-12",
                "credential_id": "FULLSTACK-2020",
                "credential_url": "https://udemy.com/certificate"
            },
            {
                "id": "cert_3",
                "title": "Advanced JavaScript & ES6",
                "issuer": "Pluralsight",
                "issue_date": "2021-08",
                "credential_id": "PLURALSIGHT-JS",
                "credential_url": "https://pluralsight.com/certificate"
            }
        ]
    
    def get_all_portfolio_data(self) -> Dict[str, Any]:
        """Get complete portfolio data."""
        return {
            "about": self.about_data,
            "contact": self.contact_data,
            "projects": self.projects_data,
            "skills": self.skills_data,
            "blog_posts": self.blog_data,
            "experience": self.experience_data,
            "certifications": self.certifications_data
        }
    
    def get_projects_by_technology(self, technology: str) -> List[Dict[str, Any]]:
        """Get projects using a specific technology."""
        return [
            p for p in self.projects_data
            if any(tech.lower() == technology.lower() for tech in p.get("technologies", []))
        ]
    
    def get_blog_posts_by_tag(self, tag: str) -> List[Dict[str, Any]]:
        """Get blog posts with a specific tag."""
        return [
            b for b in self.blog_data
            if any(t.lower() == tag.lower() for t in b.get("tags", []))
        ]
