import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getCoinById } from "../api/coingecko";
import { formatCurrency, formatNumber, formatPercent } from "../utils/format";
import StatCard from "../components/StatCard";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PageContainer from "../components/PageContainer";
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
  if (loading) return <Loading />;
  // getCoinById has failed
  if (error) return <ErrorMessage message={error} />;
  if (!coin) return null; // dead code, needed to satisfy TS requirements

  // stats for each coin
  const stats = [
    ["Market Cap", formatCurrency(coin.market_cap)],
    ["Fully Diluted Valuation", formatCurrency(coin.fully_diluted_valuation)],
    ["Total Volume", formatCurrency(coin.total_volume)],
    ["Price Change 24h", coin.price_change_24h === null
      ? "—"
      : `${formatCurrency(coin.price_change_24h)} (${formatPercent(coin.price_change_percentage_24h)})`],
    ["Market Cap Change 24h", coin.market_cap_change_24h === null
      ? "—"
      : `${formatCurrency(coin.market_cap_change_24h)} (${formatPercent(coin.market_cap_change_percentage_24h)})`],
    ["Circulating Supply", formatNumber(coin.circulating_supply)],
    ["Total Supply", formatNumber(coin.total_supply)],
  ];

  return (
    <PageContainer>
      <Link to="/" className="text-sm border rounded-xl p-2">
        Back to Dashboard
      </Link>

      <div className="flex flex-wrap items-center gap-4 mb-8 mt-8">
        <span className="text-2xl sm:text-3xl text-gray-500">#{coin.market_cap_rank}</span>
        <img src={coin.image} alt="" width={48} height={48} />
        <h1 className="text-3xl sm:text-3xl font-semibold">
          {coin.name}
          <span className="uppercase text-gray-500 ml-2">({coin.symbol})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Current Price" value={formatCurrency(coin.current_price)} />
        <StatCard label="Low 24h" value={formatCurrency(coin.low_24h)} />
        <StatCard label="High 24h" value={formatCurrency(coin.high_24h)} />
        <span className="text-sm">Last Updated {new Date(coin.last_updated).toLocaleString()}</span>
      </div>

      <div>
        {stats.map(([label, value]) => (
          <div key={label} className="grid grid-cols-2 gap-3 p-4 text-sm uppercase border-b">
            <span>{label}</span>
            <span className="font-semibold">{value}</span>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}