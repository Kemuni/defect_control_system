import {SVGProps} from "react";

const ErrorIcon = ({ ...restProps }: SVGProps<SVGSVGElement>) => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" {...restProps}>
    <g clipPath="url(#clip0_183_1387)">
      <path d="M11.001 10H13.001V15H11.001V10ZM11 16H13V18H11V16Z"
            fill="currentColor"/>
      <path d="M13.768 4.19994C13.42 3.54494 12.742 3.13794 12 3.13794C11.258 3.13794 10.58 3.54494 10.232 4.20094L2.89396 18.0639C2.73151 18.3685 2.65107 18.7101 2.66054 19.0551C2.67001 19.4001 2.76905 19.7368 2.94796 20.0319C3.12435 20.3286 3.37523 20.574 3.67571 20.7438C3.97618 20.9136 4.31583 21.0019 4.66096 20.9999H19.339C20.047 20.9999 20.688 20.6379 21.053 20.0319C21.2319 19.7368 21.3309 19.4001 21.3404 19.0551C21.3498 18.7101 21.2694 18.3685 21.107 18.0639L13.768 4.19994ZM4.66096 18.9999L12 5.13694L19.344 18.9999H4.66096Z"
            fill="currentColor"/>
    </g>
    <defs>
      <clipPath id="clip0_183_1387">
        <rect width="24" height="24" fill="currentColor"/>
      </clipPath>
    </defs>
  </svg>

);

export default ErrorIcon;