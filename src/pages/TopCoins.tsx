import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopCoins } from "../api/coingecko";
import { formatCurrency } from "../utils/format";
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
  if (loading) return <p className="text-white p-12">Loading...</p>;
  // getTopCoins has failed
  if (error) return <p className="text-white p-12">Error: {error}</p>;

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-semibold mb-8">Top Coins by Market Cap</h1>
          <div className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_2fr] gap-3 p-4 text-sm uppercase border-b">
            <span>Rank</span>
            <span>Coin</span>
            <span>Price</span>
            <span>Low 24h</span>
            <span>High 24h</span>
            <span>Last Updated</span>
          </div>
          {coins.map((coin) => (
            <Link
              to={`/${coin.id}`}
              key={coin.id}
              className="grid grid-cols-[1fr_3fr_1fr_1fr_1fr_2fr] items-center gap-3 p-4 border-b hover:bg-blue-300/20"
            >
              <span>{coin.market_cap_rank}</span>
              <span className="flex items-center gap-4">
                <img src={coin.image} width={36} height={36}/>
                <span>
                  {coin.name}
                  <span className="uppercase ml-2 text-gray-500">({coin.symbol})</span>
                </span>
              </span>
              <span className="font-semibold">{formatCurrency(coin.current_price)}</span>
              <span className="font-semibold">{formatCurrency(coin.low_24h)}</span>
              <span className="font-semibold">{formatCurrency(coin.high_24h)}</span>
              <span className="text-xs">{new Date(coin.last_updated).toLocaleString()}</span>
            </Link>
          ))}
      </div>
    </div>
  );
}