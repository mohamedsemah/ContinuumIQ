import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { IndustryChurnChart } from "@/components/sections/IndustryChurnChart";
import { CrisisSection } from "@/components/sections/CrisisSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { CTASection } from "@/components/sections/CTASection";
import { IndustriesHero } from "@/components/sections/IndustriesHero";

export default async function IndustriesPage({
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
        <IndustriesHero />
        <IndustryChurnChart />
        <CrisisSection />
        <ValueSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
