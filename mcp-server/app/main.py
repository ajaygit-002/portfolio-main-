from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
import os
from dotenv import load_dotenv

from app.config.settings import settings  # type: ignore
from app.models.schemas import (  # type: ignore
    ChatRequest, ChatResponse, RecommendationRequest, RecommendationResponse,
    SkillsAnalysisResponse, BlogSearchRequest, BlogSearchResponse,
    CodingStats, ResumeQueryRequest, ResumeQueryResponse
)
from app.services.chat_service import ChatService  # type: ignore
from app.services.github_service import GitHubService  # type: ignore
from app.services.analytics_service import (  # type: ignore
    ProjectAnalysisService, SkillAnalysisService, RecommendationService
)
from app.loaders.portfolio_loader import PortfolioLoader  # type: ignore

# Load environment variables
load_dotenv()

# Initialize services
portfolio_loader = PortfolioLoader()
chat_service: ChatService = None
github_service: GitHubService = None
project_analyzer = ProjectAnalysisService()
skill_analyzer = SkillAnalysisService()
recommendation_service = RecommendationService()


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize services on startup."""
    global chat_service, github_service
    
    # Get API keys and provider from environment/settings
    groq_key = os.getenv("GROQ_API_KEY", "") or settings.GROQ_API_KEY
    openai_key = os.getenv("OPENAI_API_KEY", "") or settings.OPENAI_API_KEY
    huggingface_key = os.getenv("HUGGINGFACE_API_KEY", "") or settings.HUGGINGFACE_API_KEY
    provider = os.getenv("AI_PROVIDER", "") or settings.AI_PROVIDER
    github_token = os.getenv("GITHUB_TOKEN", "")
    github_username = os.getenv("GITHUB_USERNAME", "")
    
    # Initialize chat service based on provider
    api_key = None
    if provider == "groq" and groq_key:
        api_key = groq_key
    elif provider == "openai" and openai_key:
        api_key = openai_key
    elif provider == "huggingface" and huggingface_key:
        api_key = huggingface_key
    elif groq_key:  # Default to Groq if available
        api_key = groq_key
        provider = "groq"
    elif openai_key:  # Fallback to OpenAI
        api_key = openai_key
        provider = "openai"
    
    if api_key:
        chat_service = ChatService(api_key=api_key, provider=provider, owner_name=settings.OWNER_NAME)
    
    if github_token and github_username:
        github_service = GitHubService(github_token, github_username)
    
    print("✓ MCP Server initialized successfully")
    print(f"✓ Portfolio loaded: {len(portfolio_loader.projects_data)} projects")
    print(f"✓ Chat service: {'✓ Ready' if chat_service else '✗ No API key configured'} (Provider: {provider})")
    print(f"✓ GitHub service: {'✓ Ready' if github_service else '✗ GitHub token not configured'}")
    
    yield
    
    print("✓ MCP Server shutdown")


# Create FastAPI app
app = FastAPI(
    title="Portfolio MCP Server",
    description=f"AI-powered backend for {settings.OWNER_NAME}'s portfolio",
    version="1.0.0",
    lifespan=lifespan
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==================== HEALTH CHECK ENDPOINT ====================

@app.get("/health")
async def health_check():
    """Health check endpoint."""
    return {
        "status": "healthy",
        "service": "Portfolio MCP Server",
        "owner": settings.OWNER_NAME
    }


# ==================== CHAT ENDPOINTS ====================

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_portfolio(request: ChatRequest):
    """
    Chat with the portfolio AI assistant.
    
    Example queries:
    - "Tell me about Ajay's projects"
    - "What technologies does Ajay use?"
    - "Explain Ajay's experience"
    """
    if not chat_service:
        raise HTTPException(
            status_code=503,
            detail="Chat service not available. Configure OPENAI_API_KEY."
        )
    
    try:
        result = await chat_service.chat(request.query, request.conversation_history)
        return ChatResponse(
            response=result["response"],
            confidence=result.get("confidence", 0.9),
            sources=result.get("sources", [])
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== SKILL ANALYSIS ENDPOINTS ====================

@app.get("/api/skills-analysis")
async def analyze_skills():
    """
    Get detailed skill analysis.
    
    Returns breakdown of skills by category (frontend, backend, tools, databases)
    with proficiency levels and related technologies.
    """
    try:
        analysis = skill_analyzer.analyze_skills()
        
        return SkillsAnalysisResponse(
            frontend_skills=analysis.get("frontend_skills", []),
            backend_skills=analysis.get("backend_skills", []),
            tools_and_devops=analysis.get("tools_and_devops", []),
            databases_and_apis=analysis.get("databases_and_apis", []),
            summary=f"Expert in {len([s for cat in analysis.values() for s in cat if 'Expert' in str(s.get('proficiency_level'))])} technologies"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/skills/specialties")
async def get_specialties():
    """Get identified specialty areas."""
    try:
        specialties = skill_analyzer.get_specialty_areas()
        return {"specialties": specialties}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== PROJECT ENDPOINTS ====================

@app.post("/api/projects/recommend", response_model=RecommendationResponse)
async def recommend_projects(request: RecommendationRequest):
    """
    Get project recommendations based on interests.
    
    Example:
    {
        "interests": ["React", "Node.js", "full-stack"],
        "limit": 5
    }
    """
    try:
        recommendations = recommendation_service.recommend_projects(
            request.interests,
            request.limit
        )
        
        return RecommendationResponse(
            recommendations=recommendations,
            explanation=f"Found {len(recommendations)} projects matching your interests in {', '.join(request.interests)}"
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/projects")
async def get_all_projects():
    """Get all projects from portfolio."""
    try:
        return {
            "projects": portfolio_loader.projects_data,
            "total": len(portfolio_loader.projects_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/projects/{project_id}/analysis")
async def analyze_project(project_id: str):
    """
    Get detailed analysis of a specific project.
    
    Includes:
    - Key features
    - Learning outcomes
    - Suggested improvements
    """
    try:
        analysis = project_analyzer.analyze_project(project_id)
        if not analysis:
            raise HTTPException(status_code=404, detail="Project not found")
        return analysis
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== BLOG SEARCH ENDPOINTS ====================

@app.post("/api/blog-search", response_model=BlogSearchResponse)
async def search_blogs(request: BlogSearchRequest):
    """
    Semantic search across blog posts.
    
    Example queries:
    - "JavaScript performance"
    - "Docker deployment"
    - "React best practices"
    """
    try:
        # Simple keyword matching for now
        query_lower = request.query.lower()
        results = []
        
        for blog in portfolio_loader.blog_data:
            # Check if query matches tags or title
            if any(term in query_lower for term in blog.get("tags", [])) or \
               any(word in query_lower for word in blog.get("title", "").lower().split()):
                results.append(blog)
        
        return BlogSearchResponse(
            results=results[:request.limit],  # type: ignore
            search_query=request.query,
            total_results=len(results)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/blog")
async def get_all_blogs():
    """Get all blog posts."""
    try:
        return {
            "blogs": portfolio_loader.blog_data,
            "total": len(portfolio_loader.blog_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== CODING STATS ENDPOINTS ====================

@app.get("/api/coding-stats")
async def get_coding_stats():
    """
    Get aggregated coding statistics from multiple platforms.
    
    Includes:
    - GitHub stats (repos, stars, languages)
    - LeetCode metrics (if available)
    - GeeksForGeeks score (if available)
    """
    try:
        github_stats = None
        if github_service:
            github_stats = await github_service.get_user_stats()
        
        return CodingStats(
            github_stats=github_stats,
            leetcode_solved=150,  # Placeholder - integrate real API
            leetcode_easy=50,
            leetcode_medium=70,
            leetcode_hard=30,
            geeksforgeeks_score=4500
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/api/github-stats")
async def get_github_stats():
    """Get detailed GitHub statistics."""
    if not github_service:
        raise HTTPException(
            status_code=503,
            detail="GitHub service not available. Configure GITHUB_TOKEN and GITHUB_USERNAME."
        )
    
    try:
        stats = await github_service.get_user_stats()
        return stats
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== EXPERIENCE & RESUME ENDPOINTS ====================

@app.get("/api/experience")
async def get_experience():
    """Get career experience timeline."""
    try:
        return {
            "experience": portfolio_loader.experience_data,
            "total": len(portfolio_loader.experience_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/resume-query", response_model=ResumeQueryResponse)
async def query_resume(request: ResumeQueryRequest):
    """
    Ask questions about the resume/experience.
    
    Example queries:
    - "What is your most recent position?"
    - "How many years of experience do you have?"
    - "What technologies are you skilled in?"
    """
    if not chat_service:
        raise HTTPException(
            status_code=503,
            detail="Chat service not available. Configure OPENAI_API_KEY."
        )
    
    try:
        # Use chat service with experience context
        result = await chat_service.chat(request.question)
        
        return ResumeQueryResponse(
            answer=result["response"],
            relevant_sections=["experience", "skills"],
            confidence=result.get("confidence", 0.9)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== CERTIFICATIONS ENDPOINTS ====================

@app.get("/api/certifications")
async def get_certifications():
    """Get all certifications."""
    try:
        return {
            "certifications": portfolio_loader.certifications_data,
            "total": len(portfolio_loader.certifications_data)
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== PORTFOLIO DATA ENDPOINT ====================

@app.get("/api/portfolio")
async def get_complete_portfolio():
    """Get complete portfolio data."""
    try:
        return portfolio_loader.get_all_portfolio_data()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# ==================== ROOT ENDPOINT ====================

@app.get("/")
async def root():
    """Root endpoint with API documentation."""
    return {
        "message": f"Welcome to {settings.OWNER_NAME}'s Portfolio MCP Server",
        "version": "1.0.0",
        "documentation": "/docs",
        "endpoints": {
            "chat": "/api/chat",
            "skills": "/api/skills-analysis",
            "projects": "/api/projects",
            "recommendations": "/api/projects/recommend",
            "blog": "/api/blog-search",
            "coding_stats": "/api/coding-stats",
            "experience": "/api/experience",
            "certifications": "/api/certifications",
            "portfolio": "/api/portfolio"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host=settings.API_HOST,
        port=settings.API_PORT,
        reload=settings.DEBUG
    )
