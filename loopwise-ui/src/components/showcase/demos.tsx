"use client"

import * as React from "react"
import { PlusIcon, TriangleAlertIcon } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const variants = ["default", "secondary", "ghost", "destructive"] as const
const sizes = ["sm", "default", "lg"] as const

export function ButtonMatrix() {
  return (
    <div className="grid gap-3">
      {variants.map((variant) => (
        <div key={variant} className="flex flex-wrap items-center gap-3">
          {sizes.map((size) => (
            <Button key={size} variant={variant} size={size}>
              Button
            </Button>
          ))}
          <Button variant={variant}>
            <PlusIcon />
            New task
          </Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
          <Button variant={variant} loading>
            Loading
          </Button>
        </div>
      ))}
    </div>
  )
}

export function SaveDemo() {
  const [saving, setSaving] = React.useState(false)

  return (
    <Button
      loading={saving}
      loadingLabel="Saving changes"
      onClick={() => {
        setSaving(true)
        setTimeout(() => setSaving(false), 2000)
      }}
    >
      Save changes
    </Button>
  )
}

export function TabsDemo({ variant }: { variant: "pill" | "underline" }) {
  return (
    <Tabs defaultValue="overview">
      <TabsList variant={variant} aria-label={`${variant} tabs`}>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tasks">Tasks</TabsTrigger>
        <TabsTrigger value="docs">Docs</TabsTrigger>
        <TabsTrigger value="billing" disabled>
          Billing
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Goals and progress.</TabsContent>
      <TabsContent value="tasks">Everything the team is working on.</TabsContent>
      <TabsContent value="docs">Notes and specs.</TabsContent>
    </Tabs>
  )
}

export function DialogDemo({ destructive = false }: { destructive?: boolean }) {
  const [open, setOpen] = React.useState(false)
  const [busy, setBusy] = React.useState(false)

  return (
    <Dialog
      open={open}
      onOpenChange={(next) => {
        // Stay open while the action is running.
        if (!busy) setOpen(next)
      }}
    >
      <DialogTrigger asChild>
        <Button variant="secondary">
          {destructive ? "Delete project" : "Rename project"}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <div className="flex gap-3">
          {destructive && (
            <span className="grid size-9 shrink-0 place-items-center rounded-full bg-destructive-subtle text-destructive-icon">
              <TriangleAlertIcon aria-hidden className="size-5" />
            </span>
          )}
          <DialogHeader>
            <DialogTitle>
              {destructive ? "Delete project" : "Rename project"}
            </DialogTitle>
            <DialogDescription>
              {destructive
                ? "This removes the project and its tasks for everyone in the workspace."
                : "Everyone in the workspace will see the new name. Links to the project keep working."}
            </DialogDescription>
          </DialogHeader>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button
            variant={destructive ? "destructive" : "default"}
            loading={busy}
            loadingLabel={destructive ? "Deleting" : "Saving"}
            onClick={() => {
              setBusy(true)
              setTimeout(() => {
                setBusy(false)
                setOpen(false)
              }, 1500)
            }}
          >
            {destructive ? "Delete project" : "Save changes"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function ThemeToggle() {
  return (
    <Button
      variant="secondary"
      size="sm"
      onClick={() => document.documentElement.classList.toggle("dark")}
    >
      Toggle page theme
    </Button>
  )
}
