from datetime import datetime
from typing import TYPE_CHECKING, Optional
from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from app.models.organization import Organization
    from app.models.user import User
    from app.models.defect import Defect


class Object(SQLModel, table=True):
    __tablename__ = "objects"
    
    id: int | None = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organizations.id", ondelete="CASCADE")
    title: str = Field(max_length=255)
    image_url: str | None = Field(default=None, max_length=500)
    default_responsible_user_id: int | None = Field(default=None, foreign_key="users.id", ondelete="SET NULL")
    created_at: datetime = Field(default_factory=datetime.utcnow)

    organization: "Organization" = Relationship(back_populates="objects")
    default_responsible_user: Optional["User"] = Relationship(back_populates="default_responsible_objects")
    defects: list["Defect"] = Relationship(back_populates="object", cascade_delete=True)
