"use client";
import React, {FC} from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import {cn, getRussianWord} from "@/lib/utils";
import Link from "next/link";
import {mockedOrganizations} from "@/types/Organization";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import OrganizationIcon from "@/components/icons/OrganizationIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";
import {usePathname, useSearchParams} from "next/navigation";
import {mockedObjects} from "@/types/Object";


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
    return (
      <div
        className={cn(
          "flex flex-col flex-1 items-center justify-center text-secondary-hint",
          className
        )}
        {...props}
      >
        <OrganizationIcon className="w-12 h-12"/>
        <Typography variant="title2" weight="medium" className="text-inherit">Организация не найдена</Typography>
      </div>
    );
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
                isSelected={object.id === Number(selectedObjectId)}
                objectId={object.id}
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


interface ObjectCardProps {
  objectId: number;
  title: string;
  defectsCount: number;
  imageUrl: string;
  isSelected?: boolean;
  createdAt: Date;
}

const ObjectCard: FC<ObjectCardProps> = (
  { objectId, title, imageUrl, defectsCount, createdAt, isSelected = false}) =>
{
  const pathname = usePathname();
  return (
    <Link
      href={{
        pathname: pathname,
        query: {objectId: objectId},
      }}
      className={cn(
        "flex gap-2 w-full bg-white rounded-md overflow-hidden duration-200 " +
        "hover:brightness-95 hover:scale-[100.5%]",
        isSelected && "ring-2 ring-hint/75 shadow-sm"
      )}
    >
      <div className="relative w-[100px] h-[100px]">
        <ImageWithPlaceholder hidePlaceholderText src={imageUrl} alt="Логотип организации"
                              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                              fill className="object-cover" />
      </div>
      <section className="flex-1 flex flex-col gap-1 justify-center py-2">
        <Typography variant="title4" weight="medium"
                    className="text-nowrap text-ellipsis overflow-hidden">
          {title}
        </Typography>
        <article className="flex flex-col gap-0">
          <Typography variant="subheadline" weight="light"
                      className={defectsCount === 0 ? "text-hint" : "text-red-accent"}
          >
            {
              defectsCount === 0
                ? "Нет дефектов"
                : `${defectsCount} ${getRussianWord(defectsCount, ["дефект", "дефекта", "дефектов"])}`
            }
          </Typography>
          <Typography variant="subheadline" weight="light" className="text-hint">
            Создан { createdAt.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }
          </Typography>
        </article>
      </section>
      <div className="ps-2 flex-0 flex gap-1 items-center justify-end me-2">
        <Button variant="plain" size="sm" rightIcon={<ArrowIcon className="w-5 h-5" />}>
          Открыть
        </Button>
      </div>
    </Link>
  );
}
