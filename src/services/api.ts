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
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const documentApi = {
  upload: async (file: File): Promise<UploadResponse> => {
    const formData = new FormData();
    formData.append('file', file);
    
    const response = await api.post('/documents/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  },

  generate: async (request: GenerateDocumentRequest): Promise<Blob> => {
    const response = await api.post('/documents/generate', request, {
      responseType: 'blob',
    });
    
    return response.data;
  },

  getPreview: async (request: GenerateDocumentRequest): Promise<Blob> => {
    const response = await api.post('/documents/generate', request, {
      responseType: 'blob',
    });
    
    return response.data;
  },
};

export const placeholderApi = {
  startSession: async (request: StartSessionRequest): Promise<StartSessionResponse> => {
    const response = await api.post('/placeholders/start', request);
    return response.data;
  },

  continueSession: async (request: ContinueSessionRequest): Promise<ContinueSessionResponse> => {
    const response = await api.post('/placeholders/continue', request);
    return response.data;
  },
};

export default api;

