"use client";

import Link from "next/link";
import { useState } from "react";
import type { Dictionary } from "@/content";
import type { Locale } from "@/lib/i18n";
import LangSwitch from "./ui/lang-switch";
import ThemeToggle from "./ui/theme-toggle";

const tab = "whitespace-nowrap px-4 py-3 hover:text-accent-ink";

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
    <nav className="border-line bg-bg sticky top-0 z-50 border-b text-sm">
      <div className="flex items-stretch">
        <Link
          href={`/${lang}`}
          className="border-line bg-accent text-on-accent border-r px-4 py-3 whitespace-nowrap"
        >
          ~/yassanz
        </Link>
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className={`${tab} border-line hidden border-r md:block`}
          >
            {l.label}
          </Link>
        ))}
        <button
          type="button"
          aria-label={nav.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
          className={`${tab} border-line border-r md:hidden`}
        >
          {open ? "[ x ]" : "[ ≡ ]"}
          <span className="hidden sm:inline"> {nav.menu}</span>
        </button>
        <div className="ml-auto flex items-center gap-3 px-3 whitespace-nowrap sm:gap-4 sm:px-4">
          <a
            href={nav.cvHref}
            download
            className="hover:text-accent-ink hidden sm:inline"
          >
            [ cv.pdf ]
          </a>
          <LangSwitch lang={lang} label={nav.switchLang} />
          <ThemeToggle label={nav.theme} />
        </div>
      </div>
      {open && (
        <ul
          id="mobile-menu"
          className="divide-line border-line divide-y border-t md:hidden"
        >
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                onClick={() => setOpen(false)}
                className="hover:text-accent-ink block px-4 py-3"
              >
                {l.label}
              </Link>
            </li>
          ))}
          <li className="sm:hidden">
            <a
              href={nav.cvHref}
              download
              className="hover:text-accent-ink block px-4 py-3"
            >
              [ cv.pdf ]
            </a>
          </li>
        </ul>
      )}
    </nav>
  );
}
