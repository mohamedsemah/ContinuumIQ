import { setRequestLocale } from "next-intl/server";

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <section className="section-padding">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-4xl font-bold text-text-primary mb-8">
          Privacy Policy
        </h1>
        <div className="prose prose-invert prose-sm max-w-none text-text-secondary space-y-6">
          <p>
            <strong className="text-text-primary">Effective Date:</strong>{" "}
            February 2026
          </p>
          <p>
            ContinuumIQ (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;)
            is committed to protecting the privacy of our customers, website
            visitors, and users of our platform. This Privacy Policy
            describes how we collect, use, and share information.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Information We Collect
          </h2>
          <p>
            We collect information you provide directly, such as when you
            fill out a form, request a demo, or contact us. This may include
            your name, email address, company name, job title, and message
            content.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            How We Use Information
          </h2>
          <p>
            We use collected information to respond to inquiries, provide our
            services, improve our platform, and communicate relevant updates.
            We do not sell personal information to third parties.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Data Protection
          </h2>
          <p>
            We implement industry-standard security measures including TLS
            1.3 encryption, role-based access controls, and regular security
            audits to protect your information.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Contact
          </h2>
          <p>
            For privacy inquiries, contact us at{" "}
            <a
              href="mailto:privacy@continuumiq.ai"
              className="text-teal hover:text-teal-light"
            >
              privacy@continuumiq.ai
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
