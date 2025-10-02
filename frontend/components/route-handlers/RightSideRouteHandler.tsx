"use client";

import {useSearchParams} from "next/navigation";
import React from "react";
import SideTabs from "@/types/SideTabs";
import PagePlaceHolder from "@/components/PagePlaceHolder";
import ErrorIcon from "@/components/icons/ErrorIcon";
import DefectDetailsPage from "@/components/pages/DefectDetailsPage";
import ObjectDetailsPage from "@/components/pages/ObjectDetailsPage";
import CreateDefectPage from "@/components/pages/CreateDefectPage";
import QueryActions from "@/types/QueryActions";
import OrganizationDetailsPage from "@/components/pages/OrganizationDetailsPage";
import CreateOrganizationPage from "@/components/pages/CreateOrganizationPage";
import CreateObjectPage from "@/components/pages/CreateObjectPage";

export interface RightSideRouteHandlerProps {
  defaultTab: SideTabs;
}

const RightSideRouteHandler: React.FC<RightSideRouteHandlerProps> = ({ defaultTab }) => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab") || defaultTab;
  const action = searchParams.get("action");

  switch (tab) {
    case SideTabs.Defects:
      return renderDefectPage(action);
    case SideTabs.Objects:
      return renderObjectsPage(action);
    case SideTabs.Organizations:
      return renderOrganizationPage(action);
    default:
      return <PagePlaceHolder text="Страница не найдена" icon={ErrorIcon} />;
  }
};

export default RightSideRouteHandler;

const renderDefectPage = (action: string | null): React.ReactNode => {
  switch (action) {
    case QueryActions.Create:
      return <CreateDefectPage className="py-3 pl-6" />;
    case QueryActions.Edit:
      return <div>Редактирование</div>;
    case QueryActions.CreateDefectSolution:
      return <div>Решение дефекта</div>;
    default:
      return <DefectDetailsPage/>;
  }
}


const renderOrganizationPage = (action: string | null): React.ReactNode => {
  switch (action) {
    case QueryActions.Create:
      return <CreateOrganizationPage className="py-3 pl-6" />;
    case QueryActions.Edit:
      return <div>Редактирование</div>;
    case QueryActions.CreateDefectSolution:
      return <div>Решение дефекта</div>;
    default:
      return <OrganizationDetailsPage/>;
  }
}


const renderObjectsPage = (action: string | null): React.ReactNode => {
  switch (action) {
    case QueryActions.Create:
      return <CreateObjectPage className="py-3 pl-6" />;
    case QueryActions.Edit:
      return <div>Редактирование</div>;
    case QueryActions.CreateDefectSolution:
      return <div>Решение дефекта</div>;
    default:
      return <ObjectDetailsPage/>;
  }
}
