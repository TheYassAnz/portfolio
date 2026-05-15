"use client";

import { useState } from "react";
import { FiSend, FiCheck, FiAlertCircle } from "react-icons/fi";

type Status = "idle" | "loading" | "success" | "error";

const subjects = [
  "Mission freelance",
  "Recrutement",
  "Collaboration",
  "Autre",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setStatus(res.ok ? "success" : "error");
  };

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-white/10 bg-black/20 p-8 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent/20">
          <FiCheck className="text-accent" size={28} />
        </div>
        <div>
          <p className="font-serif text-xl font-semibold text-muted">
            Message envoyé !
          </p>
          <p className="mt-1 text-sm text-muted/60">
            Je vous répondrai dans les 24 heures.
          </p>
        </div>
        <button
          onClick={() => {
            setStatus("idle");
            setForm({ name: "", email: "", subject: "", message: "" });
          }}
          className="mt-2 text-sm text-accent underline underline-offset-4"
        >
          Envoyer un autre message
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wide text-muted/60 uppercase">
            Nom
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Jean Dupont"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted placeholder:text-muted/30 outline-none transition-colors focus:border-accent/50"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold tracking-wide text-muted/60 uppercase">
            Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="jean@exemple.com"
            className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted placeholder:text-muted/30 outline-none transition-colors focus:border-accent/50"
          />
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold tracking-wide text-muted/60 uppercase">
          Sujet
        </label>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className="rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted outline-none transition-colors focus:border-accent/50"
        >
          <option value="" disabled>
            Choisir un sujet...
          </option>
          {subjects.map((s) => (
            <option key={s} value={s} className="bg-surface">
              {s}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-semibold tracking-wide text-muted/60 uppercase">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Décrivez votre projet ou votre besoin..."
          className="resize-none rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-muted placeholder:text-muted/30 outline-none transition-colors focus:border-accent/50"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <FiAlertCircle size={16} />
          Une erreur est survenue. Réessayez ou contactez-moi par email.
        </div>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-black transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        <FiSend size={16} />
        {status === "loading" ? "Envoi en cours..." : "Envoyer le message"}
      </button>
    </form>
  );
}
