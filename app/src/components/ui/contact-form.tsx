"use client";

import { useState } from "react";
import type { Dictionary } from "@/content";

type Status = "idle" | "loading" | "success" | "error";

const empty = { name: "", email: "", subject: "", message: "", website: "" };
const field =
  "border border-line bg-bg px-3 py-2 text-sm text-fg placeholder:text-fg-muted focus:outline focus:outline-accent";
const label = "font-mono text-xs uppercase text-fg-muted";

export default function ContactForm({
  dict,
}: {
  dict: Dictionary["contact"]["form"];
}) {
  const [form, setForm] = useState(empty);
  const [status, setStatus] = useState<Status>("idle");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <div className="flex flex-col gap-3 border border-line p-4" role="status">
        <p className="font-display text-xl">{dict.successTitle}</p>
        <p className="text-sm text-fg-muted">{dict.successText}</p>
        <button
          type="button"
          onClick={() => {
            setStatus("idle");
            setForm(empty);
          }}
          className="self-start font-mono text-sm underline underline-offset-4 hover:text-accent-ink"
        >
          {dict.another}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="relative flex flex-col gap-4">
      {/* Honeypot: off-screen (not display:none) so bots still fill it. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <input
          name="website"
          value={form.website}
          onChange={handleChange}
          tabIndex={-1}
          autoComplete="off"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-1.5">
          <span className={label}>{dict.name}</span>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            maxLength={5000}
            placeholder={dict.namePlaceholder}
            className={field}
          />
        </label>
        <label className="flex flex-col gap-1.5">
          <span className={label}>{dict.email}</span>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            maxLength={5000}
            placeholder={dict.emailPlaceholder}
            className={field}
          />
        </label>
      </div>

      <label className="flex flex-col gap-1.5">
        <span className={label}>{dict.subject}</span>
        <select
          name="subject"
          value={form.subject}
          onChange={handleChange}
          required
          className={field}
        >
          <option value="" disabled>
            {dict.subjectPlaceholder}
          </option>
          {dict.subjects.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </label>

      <label className="flex flex-col gap-1.5">
        <span className={label}>{dict.message}</span>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          maxLength={5000}
          rows={5}
          placeholder={dict.messagePlaceholder}
          className={`${field} resize-none`}
        />
      </label>

      {status === "error" && (
        <p role="alert" className="border border-line px-3 py-2 text-sm">
          {dict.error}
        </p>
      )}

      <button
        type="submit"
        disabled={status === "loading"}
        className="bg-accent px-6 py-3 font-mono text-sm text-on-accent hover:opacity-90 focus-visible:outline focus-visible:outline-accent disabled:opacity-50"
      >
        {status === "loading" ? dict.sending : dict.submit}
      </button>
    </form>
  );
}
