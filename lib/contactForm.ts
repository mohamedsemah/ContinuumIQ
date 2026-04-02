export const COMPANY_SIZE_KEYS = ["small", "mid", "large", "enterprise"] as const;
export type CompanySizeKey = (typeof COMPANY_SIZE_KEYS)[number];

export const INDUSTRY_KEYS = [
  "telecom",
  "financial-services",
  "saas",
  "retail",
  "mobility",
  "other",
] as const;
export type IndustryKey = (typeof INDUSTRY_KEYS)[number];

export const companySizeLabelEn: Record<CompanySizeKey, string> = {
  small: "1–50 employees",
  mid: "51–500 employees",
  large: "501–5,000 employees",
  enterprise: "5,000+ employees",
};

export const industryLabelEn: Record<IndustryKey, string> = {
  telecom: "Telecommunications",
  "financial-services": "Financial Services",
  saas: "SaaS",
  retail: "Retail",
  mobility: "Mobility",
  other: "Other",
};

export type ContactFormPayload = {
  name: string;
  email: string;
  company: string;
  companySize: CompanySizeKey;
  industry: IndustryKey;
  message: string;
  locale?: string;
};

const EMAIL_RE =
  /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;

function isString(v: unknown, min: number, max: number): v is string {
  return typeof v === "string" && v.trim().length >= min && v.length <= max;
}

export function parseContactPayload(body: unknown): { ok: true; data: ContactFormPayload } | { ok: false; error: string } {
  if (!body || typeof body !== "object") {
    return { ok: false, error: "Invalid JSON body" };
  }
  const o = body as Record<string, unknown>;

  const name = typeof o.name === "string" ? o.name.trim() : "";
  const email = typeof o.email === "string" ? o.email.trim() : "";
  const company = typeof o.company === "string" ? o.company.trim() : "";
  const companySize = o.companySize;
  const industry = o.industry;
  const message = typeof o.message === "string" ? o.message.trim() : "";
  const locale = typeof o.locale === "string" && (o.locale === "en" || o.locale === "ar") ? o.locale : undefined;

  if (!isString(name, 1, 120)) return { ok: false, error: "Invalid name" };
  if (!isString(email, 3, 254) || !EMAIL_RE.test(email)) return { ok: false, error: "Invalid email" };
  if (!isString(company, 1, 200)) return { ok: false, error: "Invalid company" };
  if (!COMPANY_SIZE_KEYS.includes(companySize as CompanySizeKey)) {
    return { ok: false, error: "Invalid company size" };
  }
  if (!INDUSTRY_KEYS.includes(industry as IndustryKey)) {
    return { ok: false, error: "Invalid industry" };
  }
  if (!isString(message, 1, 5000)) return { ok: false, error: "Invalid message" };

  return {
    ok: true,
    data: {
      name,
      email,
      company,
      companySize: companySize as CompanySizeKey,
      industry: industry as IndustryKey,
      message,
      locale,
    },
  };
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function formatContactEmailText(data: ContactFormPayload): string {
  const lines = [
    "New demo request — ContinuumIQ website",
    "",
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company}`,
    `Company size: ${companySizeLabelEn[data.companySize]}`,
    `Industry: ${industryLabelEn[data.industry]}`,
    data.locale ? `Form locale: ${data.locale}` : null,
    "",
    "Message:",
    data.message,
  ];
  return lines.filter(Boolean).join("\n");
}

/** HTML body for multipart email (better previews in Resend and some inboxes). */
export function formatContactEmailHtml(data: ContactFormPayload): string {
  const row = (label: string, value: string) =>
    `<tr><td style="padding:4px 12px 4px 0;font-weight:600;vertical-align:top;color:#334155;">${escapeHtml(label)}</td><td style="padding:4px 0;color:#0f172a;">${escapeHtml(value)}</td></tr>`;

  const localeRow = data.locale ? row("Form locale", data.locale) : "";

  return `<!DOCTYPE html>
<html>
<body style="font-family:system-ui,Segoe UI,sans-serif;font-size:15px;line-height:1.5;color:#0f172a;">
  <p style="margin:0 0 16px;"><strong>New demo request</strong> — ContinuumIQ website</p>
  <table style="border-collapse:collapse;margin-bottom:20px;">
    ${row("Name", data.name)}
    ${row("Email", data.email)}
    ${row("Company", data.company)}
    ${row("Company size", companySizeLabelEn[data.companySize])}
    ${row("Industry", industryLabelEn[data.industry])}
    ${localeRow}
  </table>
  <p style="margin:0 0 8px;font-weight:600;">Message</p>
  <pre style="margin:0;padding:12px;background:#f1f5f9;border-radius:8px;white-space:pre-wrap;font-family:inherit;font-size:14px;">${escapeHtml(data.message)}</pre>
</body>
</html>`;
}

export function buildDemoMailtoHref(params: {
  to: string;
  name: string;
  email: string;
  company: string;
  companySize: CompanySizeKey;
  industry: IndustryKey;
  message: string;
}): string {
  const subject = `Demo request — ${params.company}`;
  const body = formatContactEmailText({
    name: params.name,
    email: params.email,
    company: params.company,
    companySize: params.companySize,
    industry: params.industry,
    message: params.message,
  });
  const q = (s: string) => encodeURIComponent(s);
  return `mailto:${q(params.to)}?subject=${q(subject)}&body=${q(body)}`;
}
