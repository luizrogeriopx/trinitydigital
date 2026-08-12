import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useSiteData } from "@/context/SiteDataContext";

export function FaqAccordion({ limite }: { limite?: number }) {
  const { faqs } = useSiteData();
  const lista = faqs.slice(0, limite ?? faqs.length);
  return (
    <Accordion type="single" collapsible className="mx-auto mt-12 w-full max-w-3xl">
      {lista.map((faq, i) => (
        <AccordionItem key={faq.pergunta} value={`item-${i}`} className="border-border">
          <AccordionTrigger className="text-left text-base font-semibold hover:no-underline">
            {faq.pergunta}
          </AccordionTrigger>
          <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
            {faq.resposta}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
