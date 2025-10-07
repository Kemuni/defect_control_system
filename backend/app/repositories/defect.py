from typing import List, Optional
from sqlmodel import Session, select
from app.models.defect import Defect, DefectImage, DefectSolution, DefectSolutionImage
from app.repositories.base import BaseRepository


class DefectRepository(BaseRepository[Defect]):
    def __init__(self, session: Session):
        super().__init__(Defect, session)
    
    def get_by_object(self, object_id: int, skip: int = 0, limit: int = 100) -> List[Defect]:
        statement = (
            select(Defect)
            .where(Defect.object_id == object_id)
            .offset(skip)
            .limit(limit)
        )
        results = self.session.exec(statement)
        return list(results.all())
    
    def get_by_responsible_user(self, user_id: int) -> List[Defect]:
        statement = select(Defect).where(Defect.responsible_user_id == user_id)
        results = self.session.exec(statement)
        return list(results.all())
    
    def get_with_details(self, defect_id: int) -> Optional[Defect]:
        return self.session.get(Defect, defect_id)


class DefectImageRepository(BaseRepository[DefectImage]):
    def __init__(self, session: Session):
        super().__init__(DefectImage, session)
    
    def get_by_defect(self, defect_id: int) -> List[DefectImage]:
        statement = select(DefectImage).where(DefectImage.defect_id == defect_id)
        results = self.session.exec(statement)
        return list(results.all())


class DefectSolutionRepository(BaseRepository[DefectSolution]):
    def __init__(self, session: Session):
        super().__init__(DefectSolution, session)
    
    def get_by_defect(self, defect_id: int) -> List[DefectSolution]:
        statement = select(DefectSolution).where(DefectSolution.defect_id == defect_id)
        results = self.session.exec(statement)
        return list(results.all())


class DefectSolutionImageRepository(BaseRepository[DefectSolutionImage]):
    def __init__(self, session: Session):
        super().__init__(DefectSolutionImage, session)
    
    def get_by_solution(self, solution_id: int) -> List[DefectSolutionImage]:
        statement = select(DefectSolutionImage).where(DefectSolutionImage.defect_solution_id == solution_id)
        results = self.session.exec(statement)
        return list(results.all())
