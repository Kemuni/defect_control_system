import {Typography} from "@/components/icons/Typography";
import {Button} from "@/components/Button";
import PlusIcon from "@/components/icons/PlusIcon";
import FilterIcon from "@/components/icons/FilterIcon";
import SearchIcon from "@/components/icons/SearchIcon";
import DefectIcon from "@/components/icons/DefectIcon";
import ObjectsIcon from "@/components/icons/ObjectsIcon";
import {FC} from "react";
import RepairIcon from "@/components/icons/RepairIcon";
import Input from "@/components/Input";

export default function Home() {
  return (
    <div className="flex gap-4.5">
      <div className="flex flex-col gap-2.5 w-full h-screen pl-16 py-3">
        <div className="flex justify-between w-full items-center">
          <Typography variant="title1" weight="medium" className="text-secondary-hint">Организации</Typography>
          <Button variant="white" size="sm" leftIcon={<PlusIcon className="w-5 h-5" />}>Создать</Button>
        </div>
        <div className="flex flex-col gap-2.5 ps-4">
          <div className="w-full flex gap-2 justify-between">
            <Input placeholder="Введите запрос"/>
            <Button variant="white" size="md" className="rounded-full" rightIcon={<SearchIcon className="w-5 h-5" />}>Поиск</Button>
            <Button variant="plain" size="md" className="rounded-full" rightIcon={<FilterIcon className="w-5 h-5" />}>Фильтр</Button>
          </div>
          <Typography variant="subheadline" weight="light" className="text-hint">Найдено 3 организации</Typography>
          <div className="flex flex-col gap-2">
            <OrganizationCard title="ООО &quot;Бумажные стаканчики&quot;" description="18 объектов, 12 сотрудников" owner="Семенюк В. А."/>
            <OrganizationCard title="ООО &quot;Картонные коробки&quot;" description="6 объектов, 3 сотрудника" owner="Сидоров А. М."/>
            <Button variant="white" size="md" leftIcon={<PlusIcon />} className="w-full">Добавить организацию</Button>
          </div>
        </div>
      </div>
      <div className="w-full h-screen bg-white pe-16">
        <div className="flex gap-4 w-full">
          <div className="w-1/2 h-[400px] bg-light-background"></div>
          <section className="flex flex-col py-3 gap-2 justify-start">
            <Typography variant="title1" weight="medium" className="text-secondary-hint">ООО &quot;Картонные коробки&quot;</Typography>
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
    </div>
  );
}


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


interface OrganizationCardProps {
  title: string;
  description: string;
  owner: string;
}

const OrganizationCard: FC<OrganizationCardProps> = ({title, description, owner}) => {
  return (
    <div
      className="flex gap-2 w-full bg-white rounded-md overflow-hidden duration-200
      hover:brightness-95 hover:scale-[100.5%]">
      <div className="bg-hint w-[100px] h-[100px]"/>
      <section className="flex flex-col gap-1 h-full justify-center py-2">
        <Typography variant="title4" weight="medium">{title}</Typography>
        <article className="flex flex-col gap-0">
          <Typography variant="subheadline" weight="light" className="text-hint">{description}</Typography>
          <Typography variant="subheadline" weight="light" className="text-hint">Владелец {owner}</Typography>
        </article>
      </section>
    </div>
  );
}