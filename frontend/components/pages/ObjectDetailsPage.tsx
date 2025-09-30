"use client";
import React from "react";
import {cn, getRussianWord, timeAgoString} from "@/lib/utils";
import {Typography} from "@/components/Typography";
import {useSearchParams} from "next/navigation";
import DefectIcon from "@/components/icons/DefectIcon";
import {Button} from "@/components/Button";
import EmployeeCard from "@/components/EmployeeCard";
import ImageWithPlaceholder from "@/components/ImageWithPlaceholder";
import Object, {mockedObjects} from "@/types/Object";
import ObjectsIcon from "@/components/icons/ObjectsIcon";
import Link from "next/link";

export type ObjectDetailsPageProps = React.HTMLAttributes<HTMLDivElement>

const ObjectDetailsPage: React.FC<ObjectDetailsPageProps> = (
  { className, ...props }
) => {
  const searchParams = useSearchParams();
  const objectId = searchParams.get('objectId');
  const object = (
    objectId === null
      ? undefined
      : mockedObjects.find(obj => obj.id === Number(objectId))
  );

  if (object === undefined) {
    return (
      <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
        <ObjectsIcon className="w-12 h-12 text-hint"/>
        <Typography variant="title2" weight="medium" className="text-hint">Выберите объект</Typography>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <div className="flex gap-4 w-full">
        <div
          className="relative w-1/2 h-[400px]">
          <ImageWithPlaceholder src={object.imageUrl} alt="Фото дефекта"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                fill className="object-cover rounded-br-md" />
        </div>
        <section className="w-1/2 flex flex-col py-3 gap-2 justify-start">
          <Typography variant="title1" weight="medium"
                      className="items-baseline text-secondary-hint text-ellipsis overflow-hidden">
            {object.title}
          </Typography>
          <Typography variant="headline" className="text-hint">
            создан { timeAgoString(object.createdAt) }
          </Typography>

          <div className="grid grid-cols-2 gap-x-1 gap-y-2.5 items-center mt-2">
            <Typography variant="headline" className="text-hint">Зарегистрировал</Typography>
            <EmployeeCard employeeId={object.creatorEmployee.id} {...object.creatorEmployee}/>

            <Typography variant="headline" className="text-hint">Ответственный по умолчанию</Typography>
            {
              object.defaultResponsibleEmployee
                ? (<EmployeeCard employeeId={object.defaultResponsibleEmployee.id}
                                 {...object.defaultResponsibleEmployee}/>)
                : (<Typography variant="headline">Не назначен</Typography>)
            }
          </div>

          <div className="flex flex-col gap-2 mt-auto">
            <Link href={{
              pathname: `/organizations/${object.organizationId}/defects`,
              query: {
                objectId: object.id,
              }
            }}>
              <Button variant="primary" size="md"
                      className="w-full"
                      rightIcon={<DefectIcon className="w-6 h-6" />}>Дефекты объекта</Button>
            </Link>
            <Button variant="plain" size="md" className="w-full">Изменить данные</Button>
          </div>
        </section>
      </div>
      <div className="flex flex-col gap-4.5 ps-6 pt-4">
        <ObjectDataTable object={object} />
      </div>
    </div>
  );
};
export default ObjectDetailsPage;


interface ObjectDataTableProps {
  object: Object;
}

const ObjectDataTable: React.FC<ObjectDataTableProps> = ({ object }) => {
  return (
    <div className="grid grid-cols-2 gap-x-1 gap-y-2.5 items-center">
      <Typography variant="headline" className="text-hint">Ответственный по умолчанию</Typography>
      {
        object.defaultResponsibleEmployee
          ? (<EmployeeCard employeeId={object.defaultResponsibleEmployee.id}
                           {...object.defaultResponsibleEmployee}/>)
          : (<Typography variant="headline">Не назначен</Typography>)
      }

      <Typography variant="headline" className="text-hint">Дата создания</Typography>
      <Typography variant="headline">
        {
          object.createdAt.toLocaleDateString(
            'ru-RU',
            { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' })
        }
      </Typography>

      <Typography variant="headline" className="text-hint">Дефектов за всё время</Typography>
      <Typography variant="headline">
        {`12 ${getRussianWord(12, ['дефект', 'дефекта', 'дефектов'])}`}
      </Typography>

      <Typography variant="headline" className="text-hint">Активных дефектов</Typography>
      <Typography variant="headline">
        {
          object.defectsCount === 0
            ? "Нет активных дефектов"
            : `${object.defectsCount} ${getRussianWord(object.defectsCount, ['дефект', 'дефекта', 'дефектов'])}`
        }
      </Typography>
    </div>
  );
};
