import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "@/i18n/navigation";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <section className="section-padding">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-teal font-display font-semibold text-lg">404</p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-text-primary sm:text-6xl">
              Page not found
            </h1>
            <p className="mt-6 text-lg text-text-secondary max-w-xl mx-auto">
              The page you are looking for does not exist or has been moved.
            </p>
            <div className="mt-10">
              <Link
                href="/"
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-teal-dark via-teal to-teal-light px-6 py-3 font-display font-semibold text-background shadow-[0_0_24px_var(--color-teal-glow)]"
              >
                Go back home
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
