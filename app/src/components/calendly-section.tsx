"use client";

import { InlineWidget } from "react-calendly";

export default function CalendlySection() {
  return (
    <section id="contact" className="scroll-mt-10">
      <h2 className="text-3xl font-semibold">Book a call</h2>
      <p className="text-gray-500">
        Schedule a 15-minute call with me to discuss your project or any
        questions you may have.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-6">
        <div className="col-span-2">
          <InlineWidget
            url="https://calendly.com/book-with-yassine/15-minute-call?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=231f20"
            className="h-[700px] w-full"
          />
        </div>
      </div>
    </section>
  );
}
