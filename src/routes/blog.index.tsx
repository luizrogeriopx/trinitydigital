import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTAFinal } from "@/components/site/CTAFinal";
import { posts } from "@/data/site";

const titulo = "Blog de Marketing Digital e Criação de Sites | Trinity Digital";
const descricao =
  "Artigos sobre criação de sites, desenvolvimento de sistemas, SEO, Google Ads, Facebook Ads e marketing digital para empresas.";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/blog" }],
  }),
  component: BlogPage,
});

function BlogPage() {
  return (
    <>
      <Section className="pt-32 md:pt-40">
        <Breadcrumbs items={[{ label: "Blog" }]} />
        <div className="mt-6">
          <SectionHeading
            as="h1"
            align="left"
            eyebrow="Blog"
            title="Conteúdo sobre tecnologia, SEO e marketing digital"
            description="Materiais práticos para quem quer usar o digital como canal de aquisição de clientes."
          />
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <article key={post.slug} className="surface-card surface-card-hover flex h-full flex-col p-6">
              <span className="text-xs font-semibold tracking-widest text-brand uppercase">{post.categoria}</span>
              <h2 className="mt-3 text-xl font-semibold">
                <Link to="/blog/$slug" params={{ slug: post.slug }}>{post.titulo}</Link>
              </h2>
              <p className="mt-2.5 grow text-sm leading-relaxed text-muted-foreground">{post.resumo}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-muted-foreground">
                <time dateTime={post.data}>{new Date(post.data).toLocaleDateString("pt-BR")}</time>
                <span>{post.leitura} de leitura</span>
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Ler artigo <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </article>
          ))}
        </div>
      </Section>
      <CTAFinal />
    </>
  );
}
