"use client";

import * as React from "react";
import { Circle } from "lucide-react";
import { cn } from "./utils";

interface RadioGroupProps extends React.ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
}

function RadioGroup({
  className,
  value,
  onValueChange,
  name,
  children,
  ...props
}: RadioGroupProps) {
  return (
    <div
      role="radiogroup"
      className={cn("grid gap-3", className)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child, {
            name,
            checked: child.props.value === value,
            onChange: () => onValueChange?.(child.props.value),
          } as any);
        }
        return child;
      })}
    </div>
  );
}

interface RadioGroupItemProps extends React.ComponentProps<"input"> {
  value: string;
}

function RadioGroupItem({
  className,
  value,
  checked,
  onChange,
  name,
  ...props
}: RadioGroupItemProps) {
  return (
    <div className="relative">
      <input
        type="radio"
        className="sr-only"
        value={value}
        checked={checked}
        onChange={onChange}
        name={name}
        {...props}
      />
      <div
        className={cn(
          "aspect-square size-4 shrink-0 rounded-full border border-input text-primary shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          checked && "border-primary",
          className,
        )}
      >
        {checked && (
          <div className="flex items-center justify-center h-full w-full">
            <Circle className="fill-primary h-2 w-2" />
          </div>
        )}
      </div>
    </div>
  );
}

export { RadioGroup, RadioGroupItem };
