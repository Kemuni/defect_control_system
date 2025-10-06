"use client";
import {Typography} from "@/components/Typography";
import React from "react";
import {cn} from "@/lib/utils";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  error?: string;
  description?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = (
  { label, required: isRequired, description, children, className, error, ...props }
) => {
  return (
    <div className={cn("w-auto flex flex-col gap-1.5", className)} {...props}>
      {
        label && (
          <Typography variant="title4">{ label }{ isRequired && "*"}</Typography>
        )
      }

      {
        description && (
          <Typography variant="subheadline" weight="light" className="text-hint">{ description }</Typography>
        )
      }

      { children }

      {
        error && (
          <Typography variant="subheadline" weight="light" className="text-red-accent">{ error }</Typography>
        )
      }
    </div>
  )
}
export default FormField;
