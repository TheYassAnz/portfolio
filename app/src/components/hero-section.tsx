import Link from "next/link";
import Terminal from "./ui/terminal";
import {
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiFigma,
  SiTerraform,
  SiJenkins,
  SiKubernetes,
} from "react-icons/si";

const skills = [
  { icon: SiReact, label: "React", color: "#61DAFB" },
  { icon: SiNextdotjs, label: "Next.js", color: "#e5e5e5" },
  { icon: SiExpo, label: "Expo", color: "#e5e5e5" },
  { icon: SiFigma, label: "Figma", color: "#F24E1E" },
  { icon: SiTerraform, label: "Terraform", color: "#844FBA" },
  { icon: SiJenkins, label: "Jenkins", color: "#D33833" },
  { icon: SiKubernetes, label: "Kubernetes", color: "#326CE5" },
];

export default function HeroSection() {
  return (
    <section className="grid items-center gap-12 py-16 md:grid-cols-2 md:py-24">
      {/* Text */}
      <div className="flex flex-col gap-6">
        <div>
          <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
            Développeur Full-Stack
          </p>
          <h1 className="font-serif text-5xl leading-tight font-bold text-muted md:text-6xl">
            Yassine
            <br />
            <span className="text-accent">ANZAR BASHA</span>
          </h1>
        </div>

        <p className="max-w-md text-muted/70">
          Je conçois et développe des applications web et mobiles modernes, du
          design à l&apos;infrastructure — pour les entreprises et les
          entrepreneurs ambitieux.
        </p>

        {/* Skills */}
        <div className="flex flex-wrap gap-3">
          {skills.map(({ icon: Icon, label, color }) => (
            <div
              key={label}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-surface px-3 py-1.5 text-sm text-muted/80"
            >
              <Icon style={{ color }} size={16} />
              {label}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-4">
          <Link
            href="#contact"
            className="rounded-full bg-accent px-6 py-3 font-semibold text-black transition-opacity hover:opacity-90"
          >
            Prendre RDV
          </Link>
          <Link
            href="#projects"
            className="text-sm text-muted/70 underline underline-offset-4 transition-colors hover:text-accent"
          >
            Voir mes projets
          </Link>
        </div>
      </div>

      {/* Terminal */}
      <div className="hidden justify-end md:flex">
        <Terminal />
      </div>
    </section>
  );
}
