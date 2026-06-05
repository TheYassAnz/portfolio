import { FiGlobe, FiSmartphone, FiLayout, FiServer } from "react-icons/fi";
import AnimatedServiceGrid from "./ui/animated-service-grid";

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
      <AnimatedServiceGrid services={services} />
    </section>
  );
}
