import {SVGProps} from "react";

const TrashIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <g clipPath="url(#clip0_20_683)">
      <path
        d="M14 11V17M10 11V17M6 7V19C6 19.5304 6.21071 20.0391 6.58579 20.4142C6.96086 20.7893 7.46957 21 8 21H16C16.5304 21 17.0391 20.7893 17.4142 20.4142C17.7893 20.0391 18 19.5304 18 19V7M4 7H20M7 7L9 3H15L17 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_20_683">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>
);

export default TrashIcon;