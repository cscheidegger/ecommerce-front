
import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import {
  Form,
} from '@/components/ui/form';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from '@/components/ui/card';

// Import custom components
import FileUploader from '@/components/quote/FileUploader';
import QuoteFormFields from '@/components/quote/QuoteFormFields';
import DeliveryEstimate from '@/components/quote/DeliveryEstimate';
import InfoAccordion from '@/components/quote/InfoAccordion';
import FormSubmissionStatus from '@/components/quote/FormSubmissionStatus';
import { useQuoteForm } from '@/hooks/useQuoteForm';

const Quote = () => {
  const {
    form,
    isLoading,
    isSubmitted,
    files,
    setFiles,
    estimatedDays,
    handleSubmit,
    updateFormFiles,
    resetForm
  } = useQuoteForm();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-center">Solicitação de Orçamento</h1>
          <p className="text-gray-600 mb-8 text-center max-w-3xl mx-auto">
            Envie seus arquivos e detalhes do projeto para receber um orçamento personalizado para impressão 3D
          </p>
          
          {isSubmitted ? (
            <FormSubmissionStatus resetForm={resetForm} />
          ) : (
            <Card className="max-w-3xl mx-auto shadow-md">
              <CardHeader>
                <CardTitle>Formulário de Cotação</CardTitle>
                <CardDescription>
                  Preencha os detalhes abaixo para receber um orçamento personalizado
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">1. Arquivos do Projeto</h3>
                      
                      <FileUploader 
                        files={files}
                        setFiles={setFiles}
                        updateFormFiles={updateFormFiles}
                        isLoading={isLoading}
                      />
                      
                      {form.formState.errors.files && (
                        <p className="text-red-500 mt-2 text-sm">
                          {form.formState.errors.files.message?.toString()}
                        </p>
                      )}
                    </div>

                    <QuoteFormFields 
                      form={form} 
                      estimatedDays={estimatedDays} 
                    />

                    {estimatedDays !== null && (
                      <DeliveryEstimate estimatedDays={estimatedDays} />
                    )}

                    <InfoAccordion />

                    <Button 
                      type="submit" 
                      className="w-full" 
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Enviando...
                        </>
                      ) : 'Solicitar Orçamento'}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Quote;
