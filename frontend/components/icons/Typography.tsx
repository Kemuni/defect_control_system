import {cva, VariantProps} from "class-variance-authority";
import React from "react";
import {cn} from "@/lib/utils";


const typographyVariants = cva(
  `text-black font-[Jost]`,
  {
    variants: {
      variant: {
        title1: 'text-4xl',
        title2: 'text-3xl',
        title3: 'text-2xl',
        title4: 'text-xl',
        headline: 'text-lg tracking-tight',
        text: 'text-base',
        subheadline: 'text-sm tracking-tight',
      },
      weight: {
        light: 'font-light',
        regular: 'font-normal',
        medium: 'font-medium',
        semibold: 'font-semibold',
        bold: 'font-bold',
      },
    },
    defaultVariants: {
      variant: 'text',
      weight: "regular",
    }
  }
);

export interface TypographyProps extends VariantProps<typeof typographyVariants>, React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
}


const Typography: React.FC<TypographyProps> = ({ className, variant, weight, children, ...props}) => {
  let Element: React.ElementType;
  switch (variant) {
    case "title1": Element = "h2"; break;
    case "title2": Element = "h3"; break;
    case "title3": Element = "h4"; break;
    case "title4": Element = "h5"; break;
    case "subheadline": Element = "small"; break;
    default: Element = "p"; break;
  }

  return (
    <Element
      className={cn(typographyVariants({ variant, weight, className }))}
      {...props}
    >
      {children}
    </Element>
  );
};
Typography.displayName = "Typography";
export { Typography, typographyVariants };
