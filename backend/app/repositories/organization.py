from typing import List
from sqlmodel import Session, select
from app.models.organization import Organization, OrganizationStaffPermission
from app.repositories.base import BaseRepository


class OrganizationRepository(BaseRepository[Organization]):
    def __init__(self, session: Session):
        super().__init__(Organization, session)
    
    def get_with_staff(self, org_id: int) -> Organization:
        return self.session.get(Organization, org_id)
    
    def get_user_organizations(self, user_id: int) -> List[Organization]:
        statement = (
            select(Organization)
            .join(OrganizationStaffPermission)
            .where(OrganizationStaffPermission.user_id == user_id)
        )
        results = self.session.exec(statement)
        return list(results.all())


class OrganizationStaffPermissionRepository(BaseRepository[OrganizationStaffPermission]):
    def __init__(self, session: Session):
        super().__init__(OrganizationStaffPermission, session)
    
    def get_user_permission(self, org_id: int, user_id: int):
        statement = select(OrganizationStaffPermission).where(
            OrganizationStaffPermission.organization_id == org_id,
            OrganizationStaffPermission.user_id == user_id
        )
        result = self.session.exec(statement)
        return result.first()
    
    def get_organization_staff(self, org_id: int) -> List[OrganizationStaffPermission]:
        statement = select(OrganizationStaffPermission).where(
            OrganizationStaffPermission.organization_id == org_id
        )
        results = self.session.exec(statement)
        return list(results.all())
