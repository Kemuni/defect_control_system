"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import {toast} from "sonner";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import CreateObjectForm from "@/components/forms/CreateObjectForm";

export type CreateObjectPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateObjectPage: React.FC<CreateObjectPageProps> = ({
  className, ...props
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <div className="relative flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium">
          Создание объекта
        </Typography>

        <Link href={"/objects"}>
          <Button variant="plain"
                  size="sm"
                  leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                  className="text-hint"
          >Назад</Button>
        </Link>
      </div>

      <CreateObjectForm onSubmit={() => toast.success('Объект успешно создан!')}/>
    </div>
  );
};

export default CreateObjectPage;