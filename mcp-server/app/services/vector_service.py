import os
import json
import numpy as np
from typing import List, Dict, Any, Tuple, Optional
import faiss
from pathlib import Path


class VectorDatabase:
    """FAISS-based vector database for semantic search."""
    
    def __init__(self, db_path: str = "./data/vector_db", embedding_dim: int = 1536):
        self.db_path = Path(db_path)
        self.db_path.mkdir(parents=True, exist_ok=True)
        self.embedding_dim = embedding_dim
        self.index_path = self.db_path / "faiss_index"
        self.metadata_path = self.db_path / "metadata.json"
        
        # Load or create index
        self.index = self._load_or_create_index()
        self.metadata = self._load_metadata()
    
    def _load_or_create_index(self) -> faiss.IndexFlatL2:
        """Load existing FAISS index or create new one."""
        if self.index_path.exists():
            return faiss.read_index(str(self.index_path))
        else:
            # Create new index with L2 distance
            index = faiss.IndexFlatL2(self.embedding_dim)
            return index
    
    def _load_metadata(self) -> Dict[int, Dict[str, Any]]:
        """Load metadata for embeddings."""
        if self.metadata_path.exists():
            with open(self.metadata_path, 'r') as f:
                data = json.load(f)
                return {int(k): v for k, v in data.items()}
        return {}
    
    def _save_metadata(self):
        """Save metadata to file."""
        with open(self.metadata_path, 'w') as f:
            # Convert int keys to strings for JSON serialization
            data = {str(k): v for k, v in self.metadata.items()}
            json.dump(data, f, indent=2)
    
    def add_documents(self, documents: List[Dict[str, Any]], embeddings: List[List[float]]):
        """Add documents with their embeddings to the database."""
        if not documents or not embeddings:
            return
        
        embeddings_array = np.array(embeddings, dtype=np.float32)
        
        # Get starting index for metadata
        start_idx = len(self.metadata)
        
        # Add embeddings to index
        self.index.add(embeddings_array)
        
        # Add metadata
        for idx, doc in enumerate(documents):
            self.metadata[start_idx + idx] = {
                "title": doc.get("title", ""),
                "content": doc.get("content", ""),
                "source": doc.get("source", ""),
                "type": doc.get("type", ""),
                "doc_id": doc.get("id", "")
            }
        
        # Save to disk
        self._save_index()
        self._save_metadata()
    
    def _save_index(self):
        """Save FAISS index to disk."""
        faiss.write_index(self.index, str(self.index_path))
    
    def search(self, query_embedding: List[float], k: int = 5) -> List[Tuple[float, Dict[str, Any]]]:
        """Search for similar documents."""
        if len(self.metadata) == 0:
            return []
        
        query_array = np.array([query_embedding], dtype=np.float32)
        distances, indices = self.index.search(query_array, min(k, len(self.metadata)))
        
        results = []
        for distance, idx in zip(distances[0], indices[0]):
            if idx != -1 and idx in self.metadata:
                results.append((float(distance), self.metadata[idx]))
        
        return results
    
    def clear(self):
        """Clear all data from the database."""
        self.index = faiss.IndexFlatL2(self.embedding_dim)
        self.metadata.clear()
        if self.index_path.exists():
            os.remove(self.index_path)
        if self.metadata_path.exists():
            os.remove(self.metadata_path)


class EmbeddingService:
    """Service for generating embeddings using OpenAI."""
    
    def __init__(self, api_key: str, model: str = "text-embedding-3-small"):
        self.api_key = api_key
        self.model = model
        self._initialize_client()
    
    def _initialize_client(self):
        """Initialize OpenAI client."""
        try:
            from openai import OpenAI
            self.client = OpenAI(api_key=self.api_key)
        except ImportError:
            self.client = None
    
    async def embed_text(self, text: str) -> Optional[List[float]]:
        """Generate embedding for text."""
        if not self.client:
            return None
        
        try:
            response = self.client.embeddings.create(
                input=text,
                model=self.model
            )
            return response.data[0].embedding
        except Exception as e:
            print(f"Error generating embedding: {e}")
            return None
    
    async def embed_batch(self, texts: List[str]) -> Optional[List[List[float]]]:
        """Generate embeddings for multiple texts."""
        if not self.client or not texts:
            return None
        
        try:
            response = self.client.embeddings.create(
                input=texts,
                model=self.model
            )
            return [item.embedding for item in response.data]
        except Exception as e:
            print(f"Error generating batch embeddings: {e}")
            return None
