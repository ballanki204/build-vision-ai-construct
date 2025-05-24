
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Palette, Ruler, Download, Key } from 'lucide-react';
import { Dimensions, CustomizationChangeProps } from '@/types/customization';

// Import tab components
import DimensionsTab from '@/components/customization/DimensionsTab';
import MaterialsTab from '@/components/customization/MaterialsTab';
import ExportTab from '@/components/customization/ExportTab';
import ApiTab from '@/components/customization/ApiTab';

interface CustomizationPanelProps {
  onDimensionsChange?: (dimensions: CustomizationChangeProps) => void;
  onApiKeyChange?: (apiKey: string) => void;
  initialDimensions?: Dimensions;
  initialRoofType?: string;
  initialApiKey?: string;
}

const CustomizationPanel = ({
  onDimensionsChange = () => {},
  onApiKeyChange = () => {},
  initialDimensions = { width: 6, length: 4, height: 3 },
  initialRoofType = "pitched",
  initialApiKey = ""
}: CustomizationPanelProps) => {
  const [height, setHeight] = useState<number>(initialDimensions.height);
  const [width, setWidth] = useState<number>(initialDimensions.width);
  const [length, setLength] = useState<number>(initialDimensions.length);
  const [roofType, setRoofType] = useState<string>(initialRoofType);
  const [exportFormat, setExportFormat] = useState<string>("obj");
  const [apiKey, setApiKey] = useState<string>(initialApiKey);
  
  // Apply initial dimensions when they change
  useEffect(() => {
    setHeight(initialDimensions.height);
    setWidth(initialDimensions.width);
    setLength(initialDimensions.length);
  }, [initialDimensions]);
  
  // Apply initial roof type when it changes
  useEffect(() => {
    setRoofType(initialRoofType);
  }, [initialRoofType]);
  
  // Apply initial API key when it changes
  useEffect(() => {
    setApiKey(initialApiKey);
  }, [initialApiKey]);
  
  const handleApplyChanges = () => {
    onDimensionsChange({
      height,
      width,
      length,
      roofType
    });
  };
  
  const handleApiKeyUpdate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newApiKey = e.target.value;
    setApiKey(newApiKey);
    onApiKeyChange(newApiKey);
  };
  
  return (
    <div className="w-full bg-white rounded-lg shadow-sm border p-4">
      <Tabs defaultValue="dimensions">
        <TabsList className="grid w-full grid-cols-4 mb-4">
          <TabsTrigger value="dimensions">
            <Ruler className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Dimensions</span>
          </TabsTrigger>
          <TabsTrigger value="materials">
            <Palette className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Materials</span>
          </TabsTrigger>
          <TabsTrigger value="export">
            <Download className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">Export</span>
          </TabsTrigger>
          <TabsTrigger value="api">
            <Key className="h-4 w-4 mr-2" />
            <span className="hidden sm:inline">API</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="dimensions" className="space-y-4">
          <DimensionsTab 
            height={height}
            width={width}
            length={length}
            roofType={roofType}
            onHeightChange={setHeight}
            onWidthChange={setWidth}
            onLengthChange={setLength}
            onRoofTypeChange={setRoofType}
            onApplyChanges={handleApplyChanges}
          />
        </TabsContent>
        
        <TabsContent value="materials" className="space-y-4">
          <MaterialsTab />
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <ExportTab 
            exportFormat={exportFormat}
            onExportFormatChange={setExportFormat}
          />
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <ApiTab 
            apiKey={apiKey}
            onApiKeyChange={handleApiKeyUpdate}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizationPanel;
