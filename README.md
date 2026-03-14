# Ajay's Developer Portfolio

An advanced interactive developer portfolio with AI-powered backend capabilities using an intelligent Model Context Protocol (MCP) server. Built with Next.js frontend and Python FastAPI backend.

## 🎯 Features

### Frontend (Next.js)
- **Modern Design**: Professional gradient-based dark theme with smooth animations
- **5-Color Theme System**: Dynamic theme switching with localStorage persistence
- **Interactive Sections**: Hero, About, Skills, Projects, Experience, Certifications, Blog, Contact
- **Professional Icons**: Tech skill icons using React Icons library
- **Responsive Design**: Mobile-first approach for all device sizes
- **Video Background**: Hero section with professional video background
- **Smooth Animations**: Intersection observer-based scroll animations
- **Fast Performance**: Optimized with Next.js and Tailwind CSS

### Backend MCP Server (Python)
- **AI Portfolio Assistant**: Chat with intelligent responses about portfolio
- **Dynamic Project Analysis**: Automatic project summaries and recommendations
- **Skill Intelligence**: Technology proficiency analysis and specialization detection
- **GitHub Integration**: Real-time GitHub stats and repository metrics
- **Semantic Search**: Blog post search with tag-based filtering
- **Resume Query Engine**: Ask questions about experience and qualifications
- **Coding Stats Aggregation**: GitHub, LeetCode, and GeeksForGeeks integration
- **RESTful API**: Well-documented FastAPI endpoints with Swagger UI

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ (for Next.js)
- Python 3.9+ (for MCP Server)
- npm or yarn

### Frontend Setup (5 minutes)

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Visit http://localhost:3000
```

### Backend MCP Server Setup (5 minutes)

See [MCP_QUICKSTART.md](./MCP_QUICKSTART.md) for detailed setup instructions.

```bash
# Install dependencies
cd mcp-server
pip install -r requirements.txt

# Configure environment
cp .env.example .env
# Edit .env with your OpenAI and GitHub API keys

# Start server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Test at http://localhost:8000/docs
```

## 📁 Project Structure

```
portfolio/
├── src/
│   ├── app/
│   │   ├── globals.css         # Global styles with design system
│   │   ├── layout.js           # Root layout
│   │   └── page.js             # Home page with all sections
│   └── components/
│       ├── Navbar/             # Navigation with theme picker
│       ├── Hero/               # Hero section with video background
│       ├── About/              # About section with timeline
│       ├── Skills/             # Technology skills grid
│       ├── Projects/           # Project showcase
│       ├── Experience/         # Experience timeline
│       ├── Certifications/     # Certifications grid
│       ├── Blog/               # Blog posts
│       ├── Contact/            # Contact form
│       ├── Footer/             # Footer
│       └── AIAssistant/        # AI chat widget
├── public/                     # Static assets
├── mcp-server/                 # Python FastAPI backend
│   ├── app/
│   │   ├── main.py             # FastAPI application
│   │   ├── config/             # Configuration
│   │   ├── services/           # Business logic
│   │   ├── loaders/            # Data loaders
│   │   ├── models/             # Data schemas
│   │   └── utils/              # Utilities
│   ├── requirements.txt        # Python dependencies
│   ├── .env.example            # Environment template
│   └── README.md               # MCP server documentation
├── package.json
├── next.config.mjs
├── jsconfig.json
├── postcss.config.mjs
├── eslint.config.mjs
└── README.md
```

## 🎨 Design System

### Color Themes
- **Dark** (Default): #050816 background with purple accents
- **White**: Light theme with dark text
- **Navy**: Deep blue theme
- **Slate**: Slate gray theme
- **Charcoal**: Dark charcoal theme

### Components
- **Card**: Glass-morphism with backdrop blur
- **Gradient Text**: Vibrant purple to pink gradient
- **Animations**: SlideUp, Float, FadeIn, PulseGlow, ButtonGlow

### Responsive Breakpoints
- Mobile: 320px - 640px
- Tablet: 641px - 1024px
- Desktop: 1025px+

## 🔌 MCP Server Endpoints

### Chat & AI
- `POST /api/chat` - Chat with portfolio AI assistant
- `POST /api/resume-query` - Ask questions about resume

### Analysis
- `GET /api/skills-analysis` - Detailed skill analysis
- `GET /api/projects/{id}/analysis` - Project analysis

### Recommendations
- `POST /api/projects/recommend` - Project recommendations based on interests
- `GET /api/skills/specialties` - Identified specialty areas

### Content
- `POST /api/blog-search` - Semantic search across blog posts
- `GET /api/blog` - List all blog posts

### Statistics
- `GET /api/coding-stats` - Aggregated stats (GitHub, LeetCode, etc.)
- `GET /api/github-stats` - GitHub repository statistics
- `GET /api/experience` - Career experience
- `GET /api/certifications` - Certifications

### Data
- `GET /api/projects` - All projects
- `GET /api/portfolio` - Complete portfolio data

## 🛠 Tech Stack

### Frontend
- **Framework**: Next.js 16.1.6
- **React**: 19.2.3
- **Styling**: CSS Modules + Tailwind CSS v4
- **Icons**: React Icons (Font Awesome + Simple Icons)
- **Animations**: Custom CSS + Framer Motion support
- **Build Tool**: Turbopack

### Backend
- **Framework**: FastAPI
- **Python**: 3.9+
- **AI/ML**: LangChain + OpenAI GPT-3.5-turbo
- **Vector DB**: FAISS (for semantic search)
- **Embeddings**: OpenAI Text-Embedding-3-small
- **APIs**: GitHub API (async with aiohttp)
- **Data**: Pydantic for validation

## 📊 Key Features Explained

### AI Portfolio Assistant
Interactive chat widget that understands questions about:
- Projects and their technologies
- Skills and proficiency levels
- Experience and background
- Technology recommendations

### Project Recommendation Engine
Suggests projects based on user interests:
- Technology matching
- Difficulty level filtering
- Relevance scoring
- Personalized explanations

### Skill Analysis
Analyzes and displays:
- Skill proficiency levels (Beginner → Expert)
- Related technologies
- Project count per skill
- Specialty area identification

### GitHub Intelligence
Fetches and displays:
- Repository statistics
- Star counts and languages
- Most active repositories
- Contribution metrics

## 🔐 Security & Privacy

- ✅ API keys stored in environment variables (not in code)
- ✅ CORS configured for specific origins
- ✅ No sensitive data exposed in responses
- ✅ Async operations prevent blocking
- ✅ Input validation on all endpoints

## 📱 Responsive Design

- Mobile-first approach
- Hamburger menu for mobile navigation
- Adaptive grid layouts
- Touch-friendly interface
- Optimized images and assets

## 🚀 Deployment

### Frontend (Vercel)
```bash
npm run build
# Deploy to Vercel: https://vercel.com
```

### Backend (Any Server)
```bash
pip install gunicorn
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker
```

Or use Docker:
```bash
docker build -t portfolio-mcp .
docker run -p 8000:8000 portfolio-mcp
```

## 📖 Documentation

- [MCP Server Full Documentation](./mcp-server/README.md)
- [MCP Quick Start Guide](./MCP_QUICKSTART.md)
- [FastAPI Documentation](https://fastapi.tiangolo.com)
- [Next.js Documentation](https://nextjs.org/docs)

## 🎓 Learning Outcomes

Building and understanding this portfolio demonstrates:

- **Frontend Engineering**: Modern React/Next.js patterns, responsive design, CSS-in-JS
- **Backend Development**: FastAPI, async Python, RESTful API design
- **AI Integration**: LangChain, OpenAI API, semantic search with embeddings
- **DevOps**: Environment configuration, CORS, deployment strategies
- **Full Stack**: Complete integration of frontend and backend systems
- **System Design**: Service architecture, data flow, API design

## 📝 Updating Portfolio Content

### Projects
Edit `mcp-server/app/loaders/portfolio_loader.py` → `_load_projects()`

### Skills
Edit `mcp-server/app/loaders/portfolio_loader.py` → `_load_skills()`

### Blog Posts
Edit `mcp-server/app/loaders/portfolio_loader.py` → `_load_blog_posts()`

### Experience
Edit `mcp-server/app/loaders/portfolio_loader.py` → `_load_experience()`

### Colors/Theme
Edit `src/app/globals.css` CSS variables or update `src/components/Navbar/Navbar.jsx`

## 🐛 Troubleshooting

### Next.js Issues
- Clear `.next` directory: `rm -rf .next`
- Reinstall dependencies: `npm install`
- Check port 3000 is available

### MCP Server Issues
- Check OpenAI API key is valid
- Verify GitHub token has correct permissions
- Ensure port 8000 is available
- Check Python version is 3.9+

## 📞 Support

For detailed help:
1. Check [MCP_QUICKSTART.md](./MCP_QUICKSTART.md)
2. Review [mcp-server/README.md](./mcp-server/README.md)
3. Check FastAPI/Next.js documentation

## 🎯 Future Enhancements

- [ ] Database integration for dynamic content
- [ ] User authentication and comments
- [ ] Real-time WebSocket chat
- [ ] Advanced analytics dashboard
- [ ] Mobile app companion
- [ ] Webhook integrations
- [ ] Premium features

## 📄 License

All rights reserved - Ajay's Portfolio

---

**Built with ❤️ using Next.js + Python + AI**

**Last Updated**: March 2026
