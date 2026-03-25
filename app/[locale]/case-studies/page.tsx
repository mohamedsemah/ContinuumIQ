import { setRequestLocale } from "next-intl/server";
import { CaseStudySection } from "@/components/sections/CaseStudySection";
import { CTASection } from "@/components/sections/CTASection";

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <CaseStudySection />
      <CTASection />
    </>
  );
}
