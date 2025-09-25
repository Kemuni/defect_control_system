"use client";
import {Button} from "@/components/Button";
import React, {useEffect, useState} from "react";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {cn} from "@/lib/utils";
import ArrowIcon from "@/components/icons/ArrowIcon";


export interface GoBackButtonProps {
  homePath?: string;
  hideWithNullParams?: boolean;
  className?: string;
}

/*
 * Кнопка "Назад", возвращает на предыдущую страницу, используя `router.back()`.
 * Если пользователь находится на `homePath` без параметров в URL, то кнопка скрывается.
 */
const GoBackButton: React.FC<GoBackButtonProps> = ({ className, homePath, hideWithNullParams = false }) => {
  const router = useRouter();
  const [isDisabled, setIsDisabled]= useState<boolean>(true);
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Скрываем кнопку "Назад", если пользователь находится на `homePath` без параметров
  useEffect(() => {
    if (homePath && pathname === homePath && searchParams.size === 0) setIsDisabled(true);
    else if (hideWithNullParams && searchParams.size === 0) setIsDisabled(true);
    else setIsDisabled(false);
  }, [pathname, searchParams, homePath, hideWithNullParams])

  return (
    <Button
      variant="plain"
      size="sm"
      onClick={() => {router.back();}}
      disabled={isDisabled}
      leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
      className={cn("text-hint", isDisabled && "hidden", className)}
    />
  );
}
export default GoBackButton;
