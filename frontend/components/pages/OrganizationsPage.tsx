"use client";
import React, {FC} from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import {cn, getInitials} from "@/lib/utils";
import Link from "next/link";
import {useSearchParams} from "next/navigation";
import {mockedOrganizations} from "@/types/Organization";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";


export type OrganizationsPageProps = React.HTMLAttributes<HTMLDivElement>

const OrganizationsPage: React.FC<OrganizationsPageProps> = (
  {className, ...props}
) => {
  const searchParams = useSearchParams();
  const organizationId = searchParams.get('organizationId');

  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-baseline">
          <Typography variant="title1" weight="medium" className="text-secondary-hint">
            Все организации
          </Typography>
          <Typography variant="title3" weight="medium" className="text-hint">
            /
          </Typography>
          <Link href={"/defects"}>
            <Typography variant="title3"
                        weight="medium"
                        className="underline text-hint hover:text-secondary-hint transition-colors"
            >
              Дефекты
            </Typography>
          </Link>
        </div>
        <Link href={"/organizations/create"}>
          <Button variant="white" size="sm" leftIcon={<PlusIcon className="w-5 h-5" />}>Создать организацию</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 ps-4">
        <div className="w-full flex gap-2 justify-between">
          <Input placeholder="Введите запрос"/>
          <Button variant="white" size="md" className="rounded-full" rightIcon={<SearchIcon className="w-5 h-5" />}>Поиск</Button>
          <Button variant="plain" size="md" className="rounded-full" rightIcon={<FilterIcon className="w-5 h-5" />}>Фильтр</Button>
        </div>
        <Typography variant="subheadline" weight="light" className="text-hint">Найдено 3 организации</Typography>
        <div className="flex flex-col gap-2">
          {
            mockedOrganizations.map((organization) => (
              <OrganizationCard
                key={organization.id}
                organizationId={organization.id}
                logoUrl={organization.logoUrl}
                isSelected={organization.id.toString() === organizationId}
                title={organization.title}
                description={`${organization.amountOfObjects} объектов, ${organization.amountOfEmployees} сотрудников`}
                ownerInitials={getInitials(organization.ownerEmployee)}
              />
            ))
          }
          <Link href={{pathname: '/organizations/create'}}>
            <Button
                variant="white"
                size="md"
                leftIcon={<PlusIcon />}
                className="w-full"
              >
              Добавить организацию
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;


interface OrganizationCardProps {
  organizationId: number;
  title: string;
  logoUrl: string;
  isSelected?: boolean;
  description: string;
  ownerInitials: string;
}

const OrganizationCard: FC<OrganizationCardProps> = (
  { organizationId, title, logoUrl, description, ownerInitials, isSelected = false}) =>
{
  return (
    <Link
      href={{
        pathname: '/organizations',
        query: {organizationId}
      }}
      className={cn(
        "flex gap-2 w-full bg-white rounded-md overflow-hidden duration-200 " +
        "hover:brightness-95 hover:scale-[100.5%]",
        isSelected && "ring-2 ring-hint/75 shadow-sm"
      )}
    >
      <div className="relative w-[100px] h-[100px]">
        <ImageWithPlaceholder hidePlaceholderText src={logoUrl} alt="Логотип организации"
                              sizes="(max-width: 768px) 25vw, (max-width: 1200px) 15vw, 10vw"
                              fill className="object-cover" />
      </div>
      <section className="flex flex-col gap-1 justify-center py-2">
        <Typography variant="title4" weight="medium">{title}</Typography>
        <article className="flex flex-col gap-0">
          <Typography variant="subheadline" weight="light" className="text-hint">{description}</Typography>
          <Typography variant="subheadline" weight="light" className="text-hint">Владелец {ownerInitials}</Typography>
        </article>
      </section>
    </Link>
  );
}
