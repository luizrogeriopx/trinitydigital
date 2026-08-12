import { useState, type FormEvent } from "react";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { opcoesOrcamento, servicos } from "@/data/site";
import { supabase } from "@/integrations/supabase/client";

export function LeadForm({
  origem,
  servicoPadrao,
}: {
  origem: string;
  servicoPadrao?: string;
}) {
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const dados = new FormData(form);

    const payload = {
      nome: String(dados.get("nome") ?? "").trim(),
      empresa: String(dados.get("empresa") ?? "").trim() || null,
      whatsapp: String(dados.get("whatsapp") ?? "").trim(),
      email: String(dados.get("email") ?? "").trim() || null,
      servico: String(dados.get("servico") ?? "").trim() || null,
      orcamento: String(dados.get("orcamento") ?? "").trim() || null,
      mensagem: String(dados.get("mensagem") ?? "").trim() || null,
      origem,
    };

    if (!payload.nome || !payload.whatsapp) {
      toast.error("Informe pelo menos seu nome e WhatsApp.");
      return;
    }

    setEnviando(true);
    const { error } = await supabase.from("leads").insert(payload);
    setEnviando(false);

    if (error) {
      toast.error("Não conseguimos enviar agora. Tente novamente ou fale pelo WhatsApp.");
      return;
    }

    form.reset();
    setEnviado(true);
    toast.success("Solicitação enviada! Retornamos em breve.");
  }

  return (
    <form onSubmit={onSubmit} className="surface-card p-6 md:p-8" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="nome">Nome *</Label>
          <Input id="nome" name="nome" required autoComplete="name" placeholder="Seu nome completo" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="empresa">Empresa</Label>
          <Input id="empresa" name="empresa" autoComplete="organization" placeholder="Nome da empresa" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="whatsapp">WhatsApp *</Label>
          <Input id="whatsapp" name="whatsapp" required inputMode="tel" autoComplete="tel" placeholder="(00) 00000-0000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">E-mail</Label>
          <Input id="email" name="email" type="email" autoComplete="email" placeholder="voce@empresa.com.br" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="servico">Serviço de interesse</Label>
          <select
            id="servico"
            name="servico"
            defaultValue={servicoPadrao ?? ""}
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <option value="">Selecione</option>
            {servicos.map((s) => (
              <option key={s.slug} value={s.nome}>
                {s.nome}
              </option>
            ))}
            <option value="Outro">Outro</option>
          </select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="orcamento">Orçamento estimado</Label>
          <select
            id="orcamento"
            name="orcamento"
            className="h-10 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
          >
            <option value="">Selecione</option>
            {opcoesOrcamento.map((o) => (
              <option key={o} value={o}>
                {o}
              </option>
            ))}
          </select>
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="mensagem">Mensagem</Label>
          <Textarea id="mensagem" name="mensagem" rows={5} placeholder="Conte um pouco sobre o seu projeto e seus objetivos." />
        </div>
      </div>

      <Button type="submit" size="lg" className="mt-6 w-full rounded-full" disabled={enviando}>
        {enviando ? <Loader2 className="size-4 animate-spin" /> : <Send className="size-4" />}
        Enviar Solicitação
      </Button>

      <p className="mt-3 text-center text-xs text-muted-foreground" aria-live="polite">
        {enviado
          ? "Recebemos sua solicitação. Nossa equipe entra em contato em breve."
          : "Retorno em até 1 dia útil. Seus dados são usados apenas para contato."}
      </p>
    </form>
  );
}