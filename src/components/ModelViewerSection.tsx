
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ModelViewer from '@/components/ModelViewer';

interface ModelViewerSectionProps {
  dimensions: {
    width: number;
    length: number;
    height: number;
  };
  roofType: string;
  currentViewMode: string;
  onViewModeChange: (mode: string) => void;
}

const ModelViewerSection: React.FC<ModelViewerSectionProps> = ({
  dimensions,
  roofType,
  currentViewMode,
  onViewModeChange
}) => {
  return (
    <div className="lg:col-span-2">
      <div className="bg-white border rounded-lg overflow-hidden">
        <div className="border-b p-4 flex justify-between items-center">
          <h2 className="text-xl font-medium">3D Model Preview</h2>
          <Tabs defaultValue="3d" value={currentViewMode} onValueChange={onViewModeChange}>
            <TabsList>
              <TabsTrigger value="3d">3D View</TabsTrigger>
              <TabsTrigger value="top">Top View</TabsTrigger>
              <TabsTrigger value="front">Front View</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        <div className="h-[500px] lg:h-[700px]">
          <ModelViewer 
            dimensions={dimensions}
            roofType={roofType}
            viewMode={currentViewMode}
          />
        </div>
      </div>
    </div>
  );
};

export default ModelViewerSection;
