
import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

interface FormSubmissionStatusProps {
  resetForm: () => void;
}

const FormSubmissionStatus = ({ resetForm }: FormSubmissionStatusProps) => {
  return (
    <Card className="max-w-3xl mx-auto animate-scale-in bg-white border border-gray-100 shadow-md rounded-xl overflow-hidden">
      <CardContent className="pt-16 pb-12 px-8 text-center">
        <div className="bg-gradient-to-br from-primary/10 to-accent p-6 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-sm">
          <CheckCircle2 className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-bold mb-5 text-secondary">Orçamento Solicitado!</h2>
        <p className="mb-8 text-gray-600 max-w-md mx-auto">
          Recebemos seus arquivos e informações. Nossa equipe analisará seu projeto e entrará em contato em breve com o orçamento detalhado.
        </p>
        <Button 
          onClick={resetForm} 
          className="bg-accent hover:bg-accent/90 text-secondary font-medium transition-all duration-300 px-8 py-2.5 shadow-sm hover:shadow rounded-lg"
        >
          Solicitar Outro Orçamento
        </Button>
      </CardContent>
    </Card>
  );
};

export default FormSubmissionStatus;
