import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid items-center">
      <h1 className="mb-4 text-4xl font-bold">
        I am <span>Yassine ANZAR BASHA</span>
        <br />
        Full-Stack Developer based in <span>Paris</span>.
      </h1>

      <p className="mb-6 w-[70%] text-lg text-gray-700">
        I specialize in building high-quality web applications using modern
        technologies like Next.js, Angular 20, Express.js, MongoDB and more.
      </p>
      <div className="flex items-center gap-4">
        <Link href="#services" className="hover:cursor-pointer">
          Learn more
        </Link>
        <Link
          href="#contact"
          className="rounded-3xl border-2 px-4 py-2 transition hover:cursor-pointer hover:bg-black hover:text-white"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
}
