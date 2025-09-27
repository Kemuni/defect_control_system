import {Typography} from "@/components/Typography";
import {toast} from "sonner";
import React from "react";
import {cn} from "@/lib/utils";


interface EmployeeCardProps {
  employeeId: number;
  name: string;
  surname: string;
  patronymic: string;
  className?: string;
}

const EmployeeCard: React.FC<EmployeeCardProps> = (
  { employeeId, name, surname, patronymic, className }
) => {
  return (
    <div
      className={cn(
        "w-fit h-7.5 flex gap-1 items-center text-black text-ellipsis overflow-hidden cursor-pointer",
        "hover:underline",
        className,
      )}
      onClick={() => toast(`Переход на страницу сотрудника ID:${employeeId}`)}
    >
      <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
      <Typography variant="headline" weight="regular" className="text-inherit">
        { surname } { name.slice(0, 1) }. { patronymic.slice(0, 1) }.
      </Typography>
    </div>
  )
}
export default EmployeeCard;

