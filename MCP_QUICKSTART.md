# MCP Server - Quick Start Guide

## Overview

Your portfolio now includes an AI-powered Model Context Protocol (MCP) server that provides intelligent backend capabilities. This guide helps you set up and run the MCP server.

## Quick Setup (5 minutes)

### Step 1: Install Dependencies

```bash
cd mcp-server
pip install -r requirements.txt
```

### Step 2: Configure Environment Variables

```bash
# Copy the example file
cp .env.example .env

# Edit .env with your API keys
# OPENAI_API_KEY - Get from https://platform.openai.com/api-keys
# GITHUB_TOKEN - Get from https://github.com/settings/tokens
# GITHUB_USERNAME - Your GitHub username
```

### Step 3: Get API Keys

#### OpenAI API Key (Required for Chat)
1. Visit [OpenAI API Keys](https://platform.openai.com/api-keys)
2. Click "Create new secret key"
3. Copy and paste into `.env` as `OPENAI_API_KEY`

#### GitHub Token (Optional but recommended)
1. Visit [GitHub Personal Access Tokens](https://github.com/settings/tokens)
2. Generate new token with `public_repo` scope
3. Copy and paste into `.env` as `GITHUB_TOKEN`
4. Set `GITHUB_USERNAME` to your GitHub username

### Step 4: Run the Server

```bash
# Start development server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# Or for production
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

The server will start at `http://localhost:8000`

### Step 5: Test the Server

Open in your browser:
- API Docs: http://localhost:8000/docs
- Health Check: http://localhost:8000/health

## Next.js Portfolio Integration

The AI Assistant chat widget is automatically available on your portfolio when the MCP server is running.

### Configuration

In your `.env.local` file (Next.js):

```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

## Using the AI Assistant

### In the Browser

1. Visit your portfolio (http://localhost:3000)
2. Click the robot icon in the bottom-right corner
3. Start chatting!

### Example Queries

- "Tell me about your projects"
- "What technologies do you use?"
- "What's your strongest skill?"
- "Show me your experience"
- "Recommend projects for React developers"

## API Usage Examples

### Chat with Portfolio

```bash
curl -X POST "http://localhost:8000/api/chat" \
  -H "Content-Type: application/json" \
  -d '{"query": "Tell me about your projects"}'
```

### Get Skill Analysis

```bash
curl http://localhost:8000/api/skills-analysis
```

### Get Project Recommendations

```bash
curl -X POST "http://localhost:8000/api/projects/recommend" \
  -H "Content-Type: application/json" \
  -d '{"interests": ["React", "Node.js"], "limit": 5}'
```

### Search Blog Posts

```bash
curl -X POST "http://localhost:8000/api/blog-search" \
  -H "Content-Type: application/json" \
  -d '{"query": "JavaScript performance", "limit": 5}'
```

### Get GitHub Stats

```bash
curl http://localhost:8000/api/github-stats
```

## Troubleshooting

### Server won't start

```bash
# Check if port 8000 is already in use
lsof -i :8000  # macOS/Linux
netstat -ano | findstr :8000  # Windows

# Kill the process
kill -9 <PID>  # macOS/Linux
taskkill /PID <PID> /F  # Windows
```

### Chat not working

1. Verify OpenAI API key in `.env`
2. Check `/health` endpoint status
3. Look at server logs for errors

### GitHub integration not working

1. Verify `GITHUB_TOKEN` has `public_repo` scope
2. Confirm correct `GITHUB_USERNAME`
3. Check GitHub API rate limits:
   ```bash
   curl -H "Authorization: token YOUR_TOKEN" https://api.github.com/rate_limit
   ```

## File Structure

```
mcp-server/
├── app/
│   ├── main.py              # FastAPI application
│   ├── config/              # Configuration
│   ├── services/            # Business logic
│   ├── loaders/             # Data loading
│   ├── models/              # Data schemas
│   └── utils/               # Utilities
├── requirements.txt         # Python dependencies
├── .env.example            # Environment template
└── README.md               # Full documentation
```

## Available Endpoints

```
GET     /health                           # Health check
GET     /docs                            # Interactive API docs
GET     /                                # API info

POST    /api/chat                        # Chat with assistant
GET     /api/skills-analysis             # Skill analysis
GET     /api/projects                    # List projects
POST    /api/projects/recommend          # Project recommendations
GET     /api/projects/{id}/analysis      # Analyze project
POST    /api/blog-search                 # Search blog posts
GET     /api/blog                        # List blog posts
GET     /api/coding-stats                # Aggregated stats
GET     /api/github-stats                # GitHub stats
GET     /api/experience                  # Experience timeline
POST    /api/resume-query                # Ask about resume
GET     /api/certifications              # List certifications
GET     /api/portfolio                   # Complete portfolio data
```

## Development Workflow

### 1. Running Both Next.js and MCP Server

Terminal 1 (Next.js Portfolio):
```bash
cd portfolio
npm run dev
# Visit http://localhost:3000
```

Terminal 2 (MCP Server):
```bash
cd mcp-server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
# Visit http://localhost:8000/docs
```

### 2. Testing New Features

Use the Swagger UI at http://localhost:8000/docs to test endpoints before integrating with frontend.

### 3. Updating Portfolio Data

Edit `app/loaders/portfolio_loader.py`:

```python
def _load_projects(self):
    return [
        {
            "id": "project_1",
            "title": "My Project",
            # ... more data
        }
    ]
```

## Production Deployment

### Using Gunicorn (Recommended)

```bash
pip install gunicorn
gunicorn app.main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Using Docker

```dockerfile
FROM python:3.9
WORKDIR /app
COPY requirements.txt .
RUN pip install -r requirements.txt
COPY app ./app
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
```

### Environment Variables for Production

```env
API_HOST=0.0.0.0
API_PORT=8000
DEBUG=False
OPENAI_API_KEY=your_key
GITHUB_TOKEN=your_token
GITHUB_USERNAME=your_username
CORS_ORIGINS=["https://yourdomain.com"]
```

## Features Showcase

### 🤖 AI Chat Assistant
- Natural language queries about portfolio
- Conversation history support
- Multi-turn interactions

### 📊 Smart Recommendations
- Project suggestions based on interests
- Technology matching
- Difficulty-based filtering

### 🎯 Skill Intelligence
- Skill proficiency analysis
- Technology relationships
- Specialization identification

### 📈 Live Coding Stats
- GitHub repository metrics
- Star counts and languages
- Contribution statistics

### 📝 Content Search
- Blog post semantic search
- Tag-based filtering
- Quick discovery

## Performance Tips

1. **Caching**: Results are cached in FAISS vector database
2. **Async**: All external API calls are async
3. **Rate Limiting**: GitHub API has rate limits (60/hour unauthenticated, 5000/hour authenticated)
4. **CORS**: Configured for your frontend URL

## Security Best Practices

1. ✅ Keep API keys in `.env` (never commit)
2. ✅ Use environment variables in production
3. ✅ Validate all inputs
4. ✅ CORS configured for specific origins
5. ✅ No sensitive data logged

## Support & Resources

- **FastAPI Docs**: https://fastapi.tiangolo.com
- **OpenAI API**: https://platform.openai.com/docs
- **GitHub API**: https://docs.github.com/rest
- **LangChain**: https://python.langchain.com

## Next Steps

1. ✅ Set up MCP server with this guide
2. 🔄 Test endpoints in Swagger UI
3. 📱 Interact with chat widget on portfolio
4. 🚀 Deploy to production
5. 📊 Monitor API usage and performance

## Questions?

Check the full documentation in `mcp-server/README.md`

---

**Happy Coding! 🚀**
