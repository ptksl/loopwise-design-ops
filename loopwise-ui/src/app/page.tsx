import {
  ButtonMatrix,
  DialogDemo,
  SaveDemo,
  TabsDemo,
  ThemeToggle,
} from "@/components/showcase/demos"

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <section className="grid gap-4">
      <h2 className="text-lg font-semibold">{title}</h2>
      {children}
    </section>
  )
}

export default function Home() {
  return (
    <main className="mx-auto grid w-full max-w-5xl gap-12 px-4 py-12 sm:px-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="grid gap-2">
          <h1 className="text-[28px] leading-9 font-semibold tracking-[-0.02em]">
            Loopwise UI
          </h1>
          <p className="max-w-xl text-sm leading-[22px] text-muted-foreground">
            Loopwise tokens on shadcn and Radix: Button, Tabs and Dialog, with
            every state. A self-initiated design system.
          </p>
        </div>
        <ThemeToggle />
      </header>

      <Section title="Button">
        <div className="grid gap-4">
          <div className="rounded-lg border bg-background p-6 text-foreground">
            <ButtonMatrix />
          </div>
          <div className="dark rounded-lg border bg-background p-6 text-foreground">
            <ButtonMatrix />
          </div>
        </div>
        <div>
          <SaveDemo />
        </div>
      </Section>

      <Section title="Tabs">
        <TabsDemo variant="pill" />
        <TabsDemo variant="underline" />
      </Section>

      <Section title="Dialog">
        <div className="flex flex-wrap gap-3">
          <DialogDemo />
          <DialogDemo destructive />
        </div>
      </Section>
    </main>
  )
}
