export default function calcPercentage(numerator: number, denominator: number) {
  if (!denominator) return 0;

  return Math.floor((numerator / denominator) * 100);
}
