import Image from "next/image";
import type { Dictionary } from "@/content";

export default function AboutSection({ dict }: Readonly<{ dict: Dictionary["about"] }>) {
  return (
    <section id="about" className="scroll-mt-14 py-12">
      <h2 className="mb-6 px-3 font-display text-4xl">
        <span className="mr-3 font-mono text-base text-fg-muted">{"// 02"}</span>
        {dict.title}
      </h2>
      <div className="grid gap-8 px-3 md:grid-cols-[280px_1fr]">
        <Image
          src="/me.jpg"
          alt={dict.photoAlt}
          width={280}
          height={280}
          className="border border-line grayscale"
        />
        <p className="text-lg text-fg-muted">{dict.intro}</p>
      </div>
      <ol className="mt-10 border-t border-line">
        {dict.timeline.map((e) => (
          <li
            key={`${e.period}-${e.role}-${e.org}`}
            className="flex flex-col gap-1 border-b border-line px-3 py-4 font-mono text-sm md:flex-row md:items-baseline md:gap-4"
          >
            <span className="text-fg-muted md:w-40 md:shrink-0">{e.period}</span>
            <span aria-hidden className="hidden text-fg-muted md:inline">|</span>
            <span className="text-fg md:shrink-0">
              {e.role} <span className="text-fg-muted">@</span> {e.org}
            </span>
            <span aria-hidden className="hidden text-fg-muted md:inline">|</span>
            <span className="text-fg-muted">{e.summary}</span>
          </li>
        ))}
      </ol>
    </section>
  );
}
