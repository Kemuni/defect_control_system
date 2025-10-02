import SideTabs from "@/types/SideTabs";
import {Suspense} from "react";
import RightSideRouteHandler from "@/components/route-handlers/RightSideRouteHandler";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RightSideRouteHandler defaultTab={SideTabs.Defects} />
    </Suspense>
  );
}