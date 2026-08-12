import { createFileRoute } from "@tanstack/react-router";
import { posts, servicos } from "@/data/site";

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: ({ request }) => {
        const origin = new URL(request.url).origin;
        const paths = [
          "/",
          "/servicos",
          ...servicos.map((s) => `/servicos/${s.slug}`),
          "/portfolio",
          "/sobre",
          "/blog",
          ...posts.map((p) => `/blog/${p.slug}`),
          "/contato",
          "/orcamento",
          "/politica-de-privacidade",
          "/termos-de-uso",
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${paths
          .map((p) => `  <url><loc>${origin}${p}</loc></url>`)
          .join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml" } });
      },
    },
  },
});
