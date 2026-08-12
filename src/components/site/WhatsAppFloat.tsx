import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/data/site";

export function WhatsAppFloat({ mensagem }: { mensagem?: string }) {
  return (
    <a
      href={whatsappLink(mensagem)}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar no WhatsApp"
      className="fixed right-5 bottom-5 z-50 flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-3.5 font-semibold text-[#0B2545] shadow-[var(--shadow-lift)] transition-transform hover:scale-105"
    >
      <MessageCircle className="size-5" aria-hidden="true" />
      <span className="hidden text-sm sm:inline">Falar no WhatsApp</span>
    </a>
  );
}