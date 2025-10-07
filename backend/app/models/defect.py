from datetime import datetime
from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from app.models.object import Object
    from app.models.user import User


class Defect(SQLModel, table=True):
    __tablename__ = "defects"

    id: int | None = Field(default=None, primary_key=True)
    object_id: int = Field(foreign_key="objects.id")
    title: str = Field(max_length=255)
    description: str | None = Field(default=None)
    priority: int = Field(default=5)  # 1-10
    responsible_user_id: int | None = Field(default=None, foreign_key="users.id", ondelete="SET NULL")
    last_edit_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    object: "Object" = Relationship(back_populates="defects")
    responsible_user: Optional["User"] = Relationship(back_populates="responsible_defects")
    images: list["DefectImage"] = Relationship(back_populates="defect", cascade_delete=True)
    solutions: list["DefectSolution"] = Relationship(back_populates="defect", cascade_delete=True)


class DefectImage(SQLModel, table=True):
    __tablename__ = "defect_images"

    id: int | None = Field(default=None, primary_key=True)
    image_url: str = Field(max_length=500)
    defect_id: int = Field(foreign_key="defects.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    defect: "Defect" = Relationship(back_populates="images")


class DefectSolution(SQLModel, table=True):
    __tablename__ = "defect_solutions"

    id: int | None = Field(default=None, primary_key=True)
    defect_id: int = Field(foreign_key="defects.id", ondelete="CASCADE")
    description: str
    last_edit_at: datetime = Field(default_factory=datetime.utcnow)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    defect: "Defect" = Relationship(back_populates="solutions")
    images: list["DefectSolutionImage"] = Relationship(back_populates="solution", cascade_delete=True)


class DefectSolutionImage(SQLModel, table=True):
    __tablename__ = "defect_solution_images"

    id: int | None = Field(default=None, primary_key=True)
    image_url: str = Field(max_length=500)
    defect_solution_id: int = Field(foreign_key="defect_solutions.id", ondelete="CASCADE")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    solution: "DefectSolution" = Relationship(back_populates="images")
