
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SiteContent } from '@/hooks/useSiteContent';

interface ServicesContentProps {
  content: SiteContent['services'];
  onUpdate: (field: string, value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const ServicesContent = ({ content, onUpdate, onSave, isLoading }: ServicesContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conteúdo de Serviços</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="font-medium">Título</label>
          <Input 
            value={content.title}
            onChange={(e) => onUpdate('title', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Subtítulo</label>
          <Input 
            value={content.subtitle}
            onChange={(e) => onUpdate('subtitle', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Descrição</label>
          <Textarea 
            rows={4}
            value={content.description}
            onChange={(e) => onUpdate('description', e.target.value)}
          />
        </div>
        
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ServicesContent;
