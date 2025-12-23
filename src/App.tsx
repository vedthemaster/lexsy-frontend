import { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage';
import ConversationPage from './pages/ConversationPage';
import { wakeUpService } from './services/api';

function App() {
  // Wake up Railway backend service on app load
  useEffect(() => {
    wakeUpService();
  }, []);

  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Navigate to="/upload" replace />} />
          <Route path="/upload" element={<UploadPage />} />
          <Route path="/conversation/:documentId" element={<ConversationPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;

