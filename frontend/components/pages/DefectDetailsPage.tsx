"use client";
import React, {useEffect, useState} from "react";
import {cn, timeAgoString} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import {useSearchParams} from "next/navigation";
import DefectIcon from "@/components/icons/DefectIcon";
import Defect, {mockedDefects} from "@/types/Defect";
import {Button} from "@/components/Button";
import RepairIcon from "@/components/icons/RepairIcon";
import {DefectStatusBadge} from "@/components/DefectStatusBadge";
import EmployeeCard from "@/components/EmployeeCard";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";

export type DefectDetailsPageProps = React.HTMLAttributes<HTMLDivElement>

const DefectDetailsPage: React.FC<DefectDetailsPageProps> = ({
    className, ...props
  }) => {
  const searchParams = useSearchParams();
  const defectId = searchParams.get('defectId');
  const defect = (
    defectId === null
      ? undefined
      : mockedDefects.find(obj => obj.id === Number(defectId))
  );

  if (defect === undefined) {
    return (
      <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
        <DefectIcon className="w-12 h-12 text-hint"/>
        <Typography variant="title2" weight="medium" className="text-hint">Выберите дефект</Typography>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <div className="flex gap-4 w-full">
        <div
          className="relative w-1/2 h-[400px]">
          <ImageWithPlaceholder src={defect.imageUrl} alt="Фото дефекта"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill className="object-cover" />
        </div>
        <section className="w-1/2 flex flex-col py-3 gap-2 justify-start">
          {
            defect.isCritical && (
              <Typography variant="text" className="w-fit rounded-full bg-red-accent text-white px-2 py-1">
                Критичный
              </Typography>
            )
          }
          <Typography variant="title1" weight="medium"
                      className="items-baseline text-secondary-hint text-ellipsis overflow-hidden">
            {defect.title}
          </Typography>
          <Typography variant="title4" className="text-secondary-hint">
            {
              defect.deadline === undefined
                ? "Дедлайн не указан"
                : `Необходимо исправить до ${ defect.deadline.toLocaleDateString('ru-RU', { month: 'long', day: 'numeric' }) }`
            }
          </Typography>
          <div className="flex gap-2 items-center">
            <DefectStatusBadge status={defect.status}
                               hideCircle={true} hideHint={true}
                               typographyVariant="headline" className="text-hint"/>
            <span className="w-1 h-1 rounded-full bg-hint inline-block"/>
            <Typography variant="headline" className="text-hint">
              создан { timeAgoString(defect.createdAt) }
            </Typography>
          </div>

          <div className="grid grid-cols-2 gap-x-1 gap-y-2.5 items-center mt-2">
            <Typography variant="headline" className="text-hint">Зарегистрировал</Typography>
            <EmployeeCard employeeId={defect.creatorEmployee.id} {...defect.creatorEmployee}/>

            <Typography variant="headline" className="text-hint">Ответственный</Typography>
            {
              defect.responsibleEmployee
                ? (<EmployeeCard employeeId={defect.responsibleEmployee.id} {...defect.responsibleEmployee}/>)
                : (<Typography variant="headline">Не назначен</Typography>)
            }
          </div>

          <Button variant="primary" size="md"
                  className="w-full mt-auto"
                  rightIcon={<RepairIcon className="w-6 h-6" />}>
            Устранить дефект
          </Button>
        </section>
      </div>
      <div className="flex flex-col gap-4.5 ps-6 pt-4">
        <DefectDescription description={defect.description} />
        <DefectDataTable defect={defect} />

        <div className="flex gap-2.5">
          <Button variant="primary" size="md" rightIcon={<RepairIcon className="w-6 h-6" />}>
            Отметить исправленным
          </Button>
          <Button variant="plain" size="md">
            Изменить дефект
          </Button>
        </div>
      </div>
    </div>
  );
};
export default DefectDetailsPage;


interface DefectDescriptionProps {
  description: string;
}

const DefectDescription: React.FC<DefectDescriptionProps> = ({ description }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  useEffect(() => {
    setIsOpen(false);
  }, [description]);

  return (
    <div>
      <Typography variant="title4" className="text-hint">Описание</Typography>
      <Typography variant="text">
        {
          description
            .slice(0, isOpen ? description.length : 100)
            .concat(description.length > 100 && !isOpen ? "..." : "")
        }
        {
          description.length > 100 && (
            <span onClick={() => setIsOpen(!isOpen)}
                  className="inline underline text-hint text-base ms-1 px-1 cursor-pointer">
              { isOpen ? "меньше" : "больше" }
            </span>
          )
        }
      </Typography>
    </div>
  );
};


interface DefectDataTableProps {
  defect: Defect;
}

const DefectDataTable: React.FC<DefectDataTableProps> = ({ defect }) => {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-2.5 items-center">
      <Typography variant="headline" className="text-hint">Статус</Typography>
      <DefectStatusBadge status={defect.status} typographyVariant="headline" hideCircle />

      <Typography variant="headline" className="text-hint">Ответственный</Typography>
      {
        defect.responsibleEmployee
          ? (<EmployeeCard employeeId={defect.responsibleEmployee.id} {...defect.responsibleEmployee}/>)
          : (<Typography variant="headline">Не назначен</Typography>)
      }

      <Typography variant="headline" className="text-hint">Дата создания</Typography>
      <Typography variant="headline">
        {
          defect.createdAt.toLocaleDateString(
            'ru-RU',
            { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        }
      </Typography>

      <Typography variant="headline" className="text-hint">Дедлайн исправления</Typography>
      <Typography variant="headline">
        {
          defect.deadline === undefined
            ? "Дедлайн не указан"
            : (defect.deadline.toLocaleDateString('ru-RU', { year: 'numeric', month: 'long', day: 'numeric' }))
        }
      </Typography>

      <Typography variant="headline" className="text-hint">Приоритет</Typography>
      <Typography variant="headline">
        { defect.priority ? "Не указан" : `${defect.priority}/10 баллов` }
      </Typography>
    </div>
  );
};
