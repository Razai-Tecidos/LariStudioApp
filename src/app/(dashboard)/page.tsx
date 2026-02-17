import { InfoBannerSlider } from "@/components/brand/info-banner-slider";
import { NextClientCard } from "@/components/brand/next-client-card";
import { MAIN_HEADER_TITLE_CLASS, PageHeader } from "@/components/brand/page-header";
import { ProfileMenu } from "@/components/brand/profile-menu";
import { SectionDivider } from "@/components/brand/section-divider";
import { getGreetingForTimeZone } from "@/lib/greeting";

export default function HomePage() {
  const greeting = getGreetingForTimeZone("America/Sao_Paulo");
  const todayInSaoPaulo = new Intl.DateTimeFormat("sv-SE", {
    timeZone: "America/Sao_Paulo",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
  const scheduledAt = `${todayInSaoPaulo}T11:00:00-03:00`;
  const verseSlides = [
    {
      id: "verse-1",
      title: "Tudo fez formoso no seu devido tempo",
      description: "Eclesiastes 3:11",
      className: "border-primary/22 text-primary",
    },
    {
      id: "verse-2",
      title: "Ha tempo para todo proposito debaixo do ceu",
      description: "Eclesiastes 3:1",
      className:
        "border-[color-mix(in_srgb,var(--destructive)_58%,var(--accent)_42%)] text-[color-mix(in_srgb,var(--destructive)_65%,var(--primary)_35%)]",
    },
  ] as const;

  return (
    <main className="motion-stagger space-y-8">
      <PageHeader
        title={`${greeting}, Lari!`}
        titleClassName={MAIN_HEADER_TITLE_CLASS}
        rowClassName="items-center"
        actions={<ProfileMenu />}
      />
      <InfoBannerSlider slides={verseSlides} className="mx-auto w-full max-w-[680px]" />
      <SectionDivider />
      <NextClientCard
        name="Vanessa Andrade"
        phone="(11) 9 9999-9999"
        age="34 anos"
        service="Ajuste e acabamento de vestido"
        scheduledAt={scheduledAt}
      />
    </main>
  );
}
