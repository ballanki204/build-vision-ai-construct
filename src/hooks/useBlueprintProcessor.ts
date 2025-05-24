
import { useState, useEffect } from 'react';
import { processBlueprint } from '@/services/openaiService';
import { toast } from 'sonner';

interface ModelDimensions {
  width: number;
  length: number;
  height: number;
}

export const useBlueprintProcessor = (initialDimensions: ModelDimensions) => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState<string>("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");
  const [modelDimensions, setModelDimensions] = useState<ModelDimensions>(initialDimensions);
  const [roofType, setRoofType] = useState('pitched');
  
  // Store the blueprint file
  const [blueprintFile, setBlueprintFile] = useState<File | null>(null);
  
  // Effect to automatically process blueprint if API key and file are available
  useEffect(() => {
    if (blueprintFile && apiKey && !isModelReady && !isProcessing) {
      // Process automatically when both file and API key are ready
      handleProcessBlueprint();
    }
  }, [blueprintFile, apiKey]);
  
  const handleFileUploaded = (file: File) => {
    setHasUploadedFile(true);
    setBlueprintFile(file);
  };
  
  const handleCustomizationChange = (changes: any) => {
    setModelDimensions(prev => ({
      ...prev,
      ...changes
    }));
    
    if (changes.roofType) {
      setRoofType(changes.roofType);
    }
  };
  
  const handleApiKeyChange = (key: string) => {
    setApiKey(key);
  };
  
  const handleProcessBlueprint = async () => {
    if (!blueprintFile) {
      toast("No Blueprint", {
        description: "Please upload a blueprint file first."
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const dimensions = await processBlueprint(blueprintFile, apiKey);
      
      // Update the model dimensions
      setModelDimensions({
        width: dimensions.width || modelDimensions.width,
        length: dimensions.length || modelDimensions.length,
        height: dimensions.height || modelDimensions.height
      });
      
      // Update roof type if provided
      if (dimensions.roofType) {
        setRoofType(dimensions.roofType.toLowerCase());
      }
      
      setIsModelReady(true);
      toast("Blueprint Processed Successfully", {
        description: "Your 3D model has been generated."
      });
    } catch (error: any) {
      console.error("Processing failed:", error);
      toast("API Error", {
        description: error.message || "Failed to process blueprint with OpenAI API."
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  return {
    hasUploadedFile,
    isModelReady,
    isProcessing,
    apiKey,
    modelDimensions,
    roofType,
    blueprintFile,
    handleFileUploaded,
    handleCustomizationChange,
    handleApiKeyChange,
    handleProcessBlueprint
  };
};
