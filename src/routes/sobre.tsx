import { createFileRoute } from "@tanstack/react-router";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTAFinal } from "@/components/site/CTAFinal";
import { Icon } from "@/components/site/Icon";
import { useSiteData } from "@/context/SiteDataContext";

const titulo = "Sobre a Trinity Digital | Agência de Desenvolvimento Web";
const descricao =
  "Somos uma agência de desenvolvimento web e marketing digital que une tecnologia, design e estratégia para gerar resultados reais.";

export const Route = createFileRoute("/sobre")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/sobre" }],
  }),
  component: SobrePage,
});

function SobrePage() {
  const { indicadores, processo, diferenciais } = useSiteData();
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Breadcrumbs items={[{ label: "Sobre" }]} />
        <div className="mt-6">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Sobre nós"
            title="Tecnologia que transforma negócios em resultados"
            description="A Trinity Digital nasceu da união entre desenvolvimento de software e marketing de performance. Criamos presença digital sólida e cuidamos da aquisição de clientes de ponta a ponta."
          />
        </div>
        <div className="mt-12 grid gap-10 lg:grid-cols-2">
          <div className="space-y-4 text-base leading-relaxed text-muted-foreground">
            <p>
              Atendemos empresas, profissionais liberais, escolas, igrejas, lojas e negócios que precisam
              de mais do que um site bonito: precisam de uma estrutura digital que gere contatos todos os
              dias.
            </p>
            <p>
              Cada projeto começa com um briefing sério, passa por planejamento de arquitetura e
              palavras-chave, e só depois vira design e código. É assim que garantimos sites rápidos,
              acessíveis, escaláveis e prontos para SEO e tráfego pago.
            </p>
            <p>
              Somos parceiros de longo prazo: acompanhamos indicadores, otimizamos páginas e ajustamos
              campanhas para que o investimento continue rendendo depois da entrega.
            </p>
          </div>
          <dl className="grid grid-cols-2 gap-4">
            {indicadores.map((i) => (
              <div key={i.label} className="surface-card p-6 text-center">
                <dt className="sr-only">{i.label}</dt>
                <dd>
                  <span className="block font-display text-3xl font-bold text-brand">{i.valor}</span>
                  <span className="mt-1 block text-sm text-muted-foreground">{i.label}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="Como trabalhamos" title="Nosso processo de desenvolvimento" />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processo.map((etapa) => (
            <li key={etapa.numero} className="surface-card p-6">
              <span className="font-display text-3xl font-bold text-brand/25">{etapa.numero}</span>
              <h3 className="mt-3 text-lg font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section>
        <SectionHeading eyebrow="Valores" title="O que guia cada projeto" />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciais.map((d) => (
            <div key={d.titulo} className="surface-card surface-card-hover flex gap-4 p-6">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={d.icone} className="size-5" />
              </span>
              <div>
                <h3 className="text-base font-semibold">{d.titulo}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.texto}</p>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <CTAFinal />
    </>
  );
}
