import { setRequestLocale } from "next-intl/server";
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
      <CaseStudiesHero />
      <CaseStudySection />
      <CTASection />
    </>
  );
}
