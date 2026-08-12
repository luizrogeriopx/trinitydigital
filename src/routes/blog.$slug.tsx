import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Section } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { CTAFinal } from "@/components/site/CTAFinal";
import { posts } from "@/data/site";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return post;
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Artigo não encontrado" }, { name: "robots", content: "noindex" }] };
    }
    return {
      meta: [
        { title: `${loaderData.titulo} | Blog Trinity Digital` },
        { name: "description", content: loaderData.resumo },
        { property: "og:title", content: loaderData.titulo },
        { property: "og:description", content: loaderData.resumo },
        { property: "og:type", content: "article" },
        { property: "article:published_time", content: loaderData.data },
      ],
      links: [{ rel: "canonical", href: `/blog/${loaderData.slug}` }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BlogPosting",
            headline: loaderData.titulo,
            description: loaderData.resumo,
            datePublished: loaderData.data,
            author: { "@type": "Organization", name: loaderData.autor },
            publisher: { "@type": "Organization", name: "Trinity Digital" },
          }),
        },
      ],
    };
  },
  component: PostPage,
});

function PostPage() {
  const post = Route.useLoaderData();
  const relacionados = posts.filter((p) => p.slug !== post.slug).slice(0, 2);
  const url = `https://trinitydigital.com.br/blog/${post.slug}`;

  return (
    <>
      <Section className="pt-32 md:pt-40">
        <div className="mx-auto max-w-3xl">
          <Breadcrumbs items={[{ label: "Blog", to: "/blog" }, { label: post.titulo }]} />
          <span className="mt-6 block text-xs font-semibold tracking-widest text-brand uppercase">
            {post.categoria}
          </span>
          <h1 className="mt-3 text-3xl font-bold text-balance md:text-4xl">{post.titulo}</h1>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">{post.resumo}</p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span>{post.autor}</span>
            <time dateTime={post.data}>{new Date(post.data).toLocaleDateString("pt-BR")}</time>
            <span>{post.leitura} de leitura</span>
          </div>

          <div className="mt-10 space-y-5">
            {post.conteudo.map((bloco, i) =>
              bloco.tipo === "h2" ? (
                <h2 key={i} className="pt-4 text-2xl font-bold">{bloco.texto}</h2>
              ) : bloco.tipo === "ul" ? (
                <ul key={i} className="list-disc space-y-2 pl-5 text-muted-foreground">
                  {bloco.itens?.map((item) => <li key={item}>{item}</li>)}
                </ul>
              ) : (
                <p key={i} className="leading-relaxed text-muted-foreground">{bloco.texto}</p>
              ),
            )}
          </div>

          <ul className="mt-10 flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <li key={tag} className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground">
                #{tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 text-sm">
            <a className="font-semibold text-brand" href={`https://wa.me/?text=${encodeURIComponent(post.titulo + " " + url)}`} target="_blank" rel="noreferrer">
              Compartilhar no WhatsApp
            </a>
            <a className="font-semibold text-brand" href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
              Compartilhar no LinkedIn
            </a>
            <a className="font-semibold text-brand" href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer">
              Compartilhar no Facebook
            </a>
          </div>

          <h2 className="mt-16 text-2xl font-bold">Posts relacionados</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {relacionados.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="surface-card surface-card-hover p-5">
                <span className="text-xs font-semibold tracking-widest text-brand uppercase">{p.categoria}</span>
                <span className="mt-2 block font-semibold">{p.titulo}</span>
              </Link>
            ))}
          </div>
        </div>
      </Section>
      <CTAFinal />
    </>
  );
}
