
import * as React from "react";
import * as TooltipPrimitive from "@radix-ui/react-tooltip";

const { Provider: TooltipProvider, Root, Trigger, Content, Arrow } = TooltipPrimitive;

const TooltipContent = React.forwardRef(({ 
  className = "", 
  sideOffset = 4, 
  ...props 
}, ref) => (
  <Content
    ref={ref}
    sideOffset={sideOffset}
    className={`z-50 overflow-hidden rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-950 shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
    {...props}
  />
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

export { TooltipProvider, TooltipContent, TooltipTrigger: Trigger, Tooltip: Root };
