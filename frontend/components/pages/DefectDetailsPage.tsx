"use client";
import React from "react";
import {cn} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import {useSearchParams} from "next/navigation";
import DefectIcon from "@/components/icons/DefectIcon";

export type DefectDetailsPageProps = React.HTMLAttributes<HTMLDivElement>

const DefectDetailsPage: React.FC<DefectDetailsPageProps> = ({
    className, ...props
  }) => {
  const searchParams = useSearchParams();
  const defectId = searchParams.get('defectId');

  if (defectId === null) {
    return (
      <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
        <DefectIcon className="w-12 h-12 text-hint"/>
        <Typography variant="title2" weight="medium" className="text-hint">Выберите дефект</Typography>
      </div>
    );
  }
  return (
    <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
      <DefectIcon className="w-12 h-12 text-hint"/>
      <Typography variant="title2" weight="medium" className="text-hint">Выберите дефект</Typography>
    </div>
  );
};
export default DefectDetailsPage;
