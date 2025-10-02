import DefectsPage from "@/components/pages/DefectsPage";
import {Typography} from "@/components/Typography";

export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params;
  if (isNaN(Number(organizationId))) {
    return (
      <Typography variant="title1" weight="medium" className="text-secondary-hint">
        Организация не найдена
      </Typography>
    )
  }

  return (
    <DefectsPage organizationId={Number(organizationId)} className="py-3"/>
  );
}