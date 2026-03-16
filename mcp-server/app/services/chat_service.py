from typing import Optional, List, Dict, Any
from ..loaders.portfolio_loader import PortfolioLoader  # type: ignore
from ..models.schemas import ChatMessage  # type: ignore


class ChatService:
    """Service for handling portfolio chat interactions using LangChain."""
    
    def __init__(self, api_key: Optional[str] = None, provider: str = "openai", owner_name: str = "Ajay"):
        self.api_key = api_key
        self.provider = provider or "openai"
        self.owner_name = owner_name
        self.portfolio_loader = PortfolioLoader()
        self.llm: Any = None
        self._initialize_llm()
    
    def _initialize_llm(self):
        """Initialize LangChain LLM based on provider."""
        try:
            if self.provider == "groq":
                from langchain_groq import ChatGroq  # type: ignore
                self.llm = ChatGroq(
                    api_key=self.api_key,
                    model="llama-3.3-70b-versatile",
                    temperature=0.7
                )
            elif self.provider == "huggingface":
                from langchain_huggingface import HuggingFaceEndpoint  # type: ignore
                self.llm = HuggingFaceEndpoint(
                    repo_id="HuggingFaceH4/zephyr-7b-beta",
                    huggingfacehub_api_token=self.api_key,
                    task="text-generation"
                )
            elif self.provider == "ollama":
                from langchain_ollama import ChatOllama  # type: ignore
                self.llm = ChatOllama(
                    model="mistral",
                    temperature=0.7
                )
            else:  # default to openai
                from langchain_openai import ChatOpenAI  # type: ignore
                self.llm = ChatOpenAI(
                    api_key=self.api_key,
                    model="gpt-3.5-turbo",
                    temperature=0.7
                )
        except ImportError as e:
            print(f"Warning: Could not load {self.provider} - {str(e)}")
            self.llm = None
    
    def _prepare_context(self) -> str:
        """Prepare a rich, human-like portfolio context for the LLM."""
        portfolio_data = self.portfolio_loader.get_all_portfolio_data()
        
        about = portfolio_data.get("about", {})
        contact = portfolio_data.get("contact", {})
        projects = portfolio_data.get("projects", [])
        skills = portfolio_data.get("skills", {})
        experience = portfolio_data.get("experience", [])
        certifications = portfolio_data.get("certifications", [])

        about_section = self._build_about_section(about)
        contact_section = self._build_contact_section(contact)
        projects_section = self._build_projects_section(projects)
        skills_section = self._build_skills_section(skills)
        experience_section = self._build_experience_section(experience)
        certifications_section = self._build_certifications_section(certifications)

        context = f"""
You are {self.owner_name}'s personal portfolio AI assistant — warm, approachable, and genuinely enthusiastic about {self.owner_name}'s work.

== YOUR PERSONALITY ==
- You speak like a friendly, knowledgeable colleague — not a robotic FAQ bot
- You're proud of {self.owner_name}'s work and love talking about it
- Use natural language, casual tone, and occasional emojis where appropriate
- Be concise but insightful — give real value, not generic filler
- When you don't know something, say so honestly and redirect helpfully
- Adapt your response style based on the question type (see below)

== RESPONSE STYLE GUIDE ==

For INTRODUCTION questions ("who are you", "tell me about yourself"):
→ Give a warm, 3-4 sentence intro covering name, role, passion, and a standout achievement
→ End with an invitation to ask more

For PROJECT questions ("what have you built", "show me projects"):
→ Highlight 2-3 best projects with what makes them special (not just tech lists)
→ Mention real impact metrics when available (users, performance gains, etc.)
→ Ask if they want to dive deeper into any specific one

For SKILLS questions ("what do you know", "tech stack"):
→ Group by strength level, lead with expert skills
→ Mention real-world application ("Used React to build X serving Y users")
→ Show breadth AND depth

For EXPERIENCE questions ("where have you worked", "career"):
→ Tell it like a story: the journey from junior to senior
→ Highlight growth, key achievements, and leadership moments
→ Include specific numbers (40% performance improvement, team of 3, etc.)

For CONTACT questions ("how to reach", "email", "phone", "hire"):
→ Share ALL available contact details warmly
→ Encourage reaching out and express openness to opportunities

For HIRING/COLLABORATION questions ("are you available", "freelance", "hire"):
→ Express enthusiasm about potential opportunities
→ Share contact info and suggest next steps
→ Mention relevant experience for the context

For COMPARISON questions ("how does X compare to Y"):
→ Give honest, balanced analysis based on {self.owner_name}'s experience
→ Share personal preference with reasoning

For CASUAL/FUN questions ("favorite language", "hobbies"):
→ Be personable and genuine
→ Share personality alongside technical knowledge

== {self.owner_name.upper()}'S COMPLETE PROFILE ==

{about_section}

{contact_section}

{projects_section}

{skills_section}

{experience_section}

{certifications_section}

== IMPORTANT RULES ==
1. ALWAYS stay in character as {self.owner_name}'s portfolio assistant
2. NEVER make up information that isn't in the profile above
3. When asked about contact info, ALWAYS share the details provided
4. If someone asks something outside your knowledge, say: "I don't have that specific info, but feel free to reach out to {self.owner_name} directly!"
5. Reference specific projects, numbers, and achievements to sound credible
6. Keep responses under 200 words unless the user asks for detail
7. End responses with a natural follow-up question or suggestion when appropriate
"""
        return context

    def _build_about_section(self, about: Dict[str, Any]) -> str:
        """Build a rich about section."""
        if not about:
            return "ABOUT: No information available."
        
        lines = [f"ABOUT {about.get('name', 'Ajay').upper()}:"]
        lines.append(f"Title: {about.get('title', 'Full Stack Developer')}")
        lines.append(f"Bio: {about.get('bio', '')}")
        lines.append(f"Summary: {about.get('summary', '')}")
        lines.append(f"Years of Experience: {about.get('years_of_experience', 'N/A')}")
        lines.append(f"Projects Completed: {about.get('projects_completed', 'N/A')}")
        lines.append(f"Team Members Mentored: {about.get('team_members_mentored', 'N/A')}")
        lines.append(f"Open Source Contributions: {about.get('open_source_contributions', 'N/A')}")
        lines.append(f"Passion: {about.get('passion', '')}")
        
        strengths = about.get("key_strengths", [])
        if strengths:
            lines.append("Key Strengths:")
            for s in strengths:
                lines.append(f"  • {s}")
        
        focus = about.get("current_focus", [])
        if focus:
            lines.append(f"Currently Focused On: {', '.join(focus)}")
        
        return "\n".join(lines)
    
    def _build_contact_section(self, contact: Dict[str, Any]) -> str:
        """Build contact info section."""
        if not contact:
            return "CONTACT: No contact information available."
        
        lines = ["CONTACT INFORMATION:"]
        if contact.get("email"):
            lines.append(f"  📧 Email: {contact['email']}")
        if contact.get("phone"):
            lines.append(f"  📱 Phone: {contact['phone']}")
        if contact.get("location"):
            lines.append(f"  📍 Location: {contact['location']}")
        if contact.get("github"):
            lines.append(f"  💻 GitHub: {contact['github']}")
        if contact.get("linkedin"):
            lines.append(f"  🔗 LinkedIn: {contact['linkedin']}")
        if contact.get("twitter"):
            lines.append(f"  🐦 Twitter/X: {contact['twitter']}")
        if contact.get("website"):
            lines.append(f"  🌐 Website: {contact['website']}")
        lines.append(f"  💼 Availability: {contact.get('availability', 'Open to opportunities')}")
        
        return "\n".join(lines)

    def _build_projects_section(self, projects: List[Dict[str, Any]]) -> str:
        """Build detailed projects section."""
        if not projects:
            return "PROJECTS: No projects listed."
        
        lines = [f"PROJECTS ({len(projects)} total):"]
        for i, p in enumerate(projects, 1):
            lines.append(f"\n  {i}. {p['title']}")
            lines.append(f"     Description: {p['description']}")
            lines.append(f"     Tech Stack: {', '.join(p.get('technologies', []))}")
            lines.append(f"     Difficulty: {p.get('difficulty', 'N/A')}")
            metrics = p.get("metrics", {})
            if metrics:
                metric_str = ", ".join([f"{k}: {v}" for k, v in metrics.items()])
                lines.append(f"     Impact Metrics: {metric_str}")
            tags = p.get("tags", [])
            if tags:
                lines.append(f"     Tags: {', '.join(tags)}")
        
        return "\n".join(lines)
    
    def _build_skills_section(self, skills: Dict[str, List[Dict[str, Any]]]) -> str:
        """Build detailed skills section."""
        if not skills:
            return "SKILLS: No skills listed."
        
        lines = ["SKILLS & EXPERTISE:"]
        for category, skill_list in skills.items():
            cat_name = category.replace("_", " ").title()
            expert = [s for s in skill_list if s.get("proficiency") == "Expert"]
            advanced = [s for s in skill_list if s.get("proficiency") == "Advanced"]
            other = [s for s in skill_list if s.get("proficiency") not in ["Expert", "Advanced"]]
            
            lines.append(f"\n  {cat_name}:")
            if expert:
                expert_str = ', '.join([f"{s['name']} ({s.get('years', '?')}y)" for s in expert])
                lines.append(f"    Expert Level: {expert_str}")
            if advanced:
                advanced_str = ', '.join([f"{s['name']} ({s.get('years', '?')}y)" for s in advanced])
                lines.append(f"    Advanced Level: {advanced_str}")
            if other:
                other_str = ', '.join([s['name'] for s in other])
                lines.append(f"    Growing: {other_str}")
        
        return "\n".join(lines)
    
    def _build_experience_section(self, experience: List[Dict[str, Any]]) -> str:
        """Build detailed experience section."""
        if not experience:
            return "EXPERIENCE: No experience listed."
        
        lines = ["CAREER JOURNEY:"]
        for exp in experience:
            lines.append(f"\n  🏢 {exp['position']} — {exp['company']} ({exp['duration']})")
            lines.append(f"     {exp.get('description', '')}")
            achievements = exp.get("achievements", [])
            if achievements:
                lines.append("     Key Wins:")
                for a in achievements:
                    lines.append(f"       ✅ {a}")
            techs = exp.get("technologies", [])
            if techs:
                lines.append(f"     Stack Used: {', '.join(techs)}")
        
        return "\n".join(lines)
    
    def _build_certifications_section(self, certs: List[Dict[str, Any]]) -> str:
        """Build certifications section."""
        if not certs:
            return "CERTIFICATIONS: None listed."
        
        lines = ["CERTIFICATIONS:"]
        for c in certs:
            lines.append(f"  🏅 {c['title']} — {c['issuer']} ({c.get('issue_date', 'N/A')})")
        
        return "\n".join(lines)

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
    
    def answer_question(self, question: str) -> Optional[str]:
        """Answer a specific question about the portfolio using rule-based logic."""
        normalized = question.lower().strip()

        # Contact / reach out queries
        if any(phrase in normalized for phrase in [
            "how to contact", "what is your email", "contact details", 
            "phone number", "how to reach", "get in touch", "hire you"
        ]) or normalized in ["contact", "email", "phone", "hire"]:
            return self._get_contact_response()

        # Introduction queries
        if any(phrase in normalized for phrase in [
            "who are you", "tell me about yourself", "introduce yourself", 
            "what do you do", "give me an overview"
        ]):
            return self._get_intro_response()

        # Project queries
        if any(phrase in normalized for phrase in [
            "what projects", "show me your projects", "portfolio work",
            "what have you built", "list your projects"
        ]):
            return self._get_projects_response()

        # Technology / stack queries
        if any(phrase in normalized for phrase in [
            "what is your tech stack", "what technologies do you use",
            "what languages do you know", "list your skills", "tech stack"
        ]):
            return self._get_technologies_response()

        # Experience queries
        if any(phrase in normalized for phrase in [
            "where have you worked", "career history", "work experience",
            "job history", "past roles"
        ]):
            return self._get_experience_response()

        # Skill queries
        if any(phrase in normalized for phrase in [
            "strongest skill", "what are you best at", "core strengths",
            "top skills", "what do you specialize in"
        ]):
            return self._get_strongest_skill_response()

        # Recent work queries
        if any(phrase in normalized for phrase in [
            "what are you working on now", "current job", "current role",
            "recent work", "latest project"
        ]):
            return self._get_recent_work_response()

        # Otherwise, let the LLM handle it for more nuanced responses
        return None
    
    def _get_contact_response(self) -> str:
        """Get a warm, comprehensive contact response."""
        contact = self.portfolio_loader.contact_data
        about = self.portfolio_loader.about_data
        name = about.get("name", self.owner_name)
        
        response = f"Great question! Here's how you can reach {name}:\n\n"
        
        if contact.get("email"):
            response += f"📧 Email: {contact['email']}\n"
        if contact.get("phone"):
            response += f"📱 Phone: {contact['phone']}\n"
        if contact.get("location"):
            response += f"📍 Location: {contact['location']}\n"
        if contact.get("github"):
            response += f"💻 GitHub: {contact['github']}\n"
        if contact.get("linkedin"):
            response += f"🔗 LinkedIn: {contact['linkedin']}\n"
        if contact.get("twitter"):
            response += f"🐦 Twitter/X: {contact['twitter']}\n"
        
        response += f"\n{name} is currently {contact.get('availability', 'open to opportunities')}. "
        response += "Feel free to reach out — whether it's a project collaboration, job opportunity, or just a tech chat! 🚀"
        
        return response

    def _get_intro_response(self) -> str:
        """Get a warm, human-like introduction."""
        about = self.portfolio_loader.about_data
        name = about.get("name", self.owner_name)
        title = about.get("title", "Full Stack Developer")
        years = about.get("years_of_experience", "several")
        projects = about.get("projects_completed", "many")
        
        return (
            f"Hey there! 👋 I'm the AI assistant for {name}'s portfolio.\n\n"
            f"{name} is a {title} with {years} years of hands-on experience "
            f"and {projects}+ projects under their belt. They're passionate about "
            f"building innovative solutions — from AI-powered apps to scalable cloud architectures.\n\n"
            f"Key strengths include: {', '.join(about.get('key_strengths', [])[:4])}.\n\n"
            f"Want to know about specific projects, skills, or career journey? Just ask! 🚀"
        )
    
    def _get_projects_response(self) -> str:
        """Get conversational response about projects."""
        projects = self.portfolio_loader.projects_data
        name = self.owner_name
        response = f"{name} has built {len(projects)} notable projects. Here are the highlights:\n\n"
        
        for i, proj in enumerate(projects, 1):
            response += f"**{i}. {proj['title']}**\n"
            response += f"   {proj['description']}\n"
            response += f"   Tech: {', '.join(proj.get('technologies', []))}\n"
            metrics = proj.get("metrics", {})
            if metrics:
                highlights: List[str] = []
                for k, v in metrics.items():
                    highlights.append(f"{k.replace('_', ' ')}: {v:,}" if isinstance(v, int) else f"{k.replace('_', ' ')}: {v}")
                response += f"   Impact: {' | '.join(highlights)}\n"
            response += "\n"
        
        response += "Want me to dive deeper into any of these? 🔍"
        return response
    
    def _get_technologies_response(self) -> str:
        """Get conversational response about technologies."""
        skills = self.portfolio_loader.skills_data
        name = self.owner_name
        response = f"{name}'s tech arsenal:\n\n"
        
        for category, skill_list in skills.items():
            cat_name = category.replace("_", " ").upper()
            expert = [s['name'] for s in skill_list if s.get('proficiency') == 'Expert']
            advanced = [s['name'] for s in skill_list if s.get('proficiency') == 'Advanced']
            
            response += f"🔹 {cat_name}:\n"
            if expert:
                response += f"   Expert: {', '.join(expert)}\n"
            if advanced:
                response += f"   Advanced: {', '.join(advanced)}\n"
            response += "\n"
        
        response += "The sweet spot? Full-stack JavaScript/TypeScript with React + Node.js. 💪"
        return response
    
    def _get_experience_response(self) -> str:
        """Get story-like experience response."""
        exp = self.portfolio_loader.experience_data
        name = self.owner_name
        response = f"{name}'s career journey:\n\n"
        
        for e in exp:
            response += f"🏢 **{e['position']}** at {e['company']} ({e['duration']})\n"
            response += f"   {e['description']}\n"
            achievements = e.get("achievements", [])
            if achievements:
                for a in achievements[:2]:  # Top 2 achievements
                    response += f"   ✅ {a}\n"
            response += "\n"
        
        response += "From junior dev to senior engineer — a journey of constant growth! 📈"
        return response
    
    def _get_strongest_skill_response(self) -> str:
        """Get response about strongest skills."""
        skills = self.portfolio_loader.skills_data
        name = self.owner_name
        expert_skills = []
        for category, skill_list in skills.items():
            for skill in skill_list:
                if skill['proficiency'] == 'Expert':
                    expert_skills.append(f"{skill['name']} ({skill.get('years', '?')} years)")
        
        if expert_skills:
            return (
                f"🎯 {name}'s expert-level skills:\n\n"
                f"{chr(10).join(['  • ' + s for s in expert_skills])}\n\n"
                f"These aren't just theoretical — each one has been battle-tested "
                f"across multiple production projects. Want specifics on any of these?"
            )
        return f"Let me look into {name}'s specific skill levels for you."
    
    def _get_recent_work_response(self) -> str:
        """Get response about recent work."""
        exp = self.portfolio_loader.experience_data
        about = self.portfolio_loader.about_data
        name = self.owner_name
        
        if exp:
            latest = exp[0]
            focus = about.get("current_focus", [])
            return (
                f"{name} is currently working as **{latest['position']}** at {latest['company']}.\n\n"
                f"{latest.get('description', '')}\n\n"
                f"Current focus areas: {', '.join(focus) if focus else 'Building awesome things!'}\n\n"
                f"Interested in the details? I can tell you about specific projects or achievements! 💡"
            )
        return f"I don't have specific details on {name}'s current work, but feel free to reach out directly!"
