import ProjectCard from "./ui/project-card";

export default function ProjectSection() {
  return (
    <section className="max-w-7xl mx-auto px-8 py-16">
      <h2 className="text-3xl font-semibold">Projects</h2>
      <p className="text-gray-500">Here are some of my recent projects.</p>
      {/* Horizontal scroll container: overflow-x-auto to allow scrolling, hide vertical overflow */}
      <div className="mt-8">
        <div
          className="overflow-x-auto overflow-y-hidden px-8 scroll-smooth snap-x snap-mandatory -mx-8"
          role="list"
          aria-label="Projects carousel"
          tabIndex={0}
        >
          {/* Inner flex row with width based on children so it can scroll horizontally */}
          <div className="flex gap-x-5 w-max">
            {Array.from({ length: 10 }).map((_, i) => (
              <ProjectCard key={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
