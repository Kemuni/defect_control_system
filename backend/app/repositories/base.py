from typing import Generic, TypeVar, Type, Optional, List
from sqlmodel import SQLModel, Session, select

ModelType = TypeVar("ModelType", bound=SQLModel)


class BaseRepository(Generic[ModelType]):
    def __init__(self, model: Type[ModelType], session: Session):
        self.model = model
        self.session = session
    
    def create(self, **kwargs) -> ModelType:
        instance = self.model(**kwargs)
        self.session.add(instance)
        self.session.commit()
        self.session.refresh(instance)
        return instance
    
    def get_by_id(self, id: int) -> Optional[ModelType]:
        return self.session.get(self.model, id)
    
    def get_all(self, skip: int = 0, limit: int = 100) -> List[ModelType]:
        statement = select(self.model).offset(skip).limit(limit)
        results = self.session.exec(statement)
        return list(results.all())
    
    def update(self, id: int, **kwargs) -> Optional[ModelType]:
        instance = self.session.get(self.model, id)
        if instance:
            for key, value in kwargs.items():
                setattr(instance, key, value)
            self.session.add(instance)
            self.session.commit()
            self.session.refresh(instance)
        return instance
    
    def delete(self, id: int) -> bool:
        instance = self.session.get(self.model, id)
        if instance:
            self.session.delete(instance)
            self.session.commit()
            return True
        return False
