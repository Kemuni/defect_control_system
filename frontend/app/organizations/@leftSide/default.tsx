import OrganizationsPage from "@/components/pages/OrganizationsPage";
import LeftSideLayout from "@/app/organizations/@leftSide/layout";

export default function Page() {
  return (
    <LeftSideLayout>
      <OrganizationsPage className="py-3"/>
    </LeftSideLayout>
  );
}