import { setRequestLocale } from "next-intl/server";
import { IndustryChurnChart } from "@/components/sections/IndustryChurnChart";
import { CrisisSection } from "@/components/sections/CrisisSection";
import { ValueSection } from "@/components/sections/ValueSection";
import { CTASection } from "@/components/sections/CTASection";

export default async function IndustriesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <IndustryChurnChart />
      <CrisisSection />
      <ValueSection />
      <CTASection />
    </>
  );
}
