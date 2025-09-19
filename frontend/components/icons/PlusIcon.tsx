import {SVGProps} from "react";

const PlusIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <g clipPath="url(#clip0_15_2215)">
      <path d="M5 12H12M12 12H19M12 12V5M12 12V19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_15_2215">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>
);

export default PlusIcon;