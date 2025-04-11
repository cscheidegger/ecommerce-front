
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SiteContent } from '@/hooks/useSiteContent';

interface ContactContentProps {
  content: SiteContent['contact'];
  onUpdate: (field: string, value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const ContactContent = ({ content, onUpdate, onSave, isLoading }: ContactContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Informações de Contato</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="font-medium">Email</label>
          <Input 
            value={content.email}
            onChange={(e) => onUpdate('email', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Telefone</label>
          <Input 
            value={content.phone}
            onChange={(e) => onUpdate('phone', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Endereço</label>
          <Input 
            value={content.address}
            onChange={(e) => onUpdate('address', e.target.value)}
          />
        </div>
        
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ContactContent;
