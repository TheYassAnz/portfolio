"use client";

import Link from "next/link";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

function LinkedInIcon() {
  return (
    <Link
      href="https://www.linkedin.com/in/yanzarbasha/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 112.196 112.196"
        className="h-7 w-7 transition-opacity hover:opacity-80"
      >
        <circle cx="56.098" cy="56.097" r="56.098" className="fill-muted/20" />
        <path
          className="fill-muted"
          d="M89.616,60.611v23.128H76.207V62.161c0-5.418-1.936-9.118-6.791-9.118
          c-3.705,0-5.906,2.491-6.878,4.903c-0.353,0.862-0.444,2.059-0.444,3.268v22.524H48.684
          c0,0,0.18-36.546,0-40.329h13.411v5.715c1.782-2.742,4.96-6.662,12.085-6.662
          C83.002,42.462,89.616,48.226,89.616,60.611z M34.656,23.969c-4.587,0-7.588,3.011-7.588,6.967
          c0,3.872,2.914,6.97,7.412,6.97h0.087c4.677,0,7.585-3.098,7.585-6.97
          C42.063,26.98,39.244,23.969,34.656,23.969z M27.865,83.739H41.27V43.409H27.865V83.739z"
        />
      </svg>
    </Link>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav className="relative mx-auto my-4 w-full rounded-full bg-surface px-6">
      {/* Main bar */}
      <div className="flex h-15 items-center justify-between">
        {/* Desktop links */}
        <ul className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm text-muted/70 transition-colors hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Hamburger — mobile only, left side when links are hidden */}
        <button
          onClick={() => setOpen((o) => !o)}
          className="text-muted/70 transition-colors hover:text-accent md:hidden"
          aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
        >
          {open ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>

        {/* CTA + LinkedIn — always right */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
          >
            Prendre RDV
          </Link>
          <LinkedInIcon />
        </div>
      </div>

      {/* Mobile bubbles */}
      {open && (
        <ul className="absolute left-6 z-50 mt-2 flex flex-col items-start gap-2 md:hidden">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              style={{ animationDelay: `${i * 60}ms` }}
              className="animate-fade-in-down"
            >
              <Link
                href={link.href}
                onClick={() => setOpen(false)}
                className="block rounded-full bg-surface border border-white/10 px-5 py-2.5 text-sm font-semibold text-muted shadow-lg transition-colors hover:border-accent/40 hover:text-accent"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </nav>
  );
}
