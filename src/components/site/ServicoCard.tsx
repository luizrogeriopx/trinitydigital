import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { Icon } from "@/components/site/Icon";
import type { Servico } from "@/data/site";

export function ServicoCard({ servico }: { servico: Servico }) {
  return (
    <article className="surface-card surface-card-hover group flex h-full flex-col p-7">
      <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand transition-colors group-hover:bg-brand group-hover:text-primary-foreground">
        <Icon name={servico.icone} className="size-6" />
      </span>
      <h3 className="mt-5 text-xl font-semibold">{servico.nome}</h3>
      <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{servico.resumo}</p>
      <ul className="mt-5 space-y-2 text-sm text-muted-foreground">
        {servico.beneficios.map((b) => (
          <li key={b} className="flex items-start gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
            {b}
          </li>
        ))}
      </ul>
      <Link
        to="/servicos/$slug"
        params={{ slug: servico.slug }}
        className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-brand transition-transform group-hover:translate-x-0.5"
      >
        Saiba mais <ArrowRight className="size-4" aria-hidden="true" />
      </Link>
    </article>
  );
}