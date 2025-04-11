
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SiteContent } from '@/hooks/useSiteContent';

interface FooterContentProps {
  content: SiteContent['footer'];
  onUpdate: (field: string, value: string) => void;
  onSocialUpdate: (field: string, value: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const FooterContent = ({ content, onUpdate, onSocialUpdate, onSave, isLoading }: FooterContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Conteúdo do Rodapé</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="font-medium">Copyright</label>
          <Input 
            value={content.copyright}
            onChange={(e) => onUpdate('copyright', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Link do Facebook</label>
          <Input 
            value={content.socialLinks.facebook}
            onChange={(e) => onSocialUpdate('facebook', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Link do Instagram</label>
          <Input 
            value={content.socialLinks.instagram}
            onChange={(e) => onSocialUpdate('instagram', e.target.value)}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Link do Twitter</label>
          <Input 
            value={content.socialLinks.twitter}
            onChange={(e) => onSocialUpdate('twitter', e.target.value)}
          />
        </div>
        
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default FooterContent;
