"use client";

import { FiClock, FiMail } from "react-icons/fi";

const calendlyUrl = process.env.NEXT_PUBLIC_CALENDLY_URL;

export default function CalendlySection() {
  return (
    <section
      id="contact"
      className="scroll-mt-24 rounded-3xl border border-white/10 bg-surface p-8 py-16"
    >
      <p className="mb-2 text-sm font-semibold tracking-widest text-accent uppercase">
        Travaillons ensemble
      </p>
      <h2 className="mb-2 font-serif text-4xl font-bold text-muted">
        Prendre RDV
      </h2>
      <p className="mb-10 max-w-xl text-muted/60">
        Discutons de votre projet, vos besoins et comment je peux vous aider à
        les concrétiser.
      </p>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {/* Info */}
        <div className="space-y-4 lg:col-span-1">
          <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
            <FiClock className="mt-0.5 shrink-0 text-accent" size={18} />
            <div>
              <p className="text-sm font-semibold text-muted">Disponibilité</p>
              <p className="mt-1 text-sm text-muted/60">
                Créneaux disponibles en CET/CEST, adaptés à votre fuseau horaire.
              </p>
            </div>
          </div>

          <ul className="space-y-3 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-muted/70">
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Définir vos objectifs et contraintes.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Estimer la faisabilité et le planning.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
              Repartir avec une feuille de route concrète.
            </li>
          </ul>
        </div>

        {/* CTA */}
        <div className="flex flex-col justify-between gap-6 rounded-2xl border border-white/10 bg-black/20 p-6 lg:col-span-2">
          <div>
            <p className="text-xs font-semibold tracking-widest text-accent uppercase">
              Intro 15 minutes
            </p>
            <p className="mt-1 text-lg font-semibold text-muted">
              Choisissez un créneau sur Calendly.
            </p>
            <p className="mt-1 text-sm text-muted/60">
              Je confirme avec un ordre du jour et les éventuels documents
              préparatoires.
            </p>
          </div>

          {calendlyUrl ? (
            <a
              href={calendlyUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-fit items-center justify-center rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90"
            >
              Ouvrir Calendly
            </a>
          ) : (
            <p className="text-sm text-muted/40 italic">
              Lien Calendly non configuré — ajouter{" "}
              <code className="text-accent">NEXT_PUBLIC_CALENDLY_URL</code> dans{" "}
              <code className="text-accent">.env.local</code>.
            </p>
          )}

          <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/20 p-4">
            <FiMail className="shrink-0 text-accent" size={18} />
            <div>
              <p className="text-sm font-semibold text-muted">
                Préférez l&apos;email ?
              </p>
              <a
                href="mailto:contact@yassanz.com"
                className="mt-1 text-sm text-muted/60 underline underline-offset-4 transition-colors hover:text-accent"
              >
                contact@yassanz.com
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
