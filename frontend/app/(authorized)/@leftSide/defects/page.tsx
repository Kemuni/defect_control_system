import LeftSideRouteHandler from "@/components/route-handlers/LeftSideRouteHandler";
import SideTabs from "@/types/SideTabs";
import {Suspense} from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <LeftSideRouteHandler className="py-3" defaultTab={SideTabs.Defects} />
    </Suspense>
  );
}