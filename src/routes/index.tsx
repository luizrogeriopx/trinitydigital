import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Hero } from "@/components/site/Hero";
import { Section, SectionHeading } from "@/components/site/Section";
import { ServicoCard } from "@/components/site/ServicoCard";
import { Icon } from "@/components/site/Icon";
import { PortfolioGrid } from "@/components/site/PortfolioGrid";
import { Depoimentos } from "@/components/site/Depoimentos";
import { FaqAccordion } from "@/components/site/FaqAccordion";
import { CTAFinal } from "@/components/site/CTAFinal";
import { diferenciais, processo, resultados, servicos, site } from "@/data/site";
import { useSiteData } from "@/context/SiteDataContext";

const titulo = "Trinity Digital | Agência de Criação de Sites e Marketing Digital";
const descricao =
  "Agência de desenvolvimento web e marketing digital: criação de sites, lojas virtuais, landing pages, CRM personalizado, SEO, Google Ads e Meta Ads.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfessionalService",
          name: site.nome,
          description: descricao,
          telephone: `+${site.whatsapp}`,
          email: site.email,
          areaServed: "BR",
          address: {
            "@type": "PostalAddress",
            addressLocality: site.cidade,
            addressRegion: site.estado,
            addressCountry: site.pais,
          },
          makesOffer: servicos.map((s) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: s.nome, description: s.resumo },
          })),
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  const { site, servicos, diferenciais, processo, resultados } = useSiteData();

  return (
    <>
      <Hero />

      <Section id="solucoes" tone="muted">
        <SectionHeading
          eyebrow="Soluções digitais"
          title="Da primeira página ao crescimento do seu negócio"
          description="Não entregamos apenas um site. Construímos a presença digital completa da sua empresa e cuidamos da aquisição de clientes por SEO e tráfego pago."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {[
            {
              icone: "Globe",
              titulo: "Presença digital",
              texto: "Sites, blogs e lojas virtuais com design profissional, performance e estrutura preparada para o Google.",
            },
            {
              icone: "Workflow",
              titulo: "Sistemas e processos",
              texto: "CRM personalizado, painéis administrativos e automações que organizam sua operação comercial.",
            },
            {
              icone: "TrendingUp",
              titulo: "Aquisição de clientes",
              texto: "SEO, Google Ads e Meta Ads integrados ao seu funil, com rastreamento real de conversões.",
            },
          ].map((item) => (
            <div key={item.titulo} className="surface-card surface-card-hover p-7">
              <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon name={item.icone} className="size-6" />
              </span>
              <h3 className="mt-5 text-xl font-semibold">{item.titulo}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{item.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section id="servicos">
        <SectionHeading
          eyebrow="Serviços"
          title="Soluções completas para criar e escalar sua presença digital"
          description="Da criação de sites ao gerenciamento de campanhas, tudo com a mesma equipe e a mesma estratégia."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {servicos.map((servico) => (
            <ServicoCard key={servico.slug} servico={servico} />
          ))}
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Por que escolher a Trinity"
          title="Tecnologia, design e estratégia no mesmo projeto"
          description="Cada decisão técnica é tomada pensando em performance, posicionamento no Google e geração de contatos."
        />
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

      <Section>
        <SectionHeading
          eyebrow="Processo"
          title="Um método claro do briefing à otimização"
          description="Você acompanha cada etapa e sabe exatamente o que está sendo entregue."
        />
        <ol className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {processo.map((etapa) => (
            <li key={etapa.numero} className="surface-card surface-card-hover p-6">
              <span className="font-display text-3xl font-bold text-brand/25">{etapa.numero}</span>
              <h3 className="mt-3 text-lg font-semibold">{etapa.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{etapa.texto}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Portfólio"
          title="Projetos que unem design e resultado"
          description="Uma amostra dos formatos que desenvolvemos para empresas de diferentes segmentos."
        />
        <div className="mt-12">
          <PortfolioGrid limite={6} />
        </div>
        <div className="mt-10 text-center">
          <Button asChild size="lg" variant="outline" className="rounded-full px-7">
            <Link to="/portfolio">
              Ver portfólio completo <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section tone="navy">
        <SectionHeading
          inverted
          eyebrow="Resultados"
          title="Números que nossos clientes acompanham"
          description="Indicadores médios de projetos com site, SEO e tráfego pago sob nossa gestão."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {resultados.map((r) => (
            <div
              key={r.label}
              className="rounded-2xl border border-navy-foreground/12 bg-navy-foreground/5 p-7 transition-colors hover:border-navy-foreground/30"
            >
              <span className="font-display text-3xl font-bold text-highlight">{r.valor}</span>
              <h3 className="mt-2 text-base font-semibold text-navy-foreground">{r.label}</h3>
              <p className="mt-2 text-sm leading-relaxed text-navy-foreground/70">{r.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading
          eyebrow="Depoimentos"
          title="O que dizem os clientes que confiam na Trinity"
        />
        <Depoimentos />
      </Section>

      <Section tone="muted">
        <SectionHeading
          eyebrow="Planos e orçamento"
          title="Projetos personalizados, sem pacote engessado"
          description="Cada negócio possui necessidades diferentes. Por isso, desenvolvemos uma solução personalizada para o seu objetivo e orçamento."
        />
        <div className="mx-auto mt-10 max-w-xl text-center">
          <Button asChild size="lg" className="rounded-full px-8">
            <Link to="/orcamento">
              Quero transformar meu negócio <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" />
        <FaqAccordion />
      </Section>

      <CTAFinal />
    </>
  );
}
