import {DefectStatus} from "@/types/Defect";
import {Typography, TypographyProps} from "@/components/Typography";
import React from "react";
import {cn} from "@/lib/utils";
import InfoIcon from "@/components/icons/InfoIcon";

interface DefectStatusBadgeProps {
  status: DefectStatus;
  typographyVariant?: TypographyProps['variant'];
  typographyWeight?: TypographyProps['weight'];
  className?: string;
  hideCircle?: boolean;
  hideHint?: boolean;
}

export const DefectStatusBadge: React.FC<DefectStatusBadgeProps> = (
  { status, typographyVariant = 'text', typographyWeight = 'regular', hideCircle = false, hideHint = false,
    className = '' },
) => {
  let statusBgColor: string, statusText: string, statusHintText: string;
  switch (status) {
    case 'opened':
      statusBgColor = 'bg-blue-accent';
      statusText = 'Свободный';
      statusHintText = 'Дефект открыт и ответственный сотрудник еще не назначен';
      break;
    case 'in_progress':
      statusBgColor = 'bg-green-accent';
      statusText = 'В работе';
      statusHintText = 'Дефект в работе и должен быть исправлен в ближайшее время';
      break;
    case 'on_moderation':
      statusBgColor = 'bg-orange-accent';
      statusText = 'На проверке';
      statusHintText = 'Исправление дефекта находится на проверке';
      break;
    case 'closed':
      statusBgColor = 'bg-hint';
      statusText = 'Закрыт';
      statusHintText = 'Дефект был исправлен и закрыт';
      break;
  }

  const hintProps = {
    'data-tooltip-id': process.env.NEXT_PUBLIC_TOOLTIP_ID,
    'data-tooltip-content': statusHintText,
    'data-tooltip-delay-show': 350,
  }

  if (hideCircle) {
    return (
      <div className={cn("flex gap-1 items-center text-black", className)}>
        <Typography variant={typographyVariant} weight={typographyWeight}
                    className="text-inherit text-nowrap">
          { statusText }
        </Typography>
        { !hideHint && <InfoIcon className="w-5 h-5 text-inherit" {...hintProps}/> }
      </div>
    );
  }

  return (
    <div className={cn("flex gap-1 items-center text-black", className)}
         {...(!hideHint && hintProps)}
    >
      <div className={cn("w-2 h-2 rounded-full", statusBgColor)}/>
      <Typography variant={typographyVariant} weight={typographyWeight}
                  className="text-inherit text-nowrap">
        { statusText }
      </Typography>
    </div>
  );
};