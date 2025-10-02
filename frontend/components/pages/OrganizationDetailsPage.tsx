"use client";
import React, {FC} from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import DefectIcon from "@/components/icons/DefectIcon";
import ObjectsIcon from "@/components/icons/ObjectsIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import RepairIcon from "@/components/icons/RepairIcon";
import {cn, getRussianWord} from "@/lib/utils";
import {useSearchParams} from "next/navigation";
import OrganizationIcon from "@/components/icons/OrganizationIcon";
import Organization, {mockedOrganizations} from "@/types/Organization";
import EmployeeCard from "@/components/EmployeeCard";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import Link from "next/link";

export type OrganizationDetailsPageProps = React.HTMLAttributes<HTMLDivElement>

const OrganizationDetailsPage: React.FC<OrganizationDetailsPageProps> = ({
  className, ...props
}) => {
  const searchParams = useSearchParams();
  const organizationId = searchParams.get('organizationId');
  const organization = (
    organizationId === null
      ? undefined
      : mockedOrganizations.find(organization => organization.id === Number(organizationId))
  );

  if (organization === undefined) {
    return (
      <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
        <OrganizationIcon className="w-12 h-12 text-hint"/>
        <Typography variant="title2" weight="medium" className="text-hint">Выберите организацию</Typography>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <div className="flex gap-4 w-full">
        <div
          className="relative w-1/2 h-[350px]">
          <ImageWithPlaceholder src={organization.logoUrl} alt="Лого организации"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill className="object-cover rounded-br-md" />
        </div>
        <section className="w-1/2 flex flex-col py-3 gap-2 justify-start">
          <Typography variant="title1" weight="medium" className="text-secondary-hint text-ellipsis overflow-hidden">
            {organization.title}
          </Typography>
          <OrganizationDataTable organization={organization} />

          <div className="flex flex-col gap-2 mt-auto">
            <Link href={`/organizations/${organization.id}/defects`}>
              <Button variant="primary" size="md"
                      className="w-full"
                      rightIcon={<DefectIcon className="w-6 h-6" />}>Открыть дефекты</Button>
            </Link>
            <Link href={`/organizations/${organization.id}/objects`}>
              <Button variant="gray" size="md"
                      className="w-full"
                      rightIcon={<ObjectsIcon className="w-6 h-6" />}>Посмотреть объекты</Button>
            </Link>
          </div>
        </section>
      </div>
      <div className="w-full flex flex-wrap gap-4 px-6 py-3">
        <StatisticsBlock title="Дефектов" icon={DefectIcon} value="3 шт." comment="-2 чем с предыдущим месяцем"/>
        <StatisticsBlock title="На проверке" icon={SearchIcon} value="1 дефект" comment="+1 чем с предыдущим месяцем"/>
        <StatisticsBlock title="Исправлено" icon={RepairIcon} value="33%" comment="2 из 6 дефектов"/>
        <StatisticsBlock title="Дефектов в этом месяце" icon={RepairIcon} value="6 дефектов" comment="+1 по сравнению с прошлым месяцем"/>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;


const OrganizationDataTable: FC<{ organization: Organization }> = ({ organization }) => {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-2.5 items-center">
      <Typography variant="headline" className="text-hint">Дата создания</Typography>
      <Typography variant="headline">
        { new Intl.DateTimeFormat('ru-RU', { dateStyle: "medium"}).format(organization.createdAt) }
      </Typography>

      <Typography variant="headline" className="text-hint">Владелец</Typography>
      <EmployeeCard employeeId={organization.ownerEmployee.id} {...organization.ownerEmployee}/>

      <Typography variant="headline" className="text-hint">Объектов</Typography>
      <Typography variant="headline">
        {
          organization
            .amountOfObjects
            .toString()
            .concat(
              ' ',
              getRussianWord(organization.amountOfObjects, ['единица', 'единицы', 'единиц'])
            )
        }
      </Typography>

      <Typography variant="headline" className="text-hint">Сотрудников</Typography>
      <Typography variant="headline">
        {
          organization
            .amountOfEmployees
            .toString()
            .concat(
              ' ',
              getRussianWord(organization.amountOfEmployees, ['человек', 'человека', 'человек'])
            )
        }
      </Typography>
    </div>
  );
}


interface StatisticsBlockProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  comment: string;
}

const StatisticsBlock: FC<StatisticsBlockProps> = ({title, icon: Icon, value, comment}) => {
  return (
    <section
      className="w-fit flex flex-col px-3 py-2 gap-2 rounded-md bg-light-background
      hover:brightness-95 duration-200 hover:-translate-y-0.5">
      <div className="w-full flex gap-3 justify-between items-center">
        <Typography variant="title4">{title}</Typography>
        <div className="p-1 border border-black rounded-md"><Icon className="w-5 h-5 text-black"/></div>
      </div>
      <Typography variant="title2" weight="medium">{value}</Typography>
      <Typography variant="subheadline" weight="light">
        {comment}
      </Typography>
    </section>
  );
}
