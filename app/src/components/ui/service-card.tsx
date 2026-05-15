import { type ReactNode } from "react";

export default function ServiceCard({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-surface p-6 transition-transform duration-300 hover:-translate-y-1 hover:border-accent/40">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
        {icon}
      </div>
      <div>
        <h3 className="mb-2 text-lg font-semibold text-muted">{title}</h3>
        <p className="text-sm leading-relaxed text-muted/60">{description}</p>
      </div>
    </div>
  );
}
