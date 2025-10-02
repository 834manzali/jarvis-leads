"use client";

import * as React from "react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "./utils";

interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

function Select({ value, onValueChange, children }: SelectProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  
  // Find SelectContent children to pass to SelectValue
  const contentChild = React.Children.toArray(children).find((child) => 
    React.isValidElement(child) && child.type === SelectContent
  );
  
  const contentChildren = React.isValidElement(contentChild) ? contentChild.props.children : null;
  
  return (
    <div className="relative">
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child)) {
          const props: any = {
            value,
            onValueChange,
            isOpen,
            setIsOpen,
          };
          
          // Pass content children to SelectValue
          if (child.type === SelectTrigger) {
            props.contentChildren = contentChildren;
          }
          
          return React.cloneElement(child, props);
        }
        return child;
      })}
    </div>
  );
}

interface SelectTriggerProps extends React.ComponentProps<"button"> {
  value?: string;
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
  size?: "sm" | "default";
  contentChildren?: React.ReactNode;
}

function SelectTrigger({
  className,
  size = "default",
  children,
  value,
  isOpen,
  setIsOpen,
  onValueChange,
  contentChildren,
  ...props
}: SelectTriggerProps) {
  return (
    <button
      type="button"
      className={cn(
        "flex w-full items-center justify-between gap-2 rounded-md border border-gray-600 bg-gray-800 text-white px-3 py-2 text-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-orange-500 hover:bg-gray-700 disabled:cursor-not-allowed disabled:opacity-50",
        size === "default" && "h-9",
        size === "sm" && "h-8",
        className,
      )}
      onClick={() => setIsOpen?.(!isOpen)}
      {...props}
    >
      {React.Children.map(children, (child) => {
        if (React.isValidElement(child) && child.type === SelectValue) {
          return React.cloneElement(child, {
            value,
            children: contentChildren,
          } as any);
        }
        return child;
      })}
      <ChevronDown className="h-4 w-4 opacity-50" />
    </button>
  );
}

function SelectValue({ 
  placeholder,
  value,
  children 
}: { 
  placeholder?: string;
  value?: string;
  children?: React.ReactNode;
}) {
  // If we have a direct value but no children, show the value
  if (value && !children) {
    return <span>{value}</span>;
  }

  // Find the selected child from the parent's children (SelectContent children)
  const selectedChild = React.Children.toArray(children).find((child) => {
    if (React.isValidElement(child) && child.props.value === value) {
      return true;
    }
    return false;
  });

  if (selectedChild && React.isValidElement(selectedChild)) {
    return <span>{selectedChild.props.children}</span>;
  }

  // Fallback to placeholder
  return (
    <span className="text-muted-foreground">
      {placeholder}
    </span>
  );
}

interface SelectContentProps extends React.ComponentProps<"div"> {
  isOpen?: boolean;
  setIsOpen?: (open: boolean) => void;
  onValueChange?: (value: string) => void;
}

function SelectContent({
  className,
  children,
  isOpen,
  setIsOpen,
  onValueChange,
  ...props
}: SelectContentProps) {
  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 z-[999]" 
        onClick={() => setIsOpen?.(false)}
      />
      <div
        className={cn(
          "absolute top-full left-0 z-[1000] w-full min-w-[8rem] overflow-hidden rounded-md border bg-gray-900/95 backdrop-blur-sm text-white shadow-md animate-in fade-in-0 zoom-in-95",
          className,
        )}
        {...props}
      >
        <div className="p-1 max-h-60 overflow-y-auto">
          {React.Children.map(children, (child) => {
            if (React.isValidElement(child)) {
              return React.cloneElement(child, {
                onSelect: (value: string) => {
                  onValueChange?.(value);
                  setIsOpen?.(false);
                },
              } as any);
            }
            return child;
          })}
        </div>
      </div>
    </>
  );
}

interface SelectItemProps extends React.ComponentProps<"div"> {
  value: string;
  onSelect?: (value: string) => void;
}

function SelectItem({
  className,
  children,
  value,
  onSelect,
  ...props
}: SelectItemProps) {
  return (
    <div
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-2 pr-8 text-sm outline-none text-white hover:bg-gray-800 hover:text-white focus:bg-gray-800 focus:text-white",
        className,
      )}
      onClick={() => onSelect?.(value)}
      {...props}
    >
      {children}
    </div>
  );
}

function SelectLabel({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("px-2 py-1.5 text-xs font-semibold text-muted-foreground", className)}
      {...props}
    />
  );
}

function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  );
}

// Placeholder components for compatibility
function SelectGroup({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}

function SelectScrollUpButton() {
  return null;
}

function SelectScrollDownButton() {
  return null;
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
};
