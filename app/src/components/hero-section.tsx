import Link from "next/link";
import type { Dictionary } from "@/content";
import Terminal from "./ui/terminal";

export default function HeroSection({ dict }: { dict: Dictionary }) {
  const { hero } = dict;
  return (
    <section className="grid items-center gap-12 border-b border-line py-16 md:grid-cols-2 md:py-24">
      <div className="flex flex-col gap-6">
        <p className="text-fg-muted">{"// "}{hero.comment}</p>
        <h1 className="font-display text-4xl leading-none tracking-tight sm:text-5xl lg:text-8xl">
          {hero.firstName}
          <br />
          {hero.lastName}
        </h1>
        <p>{hero.stackLine}</p>
        <div className="flex flex-wrap gap-3">
          <a
            href={dict.nav.cvHref}
            download
            className="bg-accent px-5 py-3 text-on-accent"
          >
            [ cv.pdf ]
          </a>
          <Link
            href="#contact"
            className="border border-line px-5 py-3 hover:text-accent-ink"
          >
            $ {hero.contactCta}
          </Link>
        </div>
      </div>
      <div className="hidden justify-end md:flex">
        <Terminal lines={hero.terminal} />
      </div>
    </section>
  );
}
