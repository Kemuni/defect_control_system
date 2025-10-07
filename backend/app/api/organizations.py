from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File, Form
from sqlmodel import Session
from typing import List, Optional
from app.database import get_session
from app.schemas.organization import (
    OrganizationCreate, OrganizationUpdate, OrganizationResponse,
    OrganizationStaffPermissionCreate, OrganizationStaffPermissionResponse, OrganizationStaffPermissionUpdate
)
from app.repositories.organization import OrganizationRepository, OrganizationStaffPermissionRepository
from app.auth import get_current_active_user
from app.models.user import User
from app.models.enums import PermissionEnum
from app.minio_client import minio_client

router = APIRouter(prefix="/organizations", tags=["Organizations"])


def check_org_permission(org_id: int, user: User, session: Session, required_permission: PermissionEnum = PermissionEnum.MEMBER):
    """Helper to check if user has permission in organization"""
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(org_id, user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this organization")
    
    # Permission hierarchy: owner > admin > manager > member > viewer
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER, PermissionEnum.MEMBER, PermissionEnum.VIEWER]
    
    if permissions_hierarchy.index(permission.permission) > permissions_hierarchy.index(required_permission):
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    return permission


@router.post("/", response_model=OrganizationResponse, status_code=status.HTTP_201_CREATED)
def create_organization(
    title: str = Form(...),
    image: Optional[UploadFile] = File(None),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    org_repo = OrganizationRepository(session)
    
    # Upload image to MinIO if provided
    image_url = None
    if image:
        file_data = image.file.read()
        image_url = minio_client.upload_file_sync(file_data, image.filename, image.content_type)
    
    # Create organization
    org = org_repo.create(title=title, image_url=image_url)
    
    # Add creator as owner
    perm_repo = OrganizationStaffPermissionRepository(session)
    perm_repo.create(
        organization_id=org.id,
        user_id=current_user.id,
        permission=PermissionEnum.OWNER
    )
    
    return org


@router.get("/", response_model=List[OrganizationResponse])
def get_user_organizations(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    org_repo = OrganizationRepository(session)
    orgs = org_repo.get_user_organizations(current_user.id)
    return orgs


@router.get("/{org_id}", response_model=OrganizationResponse)
def get_organization(
    org_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session)
    
    org_repo = OrganizationRepository(session)
    org = org_repo.get_by_id(org_id)
    if not org:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")
    return org


@router.put("/{org_id}", response_model=OrganizationResponse)
def update_organization(
    org_id: int,
    org_data: OrganizationUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.ADMIN)
    
    org_repo = OrganizationRepository(session)
    update_data = org_data.model_dump(exclude_unset=True)
    org = org_repo.update(org_id, **update_data)
    if not org:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")
    return org


@router.delete("/{org_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_organization(
    org_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.OWNER)
    
    org_repo = OrganizationRepository(session)
    success = org_repo.delete(org_id)

    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Organization not found")


@router.post("/{org_id}/upload-image")
def upload_organization_image(
    org_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.ADMIN)
    
    # Upload to MinIO
    file_data = file.file.read()
    image_url = minio_client.upload_file_sync(file_data, file.filename, file.content_type)
    
    # Update organization
    org_repo = OrganizationRepository(session)
    org_repo.update(org_id, image_url=image_url)
    
    return {"image_url": image_url}


# Staff permissions endpoints
@router.post("/{org_id}/staff", response_model=OrganizationStaffPermissionResponse, status_code=status.HTTP_201_CREATED)
def add_staff_member(
    org_id: int,
    staff_data: OrganizationStaffPermissionCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.ADMIN)
    
    if staff_data.organization_id != org_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Organization ID mismatch")
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    
    # Check if already exists
    existing = perm_repo.get_user_permission(org_id, staff_data.user_id)
    if existing:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="User already has permission")
    
    permission = perm_repo.create(**staff_data.model_dump())
    return permission


@router.get("/{org_id}/staff", response_model=List[OrganizationStaffPermissionResponse])
def get_organization_staff(
    org_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session)
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    staff = perm_repo.get_organization_staff(org_id)
    return staff


@router.put("/{org_id}/staff/{staff_id}", response_model=OrganizationStaffPermissionResponse)
def update_staff_permission(
    org_id: int,
    staff_id: int,
    staff_data: OrganizationStaffPermissionUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.ADMIN)
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    update_data = staff_data.model_dump(exclude_unset=True)
    permission = perm_repo.update(staff_id, **update_data)
    if not permission:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Staff permission not found")
    return permission


@router.delete("/{org_id}/staff/{staff_id}", status_code=status.HTTP_204_NO_CONTENT)
def remove_staff_member(
    org_id: int,
    staff_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_org_permission(org_id, current_user, session, PermissionEnum.ADMIN)
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    success = perm_repo.delete(staff_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Staff permission not found")
