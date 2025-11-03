import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { documentApi } from '../services/api';
import { AlertCircle } from 'lucide-react';

export default function UploadPage() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await documentApi.upload(file);
      navigate(`/conversation/${response.document_id}`);
    } catch (err) {
      console.error('Upload error:', err);
      setError(err instanceof Error ? err.message : 'Failed to upload document. Please try again.');
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to Lexy
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Upload your legal document template to get started
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5" />
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        <FileUpload onFileSelect={handleFileSelect} isUploading={isUploading} />

        <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-3">
            How it works
          </h3>
          <ol className="space-y-2 text-sm text-slate-700 dark:text-slate-300">
            <li className="flex items-start">
              <span className="font-bold mr-2">1.</span>
              <span>Upload your .docx document with placeholder text</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">2.</span>
              <span>AI identifies dynamic placeholders in your document</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">3.</span>
              <span>Have a conversational session to fill in each placeholder</span>
            </li>
            <li className="flex items-start">
              <span className="font-bold mr-2">4.</span>
              <span>Download your completed document</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}

