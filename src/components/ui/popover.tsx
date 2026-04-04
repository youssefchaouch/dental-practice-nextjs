import { cn } from "@/lib/utils";
import { Popover as HeadlessPopover } from "@headlessui/react";
import * as React from "react";

export interface PopoverProps {
  children: React.ReactNode;
  className?: string;
}

export function Popover({ children, className }: PopoverProps) {
  return (
    <HeadlessPopover className={cn("relative", className)}>
      {children}
    </HeadlessPopover>
  );
}
