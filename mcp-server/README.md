# Portfolio MCP Server

An intelligent AI-powered backend service for Ajay's developer portfolio. This Model Context Protocol (MCP) server provides advanced features like semantic search, project recommendations, skill analysis, and live coding statistics.

## Features

### 🤖 AI Portfolio Assistant
- Interactive chat interface to ask questions about the portfolio
- Intelligent responses about projects, skills, and experience
- Powered by OpenAI GPT-3.5-turbo

### 📊 Dynamic Project Intelligence
- Automatic project analysis and summary generation
- Project recommendation system based on user interests
- Project complexity analysis and improvement suggestions

### 🎯 Skill Intelligence Engine
- Comprehensive skill analysis and categorization
- Specialization identification
- Technology proficiency levels
- Related technology mapping

### 💼 Resume Query Engine
- Ask questions about experience and qualifications
- Recruiter-friendly responses
- Quick access to professional information

### 📈 Live Coding Statistics
- GitHub repository statistics and analytics
- Most used programming languages
- Repository insights and metrics
- Real-time profile data

### 📝 Semantic Blog Search
- Full-text search across blog posts
- Tag-based filtering
- Content discovery by topic

## Project Structure

```
mcp-server/
├── app/
│   ├── main.py                 # FastAPI application and routes
│   ├── config/
│   │   └── settings.py         # Configuration management
│   ├── models/
│   │   └── schemas.py          # Pydantic schemas for API
│   ├── services/
│   │   ├── chat_service.py     # LLM-powered chat
│   │   ├── github_service.py   # GitHub integration
│   │   ├── vector_service.py   # Vector DB & embeddings
│   │   └── analytics_service.py # Analysis & recommendations
│   ├── loaders/
│   │   └── portfolio_loader.py # Portfolio data loader
│   └── utils/
├── requirements.txt            # Python dependencies
├── .env.example               # Environment variables template
└── README.md
```

## Installation

### 1. Install Python Dependencies

```bash
cd mcp-server
pip install -r requirements.txt
```

### 2. Configure Environment Variables

Copy `.env.example` to `.env` and fill in your API keys:

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# GitHub Token (get from https://github.com/settings/tokens)
GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
GITHUB_USERNAME=yourusername

# Server Configuration
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False

# Portfolio Owner Info
OWNER_NAME=Ajay
PORTFOLIO_NAME="Ajay's Portfolio"

# CORS Settings (for Next.js frontend)
CORS_ORIGINS=["http://localhost:3000", "http://localhost:3001"]
```

### 3. Required API Keys

#### OpenAI API Key
1. Go to [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Create a new API key
3. Add to `.env` as `OPENAI_API_KEY`

#### GitHub Token
1. Go to [GitHub Settings > Developer Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Create a new token with `public_repo` scope
3. Add to `.env` as `GITHUB_TOKEN`

## Running the Server

### Development Mode

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

The server will start at `http://localhost:8000`

### Production Mode

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Check Server Health

```bash
curl http://localhost:8000/health
```

## API Endpoints

### Health Check
- `GET /health` - Server health status
- `GET /` - API documentation and available endpoints

### Chat & AI
- `POST /api/chat` - Chat with portfolio AI assistant
  ```json
  {
    "query": "Tell me about Ajay's projects",
    "conversation_history": []
  }
  ```

### Skills & Expertise
- `GET /api/skills-analysis` - Detailed skill breakdown
- `GET /api/skills/specialties` - Identified specialty areas
- `GET /api/experience` - Career experience timeline
- `POST /api/resume-query` - Ask questions about resume

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects/recommend` - Get project recommendations
  ```json
  {
    "interests": ["React", "Node.js", "full-stack"],
    "limit": 5
  }
  ```
- `GET /api/projects/{project_id}/analysis` - Analyze specific project

### Blog & Content
- `POST /api/blog-search` - Search blog posts
  ```json
  {
    "query": "JavaScript performance",
    "limit": 5
  }
  ```
- `GET /api/blog` - Get all blog posts

### Coding Stats
- `GET /api/coding-stats` - Aggregated stats from GitHub, LeetCode, GeeksForGeeks
- `GET /api/github-stats` - GitHub-specific statistics

### Portfolio Data
- `GET /api/portfolio` - Complete portfolio data
- `GET /api/certifications` - All certifications

## Interactive API Documentation

Once the server is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## Frontend Integration

### Setup Next.js Frontend

Add the MCP server API endpoint to your Next.js environment:

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:8000
```

### Example API Call from Next.js

```javascript
// components/ChatAssistant.jsx
const response = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'Tell me about your projects',
    conversation_history: []
  })
});

const data = await response.json();
console.log(data.response);
```

## Data Management

### Portfolio Data Source

The portfolio data is loaded from hardcoded structures in `app/loaders/portfolio_loader.py`. To update:

1. Edit the `_load_projects()` method to update projects
2. Edit the `_load_skills()` method to update skills
3. Edit the `_load_blog_posts()` method to update blog posts
4. Edit the `_load_experience()` method to update experience
5. Edit the `_load_certifications()` method to update certifications

### Vector Database

FAISS vector database is automatically created in `./data/vector_db/` for semantic search capabilities.

## Architecture

### Services Layer

1. **ChatService** - LLM-powered conversations using LangChain
2. **GitHubService** - Async GitHub API integration
3. **AnalyticsService** - Project analysis and recommendations
4. **SkillAnalysisService** - Skill profiling and insights
5. **VectorDatabase** - FAISS-based semantic search

### Data Flow

```
Frontend Request
    ↓
FastAPI Routes
    ↓
Services Layer
    ↓
Portfolio Loader / External APIs
    ↓
Response (JSON)
```

## Security

- CORS enabled for frontend origin (configurable)
- Environment variables for sensitive data
- No API keys exposed in code
- Async requests for non-blocking operations

## Performance

- Async/await for concurrent requests
- FAISS indexing for fast semantic search
- Caching potential with Redis (future enhancement)
- Connection pooling for external APIs

## Extending the Server

### Adding New Services

1. Create a new file in `app/services/`
2. Implement your service class
3. Initialize in `app/main.py`
4. Add FastAPI routes

### Adding New API Endpoints

```python
@app.get("/api/new-feature")
async def new_feature():
    """Feature description."""
    try:
        # Implementation
        return {"result": "success"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
```

### Integrating External Data

Update `app/loaders/portfolio_loader.py` to fetch from:
- Database
- CMS
- External APIs
- File system

## Troubleshooting

### "OPENAI_API_KEY not found"
- Check `.env` file exists in mcp-server directory
- Verify OpenAI API key is valid
- Restart the server

### "GitHub service not available"
- Ensure `GITHUB_TOKEN` and `GITHUB_USERNAME` are set in `.env`
- Verify GitHub token has correct permissions
- Check GitHub API rate limits: `curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit`

### CORS Errors
- Update `CORS_ORIGINS` in `.env` to include frontend URL
- Frontend must match exactly (http://localhost:3000, not http://127.0.0.1:3000)

### Port Already in Use
```bash
# Find process using port 8000
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

## Technology Stack

- **Framework**: FastAPI
- **Python**: 3.9+
- **AI/ML**: LangChain, OpenAI GPT-3.5-turbo
- **Vector DB**: FAISS
- **Embeddings**: OpenAI Text Embedding
- **HTTP Client**: AIOHTTP (async)
- **API Documentation**: Pydantic, OpenAPI/Swagger
- **Environment**: python-dotenv

## Future Enhancements

- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time WebSocket chat
- [ ] Advanced semantic search with RAG
- [ ] LeetCode integration
- [ ] GeeksForGeeks statistics
- [ ] Email notifications
- [ ] Analytics dashboard
- [ ] User authentication
- [ ] Redis caching layer
- [ ] Conversation history storage

## Contributing

For changes to the MCP server:
1. Update relevant service files
2. Add/update tests
3. Update this README if adding features
4. Test locally before deploying

## License

All rights reserved - Ajay's Portfolio

## Support

For issues or questions:
1. Check troubleshooting section
2. Review FastAPI documentation (https://fastapi.tiangolo.com)
3. Check OpenAI documentation (https://platform.openai.com/docs)

---

**Last Updated**: March 2026
**Version**: 1.0.0
