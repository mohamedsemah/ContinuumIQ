import { setRequestLocale } from "next-intl/server";

export default async function TermsPage({
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
          Terms of Service
        </h1>
        <div className="prose prose-invert prose-sm max-w-none text-text-secondary space-y-6">
          <p>
            <strong className="text-text-primary">Effective Date:</strong>{" "}
            February 2026
          </p>
          <p>
            These Terms of Service govern your use of the ContinuumIQ
            website and platform. By accessing or using our services, you
            agree to be bound by these terms.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Services
          </h2>
          <p>
            ContinuumIQ provides AI-powered customer exit risk intelligence
            services. Access to platform features depends on your
            subscription tier.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Use Restrictions
          </h2>
          <p>
            You may not reverse engineer, copy, or redistribute any part of
            the platform. All intellectual property rights remain with
            ContinuumIQ.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Limitation of Liability
          </h2>
          <p>
            ContinuumIQ provides predictive intelligence on an
            &quot;as-is&quot; basis. We are not liable for business decisions
            made based on platform insights.
          </p>
          <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
            Contact
          </h2>
          <p>
            For questions about these terms, contact{" "}
            <a
              href="mailto:legal@continuumiq.ai"
              className="text-teal hover:text-teal-light"
            >
              legal@continuumiq.ai
            </a>
            .
          </p>
        </div>
      </div>
    </section>
  );
}
