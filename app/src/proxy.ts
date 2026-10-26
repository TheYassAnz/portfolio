import { NextRequest, NextResponse } from "next/server";
import { isLocale, negotiateLocale } from "@/lib/i18n";

export function proxy(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  if (isLocale(pathname.split("/")[1])) return NextResponse.next();

  const lang = negotiateLocale(req.headers.get("accept-language"));
  const path = pathname === "/" ? "" : pathname;
  return NextResponse.redirect(new URL(`/${lang}${path}${search}`, req.url), 307);
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};
