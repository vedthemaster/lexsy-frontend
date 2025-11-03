import { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { MessageCircle, Send, Download, Loader, CheckCircle, ArrowLeft } from 'lucide-react';
import { placeholderApi, documentApi } from '../services/api';
import type { ConversationMessage } from '../types';

export default function ConversationPage() {
  const { documentId } = useParams<{ documentId: string }>();
  const navigate = useNavigate();
  
  const [conversation, setConversation] = useState<ConversationMessage[]>([]);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStarting, setIsStarting] = useState(true);
  const [threadId, setThreadId] = useState<string | null>(null);
  const [allFilled, setAllFilled] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (documentId) {
      startSession();
    }
  }, [documentId]);

  const startSession = async () => {
    if (!documentId) return;
    
    setIsStarting(true);
    setError(null);
    
    try {
      const response = await placeholderApi.startSession({ document_id: documentId });
      setThreadId(response.thread_id);
      setConversation(response.conversation);
      setAllFilled(response.all_filled);
    } catch (err) {
      console.error('Start session error:', err);
      setError(err instanceof Error ? err.message : 'Failed to start session. Please try again.');
    } finally {
      setIsStarting(false);
    }
  };

  const sendMessage = async () => {
    if (!message.trim() || !documentId || !threadId || isLoading) return;

    const userMessage: ConversationMessage = {
      role: 'user',
      content: message.trim(),
    };

    setConversation(prev => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setError(null);

    try {
      const response = await placeholderApi.continueSession({
        document_id: documentId,
        thread_id: threadId,
        message: userMessage.content,
      });

      setConversation(response.conversation);
      setAllFilled(response.all_filled);
    } catch (err) {
      console.error('Send message error:', err);
      setError(err instanceof Error ? err.message : 'Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGenerate = async () => {
    if (!documentId || isGenerating) return;

    setIsGenerating(true);
    setError(null);

    try {
      const blob = await documentApi.generate({ document_id: documentId });
      
      // Create download link
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `filled-document-${Date.now()}.docx`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Generate error:', err);
      setError(err instanceof Error ? err.message : 'Failed to generate document. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (isStarting) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <Loader className="w-16 h-16 mx-auto mb-4 animate-spin text-blue-600" />
          <p className="text-lg text-slate-600 dark:text-slate-400">
            Initializing conversation...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button
              onClick={() => navigate('/upload')}
              className="p-2 hover:bg-blue-700 rounded-lg transition-colors"
              title="Back to upload"
            >
              <ArrowLeft className="w-5 h-5 text-white" />
            </button>
            <MessageCircle className="w-6 h-6 text-white" />
            <h2 className="text-xl font-semibold text-white">
              Document Filling Session
            </h2>
          </div>
          {allFilled && (
            <div className="flex items-center space-x-2 bg-blue-800 px-3 py-1 rounded-lg">
              <CheckCircle className="w-4 h-4 text-white" />
              <span className="text-sm font-medium text-white">All placeholders filled</span>
            </div>
          )}
        </div>

        {/* Error banner */}
        {error && (
          <div className="px-6 py-3 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800">
            <p className="text-sm text-red-800 dark:text-red-200">{error}</p>
          </div>
        )}

        {/* Messages */}
        <div className="h-[500px] overflow-y-auto p-6 space-y-4">
          {conversation.length === 0 ? (
            <div className="text-center text-slate-500 dark:text-slate-400 py-8">
              <MessageCircle className="w-12 h-12 mx-auto mb-3 opacity-50" />
              <p>Start the conversation...</p>
            </div>
          ) : (
            conversation.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-3 ${
                    msg.role === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-900 dark:text-white'
                  }`}
                >
                  <p className="whitespace-pre-wrap text-sm">{msg.content}</p>
                </div>
              </div>
            ))
          )}
          {isLoading && (
            <div className="flex justify-start">
              <div className="bg-slate-100 dark:bg-slate-700 rounded-lg px-4 py-3">
                <Loader className="w-4 h-4 animate-spin text-slate-600 dark:text-slate-400" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="border-t border-slate-200 dark:border-slate-700 p-4 bg-slate-50 dark:bg-slate-900">
          <div className="flex space-x-3">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your response..."
              className="flex-1 resize-none rounded-lg border border-slate-300 dark:border-slate-600 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              rows={1}
              disabled={isLoading || allFilled}
            />
            <button
              onClick={sendMessage}
              disabled={isLoading || !message.trim() || allFilled}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Send className="w-4 h-4" />
              <span>Send</span>
            </button>
          </div>

          {allFilled && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleGenerate}
                disabled={isGenerating}
                className="px-8 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2 shadow-lg"
              >
                {isGenerating ? (
                  <>
                    <Loader className="w-5 h-5 animate-spin" />
                    <span>Generating document...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-5 h-5" />
                    <span>Download Completed Document</span>
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

