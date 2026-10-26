import type { Dictionary } from "@/content";
import { GITHUB, LINKEDIN } from "@/lib/socials";

const socials = [
  { href: GITHUB, label: "GitHub" },
  { href: LINKEDIN, label: "LinkedIn" },
];

export default function FooterSection({ dict }: Readonly<{ dict: Dictionary }>) {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-line py-4 text-sm">
      <span className="text-fg-muted">
        © {new Date().getFullYear()} {dict.footer.rights}
      </span>
      <div className="flex gap-4">
        {socials.map(({ href, label }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="hover:text-accent-ink"
          >
            [ {label.toLowerCase()} ]
          </a>
        ))}
      </div>
    </footer>
  );
}
