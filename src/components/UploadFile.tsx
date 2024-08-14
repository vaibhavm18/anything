import React, { useState, ChangeEvent, DragEvent } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Image, X } from 'lucide-react';

interface UploadedImage {
  file: File;
  preview: string;
}

const UploadFile: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    processFile(file);
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    processFile(file);
  };

  const processFile = (file: File | undefined) => {
    if (file && (file.type === "image/jpeg" || file.type === "image/png") && file.size <= 25 * 1024 * 1024) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        setUploadedImage({
          file: file,
          preview: e.target?.result as string
        });
      };
      reader.readAsDataURL(file);
    } else {
      alert("Please upload a JPEG or PNG file, max 25MB in size.");
    }
  };

  const removeImage = () => {
    setUploadedImage(null);
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Upload a your snacky selfie.</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent elementum mi
          tellus, sagittis eleifend nunc interdum eu.
        </p>
        <p className="text-sm text-gray-500 mb-6">
          Aenean fringilla nibh at velit convallis feugiat.
        </p>
        {uploadedImage ?
          <div className="relative max-w-sm mx-auto group">
            <img src={uploadedImage.preview} alt='Image' className='w-full' />
            <Button
              variant={"secondary"}
              size="icon"
              className="absolute top-2 right-2 opacity-0 transition-opacity duration-300 group-hover:opacity-90"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          : (
            <>
              <div
                className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
              >
                <Image className="mx-auto mb-4" size={48} />
                <p className="text-sm text-gray-500 mb-2">Drag and drop a file here or</p>
                <Button onClick={() => document.getElementById('fileInput')?.click()}>
                  Choose a file
                </Button>
                <input
                  id="fileInput"
                  type="file"
                  className="hidden"
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </div>
              <div className="flex justify-between items-center mt-4 text-xs text-gray-500">
                <span>Accepted file types: JPEG, PNG</span>
                <span>Maximum size: 25MB</span>
              </div>
            </>
          )}

      </CardContent>
    </Card>
  );
};

export default UploadFile;