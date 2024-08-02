/* eslint-disable react/button-has-type */
import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

export const buttonVariants = cva(
  " whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-slate-950 disabled:pointer-events-none disabled:opacity-50 dark:focus-visible:ring-slate-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-white shadow hover:bg-primary-500/80",
        destructive:
          "bg-red-500 text-slate-50 shadow-sm hover:bg-red-500/90 dark:bg-red-900 dark:text-slate-50 dark:hover:bg-red-900/90",
        outline:
          "border border-gray-500 bg-transparent shadow-sm hover:bg-gray-200 hover:text-slate-900",
        secondary:
          "bg-[#01010B] text-white shadow-sm hover:bg-[#01010B]/80 dark:bg-slate-800 dark:text-slate-50 dark:hover:bg-slate-800/80 disabled:bg-[#EBEAE9] disabled:text-[#717171]/60",
        ghost: "hover:bg-gray-200 hover:text-slate-900",
        link: "text-slate-900 underline-offset-4 hover:underline dark:text-slate-50",
      },
      size: {
        default: "px-7 py-3",
        sm: "rounded-md p-2 text-xs",
        lg: "rounded-md px-8",
        icon: "h-9 w-9",
        base: "text-[14px] px-4 py-2",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon" | "base";
  loading?: boolean;
  icon?: React.ReactNode;
  childClass?: string;
  loaderColor?: string;
  loaderHeight?: number;
  loaderWidth?: number;
  innerChildClass?: string;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      children,
      loading,
      icon,
      childClass,
      loaderWidth,
      loaderHeight,
      loaderColor,
      innerChildClass,
      ...props
    },
    ref
  ) => {
    return (
      <button
        children={
          loading || icon ? (
            <div
              className={cn(
                "flex gap-2 items-center justify-center",
                childClass
              )}
            >
              {/* {loading && (
                <AnimatedLoader
                  className="!me-0 flex-shrink-0"
                  color={loaderColor}
                  height={loaderHeight}
                  width={loaderWidth}
                />
              )} */}
              {icon}
              {children && <span className={innerChildClass}>{children}</span>}
            </div>
          ) : (
            <span className={innerChildClass}>{children}</span>
          )
        }
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = "Button";

export default Button;
