import Link from "next/link";
import { FiGithub, FiLinkedin } from "react-icons/fi";

const socials = [
  {
    href: "https://github.com/TheYassAnz",
    icon: FiGithub,
    label: "GitHub",
  },
  {
    href: "https://www.linkedin.com/in/yanzarbasha/",
    icon: FiLinkedin,
    label: "LinkedIn",
  },
];

export default function FooterSection() {
  return (
    <footer className="mx-auto my-4 flex w-full items-center justify-between rounded-full bg-surface px-6 py-4">
      <span className="text-sm text-muted/50">
        © {new Date().getFullYear()} Yassine ANZAR BASHA
      </span>
      <div className="flex items-center gap-3">
        {socials.map(({ href, icon: Icon, label }) => (
          <Link
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="text-muted/50 transition-colors hover:text-accent"
          >
            <Icon size={20} />
          </Link>
        ))}
      </div>
    </footer>
  );
}
