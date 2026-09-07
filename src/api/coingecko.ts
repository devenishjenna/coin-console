import type { Coin } from "../types/coin";

const BASE_URL = "https://api.coingecko.com/api/v3";

// shared by both calls below
// a rate limited request comes back as a 429 with no CORS headers, so the
// browser blocks it and fetch rejects before we can read the status - that
// rejection is what the try/catch turns into a readable message
async function fetchJson(url: string) {
  let response: Response;

  try {
    response = await fetch(url);
  } catch {
    throw new Error(
      "Could not reach CoinGecko. The free API is rate limited, so this usually clears in a minute."
    );
  }

  // catching all 4xx and 5xx statuses that do reach us
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  // returning successful call, parsed to json
  return response.json();
}

// get top 10 coins by markert cap - returns in desc order
export async function getTopCoins(): Promise<Coin[]> {
  return fetchJson(`${BASE_URL}/coins/markets?vs_currency=zar&order=market_cap_desc&per_page=10`);
}

// get coin by id
export async function getCoinById(id: string): Promise<Coin> {
  // api returns array
  const data: Coin[] = await fetchJson(`${BASE_URL}/coins/markets?vs_currency=zar&ids=${id}`);

  // throw if response is successful but empty
  if (data.length === 0) {
    throw new Error(`Coin ${id} not found`);
  }

  // pulling out first and only element
  return data[0];
}
