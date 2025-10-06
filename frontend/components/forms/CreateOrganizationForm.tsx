"use client";
import React, {FC, useState} from "react";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import {toast} from "sonner";
import {FormikInput} from "@/components/formik-fields/FormikInputField";
import * as Yup from 'yup';
import {Form, Formik, FormikHelpers, useField} from "formik";
import {FormikImageInput} from "@/components/formik-fields/FormikImageInputField";
import {Typography} from "@/components/Typography";
import Input from "@/components/Input";
import FormField from "@/components/FormField";
import PlusIcon from "@/components/icons/PlusIcon";
import CrossIcon from "@/components/icons/CrossIcon";
import InfoIcon from "@/components/icons/InfoIcon";
import TrashIcon from "@/components/icons/TrashIcon";
import KeyIcon from "@/components/icons/KeyIcon";
import Employee, {mockedEmployees, mockedPermissions} from "@/types/Employee";

export interface EmployeeWithPermissions {
  id: number;
  name: string;
  surname: string;
  patronymic: string;
  permissions: string[];
}

export interface OrganizationFormValues {
  title: string;
  image: File | undefined;
  employees: EmployeeWithPermissions[];
}

export const organizationValidationSchema = Yup.object({
  title: Yup.string()
    .required('Название организации обязательно')
    .min(2, 'Минимум 2 символа')
    .max(200, 'Максимум 200 символов'),

  image: Yup.mixed<File>()
    .required('Фото обязательно'),

  employees: Yup.array()
});


export interface CreateOrganizationFormProps extends Omit<React.HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  onSubmit?: (values: OrganizationFormValues) => unknown;
}


const CreateOrganizationForm: React.FC<CreateOrganizationFormProps> = (
  { className, onSubmit = undefined, ...props}
) => {
  const initialValues: OrganizationFormValues = {
    title: '',
    image: undefined,
    employees: []
  };

  const handleSubmit = async (values: OrganizationFormValues, { setSubmitting, resetForm }: FormikHelpers<OrganizationFormValues>) => {
    try {
      if (onSubmit) await Promise.resolve(onSubmit(values));
      resetForm();
    } catch {
      toast.error('Ошибка при создании организации');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={initialValues}
            validationSchema={organizationValidationSchema}
            onSubmit={handleSubmit}>
      <Form className={cn("w-full flex flex-col gap-6", className)} {...props}>
        <FormikInput 
          name="title" 
          label="Название организации"
          placeholder="Название организации"
          required 
        />

        <FormikImageInput
          name="image"
          label="Фото"
          required
          description="Минимальный размер фото 100х100, максимальный размер 10Мб, рекомендуется разрешение 1:1"
          maxImages={1}
        />

        <EmployeesManagementField />

        <div className="flex gap-2.5">
          <Button variant="primary" size="md" type="submit">
            Создать организацию
          </Button>
          <Button variant="plain" size="md" type="reset">
            Очистить форму
          </Button>
        </div>
      </Form>
    </Formik>
  );
};

export default CreateOrganizationForm;


const EmployeesManagementField: React.FC = () => {
  const [field, , helpers] = useField<EmployeeWithPermissions[]>('employees');
  const [searchQuery, setSearchQuery] = useState('');

  const addEmployee = (employee: Employee) => {
    if (field.value.find(e => e.id === employee.id)) {
      toast.error('Сотрудник уже добавлен');
      return;
    }
    helpers.setValue([...field.value, {...employee, permissions: []}]);
    toast.success('Сотрудник добавлен');
  };

  const removeEmployee = (id: number) => {
    helpers.setValue(field.value.filter(e => e.id !== id));
  };

  const addPermission = (employeeId: number, permission: string) => {
    helpers.setValue(field.value.map(emp =>
      emp.id === employeeId
        ? { ...emp, permissions: [...emp.permissions, permission] }
        : emp
    ));
  };

  const removePermission = (employeeId: number, permission: string) => {
    helpers.setValue(field.value.map(emp =>
      emp.id === employeeId
        ? { ...emp, permissions: emp.permissions.filter(p => p !== permission) }
        : emp
    ));
  };

  return (
    <FormField label="Сотрудники">
      <div className="flex gap-2.5">
        <Input
          placeholder="Введите ФИО"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button
          variant="primary"
          size="sm"
          type="button"
          rightIcon={<PlusIcon className="w-5 h-5"/>}
          onClick={() => addEmployee(mockedEmployees[0])}
        >
          Добавить
        </Button>
      </div>
      <Typography variant="subheadline" className="text-hint">
        Найдено {mockedEmployees.length} сотрудника
      </Typography>
      <hr className="border-hint/25"/>

      {field.value.length > 0 ? (
        <>
          <div className="flex flex-col gap-2.5 ps-3 py-1.5 max-h-56 overflow-y-auto border-b border-hint/25">
            {field.value.map((employee, index) => (
              <React.Fragment key={employee.id}>
                {index > 0 && <hr className="border-hint/25"/>}
                <EmployeeCard
                  employee={employee}
                  availablePermissions={mockedPermissions}
                  onRemove={() => removeEmployee(employee.id)}
                  onAddPermission={(perm) => addPermission(employee.id, perm)}
                  onRemovePermission={(perm) => removePermission(employee.id, perm)}
                />
              </React.Fragment>
            ))}
          </div>
          <Typography variant="subheadline" className="text-hint text-end">
            Всего сотрудников: {field.value.length}
          </Typography>
        </>
      ) : (
        <Typography variant="subheadline" className="text-hint text-center py-4">
          Сотрудники не добавлены
        </Typography>
      )}
    </FormField>
  );
};


interface EmployeeCardProps {
  employee: EmployeeWithPermissions;
  availablePermissions: string[];
  onRemove: () => void;
  onAddPermission: (permission: string) => void;
  onRemovePermission: (permission: string) => void;
}

const EmployeeCard: FC<EmployeeCardProps> = ({
  employee, 
  availablePermissions, 
  onRemove, 
  onAddPermission, 
  onRemovePermission
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showPermissionSelect, setShowPermissionSelect] = useState(false);
  
  const chipClassName = `inline-flex gap-1 text-hint transition cursor-pointer px-2 py-1 rounded-full bg-light-background/75
  hover:brightness-95 hover:text-secondary-hint`;

  const remainingPermissions = availablePermissions.filter(
    p => !employee.permissions.includes(p)
  );

  return (
    <section className="w-full flex flex-col gap-2.5">
      <div className="flex justify-between">
        <div className="flex gap-1.5 items-center">
          <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
          <Typography variant="title4" className="underline">
            {employee.surname} {employee.name.slice(0, 1)}. {employee.patronymic.slice(0, 1)}.
          </Typography>
          <Typography variant="subheadline" className="text-hint">
            {employee.permissions.length + 1} привилегий
          </Typography>
        </div>
        <div className="flex gap-2">
          <Button 
            variant="gray"
            rightIcon={<KeyIcon className="w-5 h-5"/>}
            size="sm"
            type="button"
            onClick={() => setShowPermissionSelect(!showPermissionSelect)}
          >
            Добавить права
          </Button>
          <Button 
            variant="gray"
            size="sm"
            type="button"
            rightIcon={<TrashIcon className="w-5 h-5"/>}
            className="rounded-md"
            onClick={onRemove}
          />
        </div>
      </div>

      {showPermissionSelect && remainingPermissions.length > 0 && (
        <div className="flex flex-wrap gap-1.5 p-2 bg-light-background/50 rounded-md">
          <Typography variant="subheadline" className="text-hint w-full">
            Доступные права:
          </Typography>
          {remainingPermissions.map(permission => (
            <Typography
              key={permission}
              variant="subheadline"
              className={cn(chipClassName, "hover:bg-white/75")}
              onClick={() => {
                onAddPermission(permission);
                if (remainingPermissions.length === 1) {
                  setShowPermissionSelect(false);
                }
              }}
            >
              {permission}
              <PlusIcon className="w-5 h-5"/>
            </Typography>
          ))}
        </div>
      )}

      <div className="flex gap-1.5 flex-wrap">
        <Typography variant="subheadline" className={cn(chipClassName, "cursor-default")}>
          Сотрудник
          <InfoIcon
            className="w-5 h-5"
            data-tooltip-id={process.env.NEXT_PUBLIC_TOOLTIP_ID}
            data-tooltip-delay-show={300}
            data-tooltip-html={`
              - Просматривать объекты и их дефекты.<br/>
              - Создавать заявку на исправление дефекта, если является ответственным за данный дефект.<br/>`
            }
          />
        </Typography>
        {employee.permissions.slice(0, (isOpen ? employee.permissions.length : 3)).map((permission) => (
          <Typography
            key={permission}
            variant="subheadline"
            className={chipClassName}
          >
            {permission}
            <CrossIcon 
              className="w-5 h-5" 
              onClick={() => onRemovePermission(permission)}
            />
          </Typography>
        ))}
        {employee.permissions.length > 3 && (
          <Typography
            variant="subheadline"
            onClick={() => setIsOpen(!isOpen)}
            className={cn(chipClassName, "underline")}
          >
            {isOpen ? "Показать меньше..." : "Показать все..."}
          </Typography>
        )}
      </div>
    </section>
  );
};

