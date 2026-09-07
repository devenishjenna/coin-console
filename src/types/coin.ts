export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  high_24h: number;
  low_24h: number;
  total_supply: number | null;
  last_updated: string;
  fully_diluted_valuation: number;
  total_volume: number;
  price_change_percentage_24h: number;
  market_cap_change_percentage_24h: number;
  market_cap_change_24h: number;
  price_change_24h: number;
  circulating_supply: number;
}