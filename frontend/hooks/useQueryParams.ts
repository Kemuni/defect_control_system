import { useCallback } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import {ReadonlyURLSearchParams} from "next/dist/client/components/navigation.react-server";

export type SearchParams = Record<string, string | null>;


interface useQueryParamsReturn {
  /**
   * Добавляет к текущим параметрам ссылки новые параметры и возвращает строку вида foo=bar&hello=world.
   * Если передано null в качестве значения параметра, то параметр удаляется.
   * */
  createQueryString: (updates: SearchParams) => string;
  /**
   * Добавляет к текущим параметрам ссылки новые параметры и возвращает строку вида https://example.com/?foo=bar&hello=world
   * Если передано null в качестве значения параметра, то параметр удаляется.
   * */
  getUrlWithParams: (updates: SearchParams) => string;
  /** Текущие параметры ссылки */
  searchParams: ReadonlyURLSearchParams;
}

export const useQueryParams = (): useQueryParamsReturn => {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const createQueryString = useCallback((updates: SearchParams) => {
    const params = new URLSearchParams(searchParams.toString());

    Object.entries(updates).forEach(([name, value]) => {
      if (value === null) {
        params.delete(name);
      } else {
        params.set(name, value);
      }
    });

    return params.toString();
  }, [searchParams]);

  const getUrlWithParams = useCallback((updates: SearchParams) => {
    const queryString = createQueryString(updates);
    return `${pathname}?${queryString}`;
  }, [createQueryString, pathname]);

  return {
    createQueryString,
    getUrlWithParams,
    searchParams,
  };
};
