import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoveCheckForm from './LoveCheckForm';   // ✅ 無料診断
import ResultPage from './ResultPage';         // ✅ 診断結果
import PremiumPage from './PremiumPage';       // ✅ 決済完了ページ
import ChatUI from './ChatUI';                 // ✅ 有料Botページ

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoveCheckForm />} />       {/* ✅ トップページは無料診断 */}
        <Route path="/result" element={<ResultPage />} />
        <Route path="/premium" element={<PremiumPage />} />
        <Route path="/chat" element={<ChatUI />} />          {/* ✅ 有料Botは /chat */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;