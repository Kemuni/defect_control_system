import React from "react";
import {Typography} from "@/components/Typography";
import {cn} from "@/lib/utils";

export interface PlaceHolderProps extends React.HTMLAttributes<HTMLDivElement> {
  text: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
}

/**
 * Компонент-заглушка для отображения различных состояний.
 */
const PagePlaceHolder: React.FC<PlaceHolderProps> = ({className, text, icon: Icon, ...props}) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 items-center justify-center text-hint",
        className
      )}
      {...props}
    >
      <Icon className="w-12 h-12"/>
      <Typography variant="title2" weight="medium" className="text-inherit">{ text }</Typography>
    </div>
  );
};
export default PagePlaceHolder;