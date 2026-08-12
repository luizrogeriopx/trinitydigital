import { createFileRoute } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm } from "@/components/site/LeadForm";

const titulo = "Solicitar Orçamento de Site, Loja Virtual ou Campanha | Trinity Digital";
const descricao =
  "Solicite um orçamento personalizado para criação de sites, lojas virtuais, landing pages, CRM, SEO ou campanhas de Google Ads e Meta Ads.";

export const Route = createFileRoute("/orcamento")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/orcamento" }],
  }),
  component: OrcamentoPage,
});

function OrcamentoPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <Breadcrumbs items={[{ label: "Orçamento" }]} />
      <div className="mt-6">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Orçamento"
          title="Solicite um orçamento personalizado"
          description="Cada negócio possui necessidades diferentes. Conte o seu objetivo e montamos uma proposta sob medida."
        />
      </div>
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <ul className="space-y-4">
          {[
            "Análise do seu projeto por especialistas",
            "Proposta com escopo, prazo e investimento claros",
            "Sem custo e sem compromisso",
            "Retorno em até 1 dia útil",
          ].map((item) => (
            <li key={item} className="flex items-start gap-3 text-muted-foreground">
              <Check className="mt-0.5 size-5 shrink-0 text-brand" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
        <LeadForm origem="pagina:orcamento" />
      </div>
    </Section>
  );
}
