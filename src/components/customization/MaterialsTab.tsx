
import React from 'react';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Palette } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const MaterialsTab: React.FC = () => {
  return (
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
  );
};

export default MaterialsTab;
