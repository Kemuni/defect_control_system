"use client";

import {useSearchParams} from "next/navigation";
import DefectsPage from "@/components/pages/DefectsPage";
import React from "react";
import ObjectsPage from "@/components/pages/ObjectsPage";
import OrganizationsPage from "@/components/pages/OrganizationsPage";
import SideTabs from "@/types/SideTabs";
import PagePlaceHolder from "@/components/PagePlaceHolder";
import ErrorIcon from "@/components/icons/ErrorIcon";

export interface LeftSideRouteHandlerProps {
  defaultTab: SideTabs;
  className?: string;
}

const LeftSideRouteHandler: React.FC<LeftSideRouteHandlerProps> = ({ defaultTab, ...props }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || defaultTab;

  switch (tab) {
    case SideTabs.Defects:
      return <DefectsPage {...props} />;
    case SideTabs.Objects:
      return <ObjectsPage {...props} />;
    case SideTabs.Organizations:
      return <OrganizationsPage {...props} />;
    default:
      return <PagePlaceHolder text="Страница не найдена" icon={ErrorIcon} />;
  }
};

export default LeftSideRouteHandler;
