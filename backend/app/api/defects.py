from fastapi import APIRouter, Depends, HTTPException, status, UploadFile, File
from sqlmodel import Session
from typing import List
from app.database import get_session
from app.schemas.defect import (
    DefectCreate, DefectUpdate, DefectResponse,
    DefectImageCreate, DefectImageResponse,
    DefectSolutionCreate, DefectSolutionUpdate, DefectSolutionResponse,
    DefectSolutionImageCreate, DefectSolutionImageResponse
)
from app.repositories.defect import (
    DefectRepository, DefectImageRepository, 
    DefectSolutionRepository, DefectSolutionImageRepository
)
from app.repositories.object import ObjectRepository
from app.repositories.organization import OrganizationStaffPermissionRepository
from app.auth import get_current_active_user
from app.models.user import User
from app.models.enums import PermissionEnum
from app.minio_client import minio_client

router = APIRouter(prefix="/defects", tags=["Defects"])


def check_defect_access(defect_id: int, user: User, session: Session):
    """Helper to check if user has access to defect via object->organization"""
    defect_repo = DefectRepository(session)
    defect = defect_repo.get_with_details(defect_id)
    
    if not defect:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Defect not found")
    
    obj_repo = ObjectRepository(session)
    obj = obj_repo.get_by_id(defect.object_id)
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(obj.organization_id, user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this defect")
    
    return defect, permission


@router.post("/", response_model=DefectResponse, status_code=status.HTTP_201_CREATED)
def create_defect(
    defect_data: DefectCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check object access
    obj_repo = ObjectRepository(session)
    obj = obj_repo.get_by_id(defect_data.object_id)
    
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(obj.organization_id, current_user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this object")
    
    defect_repo = DefectRepository(session)
    defect = defect_repo.create(**defect_data.model_dump())
    return defect


@router.get("/object/{object_id}", response_model=List[DefectResponse])
def get_object_defects(
    object_id: int,
    skip: int = 0,
    limit: int = 100,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    # Check object access
    obj_repo = ObjectRepository(session)
    obj = obj_repo.get_by_id(object_id)
    
    if not obj:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Object not found")
    
    perm_repo = OrganizationStaffPermissionRepository(session)
    permission = perm_repo.get_user_permission(obj.organization_id, current_user.id)
    
    if not permission:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="No access to this object")
    
    defect_repo = DefectRepository(session)
    defects = defect_repo.get_by_object(object_id, skip, limit)
    return defects


@router.get("/my-defects", response_model=List[DefectResponse])
def get_my_defects(
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect_repo = DefectRepository(session)
    defects = defect_repo.get_by_responsible_user(current_user.id)
    return defects


@router.get("/{defect_id}", response_model=DefectResponse)
def get_defect(
    defect_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, _ = check_defect_access(defect_id, current_user, session)
    return defect


@router.put("/{defect_id}", response_model=DefectResponse)
def update_defect(
    defect_id: int,
    defect_data: DefectUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    # Check permission level
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER, PermissionEnum.MEMBER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    defect_repo = DefectRepository(session)
    update_data = defect_data.model_dump(exclude_unset=True)
    defect = defect_repo.update(defect_id, **update_data)
    return defect


@router.delete("/{defect_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_defect(
    defect_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    # Check permission level
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    defect_repo = DefectRepository(session)
    success = defect_repo.delete(defect_id)
    if not success:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Defect not found")


# Defect Images
@router.post("/{defect_id}/images", response_model=DefectImageResponse, status_code=status.HTTP_201_CREATED)
def upload_defect_image(
    defect_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    # Upload to MinIO
    file_data = file.file.read()
    image_url = minio_client.upload_file_sync(file_data, file.filename, file.content_type)
    
    # Create defect image record
    image_repo = DefectImageRepository(session)
    image = image_repo.create(image_url=image_url, defect_id=defect_id)
    
    return image


@router.get("/{defect_id}/images", response_model=List[DefectImageResponse])
def get_defect_images(
    defect_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    image_repo = DefectImageRepository(session)
    images = image_repo.get_by_defect(defect_id)
    return images


@router.delete("/{defect_id}/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_defect_image(
    defect_id: int,
    image_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    image_repo = DefectImageRepository(session)
    image = image_repo.get_by_id(image_id)
    
    if not image or image.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    
    # Delete from MinIO
    minio_client.delete_file_sync(image.image_url)
    
    # Delete from DB
    image_repo.delete(image_id)


# Defect Solutions
@router.post("/{defect_id}/solutions", response_model=DefectSolutionResponse, status_code=status.HTTP_201_CREATED)
def create_defect_solution(
    defect_id: int,
    solution_data: DefectSolutionCreate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    if solution_data.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Defect ID mismatch")
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.create(**solution_data.model_dump())
    return solution


@router.get("/{defect_id}/solutions", response_model=List[DefectSolutionResponse])
def get_defect_solutions(
    defect_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solutions = solution_repo.get_by_defect(defect_id)
    return solutions


@router.get("/{defect_id}/solutions/{solution_id}", response_model=DefectSolutionResponse)
def get_defect_solution(
    defect_id: int,
    solution_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    return solution


@router.put("/{defect_id}/solutions/{solution_id}", response_model=DefectSolutionResponse)
def update_defect_solution(
    defect_id: int,
    solution_id: int,
    solution_data: DefectSolutionUpdate,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    update_data = solution_data.model_dump(exclude_unset=True)
    solution = solution_repo.update(solution_id, **update_data)
    return solution


@router.delete("/{defect_id}/solutions/{solution_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_defect_solution(
    defect_id: int,
    solution_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    defect, permission = check_defect_access(defect_id, current_user, session)
    
    permissions_hierarchy = [PermissionEnum.OWNER, PermissionEnum.ADMIN, PermissionEnum.MANAGER]
    if permission.permission not in permissions_hierarchy:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Insufficient permissions")
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    solution_repo.delete(solution_id)


# Defect Solution Images
@router.post("/{defect_id}/solutions/{solution_id}/images", response_model=DefectSolutionImageResponse, status_code=status.HTTP_201_CREATED)
def upload_solution_image(
    defect_id: int,
    solution_id: int,
    file: UploadFile = File(...),
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    # Upload to MinIO
    file_data = file.file.read()
    image_url = minio_client.upload_file_sync(file_data, file.filename, file.content_type)
    
    # Create solution image record
    image_repo = DefectSolutionImageRepository(session)
    image = image_repo.create(image_url=image_url, defect_solution_id=solution_id)
    
    return image


@router.get("/{defect_id}/solutions/{solution_id}/images", response_model=List[DefectSolutionImageResponse])
def get_solution_images(
    defect_id: int,
    solution_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    image_repo = DefectSolutionImageRepository(session)
    images = image_repo.get_by_solution(solution_id)
    return images


@router.delete("/{defect_id}/solutions/{solution_id}/images/{image_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_solution_image(
    defect_id: int,
    solution_id: int,
    image_id: int,
    session: Session = Depends(get_session),
    current_user: User = Depends(get_current_active_user)
):
    check_defect_access(defect_id, current_user, session)
    
    solution_repo = DefectSolutionRepository(session)
    solution = solution_repo.get_by_id(solution_id)
    
    if not solution or solution.defect_id != defect_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Solution not found")
    
    image_repo = DefectSolutionImageRepository(session)
    image = image_repo.get_by_id(image_id)
    
    if not image or image.defect_solution_id != solution_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Image not found")
    
    # Delete from MinIO
    minio_client.delete_file_sync(image.image_url)
    
    # Delete from DB
    image_repo.delete(image_id)
