import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import { documentApi } from '../services/api';
import { AlertCircle, Zap, Brain } from 'lucide-react';

type ApiVersion = 'v1' | 'v2';

export default function UploadPage() {
  const navigate = useNavigate();
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedVersion, setSelectedVersion] = useState<ApiVersion>('v1');

  const handleFileSelect = async (file: File) => {
    setIsUploading(true);
    setError(null);

    try {
      const response = await documentApi.upload(file, selectedVersion);
      // Store the selected version in sessionStorage for use in conversation page
      sessionStorage.setItem('apiVersion', selectedVersion);
      navigate(`/conversation/${response.document_id}`);
    } catch (err: any) {
      console.error('Upload error:', err);

      // Extract error message from axios response
      let errorMessage = 'Failed to upload document. Please try again.';

      if (err.response?.data?.detail) {
        errorMessage = err.response.data.detail;
      } else if (err.message) {
        errorMessage = err.message;
      }

      setError(errorMessage);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-8">
        <div className="mb-8 text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Welcome to Lexsy
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Choose your AI approach and upload your legal document template
          </p>
        </div>

        {/* API Version Selection */}
        <div className="mb-8">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 text-center">
            Select AI Processing Method
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* V1 Option */}
            <button
              onClick={() => setSelectedVersion('v1')}
              className={`p-6 rounded-lg border-2 transition-all text-left ${selectedVersion === 'v1'
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-700'
                }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${selectedVersion === 'v1'
                  ? 'bg-blue-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                  <Zap className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      V1 - OpenAI Function Calling
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded ${selectedVersion === 'v1'
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                      Easy Setup
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2 italic">
                "Don't reinvent the wheel"
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Uses OpenAI's function calling capabilities for direct placeholder extraction and conversational filling.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Easy to set up and configure</li>
                <li>• Direct OpenAI Assistant integration</li>
                <li>• Relies on OpenAI's proven features</li>
                <li>• Takes more time to process responses</li>
              </ul>
            </button>

            {/* V2 Option */}
            <button
              onClick={() => setSelectedVersion('v2')}
              className={`p-6 rounded-lg border-2 transition-all text-left ${selectedVersion === 'v2'
                ? 'border-purple-500 bg-purple-50 dark:bg-purple-900/20'
                : 'border-slate-200 dark:border-slate-700 hover:border-purple-300 dark:hover:border-purple-700'
                }`}
            >
              <div className="flex items-start space-x-3 mb-3">
                <div className={`p-2 rounded-lg ${selectedVersion === 'v2'
                  ? 'bg-purple-500 text-white'
                  : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                  <Brain className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      V2 - LangChain Tools
                    </h4>
                    <span className={`px-2 py-1 text-xs rounded ${selectedVersion === 'v2'
                      ? 'bg-purple-500 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                      }`}>
                      Agent-Based
                    </span>
                  </div>
                </div>
              </div>
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2 italic">
                "Build with the best tools"
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                Leverages LangChain's tool ecosystem for enhanced document understanding and intelligent placeholder management.
              </p>
              <ul className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Advanced LangChain tool integration</li>
                <li>• Enhanced context understanding</li>
                <li>• Flexible agent-based approach</li>
                <li>• Extensible tool ecosystem</li>
              </ul>
            </button>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
            <div className="flex items-start space-x-3">
              <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-red-800 dark:text-red-200 font-medium mb-1">
                  {error.includes('no placeholders')
                    ? 'No Placeholders Found'
                    : error.includes('Multiple tool calls') || error.includes('try uploading')
                      ? 'Upload Error'
                      : 'Error'}
                </p>
                <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
                {error.includes('try uploading') && (
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    Please check your document and try uploading again.
                  </p>
                )}
              </div>
            </div>
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

