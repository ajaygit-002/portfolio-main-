from typing import List, Dict, Any
from ..loaders.portfolio_loader import PortfolioLoader


class ProjectAnalysisService:
    """Service for analyzing projects and providing insights."""
    
    def __init__(self):
        self.portfolio_loader = PortfolioLoader()
    
    def analyze_project(self, project_id: str) -> Dict[str, Any]:
        """Analyze a specific project and generate insights."""
        projects = self.portfolio_loader.projects_data
        project = next((p for p in projects if p['id'] == project_id), None)
        
        if not project:
            return {}
        
        return {
            "project_id": project_id,
            "title": project['title'],
            "description": project['description'],
            "technologies": project.get('technologies', []),
            "difficulty_level": project.get('difficulty', 'Medium'),
            "key_features": self._extract_features(project),
            "learning_outcomes": self._generate_learning_outcomes(project),
            "suggested_improvements": self._suggest_improvements(project)
        }
    
    def _extract_features(self, project: Dict[str, Any]) -> List[str]:
        """Extract key features from project."""
        features = []
        if project.get('metrics'):
            features.extend([
                f"Handles {project['metrics'].get('users', 'N/A')} users",
                f"Processes {project['metrics'].get('transactions', 'N/A')} transactions",
            ])
        
        tags = project.get('tags', [])
        if tags:
            features.extend(tags)
        
        return features[:5]  # Return top 5 features
    
    def _generate_learning_outcomes(self, project: Dict[str, Any]) -> List[str]:
        """Generate learning outcomes from project technologies."""
        return [
            f"Advanced {tech} development" for tech in project.get('technologies', [])[:3]
        ]
    
    def _suggest_improvements(self, project: Dict[str, Any]) -> List[str]:
        """Suggest improvements for the project."""
        suggestions = []
        
        techs = set(project.get('technologies', []))
        
        if not any(t in techs for t in ['GraphQL', 'REST API']):
            suggestions.append("Consider implementing GraphQL for more flexible queries")
        
        if not any(t in techs for t in ['Redis', 'Caching']):
            suggestions.append("Add caching layer with Redis for better performance")
        
        if not any(t in techs for t in ['Docker', 'Kubernetes']):
            suggestions.append("Containerize the application with Docker")
        
        if not any(t in techs for t in ['Testing', 'Jest', 'Pytest']):
            suggestions.append("Increase test coverage with comprehensive unit tests")
        
        return suggestions[:3]
    
    def get_project_by_difficulty(self, difficulty: str) -> List[Dict[str, Any]]:
        """Get projects by difficulty level."""
        return [
            p for p in self.portfolio_loader.projects_data
            if p.get('difficulty', '').lower() == difficulty.lower()
        ]


class SkillAnalysisService:
    """Service for analyzing and categorizing skills."""
    
    def __init__(self):
        self.portfolio_loader = PortfolioLoader()
    
    def analyze_skills(self) -> Dict[str, List[Dict[str, Any]]]:
        """Analyze all skills and provide detailed breakdown."""
        skills = self.portfolio_loader.skills_data
        
        result = {
            "frontend_skills": self._analyze_category(skills.get('frontend', [])),
            "backend_skills": self._analyze_category(skills.get('backend', [])),
            "tools_and_devops": self._analyze_category(skills.get('tools', [])),
            "databases_and_apis": self._analyze_category(skills.get('databases', []))
        }
        
        return result
    
    def _analyze_category(self, skill_list: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
        """Analyze a category of skills."""
        analyzed = []
        for skill in skill_list:
            # Find related technologies from projects
            projects = self.portfolio_loader.get_projects_by_technology(skill['name'])
            related = self._find_related_technologies(skill['name'])
            
            analyzed.append({
                "skill": skill['name'],
                "proficiency_level": skill.get('proficiency', 'Intermediate'),
                "projects_count": len(projects),
                "related_technologies": related,
                "years_of_experience": skill.get('years', 0)
            })
        
        return sorted(analyzed, key=lambda x: x['projects_count'], reverse=True)
    
    def _find_related_technologies(self, tech: str) -> List[str]:
        """Find technologies that work with a given technology."""
        tech_pairs = {
            "React": ["JavaScript", "TypeScript", "Tailwind CSS", "Next.js"],
            "Next.js": ["React", "TypeScript", "Node.js", "PostgreSQL"],
            "Node.js": ["Express.js", "MongoDB", "PostgreSQL", "JavaScript"],
            "TypeScript": ["React", "Node.js", "Express.js"],
            "Python": ["Django", "Flask", "FastAPI"],
            "MongoDB": ["Node.js", "Express.js", "Python"],
            "PostgreSQL": ["Node.js", "Python", "Express.js"],
        }
        
        return tech_pairs.get(tech, [])
    
    def get_skill_by_proficiency(self, proficiency: str) -> List[Dict[str, Any]]:
        """Get all skills with a specific proficiency level."""
        all_skills = []
        for category in self.portfolio_loader.skills_data.values():
            for skill in category:
                if skill.get('proficiency', '').lower() == proficiency.lower():
                    all_skills.append(skill)
        
        return all_skills
    
    def get_specialty_areas(self) -> List[str]:
        """Identify specialty areas based on skills and projects."""
        specialties = []
        
        if self._has_skills(['React', 'Next.js', 'TypeScript']):
            specialties.append("Modern Frontend Development")
        
        if self._has_skills(['Node.js', 'Express.js', 'MongoDB']):
            specialties.append("Full-Stack JavaScript")
        
        if self._has_skills(['Python', 'FastAPI']):
            specialties.append("Python Backend Development")
        
        if self._has_skills(['Docker', 'Kubernetes']):
            specialties.append("DevOps & Deployment")
        
        if self._has_skills(['GraphQL', 'REST API']):
            specialties.append("API Design & Development")
        
        return specialties
    
    def _has_skills(self, skill_names: List[str]) -> bool:
        """Check if developer has all skills in the list."""
        all_skills = []
        for category in self.portfolio_loader.skills_data.values():
            all_skills.extend([s['name'] for s in category])
        
        return all(skill in all_skills for skill in skill_names)


class RecommendationService:
    """Service for recommending projects based on interests."""
    
    def __init__(self):
        self.portfolio_loader = PortfolioLoader()
        self.project_analyzer = ProjectAnalysisService()
    
    def recommend_projects(self, interests: List[str], limit: int = 5) -> List[Dict[str, Any]]:
        """Recommend projects based on user interests."""
        interests_lower = [i.lower() for i in interests]
        
        scored_projects = []
        
        for project in self.portfolio_loader.projects_data:
            score = self._calculate_relevance_score(project, interests_lower)
            if score > 0:
                scored_projects.append({
                    "project_id": project['id'],
                    "title": project['title'],
                    "relevance_score": score,
                    "reason": self._generate_reason(project, interests_lower),
                    "technologies": project.get('technologies', [])
                })
        
        # Sort by score and return top N
        sorted_projects = sorted(scored_projects, key=lambda x: x['relevance_score'], reverse=True)
        return sorted_projects[:limit]
    
    def _calculate_relevance_score(self, project: Dict[str, Any], interests: List[str]) -> float:
        """Calculate how relevant a project is to given interests."""
        score = 0
        
        # Check technologies
        project_techs = [t.lower() for t in project.get('technologies', [])]
        tech_matches = sum(1 for i in interests if i in project_techs or i in project.get('title', '').lower())
        score += tech_matches * 10
        
        # Check tags
        project_tags = [t.lower() for t in project.get('tags', [])]
        tag_matches = sum(1 for i in interests if i in project_tags)
        score += tag_matches * 5
        
        # Bonus for difficult projects if interested in challenges
        if any(keyword in interests for keyword in ['challenge', 'complex', 'advanced']):
            if project.get('difficulty') == 'Hard':
                score += 5
        
        return score
    
    def _generate_reason(self, project: Dict[str, Any], interests: List[str]) -> str:
        """Generate a reason for the recommendation."""
        matching_techs = []
        for tech in project.get('technologies', []):
            if tech.lower() in interests:
                matching_techs.append(tech)
        
        if matching_techs:
            return f"Uses {', '.join(matching_techs)} which matches your interests"
        
        return "Related to your interests in development"
