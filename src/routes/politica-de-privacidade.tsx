import { createFileRoute } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { site } from "@/data/site";

const titulo = "Política de Privacidade | Trinity Digital";
const descricao = "Saiba como a Trinity Digital coleta, utiliza e protege os dados pessoais enviados pelo site.";

export const Route = createFileRoute("/politica-de-privacidade")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/politica-de-privacidade" }],
  }),
  component: Politica,
});

function Politica() {
  return (
    <Section className="pt-32 md:pt-40">
      <div className="mx-auto max-w-3xl">
        <Breadcrumbs items={[{ label: "Política de Privacidade" }]} />
        <h1 className="mt-6 text-3xl font-bold md:text-4xl">Política de Privacidade</h1>
        <div className="mt-8 space-y-6 leading-relaxed text-muted-foreground">
          <p>Esta política descreve como a {site.nome} trata os dados pessoais coletados por meio deste site, em conformidade com a Lei Geral de Proteção de Dados (LGPD).</p>
          <h2 className="text-xl font-semibold text-foreground">Dados coletados</h2>
          <p>Coletamos nome, empresa, WhatsApp, e-mail, serviço de interesse, orçamento estimado e mensagem enviados voluntariamente nos formulários, além de dados de navegação anônimos por ferramentas de análise.</p>
          <h2 className="text-xl font-semibold text-foreground">Finalidade</h2>
          <p>Os dados são utilizados exclusivamente para responder solicitações, elaborar propostas comerciais e melhorar a experiência no site. Não vendemos nem compartilhamos dados com terceiros para fins publicitários.</p>
          <h2 className="text-xl font-semibold text-foreground">Cookies e análise</h2>
          <p>Podemos utilizar cookies e ferramentas como Google Analytics, Google Tag Manager e Meta Pixel para medir desempenho e otimizar campanhas. Você pode desativar cookies no seu navegador.</p>
          <h2 className="text-xl font-semibold text-foreground">Seus direitos</h2>
          <p>Você pode solicitar acesso, correção ou exclusão dos seus dados a qualquer momento pelo e-mail {site.email}.</p>
        </div>
      </div>
    </Section>
  );
}
