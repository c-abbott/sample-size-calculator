export function formatNumber(num: number): string {
  const roundedNum = Math.round(num); // Round to the nearest integer
  return new Intl.NumberFormat('en-US').format(roundedNum);
};
