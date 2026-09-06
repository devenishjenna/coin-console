import type { Coin } from "../types/coin";

const BASE_URL = "https://api.coingecko.com/api/v3";

// get top 10 coins by markert cap - returns in desc order
export async function getTopCoins(): Promise<Coin[]> {
  const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10`);
  
  // catching all 4xx and 5xx statuses
  if (!response.ok) {
    throw new Error(`Failed to fetch top coins with status ${response.status}`);
  };

  // returning successful call, parsed to json
  return response.json();
}

// get coin by id
export async function getCoinById(id: string): Promise<Coin> {

  const response = await fetch(`${BASE_URL}/coins/markets?vs_currency=zar&ids=${id}`);
  
  // catching all 4xx and 5xx statuses
  if (!response.ok) {
    throw new Error(`Failed to fetch coin ${id} with status ${response.status}`);
  };

  // api returns array
  const data: Coin[] = await response.json();

  // throw if response is successful but empty
  if (data.length === 0) {
    throw new Error(`Coin ${id} not found`);
  }

  // pulling out first and only element
  return data[0];
}