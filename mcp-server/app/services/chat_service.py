from typing import Optional, List, Dict, Any
from ..loaders.portfolio_loader import PortfolioLoader
from ..models.schemas import ChatMessage


class ChatService:
    """Service for handling portfolio chat interactions using LangChain."""
    
    def __init__(self, api_key: str = None, provider: str = "openai", owner_name: str = "Ajay"):
        self.api_key = api_key
        self.provider = provider or "openai"
        self.owner_name = owner_name
        self.portfolio_loader = PortfolioLoader()
        self._initialize_llm()
    
    def _initialize_llm(self):
        """Initialize LangChain LLM based on provider."""
        try:
            if self.provider == "groq":
                from langchain_groq import ChatGroq
                self.llm = ChatGroq(
                    api_key=self.api_key,
                    model="llama-3.3-70b-versatile",
                    temperature=0.7
                )
            elif self.provider == "huggingface":
                from langchain_huggingface import HuggingFaceEndpoint
                self.llm = HuggingFaceEndpoint(
                    repo_id="HuggingFaceH4/zephyr-7b-beta",
                    huggingfacehub_api_token=self.api_key,
                    task="text-generation"
                )
            elif self.provider == "ollama":
                from langchain_ollama import ChatOllama
                self.llm = ChatOllama(
                    model="mistral",
                    temperature=0.7
                )
            else:  # default to openai
                from langchain_openai import ChatOpenAI
                self.llm = ChatOpenAI(
                    api_key=self.api_key,
                    model="gpt-3.5-turbo",
                    temperature=0.7
                )
        except ImportError as e:
            print(f"Warning: Could not load {self.provider} - {str(e)}")
            self.llm = None
    
    def _prepare_context(self) -> str:
        """Prepare portfolio context for the LLM."""
        portfolio_data = self.portfolio_loader.get_all_portfolio_data()

        about_summary = self._summarize_about(portfolio_data.get("about", {}))
        projects_summary = self._summarize_projects(portfolio_data["projects"])
        skills_summary = self._summarize_skills(portfolio_data["skills"])
        experience_summary = self._summarize_experience(portfolio_data["experience"])

        context = f"""
You are an intelligent assistant for {self.owner_name}'s portfolio.
You have access to the following information about {self.owner_name}:

ABOUT:
{about_summary}

PROJECTS:
{projects_summary}

SKILLS:
{skills_summary}

EXPERIENCE:
{experience_summary}

When answering, be clear, helpful, and respond based on the user's question type:
- If the user asks "Who are you", include a brief intro + key strengths.
- If the user asks about projects, highlight relevant projects with tech used.
- If the user asks about skills, summarize top skills and recent tools.
- If the user asks about experience/roles, give a brief timeline with outcomes.

Always reference specific projects, technologies, or achievements when relevant.
"""
        return context
    
    def _summarize_projects(self, projects: List[Dict[str, Any]]) -> str:
        """Create a summary of projects."""
        summary = ""
        for project in projects:
            summary += f"\n- {project['title']}: {project['description']}"
            summary += f"\n  Technologies: {', '.join(project['technologies'])}"
        return summary
    
    def _summarize_skills(self, skills: Dict[str, List[Dict[str, Any]]]) -> str:
        """Create a summary of skills."""
        summary = ""
        for category, skill_list in skills.items():
            summary += f"\n{category.upper()}:"
            for skill in skill_list:
                summary += f"\n  - {skill['name']} (Proficiency: {skill['proficiency']})"
        return summary
    
    def _summarize_about(self, about: Dict[str, Any]) -> str:
        """Create a summary of the about section."""
        if not about:
            return "No about information available."

        lines = [about.get("bio", ""), ""]
        strengths = about.get("key_strengths", [])
        if strengths:
            lines.append("Key strengths:")
            for s in strengths:
                lines.append(f"- {s}")

        lines.append("")
        lines.append(f"Current focus: {', '.join(about.get('current_focus', []))}")
        return "\n".join([line for line in lines if line])

    def _summarize_experience(self, experience: List[Dict[str, Any]]) -> str:
        """Create a summary of experience."""
        summary = ""
        for exp in experience:
            summary += f"\n- {exp['position']} at {exp['company']} ({exp['duration']})"
            summary += f"\n  {exp['description']}"
        return summary
    
    async def chat(self, query: str, conversation_history: Optional[List[ChatMessage]] = None) -> Dict[str, Any]:
        """Process chat query and return response."""
        if not self.llm:
            return {
                "response": "Chat service not available. Please check the configured API key or provider.",
                "confidence": 0,
                "sources": []
            }

        # First attempt to answer using structured data rules.
        rule_based = self.answer_question(query)
        if rule_based:
            return {
                "response": rule_based,
                "confidence": 0.95,
                "sources": ["rule_based"]
            }

        try:
            context = self._prepare_context()

            # Build conversation history
            messages = [
                {"role": "system", "content": context}
            ]

            if conversation_history:
                for msg in conversation_history:
                    messages.append({
                        "role": msg.role,
                        "content": msg.content
                    })

            messages.append({"role": "user", "content": query})

            # Get response from LLM
            response = self.llm.invoke(messages)

            return {
                "response": response.content,
                "confidence": 0.9,
                "sources": ["llm"]
            }

        except Exception as e:
            return {
                "response": f"Error processing query: {str(e)}",
                "confidence": 0,
                "sources": []
            }
    
    def answer_question(self, question: str) -> str:
        """Answer a specific question about the portfolio."""
        normalized = question.lower().strip()

        # Rule-based answers for high-confidence questions
        if any(phrase in normalized for phrase in ["who are you", "tell me about yourself", "introduce yourself"]):
            about = self.portfolio_loader.about_data
            return (
                f"I'm {about.get('name')} — a {about.get('title')} with {about.get('years_of_experience')} years of experience. "
                f"{about.get('summary')}\n\nKey strengths include: {', '.join(about.get('key_strengths', [])[:3])}. "
                "I focus on building scalable, AI-powered applications and delivering high-quality, user-first solutions."
            )

        if "project" in normalized or "built" in normalized:
            return self._get_projects_response()

        if "technology" in normalized or "stack" in normalized or "tools" in normalized:
            return self._get_technologies_response()

        if "experience" in normalized or "role" in normalized or "worked" in normalized:
            return self._get_experience_response()

        if "skill" in normalized or "strength" in normalized or "expert" in normalized:
            return self._get_strongest_skill_response()

        if "recent" in normalized or "currently" in normalized or "now" in normalized:
            return self._get_recent_work_response()

        # Otherwise, no rule-based answer available
        return None
    
    def _get_projects_response(self) -> str:
        """Get response about projects."""
        projects = self.portfolio_loader.projects_data
        response = f"{self.owner_name} has built {len(projects)} main projects:\n\n"
        for i, proj in enumerate(projects, 1):
            response += f"{i}. {proj['title']}: {proj['description']}\n"
        return response
    
    def _get_technologies_response(self) -> str:
        """Get response about technologies."""
        skills = self.portfolio_loader.skills_data
        response = f"{self.owner_name} specializes in:\n\n"
        for category, skill_list in skills.items():
            response += f"{category.upper()}: {', '.join([s['name'] for s in skill_list if s['proficiency'] in ['Advanced', 'Expert']])}\n"
        return response
    
    def _get_experience_response(self) -> str:
        """Get response about experience."""
        exp = self.portfolio_loader.experience_data
        response = f"{self.owner_name}'s Experience:\n\n"
        for e in exp:
            response += f"{e['position']} at {e['company']} ({e['duration']})\n"
            response += f"{e['description']}\n\n"
        return response
    
    def _get_strongest_skill_response(self) -> str:
        """Get response about strongest skill."""
        skills = self.portfolio_loader.skills_data
        expert_skills = []
        for category, skill_list in skills.items():
            for skill in skill_list:
                if skill['proficiency'] == 'Expert':
                    expert_skills.append(f"{skill['name']} ({skill['years']} years)")
        
        if expert_skills:
            return f"{self.owner_name}'s strongest skills are: {', '.join(expert_skills)}"
        return "Unable to determine strongest skills."
    
    def _get_recent_work_response(self) -> str:
        """Get response about recent work."""
        exp = self.portfolio_loader.experience_data
        if exp:
            latest = exp[0]  # First one is most recent
            return f"{self.owner_name}'s recent work: {latest['position']} at {latest['company']}\n{latest['description']}"
        return "No recent work information available."
