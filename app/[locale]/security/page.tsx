import { setRequestLocale } from "next-intl/server";
import { SecuritySection } from "@/components/sections/SecuritySection";
import { CTASection } from "@/components/sections/CTASection";

export default async function SecurityPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <SecuritySection />
      <CTASection />
    </>
  );
}
