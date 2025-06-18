import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';
import AdminPage from './pages/AdminPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/admin" element={<AdminPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="*" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;
