import ObjectsPage from "@/components/pages/ObjectsPage";

export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params;
  return (
    <ObjectsPage organizationId={Number(organizationId)} className="py-3"/>
  );
}