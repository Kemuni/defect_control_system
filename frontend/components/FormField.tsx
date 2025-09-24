import {Typography} from "@/components/Typography";
import React from "react";
import {cn} from "@/lib/utils";

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label: string;
  required?: boolean;
  description?: string;
  children: React.ReactNode;
}

const FormField: React.FC<FormFieldProps> = ({ label, required: isRequired, description, children, className, ...props }) => {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props}>
      <Typography variant="title4">{ label }{ isRequired && "*"}</Typography>
      {
        description && (
          <Typography variant="subheadline" weight="light" className="text-hint">{ description }</Typography>
        )
      }
      {children}
    </div>
  )
}
export default FormField;
