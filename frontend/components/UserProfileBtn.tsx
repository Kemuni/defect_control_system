"use client";
import {FC, useState} from "react";
import {Typography} from "@/components/Typography";
import ChevronIcon from "@/components/icons/ChevronIcon";
import {Button} from "@/components/Button";
import UserIcon from "@/components/icons/UserIcon";
import StaffIcon from "@/components/icons/StaffIcon";
import ExitIcon from "@/components/icons/ExitIcon";
import {cn} from "@/lib/utils";

interface UserProfileBtnProps {
  name: string;
  surname: string;
  patronymic: string;
}

const UserProfileBtn: FC<UserProfileBtnProps> = ({name, surname, patronymic}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative w-fit">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex gap-1.5 items-center p-3.5 py-1.5 rounded-full cursor-pointer transition-colors hover:bg-light-background">
        <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
        <Typography variant="title4">{surname} {name[0]}. {patronymic[0]}.</Typography>
        <ChevronIcon className="rotate-180 w-5 h-5"/>
      </button>
      <div
        className={cn(
          "absolute right-3 mt-1.5 flex flex-col gap-2 z-50 w-fit px-3 py-2 bg-white border border-hint rounded-md",
          !isOpen && "hidden",
        )}
      >
        <div className="flex gap-1.5 items-center mb-2">
          <div className="w-10 h-10 bg-hint rounded-full"/>
          <div>
            <Typography variant="title4" weight="medium">{surname}</Typography>
            <Typography variant="text">{name} {patronymic}</Typography>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <Button
            variant="plain"
            size="md"
            leftIcon={<UserIcon className="w-5 h-5"/>}
            className="w-full justify-start">
            Профиль
          </Button>
          <Button
            variant="plain"
            size="md"
            leftIcon={<StaffIcon className="w-5 h-5"/>}
            className="w-full justify-start">
            Персонал организации
          </Button>
        </div>

        <hr className="border-hint/25" />

        <Button
          variant="plain"
          size="md"
          leftIcon={<ExitIcon className="w-5 h-5"/>}
          className="w-full justify-start">
          Выйти
        </Button>
      </div>
    </div>
  );
}
export default UserProfileBtn;
