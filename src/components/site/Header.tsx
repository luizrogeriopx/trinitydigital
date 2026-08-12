import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { navegacao, site } from "@/data/site";
import { cn } from "@/lib/utils";

export function Header() {
  const [aberto, setAberto] = useState(false);
  const [comScroll, setComScroll] = useState(false);

  useEffect(() => {
    const onScroll = () => setComScroll(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        comScroll
          ? "border-b border-border bg-background/85 backdrop-blur-lg"
          : "border-b border-transparent bg-background/60 backdrop-blur",
      )}
    >
      <div className="container-site flex h-18 items-center justify-between gap-4 py-3">
        <Link to="/" className="flex items-center gap-2.5" aria-label={`${site.nome} — página inicial`}>
          <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-lift)]">
            <Zap className="size-5" aria-hidden="true" />
          </span>
          <span className="text-lg leading-tight font-bold tracking-tight">
            Trinity<span className="text-brand">Digital</span>
          </span>
        </Link>

        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {navegacao.map((item) => (
            <Link
              key={item.label}
              to={item.to}
              {...("hash" in item ? { hash: item.hash } : {})}
              className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-foreground" }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:block">
          <Button asChild size="lg" className="rounded-full px-6">
            <Link to="/orcamento">Quero transformar meu negócio</Link>
          </Button>
        </div>

        <button
          type="button"
          onClick={() => setAberto((v) => !v)}
          aria-expanded={aberto}
          aria-label={aberto ? "Fechar menu" : "Abrir menu"}
          className="grid size-11 place-items-center rounded-xl border border-border lg:hidden"
        >
          {aberto ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {aberto ? (
        <div className="border-t border-border bg-background lg:hidden">
          <nav aria-label="Navegação mobile" className="container-site flex flex-col gap-1 py-4">
            {navegacao.map((item) => (
              <Link
                key={item.label}
                to={item.to}
                {...("hash" in item ? { hash: item.hash } : {})}
                onClick={() => setAberto(false)}
                className="rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-secondary"
              >
                {item.label}
              </Link>
            ))}
            <Button asChild size="lg" className="mt-3 rounded-full">
              <Link to="/orcamento" onClick={() => setAberto(false)}>
                Quero transformar meu negócio
              </Link>
            </Button>
          </nav>
        </div>
      ) : null}
    </header>
  );
}