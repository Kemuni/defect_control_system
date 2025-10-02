"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import {cn} from "@/lib/utils";
import Link from "next/link";
import {mockedOrganizations} from "@/types/Organization";
import OrganizationIcon from "@/components/icons/OrganizationIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";
import {useSearchParams} from "next/navigation";
import {mockedObjects} from "@/types/Object";
import {ObjectCard} from "@/components/Card";
import PagePlaceHolder from "@/components/PagePlaceHolder";


export interface ObjectsPageProps extends React.HTMLAttributes<HTMLDivElement> {
  organizationId: number;
}

const ObjectsPage: React.FC<ObjectsPageProps> = (
  {className, organizationId, ...props}
) => {
  const searchParams = useSearchParams();
  const selectedObjectId = searchParams.get('objectId');

  const organization = mockedOrganizations.find(organization => organization.id === organizationId);

  if (organization === undefined) {
    return (<PagePlaceHolder text="Организация не найдена" icon={OrganizationIcon} />);
  }

  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <Link href={"/organizations"}>
        <Button variant="plain" size="sm" leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                className={"text-hint hover:text-secondary-hint"}
        >
          Вернуться
        </Button>
      </Link>
      <div className="flex gap-10 justify-between w-full items-center">
        <div className="min-w-0 flex-1 flex gap-1 items-baseline">
          <Link href={{ pathname: '/organizations', query: {organizationId: organization.id} }}>
            <Typography
              variant="title3" weight="medium"
              className={cn(
                "text-hint hover:text-secondary-hint transition-colors",
                "text-ellipsis overflow-hidden whitespace-nowrap",
              )}
            >
              {organization.title}
            </Typography>
          </Link>
          <Typography variant="title3" weight="medium" className="text-hint">
            /
          </Typography>
          <Typography variant="title1" weight="medium" className="text-secondary-hint">
            Объекты
          </Typography>
        </div>
        <Link href={`/organizations/${organizationId}/objects/create`}>
          <Button variant="white" size="sm" leftIcon={<PlusIcon className="w-5 h-5" />}>Добавить</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 ps-4">
        <div className="w-full flex gap-2 justify-between">
          <Input placeholder="Введите запрос"/>
          <Button variant="white" size="md" className="rounded-full" rightIcon={<SearchIcon className="w-5 h-5" />}>Поиск</Button>
          <Button variant="plain" size="md" className="rounded-full" rightIcon={<FilterIcon className="w-5 h-5" />}>Фильтр</Button>
        </div>
        <Typography variant="subheadline" weight="light" className="text-hint">Найдено 3 объекта</Typography>
        <div className="flex flex-col gap-2">
          {
            mockedObjects.map(object => (
              <ObjectCard
                key={object.id}
                href={{ query: {objectId: object.id} }}
                isSelected={object.id === Number(selectedObjectId)}
                title={object.title}
                defectsCount={object.defectsCount}
                imageUrl={object.imageUrl}
                createdAt={object.createdAt}
              />
            ))
          }
          <Link href={`/organizations/${organizationId}/objects/create`}>
            <Button
              variant="white"
              size="md"
              leftIcon={<PlusIcon />}
              className="w-full"
            >
              Добавить объект
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ObjectsPage;
