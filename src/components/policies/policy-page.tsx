import { AlertTriangle } from "lucide-react";

export function PolicyPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <p className="text-xs font-medium uppercase tracking-[0.3em] text-gold">
        Customer care
      </p>
      <h1 className="mt-2 font-heading text-4xl font-semibold">{title}</h1>

      <div className="mt-6 flex items-start gap-3 rounded-lg border border-gold/40 bg-gold/10 p-4 text-sm text-gold-foreground">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <p>
          Draft placeholder — this page is a starting point and does not yet
          constitute a binding policy. Final terms will be published before
          launch.
        </p>
      </div>

      <div className="mt-8 space-y-6 text-muted-foreground">{children}</div>

      <p className="mt-10 text-xs text-muted-foreground">
        Last updated: {updated}
      </p>
    </div>
  );
}
