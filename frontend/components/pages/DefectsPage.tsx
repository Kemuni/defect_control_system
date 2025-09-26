"use client";
import React, {FC} from "react";
import {cn} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import Link from "next/link";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import Input from "@/components/Input";
import SearchIcon from "@/components/icons/SearchIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import ArrowIcon from "@/components/icons/ArrowIcon";

export type DefectsPageProps = React.HTMLAttributes<HTMLDivElement>

const DefectsPage: React.FC<DefectsPageProps> = ({
    className, ...props
  }) => {

  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-baseline">
          <Typography variant="title1" weight="medium" className="text-secondary-hint">
            Все дефекты
          </Typography>
          <Typography variant="title3" weight="medium" className="text-hint">
            /
          </Typography>
          <Link href={"/organizations"}>
            <Typography variant="title3"
                        weight="medium"
                        className="underline text-hint hover:text-secondary-hint transition-colors"
            >
              организации
            </Typography>
          </Link>
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
          <DefectCard defectId="1" status={'opened'}
                      title="Дефект 1" description="Описание дефекта 1" createdAt={new Date()}/>
          <DefectCard defectId="2" status={'in_progress'} critical
                      title="Дефект 2 Дефект 2 Дефект 2 Дефект 2 Дефект 2"
                      description="Описание дефекта 2 Описание дефекта 2 Описание дефекта 2 Описание дефекта 2"
                      createdAt={new Date()}/>
          <DefectCard defectId="3" status={'on_moderation'}
                      title="Дефект 3" description="Описание дефекта 3" createdAt={new Date()}/>
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


type DefectStatus = 'opened' | 'in_progress' | 'on_moderation' | 'closed';

interface DefectCardProps {
  defectId: string;
  title: string;
  status: DefectStatus;
  critical?: boolean;
  isActive?: boolean;
  description: string;
  createdAt: Date;
}

const DefectCard: FC<DefectCardProps> = (
  { defectId, status, title, description, createdAt, critical: isCritical = false, isActive = false}) =>
{
  let statusBgColor: string, statusText: string, statusHintText: string;
  switch (status) {
    case 'opened':
      statusBgColor = 'bg-blue-accent';
      statusText = 'Свободный';
      statusHintText = 'Дефект открыт и ответственный сотрудник еще не назначен';
      break;
    case 'in_progress':
      statusBgColor = 'bg-green-accent';
      statusText = 'В работе';
      statusHintText = 'Дефект в работе и должен быть исправлен в ближайшее время';
      break;
    case 'on_moderation':
      statusBgColor = 'bg-orange-accent';
      statusText = 'На проверке';
      statusHintText = 'Исправление дефекта находится на проверке';
      break;
    case 'closed':
      statusBgColor = 'bg-hint';
      statusText = 'Закрыт';
      statusHintText = 'Дефект был исправлен и закрыт';
      break;
  }

  return (
    <Link
      href={{
        pathname: '/defects',
        query: {defectId}
      }}
      className={cn(
        "relative flex justify-between gap-2 w-full h-[100px] bg-white rounded-md overflow-hidden duration-200 " +
        "hover:brightness-95 hover:scale-[100.5%]",
        isActive && "border border-hint/75 shadow-sm"
      )}
    >
      {
        isCritical && (
          <Typography variant="subheadline" weight="light"
                      className="w-fit absolute top-1 left-1 rounded-md bg-red-accent text-white px-1 py-0.5">
            Критично
          </Typography>
        )
      }
      <div className="bg-hint w-[100px] h-full shrink-0"/>
      <div className="min-w-0 flex-1 flex justify-between gap-1 items-center me-2">
        <section className="min-w-0 flex-1 flex flex-col gap-1 py-2">
          <Typography variant="title4" weight="medium"
                      className="text-nowrap text-ellipsis overflow-hidden">
            {title}
          </Typography>
          <article className="flex flex-col gap-0">
            <Typography variant="subheadline" weight="light"
                        className="text-hint text-nowrap text-ellipsis overflow-hidden">
              {description}
            </Typography>
            <Typography variant="subheadline" weight="light"
                        className="text-hint">
              Создан { createdAt.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }) }
            </Typography>
          </article>
        </section>
        <div className="ps-2 flex-0 flex gap-1 items-center justify-end">
          <div className="flex gap-1 items-center"
               data-tooltip-id={process.env.NEXT_PUBLIC_TOOLTIP_ID}
               data-tooltip-content={statusHintText}
               data-tooltip-delay-show={350}
          >
            <div className={cn("w-2 h-2 rounded-full", statusBgColor)}/>
            <Typography variant="text" className="text-black text-nowrap">{ statusText }</Typography>
          </div>
          <Button variant="plain" size="sm" rightIcon={<ArrowIcon className="w-5 h-5" />}>
            Открыть
          </Button>
        </div>
      </div>
    </Link>
  );
}
