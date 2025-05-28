import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ChatUI from './ChatUI';
import PremiumPage from './PremiumPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ChatUI />} />
        <Route path="/premium" element={<PremiumPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
