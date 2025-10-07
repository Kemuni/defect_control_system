from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlmodel import Session
from typing import List, Optional
from app.database import get_session
from app.schemas.object import ObjectCreate, ObjectUpdate, ObjectResponse
from app.repositories.object import ObjectRepository
from app.repositories.organization import OrganizationStaffPermissionRepository
from app.auth import get_current_active_user
from app.models.user import User
from app.models.enums import PermissionEnum
from app.minio_client import minio_client

router = APIRouter(prefix="/objects", tags=["Objects"])


def check_object_access(object_id: int, user: User, session: Session):
    """Helper to check if user has access to object via organization"""
    obj_repo = ObjectRepository(session)
    obj = obj_repo.get_by_id(object_id)
    
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(obj.organization_id, user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this object")
    
    return obj, permission


@router.post("/", response_model=ObjectResponse, status_code=status.HTTP_201_CREATED)
def create_object(
    title: str = Form(...),
    organization_id: int = Form(...),
    default_responsible_user_id: Optional[int] = Form(None),
    image: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check organization access
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(organization_id, current_user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this organization")
    
    # Check permission level
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    # Upload image to MinIO if provided
    image_url = None
    if image:
        file_data = image.file.read()
        image_url = minio_client.upload_file_sync(file_data, image.filename, image.content_type)
    
    # Create object
    obj_repo = ObjectRepository(session)
    obj = obj_repo.create(
        title=title,
        organization_id=organization_id,
        default_responsible_user_id=default_responsible_user_id,
        image_url=image_url
    )
    return obj


@router.get("/organization/{org_id}", response_model=List[ObjectResponse])
def get_organization_objects(
    org_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check organization access
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(org_id, current_user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this organization")
    
    obj_repo = ObjectRepository(session)
    objects = obj_repo.get_by_organization(org_id)
    return objects


@router.get("/{object_id}", response_model=ObjectResponse)
def get_object(
    object_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    obj, _ = check_object_access(object_id, current_user, session)
    return obj


@router.put("/{object_id}", response_model=ObjectResponse)
def update_object(
    object_id: int,
    obj_data: ObjectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    obj, permission = check_object_access(object_id, current_user, session)
    
    # Check permission level
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    obj_repo = ObjectRepository(session)
    update_data = obj_data.model_dump(exclude_unset=True)
    obj = obj_repo.update(object_id, **update_data)
    return obj


@router.delete("/{object_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_object(
    object_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    obj, permission = check_object_access(object_id, current_user, session)
    
    # Check permission level (only admin and owner can delete)
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    obj_repo = ObjectRepository(session)
    success = obj_repo.delete(object_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")


@router.post("/{object_id}/upload-image")
def upload_object_image(
    object_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    obj, permission = check_object_access(object_id, current_user, session)
    
    # Check permission level
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    # Upload to MinIO
    file_data = file.file.read()
    image_url = minio_client.upload_file_sync(file_data, file.filename, file.content_type)
    
    # Update object
    obj_repo = ObjectRepository(session)
    obj_repo.update(object_id, image_url=image_url)
    
    return {"image_url": image_url}
