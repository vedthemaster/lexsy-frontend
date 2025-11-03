import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import UploadPage from './pages/UploadPage';
import ConversationPage from './pages/ConversationPage';

function App() {
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

