"use client";
import React, {FC, useState} from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import Input from "@/components/Input";
import FormField from "@/components/FormField";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import KeyIcon from "@/components/icons/KeyIcon";
import ImageInput from "@/components/ImageInput";

export type CreateOrganizationPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateOrganizationPage: React.FC<CreateOrganizationPageProps> = ({
  className, ...props
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <Typography variant="title1" weight="medium">
        Создание организации
      </Typography>

      <FormField label="Название организации" required>
        <Input placeholder="Название организации"/>
      </FormField>

      <FormField
        label="Фото" required
        description="Минимальный размер фото 100х100, максимальный размер 10Мб, рекомендуется разрешение 1:1"
      >
        <ImageInput onImageUpload={() => {console.log("Image uploaded")}}/>
      </FormField>

      <FormField label="Сотрудники">
        <div className="flex gap-2.5">
          <Input placeholder="Введите ФИО"/>
          <Button variant="primary"
                  size="sm"
                  rightIcon={<PlusIcon className="w-5 h-5"/>}>
            Добавить
          </Button>
        </div>
        <Typography variant="subheadline" className="text-hint">Добавлено 2 сотрудника</Typography>
        <hr className="border-hint/25"/>
        <div className="flex flex-col gap-2.5 ps-3 mt-1">
          <EmployeeCard name="Иван" surname="Иванов" patronymic="Иванович"
                        permissions={["Создание и редактирование объектов", "Исправление любого дефекта",
                        "Регистрация дефектов", "Проверка исправлений дефектов"]}/>
          <hr className="border-hint/25"/>
          <EmployeeCard name="Петр" surname="Петров" patronymic="Петрович"
                        permissions={["Регистрация дефектов", "Проверка исправлений дефектов"]}/>
        </div>
      </FormField>

      <div className="flex gap-2.5">
        <Button variant="primary" size="md">
          Создать организацию
        </Button>
        <Button variant="plain" size="md">
          Очистить форму
        </Button>
      </div>
    </div>
  );
};

export default CreateOrganizationPage;


interface EmployeeCardProps {
  name: string;
  surname: string;
  patronymic: string;
  permissions: string[];
}

const EmployeeCard: FC<EmployeeCardProps> = ({name, surname, patronymic, permissions}) => {
  const [isOpen, setIsOpen] = useState(false);
  const chipClassName = `inline-flex gap-1 text-hint transition cursor-pointer px-2 py-1 rounded-full bg-light-background/75
  hover:brightness-95 hover:text-secondary-hint`;

  return (
    <section
      className="w-full flex flex-col gap-2.5"
    >
      <div className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
          <Typography variant="title4" className="underline">
            {surname} {name.slice(0, 1)}. {patronymic.slice(0, 1)}.
          </Typography>
          <Typography variant="subheadline" className="text-hint">
            {permissions.length} привилегий
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button variant="gray"
                  rightIcon={<KeyIcon className="w-5 h-5"/>}
                  size="sm">Добавить права</Button>
          <Button variant="gray"
                  size="sm"
                  rightIcon={<TrashIcon className="w-5 h-5"/>}
                  className="rounded-md"/>
        </div>
      </div>
      <div className="flex gap-1.5 flex-wrap">
        <Typography variant="subheadline" className={chipClassName}>
          Сотрудник
          <InfoIcon
            className="w-5 h-5"
            data-tooltip-id={process.env.NEXT_PUBLIC_TOOLTIP_ID}
            data-tooltip-delay-show={300}  // Необходимо, чтобы не всплывало при малейшем наведении курсора
            data-tooltip-html={`
              - Просматривать объекты и их дефекты.<br/>
              - Создавать заявку на исправление дефекта, если является ответственным за данный дефект.<br/>`
            }
          />
        </Typography>
        {permissions.slice(0, (isOpen ? permissions.length : 3)).map((permission) => (
          <Typography
            key={permission}
            variant="subheadline"
            className={chipClassName}
          >
            {permission}
            <CrossIcon className="w-5 h-5" onClick={() => console.log(`Попытка удалить "${permission}"`)}/>
          </Typography>
        ))}
        {
          permissions.length > 3 && (
            <Typography
              variant="subheadline"
              onClick={() => setIsOpen(!isOpen)}
              className={cn(chipClassName, "underline")}
            >
              { isOpen ? "Показать меньше..." : "Показать все..."}
            </Typography>
          )
        }
      </div>
    </section>
  );
}
