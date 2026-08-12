import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowRight, Check, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { Icon } from "@/components/site/Icon";
import { CTAFinal } from "@/components/site/CTAFinal";
import { LeadForm } from "@/components/site/LeadForm";
import { servicos } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";
import { useSiteData } from "@/context/SiteDataContext";

export const Route = createFileRoute("/servicos/$slug")({
  loader: async ({ params }) => {
    let dbServicos = null;
    try {
      const { data } = await supabase.from("site_content").select("*").eq("key", "servicos");
      if (data && data.length > 0) {
        dbServicos = data[0].value as any[];
      }
    } catch (e) {
      console.error("Failed to load services in dynamic route loader:", e);
    }

    const list = dbServicos || servicos;
    const servico = list.find((s) => s.slug === params.slug);
    if (!servico) throw notFound();

    return { servico, allServicos: list };
  },
  head: ({ loaderData }) => {
    if (!loaderData || !loaderData.servico) {
      return { meta: [{ title: "Serviço não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    const { servico } = loaderData;
    return {
      meta: [
        { title: servico.titleSeo },
        { name: "description", content: servico.descricaoSeo },
        { property: "og:title", content: servico.titleSeo },
        { property: "og:description", content: servico.descricaoSeo },
        { property: "og:type", content: "website" },
      ],
      links: [{ rel: "canonical", href: `/servicos/${servico.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Service",
            name: servico.nome,
            description: servico.descricaoSeo,
            provider: { "@type": "Organization", name: "Trinity Digital" },
            areaServed: "BR",
          }),
        },
      ],
    };
  },
  component: ServicoDetalhe,
});

function ServicoDetalhe() {
  const { servico, allServicos } = Route.useLoaderData();
  const { site } = useSiteData();
  const outros = allServicos.filter((s) => s.slug !== servico.slug).slice(0, 4);

  const whatsappLink = (msg?: string) => {
    const text = msg || "Olá! Vim pelo site e gostaria de solicitar um orçamento para o meu projeto digital.";
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Breadcrumbs items={[{ label: "Serviços", to: "/servicos" }, { label: servico.nome }]} />
        <div className="mt-8 grid items-start gap-12 lg:grid-cols-[1.1fr_1fr]">
          <div>
            <span className="grid size-14 place-items-center rounded-2xl bg-brand-soft text-brand">
              <Icon name={servico.icone} className="size-7" />
            </span>
            <h1 className="mt-6 text-4xl font-bold text-balance md:text-5xl">{servico.nome}</h1>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{servico.intro}</p>
            <ul className="mt-7 grid gap-2.5 sm:grid-cols-2">
              {servico.beneficios.map((b) => (
                <li key={b} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" /> {b}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/orcamento">
                  Quero transformar meu negócio <ArrowRight className="size-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-full px-7">
                <a href={whatsappLink(servico.mensagemWhatsapp)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> Falar no WhatsApp
                </a>
              </Button>
            </div>
          </div>

          <LeadForm origem={`servico:${servico.slug}`} servicoPadrao={servico.nome} />
        </div>
      </Section>

      <Section tone="muted">
        <SectionHeading eyebrow="O que está incluso" title={`O que entregamos em ${servico.nome}`} />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {servico.entregas.map((e) => (
            <div key={e.titulo} className="surface-card surface-card-hover p-6">
              <h3 className="text-lg font-semibold">{e.titulo}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{e.texto}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Para quem é" title="Indicado para" />
        <ul className="mx-auto mt-10 flex max-w-3xl flex-wrap justify-center gap-3">
          {servico.paraQuem.map((p) => (
            <li key={p} className="rounded-full border border-border bg-secondary px-4 py-2 text-sm font-medium">
              {p}
            </li>
          ))}
        </ul>

        <h2 className="mt-16 text-center text-2xl font-bold">Outros serviços</h2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outros.map((s) => (
            <Link
              key={s.slug}
              to="/servicos/$slug"
              params={{ slug: s.slug }}
              className="surface-card surface-card-hover flex items-center gap-3 p-5 text-sm font-semibold"
            >
              <Icon name={s.icone} className="size-5 text-brand" /> {s.nome}
            </Link>
          ))}
        </div>
      </Section>

      <CTAFinal mensagem={servico.mensagemWhatsapp} />
    </>
  );
}
