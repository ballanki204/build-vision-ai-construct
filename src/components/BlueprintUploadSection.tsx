
import React from 'react';
import { Button } from '@/components/ui/button';
import { AlertCircle } from 'lucide-react';
import BlueprintUploader from '@/components/BlueprintUploader';
import CustomizationPanel from '@/components/CustomizationPanel';

interface BlueprintUploadSectionProps {
  hasUploadedFile: boolean;
  isModelReady: boolean;
  isProcessing: boolean;
  apiKey: string;
  modelDimensions: {
    width: number;
    length: number;
    height: number;
  };
  roofType: string;
  onFileUploaded: (file: File) => void;
  onCustomizationChange: (changes: any) => void;
  onApiKeyChange: (key: string) => void;
  onProcess: () => void;
}

const BlueprintUploadSection: React.FC<BlueprintUploadSectionProps> = ({
  hasUploadedFile,
  isModelReady,
  isProcessing,
  apiKey,
  modelDimensions,
  roofType,
  onFileUploaded,
  onCustomizationChange,
  onApiKeyChange,
  onProcess
}) => {
  return (
    <div className="lg:col-span-1 space-y-6">
      <div>
        <h2 className="text-xl font-medium mb-4">Upload Blueprint</h2>
        <BlueprintUploader onFileUploaded={onFileUploaded} />
        
        {hasUploadedFile && (
          <div className="mt-4">
            <Button 
              onClick={onProcess}
              disabled={isProcessing}
              className="w-full"
            >
              {isProcessing ? 'Processing...' : 'Process Blueprint'}
            </Button>
          </div>
        )}
      </div>
      
      {hasUploadedFile && (
        <div>
          <h2 className="text-xl font-medium mb-4">Customize Model</h2>
          <CustomizationPanel 
            onDimensionsChange={onCustomizationChange} 
            onApiKeyChange={onApiKeyChange}
            initialDimensions={modelDimensions}
            initialRoofType={roofType}
            initialApiKey={apiKey}
          />
        </div>
      )}
      
      {isModelReady && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-center">
          <p className="text-green-800 mb-2">Your 3D model is ready!</p>
          <p className="text-gray-600 text-sm mb-4">
            You can now customize and export your model.
          </p>
          <Button className="w-full">
            Save Project
          </Button>
        </div>
      )}
      
      {apiKey === '' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center mb-2">
            <AlertCircle className="h-4 w-4 text-yellow-600 mr-2" />
            <p className="text-yellow-800 font-medium">API Key Required</p>
          </div>
          <p className="text-gray-600 text-sm">
            Enter an OpenAI API key in the customization panel to enable blueprint processing.
          </p>
        </div>
      )}
    </div>
  );
};

export default BlueprintUploadSection;
