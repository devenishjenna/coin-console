# Coin Console

A cryptocurrency dashboard showing live prices from the [CoinGecko API](https://www.coingecko.com/en/api),
with all values displayed in South African Rand.

Built with React, TypeScript, Vite and Tailwind CSS.

**Live demo:** https://coin-console-tan.vercel.app/

## Features

- **Dashboard** — the top 10 cryptocurrencies by market cap, highest to lowest,
  showing rank, price, 24 hour low and high, and when the data was last updated.
- **Coin details** — click any coin for market cap, fully diluted valuation,
  trading volume, 24 hour price and market cap movement, and supply figures.
- All prices in ZAR, formatted for the `en-ZA` locale.

## Getting started

Requires Node 20 or later (developed on v24.17.0).

```bash
git clone https://github.com/devenishjenna/coin-console.git
cd coin-console
npm install
```

Development:

```bash
npm run dev
```

Production build:

```bash
npm run build
npm run preview
```

No API key or environment variables are needed — the app uses CoinGecko's free
public API. Please note, the free tier is rate limited, so navigating very
rapidly between coins will show a rate-limit message with a **Try again**
button. The limit clears within about a minute.

## Project structure

```
src/
├── api/          CoinGecko requests
├── components/   Shared UI (PageContainer, Loading, ErrorMessage, StatCard)
├── pages/        TopCoins (dashboard) and CoinDetails
├── types/        Coin interface matching the API response
└── utils/        Currency, number and percentage formatting
```

Routing is handled by React Router: `/` renders the dashboard, `/:id` renders
the details page for a coin.

## Notes on the implementation

**Nullable API fields.** CoinGecko returns `null` for several numeric fields on
recently listed coins — `price_change_24h` and `market_cap_change_24h` among
them. The `Coin` interface models these as `number | null` so TypeScript catches
unguarded access at compile time rather than at runtime.

**Formatting.** formatCurrency uses Intl.NumberFormat with the en-ZA locale, which is what renders the R symbol correctly, and takes an optional currency code. Supporting other comparison currencies would also mean parameterising vs_currency in api/coingecko.ts, which is currently fixed to zar.

**Components.** Markup repeated across the two pages is extracted into
`components/` — the page wrapper, loading and error states, and the stat cards
on the details page.
