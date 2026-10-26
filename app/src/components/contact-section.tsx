import type { Dictionary } from "@/content";
import CopyEmail from "./ui/copy-email";
import ContactForm from "./ui/contact-form";
import { GITHUB, LINKEDIN } from "@/lib/socials";

export default function ContactSection({
  dict,
}: Readonly<{
  dict: Dictionary["contact"];
}>) {
  const email = process.env.NEXT_PUBLIC_CONTACT_EMAIL;
  const links = [
    { cmd: "linkedin", href: LINKEDIN, label: "linkedin.com/in/yanzarbasha" },
    { cmd: "github", href: GITHUB, label: "github.com/TheYassAnz" },
  ];
  return (
    <section id="contact" className="scroll-mt-14 py-12">
      <h2 className="mb-6 px-3 font-display text-4xl">
        <span className="mr-3 font-mono text-base text-fg-muted">{"// 04"}</span>
        {dict.title}
      </h2>
      <div className="grid gap-8 px-3 md:grid-cols-2">
        <div>
          <p className="mb-6 text-lg text-fg-muted">{dict.intro}</p>
          <ul className="flex flex-col gap-2 font-mono text-sm">
            {email && (
              <li className="flex gap-3">
                <span className="text-fg-muted">$ mail</span>
                <span className="sr-only">{dict.email}</span>
                <CopyEmail email={email} copy={dict.copy} copied={dict.copied} />
              </li>
            )}
            {links.map(({ cmd, href, label }) => (
              <li key={cmd} className="flex gap-3">
                <span className="text-fg-muted">$ {cmd}</span>
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-ink"
                >
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <ContactForm dict={dict.form} />
      </div>
    </section>
  );
}
