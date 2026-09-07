export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number | null;
  market_cap: number | null;
  market_cap_rank: number | null;
  high_24h: number | null;
  low_24h: number | null;
  total_supply: number | null;
  circulating_supply: number | null;
  last_updated: string;
  fully_diluted_valuation: number | null;
  total_volume: number | null;
  price_change_percentage_24h: number | null;
  market_cap_change_percentage_24h: number | null;
  market_cap_change_24h: number | null;
  price_change_24h: number | null;
}