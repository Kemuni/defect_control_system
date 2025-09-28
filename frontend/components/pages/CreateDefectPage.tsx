"use client";
import React, {useEffect, useState} from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import Input, {TextArea} from "@/components/Input";
import FormField from "@/components/FormField";
import {Button} from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import {toast} from "sonner";

export type CreateDefectPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateDefectPage: React.FC<CreateDefectPageProps> = (
  { className, ...props}
) => {
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    toast(`Фото изменено. Всего ${images.length} шт.`);
  }, [images]);

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

      <FormField label="Описание дефекта" required>
        <TextArea placeholder="Опишите дефект и как его исправить" />
      </FormField>

      <FormField
        label="Фото" required
        description="Минимальный размер фото 100х100, максимальный размер каждого фото 10Мб"
      >
        <ImageInput multiple maxImages={3} setImages={setImages} />
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
