import ServiceCard from "./ui/service-card";

export default function ServiceSection() {
  return (
    <section>
      <h2 className="text-3xl font-semibold">Services</h2>
      <p className="text-gray-500">Here are some of the services I offer.</p>
      <div className="mt-8 grid xl:grid-cols-3 lg:grid-cols-2 grid-cols-1 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <ServiceCard key={i} />
        ))}
      </div>
    </section>
  );
}
