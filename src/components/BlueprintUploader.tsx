
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, Check, AlertCircle, Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

type UploaderProps = {
  onFileUploaded?: (file: File) => void;
};

const BlueprintUploader = ({ onFileUploaded }: UploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = React.useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      const droppedFile = e.dataTransfer.files[0];
      validateAndSetFile(droppedFile);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndSetFile(e.target.files[0]);
    }
  };

  const validateAndSetFile = (file: File) => {
    // Check file type (accept common blueprint/image formats)
    const validFileTypes = ['image/jpeg', 'image/png', 'image/tiff', 'application/pdf', 'application/dxf'];
    if (!validFileTypes.includes(file.type)) {
      toast({
        variant: "destructive",
        title: "Invalid file type",
        description: "Please upload a JPG, PNG, TIFF, PDF or DXF file."
      });
      return;
    }

    // Check file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      toast({
        variant: "destructive",
        title: "File too large",
        description: "Please upload a file smaller than 10MB."
      });
      return;
    }

    setFile(file);
    if (onFileUploaded) {
      onFileUploaded(file);
    }
  };

  const handleUpload = () => {
    if (!file) return;
    
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          
          // Simulate successful upload completion
          toast({
            title: "Blueprint uploaded successfully",
            description: "Your model is now being processed.",
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <Card className={`border-2 ${isDragging ? 'border-blueprint border-dashed' : 'border-gray-200'} transition-all`}>
      <CardContent className="p-6">
        <div
          className="flex flex-col items-center justify-center py-8 text-center"
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          {file ? (
            <div className="w-full">
              <div className="flex items-center justify-center mb-4">
                <Check className="h-10 w-10 text-green-500" />
              </div>
              <p className="text-lg font-medium mb-2">{file.name}</p>
              <p className="text-sm text-gray-500 mb-6">
                {(file.size / 1024 / 1024).toFixed(2)} MB
              </p>
              {isUploading ? (
                <div className="w-full">
                  <div className="h-2 w-full bg-gray-200 rounded-full mb-2">
                    <div 
                      className="h-full bg-blueprint rounded-full transition-all duration-300" 
                      style={{ width: `${uploadProgress}%` }} 
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    <span className="text-sm text-gray-500">Processing {uploadProgress}%</span>
                  </div>
                </div>
              ) : (
                <Button onClick={handleUpload} className="w-full">
                  <Upload className="h-4 w-4 mr-2" /> Process Blueprint
                </Button>
              )}
            </div>
          ) : (
            <>
              <div className="mb-4 p-4 bg-blueprint/10 rounded-full">
                <Upload className="h-8 w-8 text-blueprint" />
              </div>
              <h3 className="text-lg font-medium mb-1">Upload your blueprint</h3>
              <p className="text-sm text-gray-500 mb-6">
                Drag and drop your blueprint file or click to browse
              </p>
              <input
                type="file"
                ref={fileInputRef}
                className="hidden"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png,.tiff,.pdf,.dxf"
              />
              <Button onClick={handleButtonClick}>
                <Upload className="h-4 w-4 mr-2" /> Select File
              </Button>
              <p className="text-xs text-gray-400 mt-4">
                Supported formats: JPG, PNG, TIFF, PDF, DXF
              </p>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BlueprintUploader;
