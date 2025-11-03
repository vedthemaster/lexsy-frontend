export interface Placeholder {
  name: string;
  value: string | number | null;
  placeholder: string;
  regex: string;
}

export interface Document {
  id: string;
  title: string;
  placeholders: Placeholder[];
  path: string;
}

export interface UploadResponse {
  message: string;
  document_id: string;
  title: string;
}

export interface StartSessionResponse {
  success: boolean;
  thread_id: string;
  conversation: ConversationMessage[];
  all_filled: boolean;
}

export interface ContinueSessionResponse {
  success: boolean;
  conversation: ConversationMessage[];
  all_filled: boolean;
  message: string;
}

export interface ConversationMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
}

export interface StartSessionRequest {
  document_id: string;
}

export interface ContinueSessionRequest {
  document_id: string;
  thread_id: string;
  message: string;
}

export interface GenerateDocumentRequest {
  document_id: string;
}

