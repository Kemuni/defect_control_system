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
import {Select, SelectItem} from "@/components/Select";

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

      <div className="flex gap-4">
        <FormField label="Наименование дефекта" className="w-full" required>
          <Input placeholder="Назовите дефект" />
        </FormField>
        <FormField label="Объект" className="w-64" required>
          <Select placeholder="Выберите объект" className="rounded-full bg-white">
            <SelectItem value={'1'}>Шоссе Е52</SelectItem>
            <SelectItem value={'2'}>Компьютер</SelectItem>
            <SelectItem value={'3'}>Ноутбук</SelectItem>
          </Select>
        </FormField>
      </div>

      <FormField label="Описание дефекта" required>
        <TextArea placeholder="Опишите дефект и способ её решения" />
      </FormField>

      <FormField
        label="Фото" required
        description="Минимальный размер фото 100х100, максимальный размер каждого фото 10Мб"
      >
        <ImageInput multiple maxImages={3} setImages={setImages} />
      </FormField>

      <div className="flex gap-4">
        <FormField label="Приоритет" className="w-32" required>
          <Input placeholder="N"
                 type="number"
                 min={1} max={10}
                 suffix={<Typography variant="subheadline" className="text-inherit">из 10</Typography>} />
        </FormField>
        <FormField label="Дейдлайн исправления">
          <Input placeholder="14.02.2025" />
        </FormField>
      </div>

      <FormField label="Ответственное лицо">
        <Input placeholder="Введите ФИО" />
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
