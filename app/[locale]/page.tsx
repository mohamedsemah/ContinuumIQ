import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { CrisisSection } from "@/components/sections/CrisisSection";
import { IndustryChurnChart } from "@/components/sections/IndustryChurnChart";
import { GapSection } from "@/components/sections/GapSection";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { CTASection } from "@/components/sections/CTASection";

export default async function HomePage({
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
        <HeroSection />
        <CrisisSection />
        <IndustryChurnChart />
        <GapSection />
        <PlatformSection />
        <ValueSection />
        <CaseStudySection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
