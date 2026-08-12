import { Link } from "@tanstack/react-router";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/data/site";

export function CTAFinal({ mensagem }: { mensagem?: string }) {
  return (
    <section className="py-20 md:py-24">
      <div className="container-site">
        <div className="relative overflow-hidden rounded-3xl bg-[image:var(--gradient-navy)] px-6 py-16 text-center text-navy-foreground md:px-16">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -right-16 size-72 rounded-full bg-brand/30 blur-3xl"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -left-16 size-72 rounded-full bg-highlight/20 blur-3xl"
          />
          <div className="relative mx-auto max-w-2xl">
            <h2 className="text-3xl font-bold text-balance md:text-4xl">
              Pronto para levar seu negócio para o próximo nível?
            </h2>
            <p className="mt-4 text-navy-foreground/75">
              Conte para nós o que você precisa. Nossa equipe analisa seu projeto e apresenta a melhor
              solução digital para o seu negócio.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="lg" variant="secondary" className="rounded-full px-7">
                <a href={whatsappLink(mensagem)} target="_blank" rel="noreferrer">
                  <MessageCircle className="size-4" /> Falar no WhatsApp
                </a>
              </Button>
              <Button asChild size="lg" className="rounded-full px-7">
                <Link to="/orcamento">
                  Quero transformar meu negócio <ArrowRight className="size-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}