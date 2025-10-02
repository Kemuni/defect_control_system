import LeftSideRouteHandler from "@/components/route-handlers/LeftSideRouteHandler";
import {Suspense} from "react";
import SideTabs from "@/types/SideTabs";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeftSideRouteHandler className="py-3" defaultTab={SideTabs.Organizations} />
    </Suspense>
  );
}