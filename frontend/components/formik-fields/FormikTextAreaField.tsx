import React from "react";
import { useField } from "formik";
import FormField from "@/components/FormField";
import {TextArea} from "@/components/Input";

interface FormikTextAreaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  placeholder: string;
}

export const FormikTextArea: React.FC<FormikTextAreaProps> = (
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
      <TextArea
        {...field}
        {...props}
        hasError={meta.touched && !!meta.error}
      />
    </FormField>
  );
};
