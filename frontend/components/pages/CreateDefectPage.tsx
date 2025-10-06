"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import {toast} from "sonner";
import CreateDefectForm from "@/components/forms/CreateDefectForm";

export type CreateDefectPageProps = React.HTMLAttributes<HTMLDivElement>


const CreateDefectPage: React.FC<CreateDefectPageProps> = (
  { className, ...props}
) => {


  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <div className="relative flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium">
          Регистрация дефекта
        </Typography>

        <Link href={"/defects"}>
          <Button variant="plain"
                  size="sm"
                  leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                  className="text-hint"
          >Назад</Button>
        </Link>
      </div>

      <CreateDefectForm onSubmit={() => toast.success('Дефект успешно создан!')}/>
    </div>
  );
};

export default CreateDefectPage;
