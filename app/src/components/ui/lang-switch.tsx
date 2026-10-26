"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n";

export default function LangSwitch({
  lang,
  label,
}: {
  lang: Locale;
  label: string;
}) {
  const other = lang === "fr" ? "en" : "fr";
  const pathname = usePathname();
  const href = pathname.replace(/^\/[^/]+/, `/${other}`);
  return (
    <Link href={href} hrefLang={other} aria-label={label} className="hover:text-accent-ink">
      [ {other} ]
    </Link>
  );
}
