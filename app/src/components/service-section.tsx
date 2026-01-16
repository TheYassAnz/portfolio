import ServiceCard from "./ui/service-card";

export default function ServiceSection() {
  const services = [
    {
      title: "Web Development",
      description:
        "Building responsive and high-performance web applications using modern frameworks.",
      imageUrl: "/icons/3d/computer-gradient.png",
      ctaLabel: "See web work",
      ctaHref: "#projects",
    },
    {
      title: "Mobile App Development",
      description:
        "Creating user-friendly mobile applications for both Android and iOS platforms.",
      imageUrl: "/icons/3d/mobile-gradient.png",
      ctaLabel: "View mobile builds",
      ctaHref: "#projects",
    },
    {
      title: "UI/UX Design",
      description:
        "Designing intuitive user interfaces and engaging user experiences.",
      imageUrl: "/icons/3d/figma-gradient.png",
      ctaLabel: "Explore design",
      ctaHref: "#projects",
    },
  ];

  return (
    <section id="services" className="scroll-mt-10">
      <h2 className="text-3xl font-semibold">Services</h2>
      <p className="text-gray-500">Here are some of the services I offer.</p>
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        {services.map((service, index) => (
          <ServiceCard
            key={index}
            title={service.title}
            description={service.description}
            imageUrl={service.imageUrl}
            ctaLabel={service.ctaLabel}
            ctaHref={service.ctaHref}
          />
        ))}
      </div>
    </section>
  );
}
