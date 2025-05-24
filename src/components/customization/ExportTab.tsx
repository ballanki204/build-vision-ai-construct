
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ExportTabProps {
  exportFormat: string;
  onExportFormatChange: (value: string) => void;
}

const ExportTab: React.FC<ExportTabProps> = ({ 
  exportFormat, 
  onExportFormatChange 
}) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="exportFormat" className="mb-2 block">Export Format</Label>
        <Select value={exportFormat} onValueChange={onExportFormatChange}>
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
  );
};

export default ExportTab;
