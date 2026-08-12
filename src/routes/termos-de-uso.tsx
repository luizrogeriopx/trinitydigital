import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { useSiteData } from "@/context/SiteDataContext";

const titulo = "Termos de Uso | Trinity Digital";
const descricao = "Condições de uso do site da Trinity Digital, direitos de propriedade intelectual e responsabilidades.";

export const Route = createFileRoute("/termos-de-uso")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/termos-de-uso" }],
  }),
  component: Termos,
});

function Termos() {
  const { site } = useSiteData();
  return (
    <Section className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Termos de Uso" }]} />
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">Termos de Uso</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
          <p>Ao navegar neste site, você concorda com os termos descritos abaixo.</p>
          <h2 className="text-xl font-semibold text-foreground">Uso do conteúdo</h2>
          <p>Todo o conteúdo publicado — textos, imagens, marcas e códigos — pertence à {site.nome} e não pode ser reproduzido sem autorização prévia por escrito.</p>
          <h2 className="text-xl font-semibold text-foreground">Serviços e propostas</h2>
          <p>As informações deste site têm caráter informativo. Escopo, prazos e valores são definidos individualmente em proposta comercial formal.</p>
          <h2 className="text-xl font-semibold text-foreground">Limitação de responsabilidade</h2>
          <p>Empenhamo-nos em manter as informações corretas e atualizadas, mas não nos responsabilizamos por decisões tomadas exclusivamente com base no conteúdo publicado.</p>
          <h2 className="text-xl font-semibold text-foreground">Contato</h2>
          <p>Dúvidas sobre estes termos podem ser enviadas para {site.email}.</p>
        </div>
      </div>
    </Section>
  );
}
