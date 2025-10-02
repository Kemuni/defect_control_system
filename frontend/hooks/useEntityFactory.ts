import {useCallback, useMemo} from 'react';
import { useQueryParams } from './useQueryParams';
import Organization, {mockedOrganizations} from "@/types/Organization";
import QueryActions from "@/types/QueryActions";
import Defect, {mockedDefects} from "@/types/Defect";
import Object, {mockedObjects} from "@/types/Object";

interface EntityHookResult<T> {
  entity: T | undefined;
  entityId: number | null;
  createEntityUrl: string;
  getSelectedEntityUrl: (entityId: number) => string;
  error: string | null;
}

/**
 * Фабрика хуков для работы с сущностями (организациями, дефектами, объектами).
 * @template T - Тип сущности (Organization, Defect, Object).
 * @param paramName - Имя параметра в URL. Например, "organizationId".
 * @param notFoundErrorMessage - Сообщение об ошибке, если сущность не найдена.
 */
const createEntityHook = <T extends { id: number }>(
  paramName: string,
  notFoundErrorMessage: string = 'Не найдено'
) => {
  return (entities: T[]): EntityHookResult<T> => {
    const { searchParams, getUrlWithParams } = useQueryParams();

    const createEntityUrl = useMemo(
      () => getUrlWithParams({ [paramName]: null, action: QueryActions.Create }),
      [getUrlWithParams]
    );
    const getSelectedEntityUrl = useCallback(
      (entityId: number) => getUrlWithParams({ [paramName]: entityId.toString(), action: null }),
      [getUrlWithParams]
    );

    return useMemo(() => {
      const result: EntityHookResult<T> = {
        entity: undefined,
        error: null,
        entityId: null,
        createEntityUrl,
        getSelectedEntityUrl,
      };

      const paramValue = searchParams.get(paramName);
      if (!paramValue) return result;

      const entityId = Number(paramValue);

      if (isNaN(entityId)) {
        result.error = `Некорректный ID для ${paramName}`;
        return result;
      }

      const foundEntity = entities.find(entity => entity.id === entityId);

      if (foundEntity) {
        result.entity = foundEntity;
        result.entityId = entityId;
        return result;
      } else {
        result.error = notFoundErrorMessage;
        result.entityId = entityId;
        return result;
      }
    }, [searchParams, entities, createEntityUrl, getSelectedEntityUrl]);
  };
};

const useOrganizationBase = createEntityHook<Organization>(
  'organizationId', 'Организация не найдена'
);
const useDefectBase = createEntityHook<Defect>(
  'defectId', 'Дефект не найден'
);
const useObjectBase = createEntityHook<Object>(
  'objectId', 'Объект не найден'
);

export interface OrganizationHookResult {
  organization: Organization | undefined;
  organizationId: number | null;
  organizationError: string | null;
  createOrganizationUrl: string;
  getSelectedOrganizationUrl: (organizationId: number) => string;
}
export const useOrganization = (): OrganizationHookResult => {
  const result = useOrganizationBase(mockedOrganizations);
  return {
    organization: result.entity,
    organizationId: result.entityId,
    organizationError: result.error,
    createOrganizationUrl: result.createEntityUrl,
    getSelectedOrganizationUrl: result.getSelectedEntityUrl
  };
};


export interface DefectHookResult {
  defect: Defect | undefined;
  defectId: number | null;
  defectError: string | null;
  createDefectUrl: string;
  getSelectedDefectUrl: (organizationId: number) => string;
}
export const useDefect = (): DefectHookResult => {
  const result = useDefectBase(mockedDefects);
  return {
    defect: result.entity,
    defectId: result.entityId,
    defectError: result.error,
    createDefectUrl: result.createEntityUrl,
    getSelectedDefectUrl: result.getSelectedEntityUrl
  };
};

export interface ObjectHookResult {
  object: Object | undefined;
  objectId: number | null;
  objectError: string | null;
  createObjectUrl: string;
  getSelectedObjectUrl: (organizationId: number) => string;
}
export const useObject = (): ObjectHookResult => {
  const result = useObjectBase(mockedObjects);
  return {
    object: result.entity,
    objectId: result.entityId,
    objectError: result.error,
    createObjectUrl: result.createEntityUrl,
    getSelectedObjectUrl: result.getSelectedEntityUrl
  };
};
