"use client";
import React from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import {toast} from "sonner";
import {SelectItem} from "@/components/Select";
import {FormikInput} from "@/components/formik-fields/FormikInputField";
import * as Yup from 'yup';
import {Form, Formik, FormikHelpers, useField} from "formik";
import {FormikSelect} from "@/components/formik-fields/FormikSelectField";
import {FormikImageInput} from "@/components/formik-fields/FormikImageInputField";
import EmployeeCard from "@/components/EmployeeCard";
import CrossIcon from "@/components/icons/CrossIcon";
import FormField from "@/components/FormField";
import {mockedEmployees} from "@/types/Employee";

export interface ObjectFormValues {
  title: string;
  responsibleUserId: string;
  image: File | undefined;
}

export const objectValidationSchema = Yup.object({
  title: Yup.string()
    .required('Название объекта обязательно')
    .min(3, 'Минимум 3 символа')
    .max(200, 'Максимум 200 символов'),

  responsibleUserId: Yup.string(),

  image: Yup.mixed<File>()
    .required('Фото обязательно')
});


export interface CreateObjectFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (values: ObjectFormValues) => unknown;
}

const CreateObjectForm: React.FC<CreateObjectFormProps> = (
  { className, onSubmit = undefined, ...props}
) => {
  const initialValues: ObjectFormValues = {
    title: '',
    responsibleUserId: '',
    image: undefined
  };

  const handleSubmit = async (values: ObjectFormValues, { setSubmitting, resetForm }: FormikHelpers<ObjectFormValues>) => {
    try {
      if (onSubmit) await Promise.resolve(onSubmit(values));
      resetForm();
    } catch {
      toast.error('Ошибка при создании объекта');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
            validationSchema={objectValidationSchema}
            onSubmit={handleSubmit}>
      <Form className={cn("w-full flex flex-col gap-6", className)} {...props}>
        <FormikInput 
          name="title" 
          label="Название объекта"
          placeholder="Назовите объект"
          required 
        />

        <FormikImageInput
          name="image"
          label="Фото"
          required
          description="Минимальный размер фото 100х100, максимальный размер 10Мб, рекомендуется разрешение 1:1"
          maxImages={1}
        />

        <ResponsibleEmployeeField />

        <div className="flex gap-2.5">
          <Button variant="primary" size="md" type="submit">
            Создать объект
          </Button>
          <Button variant="plain" size="md" type="reset">
            Очистить форму
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateObjectForm;


const ResponsibleEmployeeField: React.FC = () => {
  const [field, , helpers] = useField<string>('responsibleUserId');

  const selectedEmployee = field.value
    ? mockedEmployees.find(e => e.id.toString() === field.value)
    : null;

  return (
    <FormField label="Ответственный по умолчанию">
      {selectedEmployee ? (
        <div className="flex gap-2.5 ps-2">
          <EmployeeCard
            employeeId={selectedEmployee.id}
            name={selectedEmployee.name}
            surname={selectedEmployee.surname}
            patronymic={selectedEmployee.patronymic}
          />
          <Button
            variant="gray"
            size="sm"
            type="button"
            rightIcon={<CrossIcon className="w-5 h-5"/>}
            onClick={() => helpers.setValue('')}
          >
            Убрать
          </Button>
        </div>
      ) : (
        <FormikSelect
          name="responsibleUserId"
          label=""
          className="rounded-full bg-white w-96"
          placeholder="Выберите ответственного"
        >
          {mockedEmployees.map(emp => (
            <SelectItem key={emp.id} value={emp.id.toString()}>
              <EmployeeCard
                employeeId={emp.id}
                name={emp.name}
                surname={emp.surname}
                patronymic={emp.patronymic}
              />
            </SelectItem>
          ))}
        </FormikSelect>
      )}
    </FormField>
  );
};
