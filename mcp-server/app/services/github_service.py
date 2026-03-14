import aiohttp
from typing import Optional, List, Dict, Any
from ..models.schemas import GitHubRepository, GitHubStats


class GitHubService:
    """Service for fetching GitHub statistics and repository information."""
    
    def __init__(self, github_token: str, username: str):
        self.github_token = github_token
        self.username = username
        self.api_url = "https://api.github.com"
        self.headers = {
            "Authorization": f"Bearer {github_token}",
            "Accept": "application/vnd.github.v3+json"
        }
    
    async def get_user_repos(self) -> Optional[List[Dict[str, Any]]]:
        """Fetch user's repositories from GitHub."""
        if not self.github_token:
            return None
        
        try:
            async with aiohttp.ClientSession() as session:
                url = f"{self.api_url}/users/{self.username}/repos"
                async with session.get(url, headers=self.headers) as response:
                    if response.status == 200:
                        repos = await response.json()
                        return repos
                    return None
        except Exception as e:
            print(f"Error fetching repos: {e}")
            return None
    
    async def get_user_stats(self) -> Optional[GitHubStats]:
        """Get comprehensive GitHub statistics."""
        if not self.github_token:
            return None
        
        try:
            repos = await self.get_user_repos()
            if not repos:
                return None
            
            total_stars = sum(repo.get('stargazers_count', 0) for repo in repos)
            
            # Get language statistics
            language_stats = {}
            for repo in repos:
                lang = repo.get('language')
                if lang:
                    language_stats[lang] = language_stats.get(lang, 0) + 1
            
            most_used_language = max(language_stats, key=language_stats.get) if language_stats else "Unknown"
            
            # Convert to GithubRepository objects
            repositories = []
            for repo in repos[:10]:  # Top 10 repos
                repositories.append(GitHubRepository(
                    name=repo['name'],
                    url=repo['html_url'],
                    description=repo.get('description', ''),
                    stars=repo.get('stargazers_count', 0),
                    language=repo.get('language', 'Unknown'),
                    last_updated=repo.get('updated_at', '')
                ))
            
            return GitHubStats(
                total_repositories=len(repos),
                total_stars=total_stars,
                most_used_language=most_used_language,
                repositories=repositories,
                contribution_stats={
                    "profile_url": f"https://github.com/{self.username}",
                    "total_repos": len(repos),
                    "public_repos": sum(1 for r in repos if not r.get('private')),
                    "followers_url": f"https://github.com/{self.username}?tab=followers"
                }
            )
        
        except Exception as e:
            print(f"Error getting GitHub stats: {e}")
            return None
    
    async def get_contribution_graph(self) -> Optional[Dict[str, Any]]:
        """Get contribution graph data."""
        if not self.github_token:
            return None
        
        try:
            async with aiohttp.ClientSession() as session:
                url = f"{self.api_url}/users/{self.username}"
                async with session.get(url, headers=self.headers) as response:
                    if response.status == 200:
                        user_data = await response.json()
                        return {
                            "profile_url": user_data.get('html_url'),
                            "public_repos": user_data.get('public_repos'),
                            "followers": user_data.get('followers'),
                            "following": user_data.get('following'),
                            "created_at": user_data.get('created_at'),
                            "updated_at": user_data.get('updated_at')
                        }
                    return None
        except Exception as e:
            print(f"Error fetching contribution graph: {e}")
            return None
    
    async def get_most_starred_repo(self) -> Optional[GitHubRepository]:
        """Get the most starred repository."""
        repos = await self.get_user_repos()
        if not repos:
            return None
        
        most_starred = max(repos, key=lambda x: x.get('stargazers_count', 0))
        return GitHubRepository(
            name=most_starred['name'],
            url=most_starred['html_url'],
            description=most_starred.get('description', ''),
            stars=most_starred.get('stargazers_count', 0),
            language=most_starred.get('language', 'Unknown'),
            last_updated=most_starred.get('updated_at', '')
        )
    
    async def get_most_forked_repo(self) -> Optional[GitHubRepository]:
        """Get the most forked repository."""
        repos = await self.get_user_repos()
        if not repos:
            return None
        
        most_forked = max(repos, key=lambda x: x.get('forks_count', 0))
        return GitHubRepository(
            name=most_forked['name'],
            url=most_forked['html_url'],
            description=most_forked.get('description', ''),
            stars=most_forked.get('stargazers_count', 0),
            language=most_forked.get('language', 'Unknown'),
            last_updated=most_forked.get('updated_at', '')
        )
