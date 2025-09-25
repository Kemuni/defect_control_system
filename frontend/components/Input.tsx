import React from "react";
import {cn} from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({className, ...props}, ref) => {
    return(
      <input
        ref={ref as never}
        className={cn(
          "w-full px-3 py-1.5 bg-white border border-hint/50 rounded-full text-base focus:outline-none",
          "focus:border-secondary-hint",
          "placeholder:text-hint placeholder:italic placeholder:font-light",
          className
        )}
        {...props}
      />
    );
  });
Input.displayName = "Input";

export default Input;
