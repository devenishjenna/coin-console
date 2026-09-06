import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCoinById } from "../api/coingecko";
import type { Coin } from "../types/coin";

export default function CoinDetails() {
  // pulling id from "/:id" route
  const { id } = useParams<{ id: string }>();

  const [coin, setCoin] = useState<Coin | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // runs every time id changes
  useEffect(() => {
    if (!id) return; // dead code, needed to satisfy TS requirements
    getCoinById(id)
      .then(setCoin)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  // while getCoinById runs, we display loading
  if (loading) return <p>Loading...</p>;
  // getCoinById has failed
  if (error) return <p>Error: {error}</p>;
  if (!coin) return null; // dead code, needed to satisfy TS requirements

  return (
    <div>
      <Link to="/">Back to Dashboard</Link>
      <h1>
        <img src={coin.image} alt={coin.name} width={32} height={32} />
        {coin.name} ({coin.symbol.toUpperCase()})
      </h1>
      <ul>
        <li>Market Rank: #{coin.market_cap_rank}</li>
        <li>Current Price: R{coin.current_price.toLocaleString()}</li>
        <li>Market Cap: R{coin.market_cap.toLocaleString()}</li>
        <li>24h High: R{coin.high_24h.toLocaleString()}</li>
        <li>24h Low: R{coin.low_24h.toLocaleString()}</li>
        <li>Last Updated: {new Date(coin.last_updated).toLocaleString()}</li>
      </ul>
    </div>
  );
}