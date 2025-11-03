import { useState, useRef } from 'react';
import { Upload, FileText } from 'lucide-react';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  isUploading?: boolean;
}

export default function FileUpload({ onFileSelect, isUploading }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (file: File) => {
    if (file && file.name.endsWith('.docx')) {
      onFileSelect(file);
    } else {
      alert('Please upload a .docx file');
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFile(e.target.files[0]);
    }
  };

  return (
    <div
      className={`
        relative border-2 border-dashed rounded-lg p-12 transition-all
        ${isDragging 
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' 
          : 'border-slate-300 dark:border-slate-600 hover:border-slate-400 dark:hover:border-slate-500'
        }
        ${isUploading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onClick={() => !isUploading && fileInputRef.current?.click()}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept=".docx"
        onChange={handleInputChange}
        className="hidden"
        disabled={isUploading}
      />
      
      <div className="flex flex-col items-center justify-center space-y-4">
        {isUploading ? (
          <>
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-300">
              Processing document...
            </p>
          </>
        ) : (
          <>
            <div className={`
              p-4 rounded-full
              ${isDragging ? 'bg-blue-600' : 'bg-slate-100 dark:bg-slate-700'}
            `}>
              {isDragging ? (
                <Upload className="w-12 h-12 text-white" />
              ) : (
                <FileText className="w-12 h-12 text-slate-600 dark:text-slate-400" />
              )}
            </div>
            <div className="text-center">
              <p className="text-xl font-semibold text-slate-900 dark:text-white">
                {isDragging ? 'Drop your document here' : 'Upload Legal Document'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-2">
                Drag and drop a .docx file, or click to browse
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

