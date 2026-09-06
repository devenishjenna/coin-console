import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopCoins } from "../api/coingecko";
import type { Coin } from "../types/coin";

// displays list of top 10 coins
export default function TopCoins() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // run once after first render
  useEffect(() => {
    getTopCoins()
      .then(setCoins)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  // while getTopCoins runs, we display loading
  if (loading) return <p>Loading...</p>;
  // getTopCoins has failed
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Top 10 Cryptocurrencies</h1>
      <ul>
        {coins.map((coin) => (
          <li key={coin.id}>
            <Link to={`/${coin.id}`}>
              <img src={coin.image} alt={coin.name} width={24} height={24} />
              <span>{coin.market_cap_rank}. {coin.name} ({coin.symbol.toUpperCase()})</span>
              <span>R{coin.current_price.toLocaleString()}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}