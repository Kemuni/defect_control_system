import {SVGProps} from "react";

const OrganizationIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <path d="M2 22H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M18 9H14C11.518 9 11 9.518 11 12V22H21V12C21 9.518 20.482 9 18 9Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round" />
    <path d="M15 22H3V5C3 2.518 3.518 2 6 2H12C14.482 2 15 2.518 15 5V9"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round" />
    <path d="M3 6H6M3 10H6M3 14H6M15 13H17M15 16H17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round" />
    <path d="M16 22V19"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round" />
  </svg>
);

export default OrganizationIcon;