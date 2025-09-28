"use client";
import Image, { ImageProps } from 'next/image'
import React, {useEffect, useState} from "react";
import {cn} from "@/lib/utils";
import ImageIcon from "@/components/icons/ImageIcon";
import {Typography} from "@/components/Typography";
import ErrorIcon from "@/components/icons/ErrorIcon";

const ImageWithPlaceholder: React.FC<ImageProps & { hidePlaceholderText?: boolean }> = (
  { src, alt, className, fill, hidePlaceholderText = false, ...props }
) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [hasError, setHasError] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [src]);

  return (
    <>
      <Image src={src} alt={alt} fill={fill}
             className={cn(
               className,
               "transition-opacity duration-200",
               isLoading || hasError ? "opacity-0" : "opacity-100",
             )}
             onLoad={() => {setIsLoading(false); setHasError(false);}}
             onError={() => {setIsLoading(false); setHasError(true);}}
             {...props}
      />
      {
        (isLoading || hasError) && (
          hasError
            ? (
              <ImagePlaceholder icon={<ErrorIcon className="w-11 h-11"/>}
                                title={hidePlaceholderText ? undefined : "Не удалось загрузить изображение..."}
                                fill={fill} width={props.width} height={props.height} hasAnimation={false}
                                className={className} />
            )
            : (
              <ImagePlaceholder icon={<ImageIcon className="w-11 h-11"/>}
                                title={hidePlaceholderText ? undefined : "Загрузка изображения..."}
                                fill={fill} width={props.width} height={props.height} className={className} />
            )
        )
      }
    </>
  );
};

export default ImageWithPlaceholder;


interface ImageLoaderPlaceholderProps {
  icon: React.ReactNode;
  title?: string;
  hasAnimation?: boolean;
  fill?: boolean;
  width?: number | `${number}`;
  height?: number | `${number}`;
  className?: string;
}

const ImagePlaceholder: React.FC<ImageLoaderPlaceholderProps> = (
  { icon, title, fill = false, width = undefined, height = undefined, hasAnimation = true, className = '' }
) => {
  return (
    <div className={cn(
      className,
      fill ? "w-full h-full" : `w-[${width}] h-[${height}]`,
      "flex flex-col gap-2 items-center justify-center bg-light-background text-hint overflow-hidden",
      hasAnimation && "animate-pulse",
    )}
    >
      { icon }
      { title && <Typography variant="headline" className="text-inherit">{title}</Typography>}
    </div>
  );
};
