"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import Input from "@/components/Input";
import FormField from "@/components/FormField";
import {Button} from "@/components/Button";
import CrossIcon from "@/components/icons/CrossIcon";
import ImageInput from "@/components/ImageInput";
import {toast} from "sonner";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import EmployeeCard from "@/components/EmployeeCard";

export type CreateObjectPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateObjectPage: React.FC<CreateObjectPageProps> = ({
  className, ...props
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <div className="relative flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium">
          Создание объекта
        </Typography>

        <Link href={"/organizations"}>
          <Button variant="plain"
                  size="sm"
                  leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                  className="text-hint"
          >Назад</Button>
        </Link>
      </div>

      <FormField label="Название объекта" required>
        <Input placeholder="Назовите объект"/>
      </FormField>

      <FormField
        label="Фото" required
        description="Минимальный размер фото 100х100, максимальный размер 10Мб, рекомендуется разрешение 1:1"
      >
        <ImageInput setImage={(file) => {toast(file ? "Фото загружено!" : "Фото удалено!")}} />
      </FormField>

      <FormField label="Ответственный по умолчанию">
        <div className="flex gap-2.5 ps-2">
          <EmployeeCard employeeId={1} name="Иван" surname="Иванов" patronymic="Иванович"/>
          <Button variant="gray"
                  size="sm"
                  rightIcon={<CrossIcon className="w-5 h-5"/>}>
            Убрать
          </Button>
        </div>
      </FormField>

      <div className="flex gap-2.5">
        <Button variant="primary" size="md">
          Создать объект
        </Button>
        <Button variant="plain" size="md">
          Очистить форму
        </Button>
      </div>
    </div>
  );
};

export default CreateObjectPage;