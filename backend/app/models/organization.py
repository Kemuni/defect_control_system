from datetime import datetime
from typing import TYPE_CHECKING
from sqlmodel import Field, SQLModel, Relationship
from app.models.enums import PermissionEnum

if TYPE_CHECKING:
    from app.models.user import User
    from app.models.object import Object


class Organization(SQLModel, table=True):
    __tablename__ = "organizations"
    
    id: int | None = Field(default=None, primary_key=True)
    title: str = Field(max_length=255)
    image_url: str | None = Field(default=None, max_length=500)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    staff_permissions: list["OrganizationStaffPermission"] = Relationship(back_populates="organization", cascade_delete=True)
    objects: list["Object"] = Relationship(back_populates="organization", cascade_delete=True)


class OrganizationStaffPermission(SQLModel, table=True):
    __tablename__ = "organization_staff_permissions"
    
    id: int | None = Field(default=None, primary_key=True)
    organization_id: int = Field(foreign_key="organizations.id", ondelete="CASCADE")
    user_id: int = Field(foreign_key="users.id", ondelete="CASCADE")
    permission: PermissionEnum
    created_at: datetime = Field(default_factory=datetime.utcnow)

    organization: "Organization" = Relationship(back_populates="staff_permissions")
    user: "User" = Relationship(back_populates="organization_permissions")
