import ServiceCard from "./ui/service-card";
import { FiGlobe, FiSmartphone, FiLayout, FiServer } from "react-icons/fi";

const services = [
  {
    title: "Développement Web",
    description:
      "Applications web performantes et responsive avec Next.js, React et Node.js. Du MVP à la production.",
    icon: <FiGlobe size={22} />,
  },
  {
    title: "Développement Mobile",
    description:
      "Applications iOS et Android avec React Native & Expo. Une seule codebase, deux plateformes.",
    icon: <FiSmartphone size={22} />,
  },
  {
    title: "Design UI/UX",
    description:
      "Interfaces intuitives et élégantes conçues sur Figma. Prototypes interactifs et design systems.",
    icon: <FiLayout size={22} />,
  },
  {
    title: "Conseil & Architecture",
    description:
      "Audit technique, choix d'architecture, CI/CD avec Jenkins, infrastructure Terraform et Kubernetes.",
    icon: <FiServer size={22} />,
  },
];

export default function ServiceSection() {
  return (
    <section id="services" className="scroll-mt-24 py-16">
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Ce que je fais
      </p>
      <h2 className="mb-10 font-serif text-4xl font-bold text-muted">Services</h2>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {services.map((service) => (
          <ServiceCard key={service.title} {...service} />
        ))}
      </div>
    </section>
  );
}
