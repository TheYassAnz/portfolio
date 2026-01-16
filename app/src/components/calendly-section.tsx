"use client";

export default function CalendlySection() {
  return (
    <section
      id="contact"
      className="scroll-mt-10 rounded-3xl border border-slate-200 bg-white/80 p-8 shadow-sm"
    >
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h2 className="mt-3 text-3xl font-semibold text-slate-900">
            Book a call or contact me
          </h2>
          <p className="mt-2 max-w-2xl text-slate-600">
            Discuss your project needs and explore how I can help bring your
            vision to life.
          </p>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-4 rounded-2xl border border-slate-200 bg-slate-50/80 p-6 text-slate-800 lg:col-span-1">
          <h3 className="text-lg font-semibold">Why book?</h3>
          <ul className="space-y-3 text-sm text-slate-700">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
              Define your goals and key constraints.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
              Identify priority deliverables and a realistic timeline.
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
              Leave with a concrete roadmap.
            </li>
          </ul>
          <div className="rounded-xl border border-dashed border-slate-300 bg-white/80 p-4 text-sm">
            <p className="font-semibold text-slate-900">Availability</p>
            <p className="mt-1 text-slate-600">
              Open slots CET/CEST, automatically adjusted to your time zone.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm lg:col-span-2">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold tracking-wide text-emerald-700 uppercase">
                Quick 15-minute intro
              </p>
              <p className="text-lg font-semibold text-slate-900">
                Pick a slot on Calendly to get started.
              </p>
              <p className="text-sm text-slate-600">
                I’ll confirm with a short agenda and any prep materials if
                needed.
              </p>
            </div>
            <a
              href="https://calendly.com/book-with-yassine/15-minute-call?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=231f20"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center rounded-full bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-emerald-500"
            >
              Open Calendly
            </a>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-semibold text-slate-800">
                What to expect
              </p>
              <ul className="mt-2 space-y-2 text-sm text-slate-600">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500" />
                  15-minute intro focused on your goals.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-amber-500" />
                  Quick feasibility check and next steps.
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
                  Follow-up summary within 24h.
                </li>
              </ul>
            </div>
            <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4">
              <p className="text-sm font-semibold text-slate-800">
                Need something else?
              </p>
              <p className="mt-2 text-sm text-slate-600">
                Prefer email or async? Drop a line and I’ll respond within one
                business day.
              </p>
              <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-700">
                <a
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 px-3 py-1 font-semibold transition-colors duration-200 hover:border-slate-400 hover:bg-slate-50"
                  href="mailto:contact@yassanz.com"
                >
                  contact@yassanz.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
