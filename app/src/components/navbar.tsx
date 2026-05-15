import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Projets", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  return (
    <nav className="mx-auto my-4 flex h-15 w-full items-center justify-between rounded-full bg-surface px-6">
      <span className="font-serif text-lg font-semibold text-muted">
        Yassine <span className="text-accent">A.B</span>
      </span>

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

      <div className="flex items-center gap-4">
        <Link
          href="#contact"
          className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90"
        >
          Prendre RDV
        </Link>
        <Link
          href="https://www.linkedin.com/in/yanzarbasha/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 112.196 112.196"
            className="h-7 w-7 fill-muted transition-opacity hover:opacity-80"
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
      </div>
    </nav>
  );
}
