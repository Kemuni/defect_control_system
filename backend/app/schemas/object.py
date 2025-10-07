from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class ObjectBase(BaseModel):
    title: str
    organization_id: int
    image_url: Optional[str] = None
    default_responsible_user_id: Optional[int] = None


class ObjectCreate(ObjectBase):
    pass


class ObjectUpdate(BaseModel):
    title: Optional[str] = None
    image_url: Optional[str] = None
    default_responsible_user_id: Optional[int] = None


class ObjectResponse(ObjectBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)
