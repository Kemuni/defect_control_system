
export default async function Page({
  params,
}: {
  params: Promise<{ organizationId: string }>
}) {
  const { organizationId } = await params;
  return (
    <h1>Тут будут детали дефекта организации с Id: {organizationId}</h1>
  );
}
