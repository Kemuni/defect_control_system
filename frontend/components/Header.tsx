import OrganizationIcon from "@/components/icons/OrganizationIcon";
import LogoIcon from "@/components/icons/LogoIcon";
import {Typography} from "@/components/icons/Typography";
import ChevronIcon from "@/components/icons/ChevronIcon";
import PlusIcon from "@/components/icons/PlusIcon";

function Header() {
  return (
    <header className="fixed h-[75px] w-full flex justify-between bg-white border-b border-hint px-16 py-4">
      <div className="flex gap-1.5 h-full items-center">
        <OrganizationIcon className="w-6 h-6 text-black" />
        <Typography variant="title4">Организация:</Typography>
        <div className="w-fit flex gap-1 px-3 py-1 bg-light-background rounded-full items-center">
          Все
          <ChevronIcon className="rotate-180 w-5 h-5"/>
        </div>
        <div className="w-fit p-1 bg-light-background rounded-full">
          <PlusIcon className="w-5 h-5 text-hint"/>
        </div>
      </div>
      <div className="flex gap-1.5 h-full items-center">
        <LogoIcon className="w-12 h-12 text-black" />
        <Typography variant="title1" className="font-[Roboto_mono]">Система Контроля</Typography>
      </div>
      <div className="flex gap-1.5 h-full items-center">
        <div className="w-7.5 h-7.5 bg-hint rounded-full"/>
        <Typography variant="title4">Сидоров А. М.</Typography>
        <ChevronIcon className="rotate-180 w-5 h-5"/>
      </div>
    </header>
  )
}

export default Header;
