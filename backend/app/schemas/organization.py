from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional, List
from app.models.enums import PermissionEnum


class OrganizationBase(BaseModel):
    title: str
    image_url: Optional[str] = None


class OrganizationCreate(OrganizationBase):
    pass


class OrganizationUpdate(BaseModel):
    title: Optional[str] = None
    image_url: Optional[str] = None


class OrganizationResponse(OrganizationBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class OrganizationStaffPermissionBase(BaseModel):
    organization_id: int
    user_id: int
    permission: PermissionEnum


class OrganizationStaffPermissionCreate(OrganizationStaffPermissionBase):
    pass


class OrganizationStaffPermissionUpdate(BaseModel):
    permission: Optional[PermissionEnum] = None


class OrganizationStaffPermissionResponse(OrganizationStaffPermissionBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
