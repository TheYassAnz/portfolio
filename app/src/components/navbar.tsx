"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import LangSwitch from "./ui/lang-switch";
import ThemeToggle from "./ui/theme-toggle";

const tab = "px-4 py-3 hover:text-accent-ink";

export default function Navbar({
  dict,
  lang,
}: {
  dict: Dictionary;
  lang: Locale;
}) {
  const [open, setOpen] = useState(false);
  const { nav } = dict;
  const links = [
    { href: `/${lang}#projects`, label: `01 ${nav.work.toLowerCase()}` },
    { href: `/${lang}#about`, label: `02 ${nav.about.toLowerCase()}` },
    { href: `/${lang}#stack`, label: `03 ${nav.stack.toLowerCase()}` },
    { href: `/${lang}#contact`, label: `04 ${nav.contact.toLowerCase()}` },
  ];

  return (
    <nav className="sticky top-0 z-50 border-b border-line bg-bg text-sm">
      <div className="flex items-stretch">
        <Link
          href={`/${lang}`}
          className="border-r border-line bg-accent px-4 py-3 text-on-accent"
        >
          ~/yassanz
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${tab} hidden border-r border-line md:block`}
          >
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className={`${tab} border-r border-line md:hidden`}
        >
          {open ? "[ x ]" : "[ ≡ ]"} {nav.menu}
        </button>
        <div className="ml-auto flex items-center gap-3 px-3 sm:gap-4 sm:px-4">
          <a href={nav.cvHref} download className="hover:text-accent-ink">
            [ cv.pdf ]
          </a>
          <LangSwitch lang={lang} label={nav.switchLang} />
          <ThemeToggle label={nav.theme} />
        </div>
      </div>
      {open && (
        <ul id="mobile-menu" className="divide-y divide-line border-t border-line md:hidden">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-3 hover:text-accent-ink"
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
