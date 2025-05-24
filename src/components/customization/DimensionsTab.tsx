
import React from 'react';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Layers } from 'lucide-react';
import { Dimensions, CustomizationChangeProps } from '@/types/customization';

interface DimensionsTabProps {
  height: number;
  width: number;
  length: number;
  roofType: string;
  onHeightChange: (value: number) => void;
  onWidthChange: (value: number) => void;
  onLengthChange: (value: number) => void;
  onRoofTypeChange: (value: string) => void;
  onApplyChanges: () => void;
}

const DimensionsTab: React.FC<DimensionsTabProps> = ({
  height,
  width,
  length,
  roofType,
  onHeightChange,
  onWidthChange,
  onLengthChange,
  onRoofTypeChange,
  onApplyChanges
}) => {
  return (
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
          onValueChange={([value]) => onHeightChange(value)}
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
          onValueChange={([value]) => onWidthChange(value)}
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
          onValueChange={([value]) => onLengthChange(value)}
        />
      </div>
      
      <div>
        <Label htmlFor="roofType" className="mb-2 block">Roof Type</Label>
        <Select value={roofType} onValueChange={onRoofTypeChange}>
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
        <Button className="w-full" onClick={onApplyChanges}>
          <Layers className="h-4 w-4 mr-2" />
          Apply Changes
        </Button>
      </div>
    </div>
  );
};

export default DimensionsTab;
