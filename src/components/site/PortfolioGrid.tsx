import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { categoriasPortfolio } from "@/data/site";
import { cn } from "@/lib/utils";
import { useSiteData } from "@/context/SiteDataContext";

export function PortfolioGrid({ limite }: { limite?: number }) {
  const { site, projetos } = useSiteData();
  const [filtro, setFiltro] = useState<string>("Todos");

  const whatsappLink = (msg?: string) => {
    const text = msg || "Olá! Vim pelo site e gostaria de solicitar um orçamento para o meu projeto digital.";
    return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  const lista = projetos
    .filter((p) => filtro === "Todos" || p.categoria === filtro)
    .slice(0, limite ?? projetos.length);

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-2" role="tablist" aria-label="Filtrar projetos">
        {categoriasPortfolio.map((cat) => (
          <button
            key={cat}
            type="button"
            role="tab"
            aria-selected={filtro === cat}
            onClick={() => setFiltro(cat)}
            className={cn(
              "rounded-full border px-4 py-2 text-sm font-medium transition-colors",
              filtro === cat
                ? "border-brand bg-brand text-primary-foreground"
                : "border-border bg-background text-muted-foreground hover:border-brand/40 hover:text-foreground",
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {lista.map((projeto) => (
          <article key={projeto.slug} className="surface-card surface-card-hover group overflow-hidden">
            <div className="relative aspect-16/10 overflow-hidden bg-[image:var(--gradient-navy)]">
              <div
                aria-hidden="true"
                className="absolute inset-x-8 top-10 bottom-0 rounded-t-xl border border-white/15 bg-white/10 backdrop-blur-sm transition-transform duration-500 group-hover:-translate-y-2"
              >
                <div className="flex gap-1.5 border-b border-white/10 px-3 py-2">
                  <span className="size-2 rounded-full bg-white/40" />
                  <span className="size-2 rounded-full bg-white/25" />
                  <span className="size-2 rounded-full bg-white/25" />
                </div>
                <div className="space-y-2 p-3">
                  <span className="block h-2 w-2/3 rounded bg-white/30" />
                  <span className="block h-2 w-1/2 rounded bg-white/20" />
                  <span className="block h-14 rounded bg-white/10" />
                </div>
              </div>
              <span className="absolute top-3 left-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold text-foreground">
                {projeto.categoria}
              </span>
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold">{projeto.nome}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{projeto.descricao}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {projeto.tecnologias.map((tec) => (
                  <li
                    key={tec}
                    className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-muted-foreground"
                  >
                    {tec}
                  </li>
                ))}
              </ul>
              <a
                href={projeto.link ?? whatsappLink(`Olá! Vi o projeto ${projeto.nome} no site e gostaria de saber mais.`)}
                target="_blank"
                rel="noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand"
              >
                Ver projeto <ArrowUpRight className="size-4" aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}