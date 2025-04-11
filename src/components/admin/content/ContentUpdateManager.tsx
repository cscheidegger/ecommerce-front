
import React, { useState } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { SiteContent } from '@/hooks/useSiteContent';

interface ContentUpdateManagerProps {
  content: SiteContent;
  updateContent: (content: SiteContent) => void;
  children: (props: {
    isLoading: boolean;
    handleUpdate: (section: keyof SiteContent, field: string, value: string) => void;
    handleSocialUpdate: (network: string, value: string) => void;
    handleSave: () => void;
  }) => React.ReactNode;
}

const ContentUpdateManager = ({ content, updateContent, children }: ContentUpdateManagerProps) => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  
  // Handle updates for regular fields
  const handleUpdate = (section: keyof SiteContent, field: string, value: string) => {
    // Create a deep copy to avoid mutation issues
    const updatedContent = JSON.parse(JSON.stringify(content)) as SiteContent;
    
    // Check for nested fields (with dots)
    if (field.includes('.')) {
      const [parentField, childField] = field.split('.');
      
      // Handle the nested object updates
      if (section === 'footer' && parentField === 'socialLinks') {
        updatedContent.footer.socialLinks = {
          ...updatedContent.footer.socialLinks,
          [childField]: value
        };
      }
    } else {
      // Regular field updates based on section
      if (section === 'homepage') {
        updatedContent.homepage = {
          ...updatedContent.homepage,
          [field]: value
        };
      } else if (section === 'contact') {
        updatedContent.contact = {
          ...updatedContent.contact,
          [field]: value
        };
      } else if (section === 'services') {
        updatedContent.services = {
          ...updatedContent.services,
          [field]: value
        };
      } else if (section === 'footer') {
        updatedContent.footer = {
          ...updatedContent.footer,
          [field]: value
        };
      }
    }
    
    updateContent(updatedContent);
  };
  
  // Specific handler for social media links
  const handleSocialUpdate = (network: string, value: string) => {
    const updatedContent = JSON.parse(JSON.stringify(content)) as SiteContent;
    updatedContent.footer.socialLinks = {
      ...updatedContent.footer.socialLinks,
      [network]: value
    };
    updateContent(updatedContent);
  };
  
  // Save changes with visual feedback
  const handleSave = () => {
    setIsLoading(true);
    
    // Simulate save time for UI feedback
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Alterações salvas",
        description: "As alterações de conteúdo foram salvas com sucesso e já estão visíveis no site.",
      });
    }, 800);
  };
  
  return (
    <>
      {children({
        isLoading,
        handleUpdate,
        handleSocialUpdate,
        handleSave
      })}
    </>
  );
};

export default ContentUpdateManager;
