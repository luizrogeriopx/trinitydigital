import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { CTAFinal } from "@/components/site/CTAFinal";

const titulo = "Portfólio de Sites, Lojas Virtuais e Sistemas | Trinity Digital";
const descricao =
  "Conheça projetos de criação de sites, lojas virtuais, landing pages, sistemas e CRM desenvolvidos pela Trinity Digital.";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/portfolio" }],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Breadcrumbs items={[{ label: "Portfólio" }]} />
        <div className="mt-6">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Portfólio"
            title="Projetos desenvolvidos com design, tecnologia e estratégia"
            description="Filtre por tipo de projeto e veja como estruturamos cada solução digital."
          />
        </div>
        <div className="mt-12">
          <PortfolioGrid />
        </div>
      </Section>
      <CTAFinal />
    </>
  );
}
