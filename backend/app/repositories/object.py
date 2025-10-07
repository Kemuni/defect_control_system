from typing import List
from sqlmodel import Session, select
from app.models.object import Object
from app.repositories.base import BaseRepository


class ObjectRepository(BaseRepository[Object]):
    def __init__(self, session: Session):
        super().__init__(Object, session)
    
    def get_by_organization(self, org_id: int) -> List[Object]:
        statement = select(Object).where(Object.organization_id == org_id)
        results = self.session.exec(statement)
        return list(results.all())
    
    def get_with_defects(self, object_id: int) -> Object:
        return self.session.get(Object, object_id)
