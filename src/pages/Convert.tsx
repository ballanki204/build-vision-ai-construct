
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import BlueprintUploadSection from '@/components/BlueprintUploadSection';
import ModelViewerSection from '@/components/ModelViewerSection';
import { useBlueprintProcessor } from '@/hooks/useBlueprintProcessor';

const Convert = () => {
  const [currentViewMode, setCurrentViewMode] = useState('3d');
  
  // Initialize with default dimensions
  const initialDimensions = { width: 6, length: 4, height: 3 };
  
  const {
    hasUploadedFile,
    isModelReady,
    isProcessing,
    apiKey,
    modelDimensions,
    roofType,
    handleFileUploaded,
    handleCustomizationChange,
    handleApiKeyChange,
    handleProcessBlueprint
  } = useBlueprintProcessor(initialDimensions);
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-1 py-8">
        <div className="container px-4 mx-auto">
          <div className="flex items-center mb-8">
            <Link to="/" className="flex items-center text-gray-500 hover:text-blueprint mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Home
            </Link>
            <h1 className="text-2xl font-bold">Blueprint to 3D Converter</h1>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Upload and Customize */}
            <BlueprintUploadSection
              hasUploadedFile={hasUploadedFile}
              isModelReady={isModelReady}
              isProcessing={isProcessing}
              apiKey={apiKey}
              modelDimensions={modelDimensions}
              roofType={roofType}
              onFileUploaded={handleFileUploaded}
              onCustomizationChange={handleCustomizationChange}
              onApiKeyChange={handleApiKeyChange}
              onProcess={handleProcessBlueprint}
            />
            
            {/* Right Column - 3D Viewer */}
            <ModelViewerSection
              dimensions={modelDimensions}
              roofType={roofType}
              currentViewMode={currentViewMode}
              onViewModeChange={setCurrentViewMode}
            />
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Convert;
