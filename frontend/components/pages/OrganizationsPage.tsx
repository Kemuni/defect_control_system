import React, {FC} from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import {cn} from "@/lib/utils";
import Link from "next/link";

export type OrganizationsPageProps = React.HTMLAttributes<HTMLDivElement>

const OrganizationsPage: React.FC<OrganizationsPageProps> = (
  {className, ...props}
) => {
  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <div className="flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium" className="text-secondary-hint">Организации</Typography>
        <Button variant="white" size="sm" leftIcon={<PlusIcon className="w-5 h-5" />}>Создать</Button>
      </div>
      <div className="flex flex-col gap-2.5 ps-4">
        <div className="w-full flex gap-2 justify-between">
          <Input placeholder="Введите запрос"/>
          <Button variant="white" size="md" className="rounded-full" rightIcon={<SearchIcon className="w-5 h-5" />}>Поиск</Button>
          <Button variant="plain" size="md" className="rounded-full" rightIcon={<FilterIcon className="w-5 h-5" />}>Фильтр</Button>
        </div>
        <Typography variant="subheadline" weight="light" className="text-hint">Найдено 3 организации</Typography>
        <div className="flex flex-col gap-2">
          <OrganizationCard
            organizationId="1"
            title="ООО &quot;Бумажные стаканчики&quot;"
            description="18 объектов, 12 сотрудников" owner="Семенюк В. А."/>
          <OrganizationCard
            organizationId="2"
            title="ООО &quot;Картонные коробки&quot;"
            description="6 объектов, 3 сотрудника" owner="Сидоров А. М."/>
          <Button variant="white" size="md" leftIcon={<PlusIcon />} className="w-full">Добавить организацию</Button>
        </div>
      </div>
    </div>
  );
};

export default OrganizationsPage;


interface OrganizationCardProps {
  organizationId: string;
  title: string;
  description: string;
  owner: string;
}

const OrganizationCard: FC<OrganizationCardProps> = ({ organizationId, title, description, owner}) => {
  return (
    <Link
      href={{
        pathname: '/organizations',
        query: {organizationId}
      }}
      className="flex gap-2 w-full bg-white rounded-md overflow-hidden duration-200
      hover:brightness-95 hover:scale-[100.5%]">
      <div className="bg-hint w-[100px] h-[100px]"/>
      <section className="flex flex-col gap-1 h-full justify-center py-2">
        <Typography variant="title4" weight="medium">{title}</Typography>
        <article className="flex flex-col gap-0">
          <Typography variant="subheadline" weight="light" className="text-hint">{description}</Typography>
          <Typography variant="subheadline" weight="light" className="text-hint">Владелец {owner}</Typography>
        </article>
      </section>
    </Link>
  );
}
