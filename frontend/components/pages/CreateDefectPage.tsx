"use client";
import React, {useEffect, useState} from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import FormField from "@/components/FormField";
import {Button} from "@/components/Button";
import ImageInput from "@/components/ImageInput";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import {toast} from "sonner";
import {SelectItem} from "@/components/Select";
import {FormikInput} from "@/components/formik-fields/FormikInputField";
import * as Yup from 'yup';
import {Form, Formik} from "formik";
import {FormikTextArea} from "@/components/formik-fields/FormikTextAreaField";
import {FormikSelect} from "@/components/formik-fields/FormikSelectField";

export type CreateDefectPageProps = React.HTMLAttributes<HTMLDivElement>


export interface DefectFormValues {
  title: string;
  object: string;
  description: string;
  priority: string;
  deadline: string;
  responsibleUser: string;
  images: File[];
}

export const defectValidationSchema = Yup.object({
  title: Yup.string()
    .required('Название дефекта обязательно')
    .min(3, 'Минимум 3 символа')
    .max(100, 'Максимум 100 символов'),

  object: Yup.string()
    .required('Объект обязателен'),

  description: Yup.string()
    .min(10, 'Минимум 10 символов')
    .max(1000, 'Максимум 1000 символов'),

  priority: Yup.number()
    .required('Приоритет обязателен')
    .min(1, 'Минимум 1')
    .max(10, 'Максимум 10'),

  deadline: Yup.string()
    .matches(/^\d{2}\.\d{2}\.\d{4}$/, 'Формат даты: ДД.ММ.ГГГГ')
    .test(
      "date-test",
      "Дата должна быть не раньше чем сегодня", (value) => {
        if (!value) return false;
        const [day, month, year] = value.split('.').map(Number);
        // month - 1 потому что месяца в JS начинаются с 0
        const inputDate = new Date(year, month - 1, day);
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        return inputDate >= today;
      }),

  responsibleUser: Yup.string()
    .max(100, 'Максимум 100 символов'),

  images: Yup.array()
    .min(1, 'Необходимо хотя бы одно фото')
    .max(3, 'Максимум 3 фото')
});


const CreateDefectPage: React.FC<CreateDefectPageProps> = (
  { className, ...props}
) => {
  const [images, setImages] = useState<File[]>([]);
  useEffect(() => {
    toast(`Фото изменено. Всего ${images.length} шт.`);
  }, [images]);

  const initialValues: DefectFormValues = {
    title: '',
    object: '',
    description: '',
    priority: '',
    deadline: '',
    responsibleUser: '',
    images: []
  };

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

      <Formik initialValues={initialValues}
              validationSchema={defectValidationSchema}
              onSubmit={() => console.log("Formik")}>
        <Form className={"w-full flex flex-col gap-6"}>
          <div className="w-full grid grid-cols-[2fr_1fr] gap-4">
            <FormikInput name={"title"} label={"Наименование дефекта"}
                         placeholder={"Назовите дефект"}
                         required />
            <FormikSelect label={"Объект"} name={"object"} required
                          className={"w-64 rounded-full bg-white"}
                          placeholder={"Выберите объект"}>
              <SelectItem value={'1'}>Шоссе Е52</SelectItem>
              <SelectItem value={'2'}>Компьютер</SelectItem>
              <SelectItem value={'3'}>Ноутбук</SelectItem>
            </FormikSelect>
          </div>

          <FormikTextArea name={"description"} label={"Описание дефекта"}
                          placeholder={"Опишите дефект и способ её решения"}
                          className={"w-1/2"}
          />

          <FormField
            label="Фото" required
            description="Минимальный размер фото 100х100, максимальный размер каждого фото 10Мб"
          >
            <ImageInput multiple maxImages={3} setImages={setImages} />
          </FormField>

          <div className="flex gap-4">
            <FormikInput name={"priority"} label={"Приоритет"} placeholder={"N"}
                         type="number" required
                         min={1} max={10}
                         suffix={<Typography variant="subheadline" className="text-inherit">из 10</Typography>} />
            <FormikInput name={"deadline"} label={"Дедлайн исправления"}
                         defaultValue={Date.now().toString()} type="date"/>
          </div>

          <FormikInput name={"responsibleUser"} label={"Ответственное лицо"} placeholder={"Введите ФИО"} />

          <div className="flex gap-2.5">
            <Button variant="primary" size="md">
              Создать дефект
            </Button>
            <Button variant="plain" size="md">
              Очистить форму
            </Button>
          </div>
        </Form>
      </Formik>
    </div>
  );
};

export default CreateDefectPage;
