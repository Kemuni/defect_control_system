"use client";
import React from "react";
import {cn} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import Link from "next/link";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import {mockedDefects} from "@/types/Defect";
import {useSearchParams} from "next/navigation";
import {DefectCard} from "@/components/Card";
import {mockedOrganizations} from "@/types/Organization";
import OrganizationIcon from "@/components/icons/OrganizationIcon";
import PagePlaceHolder from "@/components/PagePlaceHolder";

export interface DefectsPageProps extends React.HTMLAttributes<HTMLDivElement> {
  organizationId?: number;
}

const DefectsPage: React.FC<DefectsPageProps> = ({
    organizationId, className, ...props
  }) => {
  const searchParams = useSearchParams();
  const selectedDefectId = searchParams.get('defectId');

  const selectedOrganization = mockedOrganizations.find(
    organization => organization.id === organizationId
  );

  if (organizationId !== undefined && selectedOrganization === undefined) {
    return (<PagePlaceHolder text="Организация не найдена" icon={OrganizationIcon} />);
  }

  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-baseline">
          <Link
            href={ organizationId === undefined ? `/organizations` :
              { pathname: '/organizations', query: {organizationId: selectedOrganization!.id} }
            }
          >
            <Typography variant="title3"
                        weight="medium"
                        className={cn(
                          "underline text-hint hover:text-secondary-hint transition-colors",
                          "text-ellipsis overflow-hidden whitespace-nowrap",
                        )}
            >
              { organizationId === undefined ? 'Все организации' : selectedOrganization!.title }
            </Typography>
          </Link>
          <Typography variant="title3" weight="medium" className="text-hint">
            /
          </Typography>
          <Typography variant="title1" weight="medium" className="text-secondary-hint">
            { organizationId === undefined ? 'Все дефекты' : 'Дефекты' }
          </Typography>
        </div>
        <Link href={"/defects/create"}>
          <Button variant="white" size="sm" leftIcon={<PlusIcon className="w-5 h-5" />}>Создать дефект</Button>
        </Link>
      </div>
      <div className="flex flex-col gap-2.5 ps-4">
        <div className="w-full flex gap-2 justify-between">
          <Input placeholder="Введите запрос"/>
          <Button variant="white" size="md" className="rounded-full" rightIcon={<SearchIcon className="w-5 h-5" />}>Поиск</Button>
          <Button variant="plain" size="md" className="rounded-full" rightIcon={<FilterIcon className="w-5 h-5" />}>Фильтр</Button>
        </div>
        <Typography variant="subheadline" weight="light" className="text-hint">Найдено 3 дефекта</Typography>
        <div className="flex flex-col gap-2">
          {
            mockedDefects.map(defect => (
              <DefectCard key={defect.id}
                          href={{ query: {defectId: defect.id} }}
                          {...defect}
                          isSelected={defect.id.toString() === selectedDefectId} />
            ))
          }
          <Link href={{pathname: '/defects/create'}}>
            <Button
              variant="white"
              size="md"
              leftIcon={<PlusIcon className="w-5 h-5" />}
              className="w-full"
            >
              Зарегистрировать дефект
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
export default DefectsPage;
