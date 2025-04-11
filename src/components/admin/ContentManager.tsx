
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useSiteContent } from '@/hooks/useSiteContent';
import ContentUpdateManager from './content/ContentUpdateManager';
import HomepageContent from './content/HomepageContent';
import ContactContent from './content/ContactContent';
import ServicesContent from './content/ServicesContent';
import FooterContent from './content/FooterContent';

const ContentManager = () => {
  const { content, updateContent } = useSiteContent();
  
  return (
    <div className="space-y-8">
      <ContentUpdateManager content={content} updateContent={updateContent}>
        {({ isLoading, handleUpdate, handleSocialUpdate, handleSave }) => (
          <Tabs defaultValue="homepage" className="w-full">
            <TabsList className="grid grid-cols-4 mb-4 w-full">
              <TabsTrigger value="homepage">Página Inicial</TabsTrigger>
              <TabsTrigger value="contact">Contato</TabsTrigger>
              <TabsTrigger value="services">Serviços</TabsTrigger>
              <TabsTrigger value="footer">Rodapé</TabsTrigger>
            </TabsList>
            
            <TabsContent value="homepage">
              <HomepageContent 
                content={content.homepage}
                onUpdate={(field, value) => handleUpdate('homepage', field, value)}
                onSave={handleSave}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="contact">
              <ContactContent 
                content={content.contact}
                onUpdate={(field, value) => handleUpdate('contact', field, value)}
                onSave={handleSave}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="services">
              <ServicesContent 
                content={content.services}
                onUpdate={(field, value) => handleUpdate('services', field, value)}
                onSave={handleSave}
                isLoading={isLoading}
              />
            </TabsContent>
            
            <TabsContent value="footer">
              <FooterContent 
                content={content.footer}
                onUpdate={(field, value) => handleUpdate('footer', field, value)}
                onSocialUpdate={(network, value) => handleSocialUpdate(network, value)}
                onSave={handleSave}
                isLoading={isLoading}
              />
            </TabsContent>
          </Tabs>
        )}
      </ContentUpdateManager>
    </div>
  );
};

export default ContentManager;
