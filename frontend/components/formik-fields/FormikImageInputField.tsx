import React from "react";
import { useField } from "formik";
import FormField from "@/components/FormField";
import ImageInput from "@/components/ImageInput";

interface FormikImageInputProps {
  name: string;
  label: string;
  required?: boolean;
  description?: string;
  multiple?: boolean;
  maxImages?: number;
  maxImageSize?: number;
  inputAccept?: string;
  inputId?: string;
}

export const FormikImageInput: React.FC<FormikImageInputProps> = (
  { name, label, required, description, multiple = false, maxImages = 10, maxImageSize, inputAccept, inputId }
) => {
  const [field, meta, helpers] = useField<File[] | File | undefined>(name);

  const handleSetImage = (file: File | undefined) => {
    helpers.setValue(file);
  };

  const handleSetImages = React.useCallback((action: React.SetStateAction<File[]>) => {
    if (typeof action === 'function') {
      const currentFiles = (field.value as File[]) || [];
      const newFiles = action(currentFiles);
      helpers.setValue(newFiles);
    } else {
      helpers.setValue(action);
    }
  }, [helpers, field.value]);

  return (
    <FormField
      label={label}
      required={required}
      description={description}
      error={meta.touched && meta.error ? meta.error : undefined}
    >
      {multiple ? (
        <ImageInput
          multiple
          setImages={handleSetImages}
          maxImages={maxImages}
          maxImageSize={maxImageSize}
          inputAccept={inputAccept}
          inputId={inputId}
        />
      ) : (
        <ImageInput
          setImage={handleSetImage}
          maxImages={maxImages}
          maxImageSize={maxImageSize}
          inputAccept={inputAccept}
          inputId={inputId}
        />
      )}
    </FormField>
  );
};
