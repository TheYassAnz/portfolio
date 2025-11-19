export default function ProjectCard({
  title = "Project Title",
  description = "A brief description of the project.",
  backgroundImageUrl = "https://png.pngtree.com/thumb_back/fh260/background/20240522/pngtree-abstract-cloudy-background-beautiful-natural-streaks-of-sky-and-clouds-red-image_15684333.jpg",
}: {
  title?: string;
  description?: string;
  backgroundImageUrl?: string;
}) {
  return (
    <div
      className="flex flex-col min-w-[400px] h-[250px] border border-gray-300 rounded-md snap-start justify-between bg-cover bg-center"
      style={
        backgroundImageUrl
          ? { backgroundImage: `url(${backgroundImageUrl})` }
          : {}
      }
    >
      <div className="place-self-end p-4">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="m4.5 19.5 15-15m0 0H8.25m11.25 0v11.25"
          />
        </svg>
      </div>
      <div className="p-4 backdrop-blur-sm bg-white/30 rounded-b-md">
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="text-gray-500">{description}</p>
      </div>
    </div>
  );
}
