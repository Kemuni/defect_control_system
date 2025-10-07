from datetime import datetime
from typing import TYPE_CHECKING
from sqlmodel import Field, SQLModel, Relationship

if TYPE_CHECKING:
    from app.models.organization import OrganizationStaffPermission
    from app.models.object import Object
    from app.models.defect import Defect


class User(SQLModel, table=True):
    __tablename__ = "users"
    
    id: int | None = Field(default=None, primary_key=True)
    email: str = Field(max_length=255, unique=True, index=True)
    password: str = Field(max_length=255)
    last_activity: datetime | None = Field(default=None)
    is_active: bool = Field(default=True)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    organization_permissions: list["OrganizationStaffPermission"] = Relationship(back_populates="user", cascade_delete=True)
    default_responsible_objects: list["Object"] = Relationship(back_populates="default_responsible_user")
    responsible_defects: list["Defect"] = Relationship(back_populates="responsible_user")
