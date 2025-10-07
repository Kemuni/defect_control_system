from typing import Optional
from sqlmodel import Session, select
from app.models.user import User
from app.repositories.base import BaseRepository


class UserRepository(BaseRepository[User]):
    def __init__(self, session: Session):
        super().__init__(User, session)
    
    def get_by_email(self, email: str) -> Optional[User]:
        statement = select(User).where(User.email == email)
        results = self.session.exec(statement)
        return results.first()
    
    def update_last_activity(self, user_id: int):
        from datetime import datetime
        self.update(user_id, last_activity=datetime.utcnow())
