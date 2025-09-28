import React, {DragEventHandler, useCallback, useState} from "react";
import {cn} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import CrossIcon from "@/components/icons/CrossIcon";
import ImageIcon from "@/components/icons/ImageIcon";
import {toast} from "sonner";


interface BaseImageInputProps {
  inputAccept?: string;
  inputId?: string;
  maxImages?: number;
  maxImageSize?: number;
}

interface SingleImageInputProps extends BaseImageInputProps {
  multiple?: false;
  setImage: (file: File | undefined) => void;
  setImages?: never;
}

interface MultipleImageInputProps extends BaseImageInputProps {
  multiple: true;
  setImages: React.Dispatch<React.SetStateAction<File[]>>;
  setImage?: never;
}

type ImageInputProps = SingleImageInputProps | MultipleImageInputProps;

interface ImagePreview {
  url: string;  // URL предварительного просмотра
  file: File;
}

const ImageInput: React.FC<ImageInputProps> = (
  {
    inputAccept = 'image/*',
    inputId = 'image-input',
    multiple = false,
    maxImages = 10,
    maxImageSize = 10 * 1024 * 1024, // 10 MB
    ...setters
  }) => {
  const [imagePreviews, setImagePreviews] = useState<ImagePreview[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDraggingOver, setIsDraggingOver] = useState<boolean>(false);

  // Функция для загрузки файлов и создания превью загруженных файлов
  const handleFilesUpload = useCallback<(files: File[]) => void>(
    (files: File[]) => {
      // Проверяем размер
      let validFiles: File[] = [];
      for (const file of files) {
        if (file.size >= maxImageSize) {
          toast.error(
            `Фото "${file.name}" превышает максимальный размер (${Math.round(maxImageSize / 1024 / 1024)} МБ)`
          );
        } else {
          validFiles.push(file);
        }
      }
      if (validFiles.length === 0) return;

      // Проверяем кол-во файлов, важно в случае единичного выбора
      if (!multiple && validFiles.length > 1) {
        validFiles = [validFiles[0]];
      }

      // Проверяем лимит файлов
      const currentCount = imagePreviews.length;
      const availableSlots = maxImages - currentCount;
      const filesToUpload = validFiles.slice(0, availableSlots);
      if (filesToUpload.length === 0) return;

      setIsLoading(true);

      // Предварительно добавляем новые превью
      const newImagePreviews: ImagePreview[] = filesToUpload.map(file => ({
        file,
        url: '' // Временно пустая строка, заполнится после загрузки
      }));

      setImagePreviews(prev => [...prev, ...newImagePreviews]);

      // Создаем URL для каждого файла
      const setFilesPreviewUrlPromises = filesToUpload.map((file) => {
        return new Promise<void>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            setImagePreviews(prev =>
              prev.map(preview =>
                preview.file === file
                  ? { ...preview, url: reader.result as string }
                  : preview
              )
            );
            resolve();
          };
          reader.readAsDataURL(file);
        });
      });

      // Когда все файлы загружены, вызываем callback и убираем загрузку
      Promise.all(setFilesPreviewUrlPromises).then(() => {
        setIsLoading(false);
        if (multiple && setters.setImages) {
          setters.setImages(prev => [...prev, ...filesToUpload]);
        } else if (!multiple && setters.setImage) {
          setters.setImage(filesToUpload[0]);
        }
      });
    }, [multiple, maxImageSize, maxImages, setters, imagePreviews.length]
  );

  // Обработчики drag and drop
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

      const files = Array.from(event.dataTransfer.files);
      const imageFiles = files.filter(file => file.type.startsWith('image/'));

      if (imageFiles.length > 0) handleFilesUpload(imageFiles);
    },
    [handleFilesUpload]
  );

  // Обработчик выбора файлов посредством нажатия на input поле
  const handleInputChange = useCallback<React.ChangeEventHandler<HTMLInputElement>>(
    (event) => {
      const files = event.target.files;
      if (files && files.length > 0) handleFilesUpload(Array.from(files));
      // Сбрасываем значение input, чтобы можно было выбрать те же файлы снова
      event.target.value = '';
    },
    [handleFilesUpload]
  );

  // Обработчик удаления картинки, если нажали на крестик
  const handleImageRemove = useCallback((index: number) => {
    setImagePreviews(prev => {
      return prev.filter((_, i) => i !== index);
    });
    if (multiple && setters.setImages) {
      setters.setImages(prev => prev.filter((_, i) => i !== index));
    } else if (!multiple && setters.setImage) {
      setters.setImage(undefined);
    }
  }, [multiple, setters]);

  const canAddMoreFiles = (multiple && imagePreviews.length < maxImages) || (!multiple && imagePreviews.length === 0);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-wrap gap-4">
        {
          imagePreviews.length > 0 && imagePreviews.map((preview, index) => (
            <ImagePreview key={index} image={preview} imageRemove={() => handleImageRemove(index)} />
          ))
        }
      </div>
      <div
        className={cn(
          "relative w-full h-24 flex flex-col gap-2 items-center justify-center",
          "border border-dashed border-hint rounded-md text-hint transition-colors",
          "hover:text-secondary-hint hover:border-secondary-hint",
          !canAddMoreFiles && "hidden",
        )}
        onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDragEnd={handleDragLeave} onDrop={handleDrop}
      >
        <input type="file"
               accept={inputAccept}
               id={inputId}
               className="hidden"
               onChange={handleInputChange} />
        <label htmlFor="image-input" className="cursor-pointer">
          <ImageIcon className="w-12 h-12 m-auto"/>
          <Typography variant="subheadline" className="text-inherit">
            {
              isDraggingOver ? (
                <b>Отпустите</b>
              ) : (
                <span>Перетащите фото или <b className="underline">выберите файл...</b></span>
              )
            }
          </Typography>
          {
            isLoading && <Typography variant="subheadline"><br/>Загрузка файла(ов)...</Typography>
          }
        </label>
      </div>
      {
        (multiple && !canAddMoreFiles) && (
          <Typography variant="subheadline" className="text-hint">
            Прикреплено максимальное количество фото ({maxImages} шт.)
          </Typography>
        )
      }
    </div>
  );
}
export default ImageInput;


interface ImagePreviewProps {
  image: ImagePreview;
  imageRemove: () => void;
}

const ImagePreview: React.FC<ImagePreviewProps> = (
  {image, imageRemove: handleImageRemove}
) => {
  return (
    <div className="relative w-40 h-auto max-h-40 overflow-hidden rounded-md">
      <CrossIcon
        className={cn(
          "absolute z-50 top-2 right-2 w-6 h-6 cursor-pointer text-white/50 bg-black/25 rounded-md ",
          "hover:text-white hover:bg-black/50 transition-colors",
        )}
        onClick={handleImageRemove}
      />
      {
        image.url === ''
          ? (
            <div
              className="w-full h-30 flex items-center justify-center bg-light-background rounded-md shadow-sm"
            >
              <ImageIcon className="w-8 h-8 text-hint"/>
            </div>
          )
          : (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={image.url} alt={`Изображение #${Date.now()}`}
                 className="w-full h-auto max-h-40 object-cover rounded-md shadow-sm border border-hint/50"/>
          )
      }
    </div>
  );
}
