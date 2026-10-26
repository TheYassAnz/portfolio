import type { Dictionary } from "@/content";

export default function StatsSection({
  stats,
}: Readonly<{
  stats: Dictionary["stats"];
}>) {
  return (
    <section className="grid grid-cols-2 divide-x divide-y divide-line border-b border-line md:grid-cols-4 md:divide-y-0">
      {stats.map((s) => (
        <div key={s.label} className="p-6">
          <p className="font-display text-4xl break-words">{s.value}</p>
          <p className="mt-2 text-xs text-fg-muted">{s.label}</p>
        </div>
      ))}
    </section>
  );
}
