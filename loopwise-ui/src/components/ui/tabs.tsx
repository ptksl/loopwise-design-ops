"use client"

import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { Tabs as TabsPrimitive } from "radix-ui"

function Tabs({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Root>) {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={cn("flex flex-col gap-4", className)}
      {...props}
    />
  )
}

const tabsListVariants = cva(
  "group/tabs-list relative isolate inline-flex w-fit items-center",
  {
    variants: {
      variant: {
        pill: "gap-1 rounded-full bg-subtle p-1",
        underline: "gap-6 border-b border-border",
      },
    },
    defaultVariants: { variant: "pill" },
  }
)

function TabsList({
  className,
  variant = "pill",
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.List> &
  VariantProps<typeof tabsListVariants>) {
  const listRef = React.useRef<HTMLDivElement>(null)
  const indicatorRef = React.useRef<HTMLSpanElement>(null)

  React.useLayoutEffect(() => {
    const list = listRef.current
    const indicator = indicatorRef.current
    if (!list || !indicator) return

    const move = () => {
      const active = list.querySelector<HTMLElement>(
        '[role="tab"][data-state="active"]'
      )
      indicator.hidden = !active
      if (!active) return
      indicator.style.width = `${active.offsetWidth}px`
      indicator.style.transform = `translateX(${active.offsetLeft}px)`
    }

    move()
    // Turn the transition on after the first paint, so the indicator does not slide in on load.
    const frame = requestAnimationFrame(() => {
      indicator.dataset.ready = "true"
    })

    // Radix marks the selected tab with data-state: follow it instead of copying the selected value.
    const selection = new MutationObserver(move)
    selection.observe(list, {
      attributes: true,
      attributeFilter: ["data-state"],
      subtree: true,
    })
    const size = new ResizeObserver(move)
    size.observe(list)

    return () => {
      cancelAnimationFrame(frame)
      selection.disconnect()
      size.disconnect()
    }
  }, [])

  return (
    <TabsPrimitive.List
      ref={listRef}
      data-slot="tabs-list"
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    >
      <span
        ref={indicatorRef}
        aria-hidden
        className="pointer-events-none absolute left-0 -z-10 ease-(--lw-ease-out) group-data-[variant=pill]/tabs-list:inset-y-1 group-data-[variant=pill]/tabs-list:rounded-full group-data-[variant=pill]/tabs-list:bg-card group-data-[variant=pill]/tabs-list:shadow-sm group-data-[variant=underline]/tabs-list:-bottom-px group-data-[variant=underline]/tabs-list:h-0.5 group-data-[variant=underline]/tabs-list:bg-brand-border data-ready:transition-[transform,width] data-ready:duration-(--lw-tabs-slide) motion-reduce:transition-none!"
      />
      {children}
    </TabsPrimitive.List>
  )
}

function TabsTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={cn(
        "group/tab inline-flex cursor-pointer items-center justify-center text-sm leading-5 font-medium whitespace-nowrap text-muted-foreground transition-colors duration-(--lw-duration-fast) hover:text-foreground focus-visible:outline-2 outline-ring focus-visible:outline-offset-1 disabled:cursor-not-allowed disabled:text-disabled-foreground data-[state=active]:font-semibold data-[state=active]:text-foreground",
        "group-data-[variant=pill]/tabs-list:rounded-full group-data-[variant=pill]/tabs-list:px-3 group-data-[variant=pill]/tabs-list:py-1.5 group-data-[variant=pill]/tabs-list:data-[state=inactive]:hover:not-disabled:bg-muted",
        "group-data-[variant=underline]/tabs-list:rounded-sm group-data-[variant=underline]/tabs-list:px-0.5 group-data-[variant=underline]/tabs-list:py-2.5 group-data-[variant=underline]/tabs-list:data-[state=active]:text-brand-foreground",
        className
      )}
      {...props}
    >
      {/* A hidden semibold copy reserves the selected width, so neighbours do not move. */}
      <span className="grid">
        <span className="col-start-1 row-start-1">{children}</span>
        <span
          aria-hidden
          className="invisible col-start-1 row-start-1 font-semibold"
        >
          {children}
        </span>
      </span>
    </TabsPrimitive.Trigger>
  )
}

function TabsContent({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={cn(
        "rounded-sm text-sm leading-[22px] text-muted-foreground focus-visible:outline-2 outline-ring focus-visible:outline-offset-2",
        className
      )}
      {...props}
    />
  )
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants }
