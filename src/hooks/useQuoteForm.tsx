
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from '@/hooks/use-toast';
import { formSchema, FormValues } from '@/components/quote/QuoteFormFields';
import { FileWithPreview } from '@/components/quote/FileUploader';

export const useQuoteForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [estimatedDays, setEstimatedDays] = useState<number | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      company: '',
      material: '',
      finish: '',
      quantity: 1,
      deadline: 'normal',
      application: '',
      comments: '',
      files: [],
    },
  });

  const updateFormFiles = (newFiles: File[]) => {
    form.setValue('files', newFiles);
    
    // Verificar se ainda existem arquivos válidos
    if (newFiles.length === 0) {
      form.setError('files', {
        type: 'custom',
        message: 'Pelo menos um arquivo é obrigatório'
      });
    } else {
      form.clearErrors('files');
    }
  };

  const simulateFileUpload = (fileId: string) => {
    return new Promise<void>((resolve) => {
      // Marca o arquivo como em upload
      setFiles(prev => prev.map(f => 
        f.id === fileId ? { ...f, uploading: true } : f
      ));
      
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        
        if (progress >= 100) {
          clearInterval(interval);
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, progress: 100, uploading: false, uploaded: true } : f
          ));
          resolve();
        } else {
          setFiles(prev => prev.map(f => 
            f.id === fileId ? { ...f, progress } : f
          ));
        }
      }, 300);
    });
  };

  const updateEstimatedDelivery = (values: Partial<FormValues>) => {
    // Lógica simplificada para estimar prazo de entrega
    let baseDays = 5; // Prazo base para projetos normais
    
    if (values.deadline === 'urgente') {
      baseDays = 3;
    } else if (values.deadline === 'express') {
      baseDays = 1;
    }
    
    // Ajustes baseados em material
    if (values.material === 'resina' || values.material === 'resinaTecnica') {
      baseDays += 1;
    }
    
    // Ajustes baseados em acabamento
    if (values.finish === 'pintado') {
      baseDays += 2;
    } else if (values.finish === 'lixado') {
      baseDays += 1;
    }
    
    // Ajuste baseado em quantidade
    const quantity = values.quantity || 1;
    if (quantity > 10) {
      baseDays += Math.floor(quantity / 10);
    }
    
    setEstimatedDays(baseDays);
  };

  const handleSubmit = async (values: FormValues) => {
    setIsLoading(true);
    
    try {
      // Começar os uploads de arquivos
      const uploadPromises = files.map(f => simulateFileUpload(f.id));
      await Promise.all(uploadPromises);

      // Simular envio para o backend
      console.log('Form values:', values);
      console.log('Files:', files.map(f => f.file.name));
      
      // Simular delay da API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Simulação bem-sucedida
      setIsSubmitted(true);
      toast({
        title: "Cotação enviada",
        description: "Recebemos seu pedido de orçamento. Em breve entraremos em contato!",
      });
      
    } catch (error) {
      console.error('Error submitting quote:', error);
      toast({
        title: "Erro ao enviar",
        description: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetForm = () => {
    form.reset();
    setFiles([]);
    setIsSubmitted(false);
    setEstimatedDays(null);
  };

  // Watch form changes for estimated delivery updates
  useEffect(() => {
    const subscription = form.watch((value) => {
      if (value.material && value.finish && value.deadline && value.quantity) {
        updateEstimatedDelivery(value);
      }
    });
    
    return () => subscription.unsubscribe();
  }, [form.watch]);

  return {
    form,
    isLoading,
    isSubmitted,
    files,
    setFiles,
    estimatedDays,
    handleSubmit: form.handleSubmit(handleSubmit),
    updateFormFiles,
    resetForm
  };
};
