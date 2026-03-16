<p align="center">
  <br />
  <strong>
    <span style="font-size:2em;">🅰</span>
  </strong>
  <br />
  <h1 align="center">Portfolio MCP Server</h1>
  <p align="center">
    <em>AI-Powered Backend for Ajay's Developer Portfolio</em>
  </p>
  <p align="center">
    <img src="https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
    <img src="https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi&logoColor=white" alt="FastAPI" />
    <img src="https://img.shields.io/badge/LangChain-2B2D42?style=for-the-badge&logo=chainlink&logoColor=white" alt="LangChain" />
    <img src="https://img.shields.io/badge/License-All%20Rights%20Reserved-8b5cf6?style=for-the-badge" alt="License" />
  </p>
</p>

---

## ⚡ Quick Start

Get the MCP server running in 4 steps:

```bash
# 1. Navigate to the server directory
cd mcp-server

# 2. Install dependencies
pip install -r requirements.txt

# 3. Configure environment (edit .env with your API keys)
cp .env.example .env

# 4. Start the server
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

> ✅ Server running at **http://localhost:8000**  
> 📖 API Docs at **http://localhost:8000/docs**  
> 📘 ReDoc at **http://localhost:8000/redoc**

---

## 🧠 Features

| Feature | Description |
|---------|-------------|
| 🤖 **AI Chat Assistant** | Interactive chat powered by GPT / Groq / HuggingFace |
| 📊 **Project Intelligence** | Auto-analysis, recommendations, complexity scoring |
| 🎯 **Skill Engine** | Categorization, proficiency levels, specialty detection |
| 💼 **Resume Query** | Recruiter-friendly Q&A about experience |
| 📈 **Live Coding Stats** | GitHub analytics, language breakdown, repo insights |
| 📝 **Semantic Blog Search** | Full-text search with tag filtering |

---

## 📂 Project Structure

```
mcp-server/
├── app/
│   ├── main.py                 # FastAPI app & routes
│   ├── config/
│   │   └── settings.py         # Configuration management
│   ├── models/
│   │   └── schemas.py          # Pydantic models
│   ├── services/
│   │   ├── chat_service.py     # LLM-powered chat
│   │   ├── github_service.py   # GitHub integration
│   │   ├── vector_service.py   # Vector DB & embeddings
│   │   └── analytics_service.py # Analysis & recommendations
│   ├── loaders/
│   │   └── portfolio_loader.py # Portfolio data loader
│   └── utils/
├── requirements.txt            # Python dependencies
├── .env.example                # Env template
└── README.md
```

---

## 🔑 API Keys Setup

### Option 1: Groq (Recommended — 100% Free)

```env
GROQ_API_KEY=your_groq_api_key_here
AI_PROVIDER=groq
```

> Get a free key at [console.groq.com/keys](https://console.groq.com/keys)

### Option 2: HuggingFace (Free)

```env
HUGGINGFACE_API_KEY=your_token_here
AI_PROVIDER=huggingface
```

> Get a free token at [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)

### Option 3: OpenAI ($5 Free Credits)

```env
OPENAI_API_KEY=sk-proj-your_key_here
AI_PROVIDER=openai
```

> Get a key at [platform.openai.com/api-keys](https://platform.openai.com/api-keys)

### GitHub Integration (Optional)

```env
GITHUB_TOKEN=ghp_your_token_here
GITHUB_USERNAME=yourusername
```

> Create a token at [GitHub Settings > Tokens](https://github.com/settings/tokens) with `public_repo` scope

---

## 🌐 API Endpoints

### Health & Info

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/health` | Server health check |
| `GET` | `/` | API overview & endpoints list |

### Chat & AI

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/chat` | Chat with portfolio AI assistant |
| `POST` | `/api/resume-query` | Ask resume/experience questions |

```json
// POST /api/chat
{
  "query": "Tell me about Ajay's projects",
  "conversation_history": []
}
```

### Skills & Experience

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/skills-analysis` | Detailed skill breakdown |
| `GET` | `/api/skills/specialties` | Identified specialty areas |
| `GET` | `/api/experience` | Career timeline |

### Projects

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/projects` | All projects |
| `POST` | `/api/projects/recommend` | Recommendations by interest |
| `GET` | `/api/projects/{id}/analysis` | Single project analysis |

```json
// POST /api/projects/recommend
{
  "interests": ["React", "Node.js", "full-stack"],
  "limit": 5
}
```

### Blog & Content

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/blog-search` | Semantic blog search |
| `GET` | `/api/blog` | All blog posts |

### Coding Stats

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/coding-stats` | Aggregated stats |
| `GET` | `/api/github-stats` | GitHub-specific stats |

### Portfolio Data

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/portfolio` | Complete portfolio data |
| `GET` | `/api/certifications` | All certifications |

---

## 🔌 Frontend Integration

Add the API endpoint to your Next.js app:

```env
# .env.local (in portfolio root)
NEXT_PUBLIC_API_URL=http://localhost:8000
```

Example usage:

```javascript
const res = await fetch('http://localhost:8000/api/chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    query: 'Tell me about your projects',
    conversation_history: []
  })
});

const data = await res.json();
console.log(data.response);
```

---

## 🏗️ Architecture

```
Frontend Request → FastAPI Routes → Services Layer → Portfolio Loader / External APIs → JSON Response
```

### Service Layer

| Service | Purpose |
|---------|---------|
| `ChatService` | LLM-powered conversations via LangChain |
| `GitHubService` | Async GitHub API integration |
| `AnalyticsService` | Project analysis & recommendations |
| `SkillAnalysisService` | Skill profiling & insights |

---

## 🖥️ Running Commands

### Development

```bash
python -m uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

### Production

```bash
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```

### Health Check

```bash
curl http://localhost:8000/health
```

### Run Both Frontend + Backend

```bash
# Terminal 1 — MCP Server
cd mcp-server && python -m uvicorn app.main:app --reload --port 8000

# Terminal 2 — Next.js Frontend
cd portfolio && npm run dev
```

---

## 🛠️ Troubleshooting

| Problem | Solution |
|---------|----------|
| `OPENAI_API_KEY not found` | Check `.env` exists in `mcp-server/` and key is valid |
| `GitHub service not available` | Set `GITHUB_TOKEN` & `GITHUB_USERNAME` in `.env` |
| CORS errors | Update `CORS_ORIGINS` in `.env` to match your frontend URL |
| Port already in use | Run `netstat -ano \| findstr :8000` then `taskkill /PID <PID> /F` |

---

## 🛡️ Tech Stack

| Category | Technology |
|----------|------------|
| Framework | FastAPI |
| Runtime | Python 3.9+ |
| AI/ML | LangChain, OpenAI / Groq / HuggingFace |
| Vector DB | FAISS |
| Embeddings | OpenAI / HuggingFace |
| HTTP Client | AIOHTTP (async) |
| Docs | Pydantic + OpenAPI/Swagger |

---

## 🚀 Future Roadmap

- [ ] PostgreSQL / MongoDB integration
- [ ] Real-time WebSocket chat
- [ ] Advanced RAG pipeline
- [ ] LeetCode API integration
- [ ] Redis caching layer
- [ ] Analytics dashboard
- [ ] Conversation history storage

---

<p align="center">
  <strong>Built with ❤️ by Ajay S</strong><br />
  <em>Version 1.0.0 • Last Updated: March 2026</em>
</p>
