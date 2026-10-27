import Image from "next/image";
import Link from "next/link";
import type { Dictionary } from "@/content";

export default function HeroSection({ dict }: Readonly<{ dict: Dictionary }>) {
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
          <Link href="#contact" className="bg-accent px-5 py-3 text-on-accent">
            $ {hero.contactCta}
          </Link>
        </div>
      </div>
      <div className="hidden justify-end md:flex">
        <figure className="w-72 border border-line font-mono text-xs text-fg-muted">
          <div className="border-b border-line px-3 py-1">me.jpg</div>
          <Image
            src="/me.jpg"
            alt={dict.about.photoAlt}
            width={288}
            height={288}
            priority
            className="aspect-square object-cover grayscale"
          />
          <figcaption className="border-t border-line px-3 py-1">
            fig.01 — paris
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
