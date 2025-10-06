import React from "react";
import {cn} from "@/lib/utils";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder?: string;
  suffix?: React.ReactNode;
  hasError?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, suffix, hasError = false, ...props}, ref) => {

    return (
      <div className="relative group w-full">
        <input
          ref={ref as never}
          className={cn(
            "w-full px-3 py-1.5 bg-white border border-hint/50 rounded-full text-base focus:outline-none",
            "focus:border-secondary-hint",
            "placeholder:text-hint placeholder:italic placeholder:font-light",
            hasError && "border-red-accent focus:border-red-accent",
            suffix && "pr-10",
            className
          )}
          {...props}
        />
        {suffix && (
          <div className={cn(
            "absolute w-fit h-full bg-light-background right-0 top-0 flex items-center justify-center",
            "px-2 rounded-e-full border border-hint/50 text-hint",
            "group-focus-within:border-secondary-hint",
            hasError && "border-red-accent",
          )}>
            {suffix}
          </div>
        )}
      </div>
    );
  });
Input.displayName = "Input";

export default Input;


interface TextAreaProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  placeholder: string;
  hasError?: boolean;
}

export const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({className, hasError, ...props}, ref) => {
    return(
      <textarea
        ref={ref as never}
        className={cn(
          "w-full min-h-20 max-h-44 px-3 py-1.5 bg-white border border-hint/50 rounded-md text-base focus:outline-none",
          "focus:border-secondary-hint",
          "placeholder:text-hint placeholder:italic placeholder:font-light",
          hasError && "border-red-accent",
          className
        )}
        {...props}
      />
    );
  });
TextArea.displayName = "TextArea";
