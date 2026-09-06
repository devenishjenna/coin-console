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
}