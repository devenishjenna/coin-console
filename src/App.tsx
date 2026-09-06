import { Routes, Route } from "react-router-dom";
import TopCoins from "./pages/TopCoins";
import CoinDetails from "./pages/CoinDetails";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TopCoins />} />
      <Route path="/:id" element={<CoinDetails />} />
    </Routes>
  );
}

export default App;