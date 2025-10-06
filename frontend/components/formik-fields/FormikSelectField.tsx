import React from "react";
import { useField } from "formik";
import FormField from "@/components/FormField";
import {Select, SelectProps} from "@/components/Select";

interface FormikSelectProps extends SelectProps {
  name: string;
  label?: string;
  required?: boolean;
  description?: string;
}

export const FormikSelect: React.FC<FormikSelectProps> = (
  { name, label = '', required, description, children, ...props }
) => {
  const [field, meta, helpers] = useField(name);

  return (
    <FormField
      label={label}
      required={required}
      description={description}
      error={meta.touched && meta.error ? meta.error : undefined}
    >
      <Select
        {...field}
        {...props}
        onValueChange={(value) => helpers.setValue(value)}
        hasError={meta.touched && !!meta.error}
      >
        { children }
      </Select>
    </FormField>
  );
};
