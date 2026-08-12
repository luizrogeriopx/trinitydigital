import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { indicadores } from "@/data/site";
import heroImage from "@/assets/hero-dashboard.jpg";

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-[image:var(--gradient-soft)] pt-32 pb-20 md:pt-40 md:pb-28">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-32 size-[32rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-40 -left-40 size-[28rem] rounded-full bg-highlight/10 blur-3xl"
      />

      <div className="container-site relative grid items-center gap-14 lg:grid-cols-[1.05fr_1fr]">
        <div className="animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full border border-brand/25 bg-brand-soft px-3.5 py-1.5 text-xs font-semibold tracking-wide text-accent-foreground uppercase">
            Agência de desenvolvimento web e marketing digital
          </span>
          <h1 className="mt-6 text-4xl leading-[1.08] font-bold text-balance md:text-5xl lg:text-6xl">
            Transformamos ideias em <span className="text-gradient-brand">soluções digitais</span> que
            fazem seu negócio crescer.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Sites, lojas virtuais, sistemas, CRM, SEO e campanhas digitais desenvolvidos para gerar
            presença, autoridade e resultados.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7 text-base">
              <Link to="/orcamento">
                Solicitar Orçamento <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-7 text-base">
              <Link to="/servicos">Conhecer Serviços</Link>
            </Button>
          </div>

          <ul className="mt-8 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">
            {["SEO desde a estrutura", "Foco em conversão", "Suporte contínuo"].map((item) => (
              <li key={item} className="flex items-center gap-2">
                <CheckCircle2 className="size-4 text-brand" aria-hidden="true" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative">
          <img
            src={heroImage}
            alt="Painel de desenvolvimento web com gráficos de marketing digital e editor de código"
            width={1280}
            height={1024}
            fetchPriority="high"
            className="w-full drop-shadow-[0_40px_80px_rgba(11,37,69,0.18)]"
          />
        </div>
      </div>

      <div className="container-site relative mt-16">
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border lg:grid-cols-4">
          {indicadores.map((item) => (
            <div key={item.label} className="bg-background px-6 py-8 text-center">
              <dt className="sr-only">{item.label}</dt>
              <dd>
                <span className="block font-display text-3xl font-bold text-brand md:text-4xl">
                  {item.valor}
                </span>
                <span className="mt-1 block text-sm text-muted-foreground">{item.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}