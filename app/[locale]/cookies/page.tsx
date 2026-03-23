import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default async function CookiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <h1 className="font-display text-4xl font-bold text-text-primary mb-8">
              Cookie Policy
            </h1>
            <div className="prose prose-invert prose-sm max-w-none text-text-secondary space-y-6">
              <p>
                <strong className="text-text-primary">Effective Date:</strong>{" "}
                February 2026
              </p>
              <p>
                This Cookie Policy explains how ContinuumIQ uses cookies and
                similar tracking technologies on our website.
              </p>
              <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
                Essential Cookies
              </h2>
              <p>
                Required for the website to function properly, including
                language preference and session management.
              </p>
              <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
                Analytics Cookies
              </h2>
              <p>
                Help us understand how visitors interact with our website. We use
                these to improve user experience and measure marketing
                effectiveness.
              </p>
              <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
                Managing Cookies
              </h2>
              <p>
                You can control and manage cookies through your browser settings.
                Disabling certain cookies may impact website functionality.
              </p>
              <h2 className="font-display text-xl font-semibold text-text-primary mt-8">
                Contact
              </h2>
              <p>
                For questions about our cookie practices, contact{" "}
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
      </main>
      <Footer />
    </>
  );
}
