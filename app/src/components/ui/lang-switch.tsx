"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LangSwitch({ lang }: { lang: Locale }) {
  const other = lang === "fr" ? "en" : "fr";
  const pathname = usePathname();
  const href = pathname.replace(/^\/[^/]+/, `/${other}`);
  return (
    <Link href={href} hrefLang={other} lang={other} className="hover:text-accent-ink">
      [ {other} ]
    </Link>
  );
}
