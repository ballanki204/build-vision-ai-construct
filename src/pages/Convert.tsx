import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import BlueprintUploader from '@/components/BlueprintUploader';
import ModelViewer from '@/components/ModelViewer';
import CustomizationPanel from '@/components/CustomizationPanel';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowLeft, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

// OpenAI API configuration
const OPENAI_API_ENDPOINT = "https://api.openai.com/v1/chat/completions";
// Default API key (prefilled with the provided key)
const DEFAULT_API_KEY = "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";

const Convert = () => {
  const [hasUploadedFile, setHasUploadedFile] = useState(false);
  const [isModelReady, setIsModelReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [apiKey, setApiKey] = useState(DEFAULT_API_KEY);
  const [currentViewMode, setCurrentViewMode] = useState('3d');
  const [modelDimensions, setModelDimensions] = useState({
    width: 6,
    length: 4,
    height: 3
  });
  const [roofType, setRoofType] = useState('pitched');
  
  // Store the blueprint file
  const [blueprintFile, setBlueprintFile] = useState(null);
  
  // Effect to automatically process blueprint if API key and file are available
  useEffect(() => {
    if (blueprintFile && apiKey && !isModelReady && !isProcessing) {
      // Process automatically when both file and API key are ready
      handleProcessBlueprint();
    }
  }, [blueprintFile, apiKey]);
  
  // Process the blueprint using OpenAI API
  const processBlueprint = async (file) => {
    if (!apiKey) {
      toast("API Key Required", {
        description: "Please enter your OpenAI API key in the customization panel"
      });
      return;
    }
    
    setIsProcessing(true);
    
    try {
      // Convert the image to base64
      const base64Image = await fileToBase64(file);
      
      const response = await fetch(OPENAI_API_ENDPOINT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-4o",
          messages: [
            {
              role: "system",
              content: "You are an architectural expert that can analyze blueprints and extract key dimensions and features. Analyze the blueprint image and provide dimensions and features in JSON format with the following structure: { width: number, length: number, height: number, roofType: string }"
            },
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: "Analyze this blueprint and extract the dimensions and features. Return only valid JSON with width, length, height, and roofType."
                },
                {
                  type: "image_url",
                  image_url: {
                    url: base64Image
                  }
                }
              ]
            }
          ]
        })
      });
      
      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }
      
      const data = await response.json();
      
      // Extract the response content
      const assistantMessage = data.choices[0].message.content;
      
      // Parse the JSON response
      try {
        const jsonMatch = assistantMessage.match(/\{[\s\S]*\}/);
        const jsonString = jsonMatch ? jsonMatch[0] : assistantMessage;
        const dimensions = JSON.parse(jsonString);
        
        // Update the model dimensions
        setModelDimensions({
          width: dimensions.width || 6,
          length: dimensions.length || 4,
          height: dimensions.height || 3
        });
        
        // Update roof type if provided
        if (dimensions.roofType) {
          setRoofType(dimensions.roofType.toLowerCase());
        }
        
        setIsModelReady(true);
        toast("Blueprint Processed Successfully", {
          description: "Your 3D model has been generated."
        });
      } catch (jsonError) {
        console.error("Failed to parse API response:", jsonError);
        toast("Processing Error", {
          description: "Failed to parse the API response."
        });
      }
    } catch (error) {
      console.error("API request failed:", error);
      toast("API Error", {
        description: error.message || "Failed to process blueprint with OpenAI API."
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  // Convert file to base64
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (typeof reader.result === 'string') {
          // Remove the data URL prefix (e.g., "data:image/jpeg;base64,")
          const base64String = reader.result;
          resolve(base64String);
        } else {
          reject(new Error('Failed to convert file to base64'));
        }
      };
      reader.onerror = error => reject(error);
    });
  };
  
  const handleFileUploaded = (file) => {
    setHasUploadedFile(true);
    setBlueprintFile(file);
  };
  
  const handleCustomizationChange = (changes) => {
    setModelDimensions(prev => ({
      ...prev,
      ...changes
    }));
    
    if (changes.roofType) {
      setRoofType(changes.roofType);
    }
  };
  
  const handleApiKeyChange = (key) => {
    setApiKey(key);
  };
  
  const handleProcessBlueprint = () => {
    if (blueprintFile) {
      processBlueprint(blueprintFile);
    } else {
      toast("No Blueprint", {
        description: "Please upload a blueprint file first."
      });
    }
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
                
                {hasUploadedFile && (
                  <div className="mt-4">
                    <Button 
                      onClick={handleProcessBlueprint}
                      disabled={isProcessing}
                      className="w-full"
                    >
                      {isProcessing ? 'Processing...' : 'Process Blueprint'}
                    </Button>
                  </div>
                )}
              </div>
              
              {(hasUploadedFile) && (
                <div>
                  <h2 className="text-xl font-medium mb-4">Customize Model</h2>
                  <CustomizationPanel 
                    onDimensionsChange={handleCustomizationChange} 
                    onApiKeyChange={handleApiKeyChange}
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
            
            {/* Right Column - 3D Viewer */}
            <div className="lg:col-span-2">
              <div className="bg-white border rounded-lg overflow-hidden">
                <div className="border-b p-4 flex justify-between items-center">
                  <h2 className="text-xl font-medium">3D Model Preview</h2>
                  <Tabs defaultValue="3d" value={currentViewMode} onValueChange={setCurrentViewMode}>
                    <TabsList>
                      <TabsTrigger value="3d">3D View</TabsTrigger>
                      <TabsTrigger value="top">Top View</TabsTrigger>
                      <TabsTrigger value="front">Front View</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </div>
                <div className="h-[500px] lg:h-[700px]">
                  <ModelViewer 
                    dimensions={modelDimensions}
                    roofType={roofType}
                    viewMode={currentViewMode}
                  />
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
