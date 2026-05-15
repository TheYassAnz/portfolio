import { FiCalendar, FiClock, FiFileText } from "react-icons/fi";
import ContactForm from "./ui/contact-form";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

const highlights = [
  { icon: FiClock, text: "15 min — intro rapide et ciblée" },
  { icon: FiCalendar, text: "Créneaux disponibles en CET/CEST" },
  { icon: FiFileText, text: "Résumé envoyé sous 24h après l'appel" },
];

export default function CalendlySection() {
  return (
    <section id="contact" className="scroll-mt-24 py-16">
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Prenons contact
      </p>
      <h2 className="mb-2 font-serif text-4xl font-bold text-muted">
        Travaillons ensemble
      </h2>
      <p className="mb-10 max-w-xl text-muted/60">
        Choisissez le mode de contact qui vous convient le mieux.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Calendly */}
        <div className="flex flex-col justify-between gap-8 rounded-2xl border border-accent/30 bg-surface p-8">
          <div>
            <p className="mb-1 text-xs font-semibold tracking-widest text-accent uppercase">
              Appel vidéo
            </p>
            <h3 className="mb-3 font-serif text-2xl font-bold text-muted">
              Prendre RDV
            </h3>
            <p className="text-sm leading-relaxed text-muted/60">
              Réservez un créneau de 15 minutes pour discuter de votre projet,
              vos objectifs et les prochaines étapes.
            </p>
          </div>

          <ul className="space-y-3">
            {highlights.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-3 text-sm text-muted/70">
                <Icon className="shrink-0 text-accent" size={16} />
                {text}
              </li>
            ))}
          </ul>

          {calendlyUrl ? (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              <FiCalendar size={16} />
              Réserver un créneau
            </a>
          ) : (
            <p className="rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-xs text-muted/40 italic">
              Lien Calendly non configuré —{" "}
              <code className="text-accent">NEXT_PUBLIC_CALENDLY_URL</code> dans{" "}
              <code className="text-accent">.env.local</code>
            </p>
          )}
        </div>

        {/* Contact form */}
        <div className="rounded-2xl border border-white/10 bg-surface p-8">
          <p className="mb-1 text-xs font-semibold tracking-widest text-accent uppercase">
            Message écrit
          </p>
          <h3 className="mb-3 font-serif text-2xl font-bold text-muted">
            Envoyer un message
          </h3>
          <p className="mb-6 text-sm leading-relaxed text-muted/60">
            Préférez l&apos;async ? Décrivez votre besoin et je vous réponds
            sous 24h.
          </p>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
