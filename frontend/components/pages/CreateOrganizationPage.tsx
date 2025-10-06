"use client";
import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";
import {Button} from "@/components/Button";
import {toast} from "sonner";
import ArrowIcon from "@/components/icons/ArrowIcon";
import Link from "next/link";
import CreateOrganizationForm from "@/components/forms/CreateOrganizationForm";

export type CreateOrganizationPageProps = React.HTMLAttributes<HTMLDivElement>

const CreateOrganizationPage: React.FC<CreateOrganizationPageProps> = ({
  className, ...props
}) => {
  return (
    <div className={cn("w-full h-full flex flex-col gap-6", className)} {...props}>
      <div className="relative flex justify-between w-full items-center">
        <Typography variant="title1" weight="medium">
          Создание организации
        </Typography>

        <Link href={"/organizations"}>
          <Button variant="plain"
                  size="sm"
                  leftIcon={<ArrowIcon className="w-5 h-5 rotate-180"/>}
                  className="text-hint"
          >Назад</Button>
        </Link>
      </div>

      <CreateOrganizationForm onSubmit={() => toast.success('Организация успешно создана!')}/>
    </div>
  );
};

export default CreateOrganizationPage;
