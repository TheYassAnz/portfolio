"use client";

import { InlineWidget } from "react-calendly";

export default function CalendlySection() {
  return (
    <section className=" py-16">
      <h2 className="text-3xl font-semibold">Book a call</h2>
      <p className="text-gray-500">
        Schedule a 15-minute call with me to discuss your project or any
        questions you may have.
      </p>

      <div className="grid grid-cols-2 ">
        {/* contact form */}
        {/* <div className="col-span-1 flex flex-col justify-center p-8">
          <h3 className="text-2xl font-medium mb-4">Get in touch</h3>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Your Name"
              className="p-3 border border-gray-300 rounded-md"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="p-3 border border-gray-300 rounded-md"
            />
            <textarea
              placeholder="Your Message"
              className="p-3 border border-gray-300 rounded-md h-32"
            ></textarea>
            <button
              type="submit"
              className="bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition"
            >
              Send Message
            </button>
          </form>
        </div> */}
        {/* calendly widget */}
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
