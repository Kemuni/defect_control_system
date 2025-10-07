from pydantic import BaseModel, Field, ConfigDict
from datetime import datetime
from typing import Optional, List


class DefectBase(BaseModel):
    title: str
    object_id: int
    description: Optional[str] = None
    priority: int = Field(default=5, ge=1, le=10)
    responsible_user_id: Optional[int] = None


class DefectCreate(DefectBase):
    pass


class DefectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    priority: Optional[int] = Field(None, ge=1, le=10)
    responsible_user_id: Optional[int] = None


class DefectImageBase(BaseModel):
    image_url: str
    defect_id: int


class DefectImageCreate(DefectImageBase):
    pass


class DefectImageResponse(DefectImageBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class DefectResponse(DefectBase):
    id: int
    last_edit_at: datetime
    created_at: datetime
    images: List[DefectImageResponse] = []
    
    model_config = ConfigDict(from_attributes=True)


class DefectSolutionBase(BaseModel):
    defect_id: int
    description: str


class DefectSolutionCreate(DefectSolutionBase):
    pass


class DefectSolutionUpdate(BaseModel):
    description: Optional[str] = None


class DefectSolutionImageBase(BaseModel):
    image_url: str
    defect_solution_id: int


class DefectSolutionImageCreate(DefectSolutionImageBase):
    pass


class DefectSolutionImageResponse(DefectSolutionImageBase):
    id: int
    created_at: datetime
    
    model_config = ConfigDict(from_attributes=True)


class DefectSolutionResponse(DefectSolutionBase):
    id: int
    last_edit_at: datetime
    created_at: datetime
    images: List[DefectSolutionImageResponse] = []
    
    model_config = ConfigDict(from_attributes=True)
