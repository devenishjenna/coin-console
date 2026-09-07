import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopCoins } from "../api/coingecko";
import { formatCurrency } from "../utils/format";
import Loading from "../components/Loading";
import ErrorMessage from "../components/ErrorMessage";
import PageContainer from "../components/PageContainer";
import type { Coin } from "../types/coin";

// shared by the header row and every coin row so the columns stay aligned
// narrow screens show rank, coin and price only - the rest appear from lg up,
// which is the width where all six columns fit without the names running into the prices
const COLUMNS =
  "grid grid-cols-[auto_1fr_auto] lg:grid-cols-[1fr_3fr_1fr_1fr_1fr_2fr] gap-3 p-4";

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
  if (loading) return <Loading />;
  // getTopCoins has failed
  if (error) return <ErrorMessage message={error} />;

  return (
    <PageContainer>
      <h1 className="text-2xl sm:text-3xl font-semibold mb-8">Top Coins by Market Cap</h1>
      <div className={`${COLUMNS} text-sm uppercase border-b`}>
        <span>Rank</span>
        <span>Coin</span>
        <span>Price</span>
        <span className="hidden lg:block">Low 24h</span>
        <span className="hidden lg:block">High 24h</span>
        <span className="hidden lg:block">Last Updated</span>
      </div>
      {coins.map((coin) => (
        <Link
          to={`/${coin.id}`}
          key={coin.id}
          className={`${COLUMNS} items-center border-b hover:bg-blue-300/20`}
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
          <span className="hidden lg:block font-semibold">{formatCurrency(coin.low_24h)}</span>
          <span className="hidden lg:block font-semibold">{formatCurrency(coin.high_24h)}</span>
          <span className="hidden lg:block text-xs">{new Date(coin.last_updated).toLocaleString()}</span>
        </Link>
      ))}
    </PageContainer>
  );
}