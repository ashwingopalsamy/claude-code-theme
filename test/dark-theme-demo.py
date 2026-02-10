# Claude Code Theme Demo - Python

from typing import List, Optional, Dict, Any
import asyncio
import json
from dataclasses import dataclass
from enum import Enum
import logging

# Setup logging
logger = logging.getLogger(__name__)

class Status(Enum):
    """User status enumeration"""
    ACTIVE = "active"
    INACTIVE = "inactive" 
    PENDING = "pending"

@dataclass
class User:
    """User data class"""
    id: int
    name: str
    email: str
    status: Status
    metadata: Dict[str, Any]
    
    def is_active(self) -> bool:
        return self.status == Status.ACTIVE
    
    def __str__(self) -> str:
        return f"User(id={self.id}, name='{self.name}', status={self.status.value})"

class UserManager:
    """Manages user operations"""
    
    def __init__(self):
        self.users: Dict[int, User] = {}
        self._cache: Optional[List[User]] = None
        
    async def create_user(self, name: str, email: str, **kwargs) -> User:
        """Create a new user"""
        user_id = len(self.users) + 1
        
        # Validate email format
        if not '@' in email:
            raise ValueError(f"Invalid email format: {email}")
            
        user = User(
            id=user_id,
            name=name,
            email=email,
            status=Status.PENDING,
            metadata=kwargs
        )
        
        self.users[user_id] = user
        self._cache = None  # Invalidate cache
        
        logger.info(f"Created user: {user}")
        return user
    
    def get_active_users(self) -> List[User]:
        """Get all active users"""
        return [user for user in self.users.values() if user.is_active()]
    
    async def bulk_update_status(self, user_ids: List[int], status: Status):
        """Update status for multiple users"""
        updated_count = 0
        
        for user_id in user_ids:
            if user_id in self.users:
                self.users[user_id].status = status
                updated_count += 1
            else:
                logger.warning(f"User {user_id} not found")
                
        logger.info(f"Updated {updated_count} users to status {status.value}")
        
    def to_json(self) -> str:
        """Serialize users to JSON"""
        data = {
            "users": [
                {
                    "id": user.id,
                    "name": user.name,
                    "email": user.email,
                    "status": user.status.value,
                    "metadata": user.metadata
                }
                for user in self.users.values()
            ],
            "total_count": len(self.users)
        }
        return json.dumps(data, indent=2)

# Async context manager
class DatabaseConnection:
    """Simulated database connection"""
    
    def __init__(self, connection_string: str):
        self.connection_string = connection_string
        self.connected = False
        
    async def __aenter__(self):
        await self.connect()
        return self
        
    async def __aexit__(self, exc_type, exc_val, exc_tb):
        await self.disconnect()
        
    async def connect(self):
        """Simulate connection"""
        await asyncio.sleep(0.1)
        self.connected = True
        logger.debug("Database connected")
        
    async def disconnect(self):
        """Simulate disconnection"""
        await asyncio.sleep(0.1)
        self.connected = False
        logger.debug("Database disconnected")

# Advanced example with decorators and generators
def retry(max_attempts: int = 3):
    """Retry decorator"""
    def decorator(func):
        async def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return await func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    logger.warning(f"Attempt {attempt + 1} failed: {e}")
                    await asyncio.sleep(0.5 * (attempt + 1))
            return None
        return wrapper
    return decorator

def fibonacci_generator(n: int):
    """Generate fibonacci sequence"""
    a, b = 0, 1
    count = 0
    while count < n:
        yield a
        a, b = b, a + b
        count += 1

@retry(max_attempts=5)
async def fetch_user_data(user_id: int) -> Optional[Dict[str, Any]]:
    """Fetch user data with retry logic"""
    async with DatabaseConnection("postgresql://localhost:5432/users") as db:
        if not db.connected:
            raise ConnectionError("Failed to connect to database")
            
        # Simulate API call
        await asyncio.sleep(0.2)
        
        if user_id <= 0:
            return None
            
        return {
            "user_id": user_id,
            "profile": {
                "preferences": ["dark_mode", "notifications_enabled"],
                "settings": {"theme": "claude-code-dark", "language": "en"}
            },
            "last_login": "2024-08-27T14:00:00Z",
            "permissions": ["read", "write", "delete"]
        }

# Main execution
async def main():
    """Main function demonstrating dark theme syntax highlighting"""
    # Initialize user manager
    manager = UserManager()
    
    # Create some users
    users_data = [
        ("Alice Smith", "alice@example.com", {"role": "admin"}),
        ("Bob Johnson", "bob@example.com", {"role": "user"}),
        ("Carol Williams", "carol@example.com", {"role": "moderator"})
    ]
    
    for name, email, metadata in users_data:
        user = await manager.create_user(name, email, **metadata)
        print(f"Created: {user}")
    
    # Update statuses
    await manager.bulk_update_status([1, 2], Status.ACTIVE)
    
    # Get active users
    active_users = manager.get_active_users()
    print(f"\nActive users: {len(active_users)}")
    
    # Demonstrate fibonacci generator
    fib_numbers = list(fibonacci_generator(10))
    print(f"Fibonacci sequence: {fib_numbers}")
    
    # Fetch user data with retry
    try:
        user_data = await fetch_user_data(1)
        if user_data:
            print(f"\nUser data: {json.dumps(user_data, indent=2)}")
    except Exception as e:
        print(f"Failed to fetch user data: {e}")
    
    # Output JSON representation
    print(f"\nAll users JSON:\n{manager.to_json()}")

if __name__ == "__main__":
    # Configure logging
    logging.basicConfig(
        level=logging.INFO,
        format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
    )
    
    # Run main function
    asyncio.run(main())
