export const DEFAULT_CURRENCY = 'TZS';

export function normalizeCurrency(currency) {
  return (currency || DEFAULT_CURRENCY).toUpperCase();
}

export function formatCurrency(amount, currency) {
  const code = normalizeCurrency(currency);
  return `${code} ${Number(amount || 0).toLocaleString()}`;
}
