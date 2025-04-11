
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { SiteContent } from '@/hooks/useSiteContent';

interface SocialLinksContentProps {
  content: SiteContent['footer'];
  onUpdate: (field: string, value: string, isNested?: boolean, parent?: string) => void;
  onSave: () => void;
  isLoading: boolean;
}

const SocialLinksContent = ({ content, onUpdate, onSave, isLoading }: SocialLinksContentProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Redes Sociais</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <label className="font-medium">Facebook</label>
          <Input 
            value={content.socialLinks.facebook}
            onChange={(e) => onUpdate('facebook', e.target.value, true, 'socialLinks')}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Instagram</label>
          <Input 
            value={content.socialLinks.instagram}
            onChange={(e) => onUpdate('instagram', e.target.value, true, 'socialLinks')}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Twitter</label>
          <Input 
            value={content.socialLinks.twitter}
            onChange={(e) => onUpdate('twitter', e.target.value, true, 'socialLinks')}
          />
        </div>
        
        <div className="space-y-2">
          <label className="font-medium">Copyright</label>
          <Input 
            value={content.copyright}
            onChange={(e) => onUpdate('copyright', e.target.value)}
          />
        </div>
        
        <Button onClick={onSave} disabled={isLoading}>
          {isLoading ? 'Salvando...' : 'Salvar Alterações'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SocialLinksContent;
