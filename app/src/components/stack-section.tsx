import type { Dictionary } from "@/content";

export default function StackSection({ dict }: { dict: Dictionary["stack"] }) {
  return (
    <section id="stack" className="scroll-mt-14 py-12">
      <h2 className="mb-6 px-3 font-display text-4xl">
        <span className="mr-3 font-mono text-base text-fg-muted">{"// 03"}</span>
        {dict.title}
      </h2>
      <div className="grid border-t border-line md:grid-cols-3">
        {dict.groups.map((g) => (
          <div key={g.name} className="border-b border-line p-4 md:border-r">
            <h3 className="mb-3 font-display text-xl text-accent-ink">{g.name}</h3>
            <ul className="font-mono text-sm">
              {g.items.map((item) => (
                <li key={item}>
                  <span className="text-fg-muted">&gt;</span> {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
