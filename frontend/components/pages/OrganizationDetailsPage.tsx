"use client";
import React, {FC} from "react";
import {Typography} from "@/components/Typography";
import {Button} from "@/components/Button";
import DefectIcon from "@/components/icons/DefectIcon";
import ObjectsIcon from "@/components/icons/ObjectsIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import RepairIcon from "@/components/icons/RepairIcon";
import {cn} from "@/lib/utils";
import {useSearchParams} from "next/navigation";
import OrganizationIcon from "@/components/icons/OrganizationIcon";

export type OrganizationDetailsPageProps = React.HTMLAttributes<HTMLDivElement>

const OrganizationDetailsPage: React.FC<OrganizationDetailsPageProps> = ({
  className, ...props
}) => {
  const searchParams = useSearchParams();
  const organizationId = searchParams.get('organizationId');

  if (organizationId === null) {
    return (
      <div className={cn("flex flex-col flex-1 items-center justify-center", className)} {...props}>
        <OrganizationIcon className="w-12 h-12 text-hint"/>
        <Typography variant="title2" weight="medium" className="text-hint">Выберите организацию</Typography>
      </div>
    );
  }

  return (
    <div className={cn("w-full h-full", className)} {...props}>
      <div className="flex gap-4 w-full">
        <div className="w-1/2 h-[400px] bg-light-background"></div>
        <section className="w-1/2 flex flex-col py-3 gap-2 justify-start">
          <Typography variant="title1" weight="medium" className="text-secondary-hint text-ellipsis overflow-hidden">
            ООО &quot;Картонные коробки&quot;
          </Typography>
          <table>
            <tbody>
            <tr>
              <th className="text-start py-1"><Typography variant="headline" className="text-hint">Дата создания</Typography></th>
              <td className="text-start"><Typography variant="headline">10 сентября 2025</Typography></td>
            </tr>
            <tr>
              <th className="text-start py-1"><Typography variant="headline" className="text-hint">Владелец</Typography></th>
              <td className="text-start"><Typography variant="headline">ВЫ</Typography></td>
            </tr>
            <tr>
              <th className="text-start py-1"><Typography variant="headline" className="text-hint">Объектов</Typography></th>
              <td className="text-start"><Typography variant="headline">8 единиц</Typography></td>
            </tr>
            <tr>
              <th className="text-start py-1"><Typography variant="headline" className="text-hint">Сотрудников</Typography></th>
              <td className="text-start"><Typography variant="headline">6 человек</Typography></td>
            </tr>
            </tbody>
          </table>

          <div className="flex flex-col gap-2 mt-auto">
            <Button variant="primary" size="md" className="w-full" rightIcon={<DefectIcon />}>Открыть дефекты</Button>
            <Button variant="gray" size="md" className="w-full" rightIcon={<ObjectsIcon />}>Посмотреть объекты</Button>
          </div>
        </section>
      </div>
      <div className="w-full flex flex-wrap gap-4 px-6 py-3">
        <StatisticsBlock title="Дефектов" icon={DefectIcon} value="3 шт." comment="-2 чем с предыдущим месяцем"/>
        <StatisticsBlock title="На проверке" icon={SearchIcon} value="1 дефект" comment="+1 чем с предыдущим месяцем"/>
        <StatisticsBlock title="Исправлено" icon={RepairIcon} value="33%" comment="2 из 6 дефектов"/>
        <StatisticsBlock title="Дефектов в этом месяце" icon={RepairIcon} value="6 дефектов" comment="+1 по сравнению с прошлым месяцем"/>
      </div>
    </div>
  );
};

export default OrganizationDetailsPage;


interface StatisticsBlockProps {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  value: string;
  comment: string;
}

const StatisticsBlock: FC<StatisticsBlockProps> = ({title, icon: Icon, value, comment}) => {
  return (
    <section
      className="w-fit flex flex-col px-3 py-2 gap-2 rounded-md bg-light-background
      hover:brightness-95 duration-200 hover:-translate-y-0.5">
      <div className="w-full flex gap-3 justify-between items-center">
        <Typography variant="title4">{title}</Typography>
        <div className="p-1 border border-black rounded-md"><Icon className="w-5 h-5 text-black"/></div>
      </div>
      <Typography variant="title2" weight="medium">{value}</Typography>
      <Typography variant="subheadline" weight="light">
        {comment}
      </Typography>
    </section>
  );
}
