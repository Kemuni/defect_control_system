import {SVGProps} from "react";

const CrossIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <g clipPath="url(#clip0_29_1513)">
      <path d="M7.05027 16.9497L12 12M12 12L16.9498 7.05025M12 12L7.05027 7.05025M12 12L16.9498 16.9497"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"/>
    </g>
    <defs>
      <clipPath id="clip0_29_1513">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>
);

export default CrossIcon;