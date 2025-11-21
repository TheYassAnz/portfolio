import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="grid items-center">
      <h1 className="text-4xl font-bold mb-4">
        I am{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
          Yassine
        </span>
        <br />
        Full-Stack Developer based in{" "}
        <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500">
          Paris
        </span>
        .
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        I specialize in building high-quality web applications using modern
        technologies like Next.js, Angular 20, Express.js, MongoDB and more.
      </p>
      <div className="flex items-center gap-4">
        <Link href="#services" className="hover:cursor-pointer">
          Learn more
        </Link>
        <Link
          href="#contact"
          className="px-4 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-3xl hover:opacity-80 hover:cursor-pointer border-2 transition"
        >
          Book a call
        </Link>
      </div>
    </section>
  );
}
