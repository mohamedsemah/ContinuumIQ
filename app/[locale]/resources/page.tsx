import { setRequestLocale } from "next-intl/server";
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
      <ResourcesSection />
      <CTASection />
    </>
  );
}
