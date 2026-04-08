export function formatDate(isoDate: string): string {
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) {
    return isoDate;
  }

  return new Intl.DateTimeFormat(undefined, {
    year: 'numeric',
    month: 'short',
    day: '2-digit',
  }).format(date);
}

export function formatMoney(amount: number): string {
  return new Intl.NumberFormat(undefined, {
    style: 'currency',
    currency: 'USD',
    signDisplay: 'auto',
  }).format(amount);
}

export function moneySignColor(amount: number): string {
  if (amount < 0) {
    return '#B00020';
  }
  return '#1B5E20';
}
