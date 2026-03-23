import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ResourcesSection } from "@/components/sections/ResourcesSection";
import { CTASection } from "@/components/sections/CTASection";

export default async function ResourcesPage({
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
        <ResourcesSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
