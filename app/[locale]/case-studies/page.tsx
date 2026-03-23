import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { CTASection } from "@/components/sections/CTASection";
import { CaseStudiesHero } from "@/components/sections/CaseStudiesHero";

export default async function CaseStudiesPage({
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
        <CaseStudiesHero />
        <CaseStudySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
