import { existsSync, statSync } from "fs";
import path from "path";
import { NextResponse } from "next/server";
import { config as loadDotenv } from "dotenv";
import { Resend } from "resend";
import {
  formatContactEmailHtml,
  formatContactEmailText,
  parseContactPayload,
} from "@/lib/contactForm";

// Load `.env.local` from disk with dotenv (reliable in API routes). If the file is open in an
// editor but not saved, it can be 0 bytes on disk - Next will then see no variables.
(function loadContactEnvFile() {
  const candidates = [
    path.resolve(process.cwd(), ".env.local"),
    path.resolve(process.cwd(), ".env"),
    path.resolve(process.cwd(), "website", ".env.local"),
  ];
  for (const envPath of candidates) {
    if (!existsSync(envPath)) continue;
    try {
      if (statSync(envPath).size === 0) {
        if (process.env.NODE_ENV !== "production") {
          console.warn(
            `[contact] ${envPath} is 0 bytes on disk. Paste RESEND_API_KEY (and save the file), or env vars stay empty.`
          );
        }
        continue;
      }
    } catch {
      continue;
    }
    loadDotenv({ path: envPath, override: true });
    return;
  }
})();

export const runtime = "nodejs";

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = parseContactPayload(json);
  if (!parsed.ok) {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }

  const { data } = parsed;
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  let from = process.env.RESEND_FROM_EMAIL?.trim();
  if (from?.startsWith('"') && from.endsWith('"')) from = from.slice(1, -1);
  if (from?.startsWith("'") && from.endsWith("'")) from = from.slice(1, -1);

  if (!apiKey || !to || !from) {
    if (process.env.NODE_ENV === "development") {
      console.warn("[contact] Missing env:", {
        RESEND_API_KEY: Boolean(apiKey),
        CONTACT_TO_EMAIL: Boolean(to),
        RESEND_FROM_EMAIL: Boolean(from),
        cwd: process.cwd(),
      });
    }
    return NextResponse.json(
      { error: "Email delivery is not configured on the server." },
      { status: 503 }
    );
  }

  const resend = new Resend(apiKey);
  const text = formatContactEmailText(data);
  const html = formatContactEmailHtml(data);

  const { data: sentData, error } = await resend.emails.send({
    from,
    to: [to.trim()],
    replyTo: data.email,
    subject: `Demo request - ${data.company}`,
    text,
    html,
  });

  if (error) {
    console.error("[contact] Resend error:", error);
    const msg =
      typeof error === "object" && error !== null && "message" in error
        ? String((error as { message: unknown }).message)
        : "";
    const isTestingRecipientLimit =
      msg.includes("only send testing emails") || msg.includes("verify a domain");
    if (isTestingRecipientLimit) {
      console.warn(
        "[contact] Resend is in testing mode with onboarding@resend.dev: CONTACT_TO_EMAIL must be the same address as your Resend login (see error above), OR verify a domain at https://resend.com/domains and set RESEND_FROM_EMAIL to an address on that domain, then you can send to any recipient (e.g. Gmail). Same applies on Vercel after you deploy."
      );
    }
    return NextResponse.json({ error: "Failed to send message. Please try again later." }, { status: 502 });
  }

  if (process.env.NODE_ENV === "development") {
    console.info("[contact] Resend accepted email", {
      id: sentData?.id,
      to: to.trim(),
    });
  }

  return NextResponse.json({ ok: true, sent: true, id: sentData?.id });
}
