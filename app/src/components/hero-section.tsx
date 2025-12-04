import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid items-center">
      <h1 className="mb-4 text-4xl font-bold">
        I am{" "}
        <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Yassine
        </span>
        <br />
        Full-Stack Developer based in{" "}
        <span className="bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Paris
        </span>
        .
      </h1>

      <p className="mb-6 text-lg text-gray-700">
        I specialize in building high-quality web applications using modern
        technologies like Next.js, Angular 20, Express.js, MongoDB and more.
      </p>
      <div className="flex items-center gap-4">
        <Link href="#services" className="hover:cursor-pointer">
          Learn more
        </Link>
        <Link
          href="#contact"
          className="rounded-3xl border-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 px-4 py-2 text-white transition hover:cursor-pointer hover:opacity-80"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
}
