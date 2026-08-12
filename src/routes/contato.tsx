import { createFileRoute } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import { Section, SectionHeading } from "@/components/site/Section";
import { Breadcrumbs } from "@/components/site/Breadcrumbs";
import { LeadForm } from "@/components/site/LeadForm";
import { site, whatsappLink } from "@/data/site";

const titulo = "Contato | Trinity Digital";
const descricao =
  "Fale com a Trinity Digital pelo WhatsApp, e-mail ou formulário e solicite uma proposta para o seu projeto digital.";

export const Route = createFileRoute("/contato")({
  head: () => ({
    meta: [
      { title: titulo },
      { name: "description", content: descricao },
      { property: "og:title", content: titulo },
      { property: "og:description", content: descricao },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/contato" }],
  }),
  component: ContatoPage,
});

function ContatoPage() {
  return (
    <Section className="pt-32 md:pt-40">
      <Breadcrumbs items={[{ label: "Contato" }]} />
      <div className="mt-6">
        <SectionHeading
          as="h1"
          align="left"
          eyebrow="Contato"
          title="Vamos conversar sobre o seu projeto"
          description="Responda o formulário ou fale direto no WhatsApp. Retornamos em até 1 dia útil."
        />
      </div>
      <div className="mt-12 grid items-start gap-10 lg:grid-cols-[1fr_1.1fr]">
        <div className="space-y-4">
          <a href={whatsappLink()} target="_blank" rel="noreferrer" className="surface-card surface-card-hover flex items-center gap-4 p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"><MessageCircle className="size-5" /></span>
            <span>
              <span className="block text-sm text-muted-foreground">WhatsApp</span>
              <span className="block font-semibold">{site.whatsappExibicao}</span>
            </span>
          </a>
          <a href={`mailto:${site.email}`} className="surface-card surface-card-hover flex items-center gap-4 p-6">
            <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand"><Mail className="size-5" /></span>
            <span>
              <span className="block text-sm text-muted-foreground">E-mail</span>
              <span className="block font-semibold">{site.email}</span>
            </span>
          </a>
          <div className="surface-card p-6">
            <span className="block text-sm text-muted-foreground">Redes sociais</span>
            <div className="mt-3 flex gap-3">
              <a href={site.redes.instagram} aria-label="Instagram" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-lg border border-border hover:bg-secondary"><Instagram className="size-4" /></a>
              <a href={site.redes.facebook} aria-label="Facebook" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-lg border border-border hover:bg-secondary"><Facebook className="size-4" /></a>
              <a href={site.redes.linkedin} aria-label="LinkedIn" target="_blank" rel="noreferrer" className="grid size-10 place-items-center rounded-lg border border-border hover:bg-secondary"><Linkedin className="size-4" /></a>
            </div>
          </div>
        </div>
        <LeadForm origem="pagina:contato" />
      </div>
    </Section>
  );
}
