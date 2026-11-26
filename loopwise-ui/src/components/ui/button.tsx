import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "cn"
import { LoaderCircleIcon } from "lucide-react"
import { Slot } from "radix-ui"

const buttonVariants = cva(
  "relative inline-flex shrink-0 cursor-pointer items-center justify-center border border-transparent font-semibold whitespace-nowrap transition-colors duration-(--lw-duration-fast) select-none focus-visible:outline-2 outline-ring focus-visible:outline-offset-1 disabled:cursor-not-allowed aria-disabled:cursor-progress [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground not-aria-disabled:hover:bg-primary-hover not-aria-disabled:active:bg-primary-pressed disabled:bg-disabled! disabled:text-disabled-foreground",
        secondary:
          "border-border-strong bg-secondary text-secondary-foreground shadow-xs not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent-pressed disabled:border-border disabled:bg-secondary! disabled:text-disabled-foreground disabled:shadow-none",
        ghost:
          "text-foreground not-aria-disabled:hover:bg-accent not-aria-disabled:active:bg-accent-pressed disabled:bg-transparent! disabled:text-disabled-foreground",
        destructive:
          "bg-destructive text-primary-foreground not-aria-disabled:hover:bg-destructive-hover not-aria-disabled:active:bg-destructive-pressed disabled:bg-disabled! disabled:text-disabled-foreground",
      },
      size: {
        sm: "h-(--lw-size-control-sm) gap-1 rounded-sm px-2.5 text-[13px] leading-5",
        default:
          "h-(--lw-size-control-md) gap-1.5 rounded-md px-3 text-sm leading-5",
        lg: "h-(--lw-size-control-lg) gap-2 rounded-md px-4 text-sm leading-5",
        "icon-sm": "size-(--lw-size-control-sm) rounded-sm",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    /** Render the single child as the button, for example a link. Cannot be combined with loading. */
    asChild?: boolean
    /** Shows a spinner, keeps the width and the focus, and blocks clicks. */
    loading?: boolean
    /** What a screen reader hears when loading starts. */
    loadingLabel?: string
  }

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  loading,
  loadingLabel = "Loading",
  onClick,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(buttonVariants({ variant, size }), className)

  if (asChild) {
    return (
      <Slot.Root
        data-slot="button"
        className={classes}
        onClick={onClick}
        {...props}
      >
        {children}
      </Slot.Root>
    )
  }

  return (
    <>
      <button
        data-slot="button"
        className={classes}
        aria-busy={loading || undefined}
        // aria-disabled, not disabled: a disabled button drops keyboard focus.
        aria-disabled={loading || undefined}
        onClick={(event) => {
          if (loading) {
            event.preventDefault()
            return
          }
          onClick?.(event)
        }}
        {...props}
      >
        {/* The label stays in place, so the width holds and the name stays readable. */}
        <span
          className={cn(
            "inline-flex items-center gap-[inherit]",
            loading && "opacity-0"
          )}
        >
          {children}
        </span>
        {loading && (
          <LoaderCircleIcon
            aria-hidden
            className="absolute animate-spin motion-reduce:animate-pulse"
          />
        )}
      </button>
      {loading !== undefined && (
        <span role="status" className="sr-only">
          {loading ? loadingLabel : ""}
        </span>
      )}
    </>
  )
}

export { Button, buttonVariants }
