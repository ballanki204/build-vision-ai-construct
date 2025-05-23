import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Palette, 
  Ruler, 
  Box, 
  ChevronsUpDown, 
  Save, 
  Download,
  Share2,
  Layers,
  Key
} from 'lucide-react';

interface CustomizationPanelProps {
  onDimensionsChange?: (dimensions: any) => void;
  onApiKeyChange?: (apiKey: string) => void;
  initialDimensions?: {
    width: number;
    length: number;
    height: number;
  };
  initialRoofType?: string;
}

const CustomizationPanel = ({
  onDimensionsChange = () => {},
  onApiKeyChange = () => {},
  initialDimensions = { width: 6, length: 4, height: 3 },
  initialRoofType = "pitched"
}: CustomizationPanelProps) => {
  const [height, setHeight] = useState<number>(initialDimensions.height);
  const [width, setWidth] = useState<number>(initialDimensions.width);
  const [length, setLength] = useState<number>(initialDimensions.length);
  const [roofType, setRoofType] = useState<string>(initialRoofType);
  const [exportFormat, setExportFormat] = useState<string>("obj");
  const [apiKey, setApiKey] = useState<string>("");
  
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
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="height">Height: {height}m</Label>
              </div>
              <Slider
                id="height"
                min={1}
                max={10}
                step={0.1}
                value={[height]}
                onValueChange={([value]) => setHeight(value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="width">Width: {width}m</Label>
              </div>
              <Slider
                id="width"
                min={2}
                max={15}
                step={0.1}
                value={[width]}
                onValueChange={([value]) => setWidth(value)}
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <Label htmlFor="length">Length: {length}m</Label>
              </div>
              <Slider
                id="length"
                min={2}
                max={15}
                step={0.1}
                value={[length]}
                onValueChange={([value]) => setLength(value)}
              />
            </div>
            
            <div>
              <Label htmlFor="roofType" className="mb-2 block">Roof Type</Label>
              <Select value={roofType} onValueChange={setRoofType}>
                <SelectTrigger id="roofType">
                  <SelectValue placeholder="Select roof type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="flat">Flat</SelectItem>
                  <SelectItem value="pitched">Pitched</SelectItem>
                  <SelectItem value="gable">Gable</SelectItem>
                  <SelectItem value="hip">Hip</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button className="w-full" onClick={handleApplyChanges}>
                <Layers className="h-4 w-4 mr-2" />
                Apply Changes
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="materials" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="wallMaterial" className="mb-2 block">Wall Material</Label>
              <Select defaultValue="concrete">
                <SelectTrigger id="wallMaterial">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="concrete">Concrete</SelectItem>
                  <SelectItem value="brick">Brick</SelectItem>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="glass">Glass</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="roofMaterial" className="mb-2 block">Roof Material</Label>
              <Select defaultValue="shingles">
                <SelectTrigger id="roofMaterial">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="shingles">Shingles</SelectItem>
                  <SelectItem value="metal">Metal</SelectItem>
                  <SelectItem value="tiles">Tiles</SelectItem>
                  <SelectItem value="slate">Slate</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="floorMaterial" className="mb-2 block">Floor Material</Label>
              <Select defaultValue="wood">
                <SelectTrigger id="floorMaterial">
                  <SelectValue placeholder="Select material" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wood">Wood</SelectItem>
                  <SelectItem value="tile">Tile</SelectItem>
                  <SelectItem value="carpet">Carpet</SelectItem>
                  <SelectItem value="concrete">Concrete</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button className="w-full">
                <Palette className="h-4 w-4 mr-2" />
                Apply Materials
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="export" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="exportFormat" className="mb-2 block">Export Format</Label>
              <Select value={exportFormat} onValueChange={setExportFormat}>
                <SelectTrigger id="exportFormat">
                  <SelectValue placeholder="Select format" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="obj">OBJ</SelectItem>
                  <SelectItem value="stl">STL</SelectItem>
                  <SelectItem value="fbx">FBX</SelectItem>
                  <SelectItem value="gltf">glTF</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="quality" className="mb-2 block">Quality</Label>
              <Select defaultValue="high">
                <SelectTrigger id="quality">
                  <SelectValue placeholder="Select quality" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low (faster)</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High (detailed)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="pt-2">
              <Button className="w-full mb-2">
                <Download className="h-4 w-4 mr-2" />
                Export Model
              </Button>
              <Button variant="outline" className="w-full">
                <Share2 className="h-4 w-4 mr-2" />
                Share Model
              </Button>
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="api" className="space-y-4">
          <div className="space-y-4">
            <div>
              <Label htmlFor="apiKey" className="mb-2 block">OpenAI API Key</Label>
              <Input 
                id="apiKey"
                type="password"
                placeholder="Enter your OpenAI API key"
                value={apiKey}
                onChange={handleApiKeyUpdate}
              />
              <p className="text-xs text-gray-500 mt-1">
                Required for blueprint processing and AI features.
              </p>
            </div>
            
            <div className="pt-2">
              <p className="text-sm text-gray-600 mb-4">
                We use OpenAI's GPT-4o Vision model to analyze your blueprints and generate 3D models.
                Your API key is used only in your browser and never stored on our servers.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default CustomizationPanel;
