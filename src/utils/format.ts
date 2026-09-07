// shared formatters

// renders R symbol
const LOCALE = "en-ZA";

// shown wherever the API returns no value
const EMPTY = "—";

// price, eg. "R1 273 085,00"
export function formatCurrency(value: number | null, currency = "ZAR"): string {
  if (value === null) return EMPTY;

  return new Intl.NumberFormat(LOCALE, {
    style: "currency",
    currency,
    // cheap coins need more decimals or they round away to R0,00
    maximumFractionDigits: Math.abs(value) < 1 ? 6 : 2,
  }).format(value);
}

// whole number, eg. supply figures
export function formatNumber(value: number | null): string {
  if (value === null) return EMPTY;

  return new Intl.NumberFormat(LOCALE, { maximumFractionDigits: 0 }).format(value);
}

// percentage, eg. "2.41%"
export function formatPercent(value: number | null): string {
  if (value === null) return EMPTY;

  return `${value.toFixed(2)}%`;
}
