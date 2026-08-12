import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle, Zap } from "lucide-react";
import { servicos, site, whatsappLink } from "@/data/site";

export function Footer() {
  const ano = new Date().getFullYear();

  return (
    <footer className="bg-navy text-navy-foreground">
      <div className="container-site grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground">
              <Zap className="size-5" aria-hidden="true" />
            </span>
            <span className="text-lg font-bold">Trinity Digital</span>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-navy-foreground/70">{site.descricao}</p>
          <div className="mt-5 flex gap-3">
            <a href={site.redes.instagram} aria-label="Instagram" className="grid size-10 place-items-center rounded-lg border border-navy-foreground/15 transition-colors hover:bg-navy-foreground/10" target="_blank" rel="noreferrer">
              <Instagram className="size-4" />
            </a>
            <a href={site.redes.facebook} aria-label="Facebook" className="grid size-10 place-items-center rounded-lg border border-navy-foreground/15 transition-colors hover:bg-navy-foreground/10" target="_blank" rel="noreferrer">
              <Facebook className="size-4" />
            </a>
            <a href={site.redes.linkedin} aria-label="LinkedIn" className="grid size-10 place-items-center rounded-lg border border-navy-foreground/15 transition-colors hover:bg-navy-foreground/10" target="_blank" rel="noreferrer">
              <Linkedin className="size-4" />
            </a>
          </div>
        </div>

        <nav aria-label="Links rápidos">
          <h2 className="text-sm font-semibold tracking-widest uppercase">Links rápidos</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            {[
              { label: "Início", to: "/" },
              { label: "Serviços", to: "/servicos" },
              { label: "Portfólio", to: "/portfolio" },
              { label: "Sobre", to: "/sobre" },
              { label: "Blog", to: "/blog" },
              { label: "Contato", to: "/contato" },
              { label: "Orçamento", to: "/orcamento" },
            ].map((l) => (
              <li key={l.to + l.label}>
                <Link to={l.to} className="transition-colors hover:text-navy-foreground">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-label="Serviços">
          <h2 className="text-sm font-semibold tracking-widest uppercase">Serviços</h2>
          <ul className="mt-4 space-y-2.5 text-sm text-navy-foreground/70">
            {servicos.map((s) => (
              <li key={s.slug}>
                <Link to="/servicos/$slug" params={{ slug: s.slug }} className="transition-colors hover:text-navy-foreground">
                  {s.nome}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-sm font-semibold tracking-widest uppercase">Contato</h2>
          <ul className="mt-4 space-y-3 text-sm text-navy-foreground/70">
            <li>
              <a href={whatsappLink()} target="_blank" rel="noreferrer" className="flex items-center gap-2 transition-colors hover:text-navy-foreground">
                <MessageCircle className="size-4" /> {site.whatsappExibicao}
              </a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="flex items-center gap-2 transition-colors hover:text-navy-foreground">
                <Mail className="size-4" /> {site.email}
              </a>
            </li>
            <li>
              {site.cidade} — {site.estado}, Brasil
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-navy-foreground/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-6 text-xs text-navy-foreground/60 md:flex-row">
          <p>
            © {ano} {site.nome}. Todos os direitos reservados.
          </p>
          <div className="flex gap-5">
            <Link to="/politica-de-privacidade" className="hover:text-navy-foreground">
              Política de Privacidade
            </Link>
            <Link to="/termos-de-uso" className="hover:text-navy-foreground">
              Termos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}