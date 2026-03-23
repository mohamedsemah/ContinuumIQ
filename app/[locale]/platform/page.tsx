import { setRequestLocale } from "next-intl/server";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { PlatformSection } from "@/components/sections/PlatformSection";
import { GapSection } from "@/components/sections/GapSection";
import { CTASection } from "@/components/sections/CTASection";
import { PlatformHero } from "@/components/sections/PlatformHero";

export default async function PlatformPage({
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
        <PlatformHero />
        <PlatformSection />
        <GapSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
