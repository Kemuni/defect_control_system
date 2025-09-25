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

export type DefectsPageProps = React.HTMLAttributes<HTMLDivElement>

const DefectsPage: React.FC<DefectsPageProps> = ({
    className, ...props
  }) => {

  return (
    <div className={cn("flex flex-col gap-2.5 w-full h-full", className)} {...props}>
      <div className="flex justify-between w-full items-center">
        <div className="flex gap-1 items-center">
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
          <Typography variant="text" className="text-secondary-hint">Тут будет список дефектов</Typography>
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
