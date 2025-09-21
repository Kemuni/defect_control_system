import OrganizationDetailsPage from "@/components/pages/OrganizationDetailsPage";
import React, {Suspense} from "react";

export default async function DefaultPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <OrganizationDetailsPage />
    </Suspense>
  );
}