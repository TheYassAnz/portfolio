import Button from "./ui/button";

export default function HeroSection() {
  return (
    <section className="grid items-center py-8">
      <h1 className="text-4xl font-bold mb-4">
        I am <span className="text-gray-400">Yassine</span>
        <br />
        Full-Stack Developer based in{" "}
        <span className="text-gray-400">Paris</span>.
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        I specialize in building high-quality web applications using modern
        technologies like Next.js, Angular 20, Express.js, MongoDB and more.
      </p>
      <div className="flex items-center gap-4">
        <button className="hover:cursor-pointer">Learn more</button>
        <Button label="Book a call" />
      </div>
    </section>
  );
}
