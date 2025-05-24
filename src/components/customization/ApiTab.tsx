
import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface ApiTabProps {
  apiKey: string;
  onApiKeyChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ApiTab: React.FC<ApiTabProps> = ({ apiKey, onApiKeyChange }) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="apiKey" className="mb-2 block">OpenAI API Key</Label>
        <Input 
          id="apiKey"
          type="password"
          placeholder="Enter your OpenAI API key"
          value={apiKey}
          onChange={onApiKeyChange}
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
  );
};

export default ApiTab;
