import {SVGProps} from "react";

const UserIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <path
      d="M11.8 9.8C14.2301 9.8 16.2 7.83005 16.2 5.4C16.2 2.96995 14.2301 1 11.8 1C9.36997 1 7.40002 2.96995 7.40002 5.4C7.40002 7.83005 9.36997 9.8 11.8 9.8Z"
      stroke="currentColor"
      strokeWidth="2" />
    <path
      d="M20.6 18.05C20.6 20.7835 20.6 23 11.8 23C3 23 3 20.7835 3 18.05C3 15.3165 6.9402 13.1 11.8 13.1C16.6598 13.1 20.6 15.3165 20.6 18.05Z"
      stroke="currentColor"
      strokeWidth="2" />
  </svg>
);

export default UserIcon;