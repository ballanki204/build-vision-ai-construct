
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlueprintUploader from '@/components/BlueprintUploader';
import ModelViewer from '@/components/ModelViewer';
import CustomizationPanel from '@/components/CustomizationPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const Convert = () => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  
  const handleFileUploaded = (file: File) => {
    setHasUploadedFile(true);
    
    // Simulate model processing
    setTimeout(() => {
      setIsModelReady(true);
    }, 3000);
  };
  
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
            <div className="lg:col-span-1 space-y-6">
              <div>
                <h2 className="text-xl font-medium mb-4">Upload Blueprint</h2>
                <BlueprintUploader onFileUploaded={handleFileUploaded} />
              </div>
              
              {(hasUploadedFile || isModelReady) && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Customize Model</h2>
                  <CustomizationPanel />
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
            </div>
            
            {/* Right Column - 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="border-b p-4 flex justify-between items-center">
                  <h2 className="text-xl font-medium">3D Model Preview</h2>
                  <Tabs defaultValue="3d">
                    <TabsList>
                      <TabsTrigger value="3d">3D View</TabsTrigger>
                      <TabsTrigger value="top">Top View</TabsTrigger>
                      <TabsTrigger value="front">Front View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="h-[500px] lg:h-[700px]">
                  <ModelViewer />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Convert;
