
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Info } from 'lucide-react';
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';

const InfoAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="info" className="border border-gray-100 rounded-xl shadow-sm px-1 bg-white transition-all duration-300 hover:shadow-md hover:border-primary/20">
        <AccordionTrigger className="text-sm py-3.5 px-4 hover:no-underline hover:bg-gray-50/80 rounded-xl transition-colors duration-200 font-medium text-secondary flex">
          <div className="flex items-center">
            <div className="bg-accent p-1.5 rounded-full mr-3">
              <Info className="h-4 w-4 text-secondary/80" />
            </div>
            Informações importantes
          </div>
        </AccordionTrigger>
        <AccordionContent className="px-4 pb-5 pt-1 appear-animation">
          <div className="text-sm space-y-3 text-gray-600 pl-6 border-l-2 border-primary/20">
            <p className="py-1 flex items-start">
              <span className="text-primary mr-2">•</span> 
              <span>Este formulário é para solicitação de orçamento. Após análise dos arquivos, enviaremos uma proposta detalhada.</span>
            </p>
            <p className="py-1 flex items-start">
              <span className="text-primary mr-2">•</span> 
              <HoverCard>
                <HoverCardTrigger>
                  <span className="underline decoration-dotted cursor-help">Os prazos podem variar</span>
                </HoverCardTrigger>
                <HoverCardContent className="bg-white p-3 text-xs rounded-lg border border-gray-100 shadow-md">
                  Dependendo da complexidade e materiais escolhidos, os prazos podem ser ajustados.
                </HoverCardContent>
              </HoverCard>
              <span> de acordo com a complexidade do projeto e disponibilidade de materiais.</span>
            </p>
            <p className="py-1 flex items-start">
              <span className="text-primary mr-2">•</span> 
              <span>Para projetos mais complexos, podemos solicitar informações adicionais.</span>
            </p>
            <p className="py-1 flex items-start">
              <span className="text-primary mr-2">•</span> 
              <span>Serviços de acabamento podem prolongar o prazo de entrega.</span>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default InfoAccordion;
