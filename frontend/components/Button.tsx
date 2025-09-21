import {cva, VariantProps} from "class-variance-authority";
import React from "react";
import {cn} from "@/lib/utils";


const buttonVariants = cva(
  `inline-flex gap-1.5 items-center justify-center whitespace-nowrap cursor-pointer
  transition-color duration-150
  active:outline active:outline-offset-1
  focus-visible:outline-none focus-visible:ring-1
  disabled:pointer-events-none disabled:opacity-50`,
  {
    variants: {
      variant: {
        primary: `bg-dark-background text-white
                  hover:brightness-[165%]
                  active:outline-black
                  disabled:opacity-35`,
        gray: `bg-light-background text-black
               hover:brightness-[85%]
               active:outline-hint
               disabled:opacity-50`,
        plain: `bg-transparent text-black
                hover:bg-light-background
                active:outline-hint
                disabled:bg-light-background disabled:opacity-50`,
        white: `bg-white text-black
                hover:brightness-[85%]
                active:outline-hint
                disabled:opacity-50`,
      },
      size: {
        sm: 'px-2.5 py-1.5 text-base font-medium w-fit h-8 rounded-full',
        md: 'px-4.5 py-2 text-base font-medium w-fit h-9 rounded-lg',
        lg: 'px-4 py-3 text-lg font-semibold w-40 h-12 rounded-lg',
      },
    },
    defaultVariants: {
      variant: 'gray',
      size: "md",
    }
  }
);

export interface ButtonProps extends VariantProps<typeof buttonVariants>, React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export interface LinkButtonProps extends VariantProps<typeof buttonVariants>, React.AnchorHTMLAttributes<HTMLAnchorElement> {
  className?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}


const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, leftIcon, rightIcon, ...props}, ref) => {
    return (
      <button
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as never}
        {...props}
      >
        {leftIcon && <div>{leftIcon}</div>}
        {props.children}
        {rightIcon && <div>{rightIcon}</div>}
      </button>
    );
  });
Button.displayName = "Button";

const LinkButton = React.forwardRef<HTMLAnchorElement, LinkButtonProps>(
  ({ className, href, variant, size, leftIcon, rightIcon, ...props}, ref) => {
    return (
      <a
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref as never}
        href={href}
        {...props}
      >
        {leftIcon && <div>{leftIcon}</div>}
        {props.children}
        {rightIcon && <div>{rightIcon}</div>}
      </a>
    );
  });
LinkButton.displayName = "LinkButton";

export { Button, LinkButton, buttonVariants };
