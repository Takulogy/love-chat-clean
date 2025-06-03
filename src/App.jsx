import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoveCheckForm from './LoveCheckForm';
import ResultPage from './ResultPage';
import PremiumPage from './PremiumPage';
import ChatUI from './ChatUI';

function App() {
  return (
    <div className="max-w-7xl mx-auto p-8 text-center">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoveCheckForm />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/premium" element={<PremiumPage />} />
          <Route path="/chat" element={<ChatUI />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
