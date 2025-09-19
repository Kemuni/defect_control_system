import {SVGProps} from "react";

const FilterIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <path d="M5 4H19L14 10.5V20L10 16V10.5L5 4Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"/>
  </svg>
);

export default FilterIcon;