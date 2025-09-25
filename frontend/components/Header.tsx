import OrganizationIcon from "@/components/icons/OrganizationIcon";
import LogoIcon from "@/components/icons/LogoIcon";
import {Typography} from "@/components/Typography";
import PlusIcon from "@/components/icons/PlusIcon";
import {Select, SelectItem} from "@/components/Select";
import {Button} from "@/components/Button";
import UserProfileBtn from "@/components/UserProfileBtn";
import Link from "next/link";


function Header() {
  return (
    <header className="fixed z-50 h-[75px] w-full flex justify-between bg-white border-b border-hint px-16 py-4">
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
      <Link href="/" className="flex w-fit gap-1.5 h-full items-center">
        <LogoIcon className="w-12 h-12 text-black" />
        <Typography variant="title1" className="font-[Roboto_mono] whitespace-nowrap">Система Контроля</Typography>
      </Link>
      <div className="flex w-1/3 h-full justify-end">
        <UserProfileBtn name="Александр" surname="Сидоров" patronymic="Михайлович" />
      </div>
    </header>
  )
}

export default Header;
