import { Star } from "lucide-react";
import { useSiteData } from "@/context/SiteDataContext";

export function Depoimentos() {
  const { depoimentos } = useSiteData();
  return (
    <div className="mt-14 grid gap-6 md:grid-cols-2">
      {depoimentos.map((d) => (
        <figure key={d.nome} className="surface-card surface-card-hover flex h-full flex-col p-7">
          <div className="flex gap-0.5" aria-label={`Avaliação ${d.estrelas} de 5`}>
            {Array.from({ length: d.estrelas }).map((_, i) => (
              <Star key={i} className="size-4 fill-highlight text-highlight" aria-hidden="true" />
            ))}
          </div>
          <blockquote className="mt-4 grow text-base leading-relaxed text-foreground">
            “{d.texto}”
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            <span className="grid size-11 place-items-center rounded-full bg-[image:var(--gradient-brand)] text-sm font-bold text-primary-foreground">
              {d.iniciais}
            </span>
            <span>
              <span className="block text-sm font-semibold">{d.nome}</span>
              <span className="block text-sm text-muted-foreground">{d.empresa}</span>
            </span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
