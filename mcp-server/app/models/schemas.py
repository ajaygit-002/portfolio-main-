from pydantic import BaseModel, Field
from typing import Optional, List, Dict, Any


# Chat Schemas
class ChatMessage(BaseModel):
    role: str = Field(..., description="Role of the message sender (user/assistant)")
    content: str = Field(..., description="Content of the message")


class ChatRequest(BaseModel):
    query: str = Field(..., description="User query")
    conversation_history: Optional[List[ChatMessage]] = Field(
        default=None, description="Previous conversation messages"
    )


class ChatResponse(BaseModel):
    response: str = Field(..., description="AI Assistant response")
    confidence: float = Field(default=0.9, description="Confidence score")
    sources: Optional[List[str]] = Field(default=None, description="Sources referenced")


# Project Recommendation Schemas
class ProjectRecommendation(BaseModel):
    project_id: str
    title: str
    relevance_score: float
    reason: str


class RecommendationRequest(BaseModel):
    interests: List[str] = Field(..., description="User interests/technologies")
    limit: int = Field(default=5, description="Number of recommendations")


class RecommendationResponse(BaseModel):
    recommendations: List[ProjectRecommendation]
    explanation: str


# Skill Analysis Schemas
class SkillAnalysis(BaseModel):
    skill: str
    proficiency_level: str  # Beginner, Intermediate, Advanced, Expert
    projects_count: int
    related_technologies: List[str]


class SkillsAnalysisResponse(BaseModel):
    frontend_skills: List[SkillAnalysis]
    backend_skills: List[SkillAnalysis]
    tools_and_devops: List[SkillAnalysis]
    databases_and_apis: List[SkillAnalysis]
    summary: str


# GitHub Stats Schemas
class GitHubRepository(BaseModel):
    name: str
    url: str
    description: Optional[str]
    stars: int
    language: str
    last_updated: str


class GitHubStats(BaseModel):
    total_repositories: int
    total_stars: int
    most_used_language: str
    repositories: List[GitHubRepository]
    contribution_stats: Dict[str, Any]


# Blog Search Schemas
class BlogPost(BaseModel):
    id: str
    title: str
    excerpt: str
    tags: List[str]
    published_date: str


class BlogSearchRequest(BaseModel):
    query: str = Field(..., description="Search query for blog posts")
    limit: int = Field(default=5, description="Max results")


class BlogSearchResponse(BaseModel):
    results: List[BlogPost]
    search_query: str
    total_results: int


# Coding Stats Schemas
class CodingStats(BaseModel):
    github_stats: Optional[GitHubStats]
    leetcode_solved: Optional[int]
    leetcode_easy: Optional[int]
    leetcode_medium: Optional[int]
    leetcode_hard: Optional[int]
    geeksforgeeks_score: Optional[int]


# Project Analysis Schemas
class ProjectAnalysis(BaseModel):
    project_id: str
    title: str
    description: str
    technologies: List[str]
    difficulty_level: str  # Easy, Medium, Hard
    key_features: List[str]
    learning_outcomes: List[str]
    suggested_improvements: List[str]


# Resume Query Schemas
class ResumeQueryRequest(BaseModel):
    question: str = Field(..., description="Question about the resume")
    context: Optional[str] = Field(default=None, description="Additional context")


class ResumeQueryResponse(BaseModel):
    answer: str
    relevant_sections: List[str]
    confidence: float
