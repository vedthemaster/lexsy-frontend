import axios from 'axios';
import type {
  UploadResponse,
  StartSessionResponse,
  ContinueSessionResponse,
  StartSessionRequest,
  ContinueSessionRequest,
  GenerateDocumentRequest,
} from '../types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = {
  upload: async (file: File, version: 'v1' | 'v2' = 'v1'): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await api.post(`/${version}/documents/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  generate: async (request: GenerateDocumentRequest, version: 'v1' | 'v2' = 'v1'): Promise<Blob> => {
    const response = await api.post(`/${version}/documents/generate`, request, {
      responseType: 'blob',
    });

    return response.data;
  },

  getPreview: async (request: GenerateDocumentRequest, version: 'v1' | 'v2' = 'v1'): Promise<Blob> => {
    const response = await api.post(`/${version}/documents/generate`, request, {
      responseType: 'blob',
    });

    return response.data;
  },
};

export const placeholderApi = {
  startSession: async (request: StartSessionRequest, version: 'v1' | 'v2' = 'v1'): Promise<StartSessionResponse> => {
    const response = await api.post(`/${version}/placeholders/start`, request);
    return response.data;
  },

  continueSession: async (request: ContinueSessionRequest, version: 'v1' | 'v2' = 'v1'): Promise<ContinueSessionResponse> => {
    const payload = version === 'v2'
      ? { session_id: request.session_id || request.thread_id, message: request.message }
      : { document_id: request.document_id, thread_id: request.thread_id, message: request.message };

    const response = await api.post(`/${version}/placeholders/continue`, payload);
    return response.data;
  },

  getStatus: async (sessionId: string, version: 'v1' | 'v2' = 'v2'): Promise<any> => {
    const response = await api.post(`/${version}/placeholders/status`, { session_id: sessionId });
    return response.data;
  },
};

export default api;

