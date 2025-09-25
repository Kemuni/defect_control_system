"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import Input from "@/components/Input";
import FormField from "@/components/FormField";
import {Button} from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import {toast} from "sonner";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";

export type CreateDefectPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateDefectPage: React.FC<CreateDefectPageProps> = ({
                                                                         className, ...props
                                                                       }) => {
  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <div className="relative flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium">
          Регистрация дефекта
        </Typography>

        <Link href={"/defects"}>
          <Button variant="plain"
                  size="sm"
                  leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                  className="text-hint"
          >Назад</Button>
        </Link>
      </div>

      <FormField label="Наименование дефекта" required>
        <Input placeholder="Назовите дефект"/>
      </FormField>

      <FormField
        label="Фото" required
        description="Минимальный размер фото 100х100, максимальный размер каждого фото 10Мб"
      >
        <ImageInput
          onImageUpload={() => {toast.success("Фото загружено!")}}
          onImageRemove={() => {toast.warning("Фото удалено!")}}
        />
      </FormField>

      <div className="flex gap-2.5">
        <Button variant="primary" size="md">
          Создать дефект
        </Button>
        <Button variant="plain" size="md">
          Очистить форму
        </Button>
      </div>
    </div>
  );
};

export default CreateDefectPage;
