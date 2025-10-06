"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import {toast} from "sonner";
import {SelectItem} from "@/components/Select";
import {FormikInput} from "@/components/formik-fields/FormikInputField";
import * as Yup from 'yup';
import {Form, Formik, FormikHelpers} from "formik";
import {FormikTextArea} from "@/components/formik-fields/FormikTextAreaField";
import {FormikSelect} from "@/components/formik-fields/FormikSelectField";
import {FormikImageInput} from "@/components/formik-fields/FormikImageInputField";


export interface DefectFormValues {
  title: string;
  object: string;
  description: string;
  priority: number | '';
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
    .test(
      "date-test",
      "Дата должна быть не раньше чем сегодня", (value) => {
        if (!value) return true;
        const inputDate = new Date(value);
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

export interface CreateDefectFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (values: DefectFormValues) => unknown;
}

const CreateDefectForm: React.FC<CreateDefectFormProps> = (
  { className, onSubmit = undefined, ...props}
) => {
  const initialValues: DefectFormValues = {
    title: '',
    object: '',
    description: '',
    priority: '',
    deadline: '',
    responsibleUser: '',
    images: []
  };

  const handleSubmit = async (values: DefectFormValues, { setSubmitting, resetForm }: FormikHelpers<DefectFormValues>) => {
    try {
      if (onSubmit) await Promise.resolve(onSubmit(values));
      resetForm();
    } catch {
      toast.error('Ошибка при создании дефекта');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
            validationSchema={defectValidationSchema}
            onSubmit={handleSubmit}>
      <Form className={cn("w-full flex flex-col gap-6", className)} {...props}>
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

        <FormikImageInput
          name="images"
          label="Фото"
          required
          description="Минимальный размер фото 100х100, максимальный размер каждого фото 10Мб"
          multiple
          maxImages={3}
        />

        <div className="flex gap-4">
          <FormikInput name={"priority"} label={"Приоритет"} placeholder={"N"}
                       type="number" required
                       min={1} max={10}
                       suffix={<Typography variant="subheadline" className="text-inherit">из 10</Typography>} />
          <FormikInput name={"deadline"} label={"Дедлайн исправления"}
                       type="date"/>
        </div>

        <FormikInput name={"responsibleUser"} label={"Ответственное лицо"} placeholder={"Введите ФИО"} />

        <div className="flex gap-2.5">
          <Button variant="primary" size="md" type="submit">
            Создать дефект
          </Button>
          <Button variant="plain" size="md" type="reset">
            Очистить форму
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateDefectForm;
