import { useEffect, useState } from 'react';
import { Loader, FileText } from 'lucide-react';
import mammoth from 'mammoth';

interface DocumentPreviewProps {
  documentBlob: Blob;
}

export default function DocumentPreview({ documentBlob }: DocumentPreviewProps) {
  const [htmlContent, setHtmlContent] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const convertDocument = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const arrayBuffer = await documentBlob.arrayBuffer();
        const result = await mammoth.convertToHtml({ arrayBuffer });
        setHtmlContent(result.value);
        
        if (result.messages.length > 0) {
          console.warn('Mammoth conversion warnings:', result.messages);
        }
      } catch (err) {
        console.error('Error converting document:', err);
        setError(err instanceof Error ? err.message : 'Failed to preview document');
      } finally {
        setIsLoading(false);
      }
    };

    convertDocument();
  }, [documentBlob]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700">
        <div className="text-center">
          <Loader className="w-8 h-8 mx-auto mb-2 animate-spin text-blue-600" />
          <p className="text-sm text-slate-600 dark:text-slate-400">Loading preview...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
        <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm">
      <div className="px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex items-center space-x-2">
        <FileText className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
          Document Preview
        </h3>
      </div>
      <div 
        className="p-8 max-h-[600px] overflow-y-auto bg-gray-50 dark:bg-slate-900"
        style={{
          fontFamily: 'Calibri, "Times New Roman", Arial, sans-serif',
        }}
      >
        <div 
          className="max-w-none document-content mx-auto bg-white dark:bg-white shadow-sm"
          style={{
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: '72px',
            minHeight: '11in',
            width: '8.5in',
            fontSize: '11pt',
            lineHeight: '1.15',
            fontFamily: 'Calibri, "Times New Roman", Arial, sans-serif',
          }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      </div>
    </div>
  );
}
