import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TermsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
