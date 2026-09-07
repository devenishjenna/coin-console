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

  // stats for each coin
  const stats = [
    ["Market Cap", `R${coin.market_cap.toLocaleString()}`],
    ["Fully Diluted Valuation", `R${coin.fully_diluted_valuation.toLocaleString()}`],
    ["Total Volume", `R${coin.total_volume.toLocaleString()}`],
    ["Price Change 24h", `R${coin.price_change_24h.toLocaleString()} (${coin.price_change_percentage_24h.toFixed(2)}%)`],
    ["Market Cap Change 24h", `R${coin.market_cap_change_24h.toLocaleString()} (${coin.market_cap_change_percentage_24h.toFixed(2)}%)`],
    ["Circulating Supply", coin.circulating_supply.toLocaleString(undefined, { maximumFractionDigits: 0 })],
    ["Total Supply", coin.total_supply?.toLocaleString(undefined, { maximumFractionDigits: 0 }) ?? "N/A"],
  ];

  return (
    <div className="min-h-screen px-6 py-12">
      <div className="max-w-6xl mx-auto">
        <Link to="/" className="text-sm border rounded-xl p-2">
          Back to Dashboard
        </Link>
        <div className="flex items-center gap-4 mb-8 mt-8">
          <span className="text-3xl text-gray-500">#{coin.market_cap_rank}</span>
          <img src={coin.image} width={48} height={48} />
          <h1 className="text-3xl font-semibold">
            {coin.name}
            <span className="uppercase text-gray-500 ml-2">({coin.symbol})</span>
          </h1>
        </div>
        
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="border rounded-lg p-4">
            <p className="text-sm uppercase text-gray-500 mb-2">Current Price</p>
            <p className="text-2xl font-semibold">R{coin.current_price.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm uppercase text-gray-500 mb-2">Low 24h</p>
            <p className="text-2xl font-semibold">R{coin.low_24h.toLocaleString()}</p>
          </div>
          <div className="border rounded-lg p-4">
            <p className="text-sm uppercase text-gray-500 mb-2">High 24h</p>
            <p className="text-2xl font-semibold">R{coin.high_24h.toLocaleString()}</p>
          </div>
        <span className="text-sm ">Last Updated {new Date(coin.last_updated).toLocaleString()}</span>
        </div>

        <div>
          {stats.map(([label, value]) => (
            <div key={label} className="grid grid-cols-2 gap-3 p-4 text-sm uppercase border-b">
              <span>{label}</span>
              <span className="font-semibold">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}