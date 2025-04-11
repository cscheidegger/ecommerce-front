
import React, { useState, useRef } from 'react';
import { FileText, Upload, Trash2, Plus, CheckCircle2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_FILE_TYPES = ['.stl', '.obj', '.3mf'];

export interface FileWithPreview {
  file: File;
  id: string;
  preview?: string;
  progress: number;
  error?: string;
  uploading: boolean;
  uploaded: boolean;
}

interface FileUploaderProps {
  files: FileWithPreview[];
  setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[]>>;
  updateFormFiles: (files: File[]) => void;
  isLoading: boolean;
}

const FileUploader = ({ files, setFiles, updateFormFiles, isLoading }: FileUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const MAX_FILE_SIZE_MB = MAX_FILE_SIZE / (1024 * 1024);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    const newFiles: FileWithPreview[] = Array.from(e.target.files).map(file => {
      // Validar tipo de arquivo
      const fileExt = `.${file.name.split('.').pop()?.toLowerCase()}`;
      const isValidType = ACCEPTED_FILE_TYPES.includes(fileExt);
      
      // Validar tamanho
      const isValidSize = file.size <= MAX_FILE_SIZE;
      
      const error = !isValidType 
        ? `Formato inválido. Aceitos: ${ACCEPTED_FILE_TYPES.join(', ')}` 
        : !isValidSize 
          ? `Arquivo muito grande. Máximo: ${MAX_FILE_SIZE / (1024 * 1024)}MB`
          : undefined;

      return {
        file,
        id: crypto.randomUUID(),
        progress: 0,
        error,
        uploading: false,
        uploaded: false
      };
    });
    
    setFiles(prev => [...prev, ...newFiles.filter(f => !f.error)]);
    
    // Atualizar o campo de arquivos no formulário
    updateFormFiles([
      ...files.map(f => f.file),
      ...newFiles.filter(f => !f.error).map(f => f.file)
    ]);
    
    // Mostrar erros, se houver
    newFiles.filter(f => f.error).forEach(f => {
      toast({
        title: "Erro no arquivo",
        description: `${f.file.name}: ${f.error}`,
        variant: "destructive",
      });
    });
    
    // Limpar input para permitir selecionar o mesmo arquivo novamente
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeFile = (fileId: string) => {
    const updatedFiles = files.filter(f => f.id !== fileId);
    setFiles(updatedFiles);
    
    // Atualizar o campo de arquivos no formulário
    updateFormFiles(updatedFiles.map(f => f.file));
  };

  return (
    <>
      <input
        type="file"
        ref={fileInputRef}
        id="files-input"
        multiple
        accept=".stl,.obj,.3mf"
        className="hidden"
        onChange={handleFileChange}
      />
      
      <div className="p-4 border-2 border-dashed rounded-lg bg-gray-50 text-center mb-4">
        <label
          htmlFor="files-input"
          className="cursor-pointer flex flex-col items-center justify-center py-4"
        >
          <Upload className="h-12 w-12 text-indigo-500 mb-2" />
          <span className="font-medium text-indigo-600 mb-1">
            Clique para fazer upload dos arquivos 3D
          </span>
          <span className="text-sm text-gray-500">
            Formatos aceitos: {ACCEPTED_FILE_TYPES.join(', ')} (máx. {MAX_FILE_SIZE_MB}MB por arquivo)
          </span>
        </label>
      </div>

      {/* Lista de arquivos */}
      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-sm font-medium">Arquivos selecionados:</h4>
          <div className="space-y-2">
            {files.map((fileData) => (
              <div 
                key={fileData.id} 
                className="flex items-center p-3 bg-white border rounded-md"
              >
                <FileText className="h-5 w-5 text-indigo-500 mr-3" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium truncate">{fileData.file.name}</p>
                  <p className="text-xs text-gray-500">
                    {(fileData.file.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  
                  {fileData.uploading && (
                    <div className="mt-1">
                      <Progress value={fileData.progress} className="h-2" />
                    </div>
                  )}
                  
                  {fileData.uploaded && (
                    <p className="text-xs text-green-600 flex items-center mt-1">
                      <CheckCircle2 className="h-3 w-3 mr-1" /> Upload completo
                    </p>
                  )}
                </div>
                <Button
                  type="button" 
                  variant="ghost" 
                  size="sm"
                  onClick={() => removeFile(fileData.id)}
                  disabled={isLoading}
                >
                  <Trash2 className="h-4 w-4 text-gray-500 hover:text-red-500" />
                </Button>
              </div>
            ))}
          </div>
          <div className="pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center text-xs"
            >
              <Plus className="h-3 w-3 mr-1" /> Adicionar mais arquivos
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default FileUploader;
