import type { Dictionary } from "@/content";

export default function AboutSection({ dict }: Readonly<{ dict: Dictionary["about"] }>) {
  return (
    <section id="about" className="scroll-mt-14 py-12">
      <h2 className="mb-6 px-3 font-display text-4xl">
        <span className="mr-3 font-mono text-base text-fg-muted">{"// 02"}</span>
        {dict.title}
      </h2>
      <p className="px-3 text-lg text-fg-muted">{dict.intro}</p>
      <ol className="mt-10 ml-3 border-l border-line font-mono text-sm">
        {dict.timeline.map((e, i) => (
          <li key={`${e.period}-${e.role}-${e.org}`} className="relative pb-8 pl-6 last:pb-0">
            <span
              aria-hidden
              className={`absolute -left-[5px] top-1 size-[9px] ${i === 0 ? "bg-accent" : "border border-line bg-bg"}`}
            />
            <p className="whitespace-nowrap text-xs text-fg-muted">{e.period}</p>
            <p className="mt-1 text-fg">
              {e.role} <span className="text-fg-muted">@ {e.org}</span>
            </p>
            <p className="mt-1 text-fg-muted">{e.summary}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
