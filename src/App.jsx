import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatUI from './ChatUI';
import PremiumPage from './PremiumPage';
import LoveCheckForm from './LoveCheckForm'; // ✅ 新しく追加

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatUI />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/diagnose" element={<LoveCheckForm />} /> {/* ✅ 新しい診断ルート */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
