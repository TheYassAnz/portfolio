import ProjectCard from "./ui/project-card";

export default function ProjectSection() {
  return (
    <section>
      <h2 className="text-3xl font-semibold">Projects</h2>
      <p className="text-gray-500">Here are some of my recent projects.</p>
      {/* Horizontal scroll container: overflow-x-auto to allow scrolling, hide vertical overflow */}
      <div className="mt-8">
        {/* Inner flex row with width based on children so it can scroll horizontally */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 10 }).map((_, i) => (
            <ProjectCard key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
