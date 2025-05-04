"use client"

import * as React from "react"
import * as TabsPrimitive from "@radix-ui/react-tabs"

import { cn } from "@/lib/utils"

function Tabs({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-2", className)}
      {...props} />)
  );
}
function TabsList({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.List
      data-slot="tabs-list"
      className={cn(
          "inline-flex h-auto rounded-md p-1 text-fuchsia-700",
        className
      )}
      {...props} />)
  );
}

function TabsTrigger({
  className,
  ...props
}) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        // Layout and dimensions (unchanged)
        "inline-flex items-center w-full justify-center whitespace-nowrap rounded-lg p-3 font-medium text-balance ring-offset-white transition-all duration-300 ease-out",

        // Dark base for contrast
        "bg-[#0f0f1a] text-[#d1d1d1]",

        // Neon magenta active state with reduced glow
        "data-[state=active]:bg-[#0f0f1a] data-[state=active]:text-[#ff33cc] data-[state=active]:font-extrabold",
        "data-[state=active]:shadow-[0_0_4px_#ff33cc,0_0_8px_#ff33cc]",

        // Hover and focus neon blue border (with orbit effect)
        "group relative overflow-hidden border-2 border-transparent rounded-lg",
        "focus-visible:ring-1 focus-visible:ring-[#00bfff] focus-visible:ring-offset-2",

        // Neon blue orbiting effect on hover
        "hover:border-[#00bfff] hover:scale-[1.03] group-hover:animate-orbit",

        // Disable magenta glow when the tab is active and hovered
        "data-[state=active]:hover:shadow-none", // Disable glow on hover for active tab

        // Orbiting neon blue border animation
        "@keyframes orbitAnimation { 0% { border-color: #00bfff; transform: scale(1) rotate(0deg); } 50% { border-color: #00bfff; transform: scale(1.1) rotate(180deg); } 100% { border-color: #00bfff; transform: scale(1) rotate(360deg); } }",
        "group-hover:animate-[orbitAnimation_2s_linear_infinite]",

        // Disabled state
        "disabled:pointer-events-none disabled:opacity-50",

        className
      )}
      {...props}
    />
  );
}





function TabsContent({
  className,
  ...props
}) {
  return (
    (<TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn("flex-1 outline-none", className)}
      {...props} />)
  );
}

export { Tabs, TabsList, TabsTrigger, TabsContent }
