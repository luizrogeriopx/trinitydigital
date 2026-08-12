import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { ServicoCard } from "@/components/site/ServicoCard";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTAFinal } from "@/components/site/CTAFinal";
import { useSiteData } from "@/context/SiteDataContext";

const titulo = "Serviços de Criação de Sites, SEO e Marketing Digital | Trinity Digital";
const descricao =
  "Conheça os serviços da Trinity Digital: criação de sites, blogs, lojas virtuais, páginas de vendas, CRM personalizado, SEO, Google Ads e Meta Ads.";

export const Route = createFileRoute("/servicos/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/servicos" }],
  }),
  component: ServicosPage,
});

function ServicosPage() {
  const { servicos } = useSiteData();
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Breadcrumbs items={[{ label: "Serviços" }]} />
        <div className="mt-6">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Serviços"
            title="Soluções digitais completas para empresas que querem crescer"
            description="Desenvolvimento web, sistemas e marketing digital com a mesma estratégia: presença, autoridade e conversão."
          />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((s) => (
            <ServicoCard key={s.slug} servico={s} />
          ))}
        </div>
      </Section>
      <div id="solucoes" className="scroll-mt-24" />
      <CTAFinal />
    </>
  );
}
