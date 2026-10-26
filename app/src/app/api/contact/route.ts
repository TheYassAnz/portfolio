import { Resend } from "resend";
import { NextResponse } from "next/server";
import { escapeHtml } from "@/lib/escape-html";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_LEN = 5000;
const bad = (error: string) => NextResponse.json({ error }, { status: 400 });

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const { name, email, subject, message } = body ?? {};

  const fields = [name, email, subject, message];
  if (!fields.every((f) => typeof f === "string" && f.trim())) {
    return bad("Invalid or missing fields.");
  }
  if (fields.some((f: string) => f.length > MAX_LEN)) return bad("Field too long.");
  if (!EMAIL_RE.test(email)) return bad("Invalid email.");

  const to = process.env.CONTACT_EMAIL;
  if (!to) {
    console.error("CONTACT_EMAIL is not set");
    return NextResponse.json({ error: "Envoi impossible." }, { status: 500 });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);
  const { error } = await resend.emails.send({
    from: "onboarding@resend.dev",
    to,
    replyTo: email,
    subject: `[Portfolio] ${subject}`.replace(/[\r\n]+/g, " "),
    text: `Nom : ${name}\nEmail : ${email}\n\n${message}`,
    html: `
      <p><strong>Nom :</strong> ${escapeHtml(name)}</p>
      <p><strong>Email :</strong> <a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></p>
      <p><strong>Sujet :</strong> ${escapeHtml(subject)}</p>
      <hr />
      <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
    `,
  });

  if (error) {
    console.error("Resend error:", error);
    return NextResponse.json({ error: "Envoi impossible." }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
