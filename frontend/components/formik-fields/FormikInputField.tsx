import React from "react";
import { useField } from "formik";
import FormField from "@/components/FormField";
import Input, { InputProps } from "@/components/Input";

interface FormikInputProps extends InputProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
}

export const FormikInput: React.FC<FormikInputProps> = (
  { name, label, required, description, ...props }
) => {
  const [field, meta] = useField(name);

  return (
    <FormField
      label={label}
      required={required}
      description={description}
      error={meta.touched && meta.error ? meta.error : undefined}
    >
      <Input
        {...field}
        {...props}
        hasError={meta.touched && !!meta.error}
      />
    </FormField>
  );
};
