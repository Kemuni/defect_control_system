import React, {DragEventHandler, useCallback, useState} from "react";
import {cn} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import CrossIcon from "@/components/icons/CrossIcon";


interface ImageInputProps {
  onImageUpload: (file: File) => void;
  inputAccept?: string;
  inputId?: string;
}


const ImageInput: React.FC<ImageInputProps> = ({
  onImageUpload, inputAccept = 'image/*', inputId = 'image-input',
}) => {
  const [imageLink, setImageLink] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  const handleDragOver = useCallback<DragEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      setIsDraggingOver(true);
    },
    []
  );

  const handleDragLeave = useCallback<DragEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      setIsDraggingOver(false);
    },
    []
  );

  const handleDrop = useCallback<React.DragEventHandler<HTMLDivElement>>(
    (event) => {
      event.preventDefault();
      setIsDraggingOver(false);
      setIsLoading(true);
      const files = event.dataTransfer.files;
      if (files && files[0]) {
        onImageUpload(files[0]);
        handleFileChange(files[0]);
      }
    },
    [onImageUpload]
  );

  const handleFileChange = (file: File) => {
    setIsLoading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageLink(reader.result as string);
      setIsLoading(false);
    };
    reader.readAsDataURL(file);
  };

  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const files = event.target.files;
      if (files && files[0]) {
        onImageUpload(files[0]);
        handleFileChange(files[0]);
      }
    },
    [onImageUpload]
  );


  return (
    <div className="flex gap-4">
      { imageLink && (
          <div className={"relative w-40 h-auto max-h-40"}>
            <CrossIcon
              className={cn(
              "absolute z-50 top-2 right-2 w-6 h-6 cursor-pointer text-white/50 bg-black/25 rounded-md ",
                "hover:text-white hover:bg-black/50 transition-colors",
              )}
              onClick={() => setImageLink('')}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={imageLink} alt="Uploaded image" className="w-full h-auto object-cover rounded-md"/>
          </div>
        )
      }

      <div
        className={cn(
          "relative w-full h-24 flex flex-col gap-2 items-center justify-center",
          "border border-dashed border-hint rounded-md text-hint transition-colors",
          "hover:text-secondary-hint hover:border-secondary-hint",
          imageLink && "hidden",
        )}
        onDragOver={handleDragOver} onDragEnd={handleDragLeave} onDrop={handleDrop}
      >
        <input type="file"
               accept={inputAccept}
               id={inputId}
               className="hidden"
               onChange={handleInputChange} />
        <label htmlFor="image-input" className="cursor-pointer">
          <Typography variant="subheadline" className="text-inherit">
            {
              isDraggingOver ? (
                <b>Отпустите</b>
              ) : (
                <span>Перетащите фото или <b>выберите файл...</b></span>
              )
            }
          </Typography>
          {
            isLoading && <Typography variant="subheadline"><br/>Загрузка файла(ов)...</Typography>
          }
        </label>
      </div>
    </div>
  );
}
export default ImageInput;
