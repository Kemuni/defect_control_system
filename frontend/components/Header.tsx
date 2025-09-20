import OrganizationIcon from "@/components/icons/OrganizationIcon";
import LogoIcon from "@/components/icons/LogoIcon";
import {Typography} from "@/components/icons/Typography";
import ChevronIcon from "@/components/icons/ChevronIcon";
import PlusIcon from "@/components/icons/PlusIcon";
import {Select, SelectItem} from "@/components/Select";
import {Button} from "@/components/Button";

function Header() {
  return (
    <header className="fixed h-[75px] w-full flex justify-between bg-white border-b border-hint px-16 py-4">
      <div className="flex w-1/3 gap-1.5 h-full items-center">
        <OrganizationIcon className="w-6 h-6 text-black" />
        <Typography variant="title4">Организация:</Typography>
        <Select className="rounded-full w-fit max-w-48" defaultValue="all">
          <SelectItem value='all' className="text-nowrap"><Typography variant="text">Все</Typography></SelectItem>
          <SelectItem value='1' className="text-nowrap"><Typography variant="text">ООО &quot;Картонные коробки&quot;</Typography></SelectItem>
          <SelectItem value='2' className="text-nowrap"><Typography variant="text">ООО &quot;Зелень&quot;</Typography></SelectItem>
        </Select>
        <Button variant="gray" size="sm" className="w-fit h-fit" rightIcon={<PlusIcon className="w-5 h-5 text-hint"/>} />
      </div>
      <div className="flex w-fit gap-1.5 h-full items-center">
        <LogoIcon className="w-12 h-12 text-black" />
        <Typography variant="title1" className="font-[Roboto_mono]">Система Контроля</Typography>
      </div>
      <div className="flex w-1/3 gap-1.5 h-full items-center justify-end">
        <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
        <Typography variant="title4">Сидоров А. М.</Typography>
        <ChevronIcon className="rotate-180 w-5 h-5"/>
      </div>
    </header>
  )
}

export default Header;
