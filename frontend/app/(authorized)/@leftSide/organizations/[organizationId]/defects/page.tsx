
export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params;
  return (
    <h1>Тут будут дефекты организации Id: {organizationId}</h1>
  );
}
