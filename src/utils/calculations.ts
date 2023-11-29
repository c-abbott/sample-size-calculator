import { cdf } from '@stdlib/stats/base/dists/normal';

function calculateZScore(p: number): number {
  let minZ = -6.0;
  let maxZ = 6.0;
  let z = 0.0;
  while (maxZ - minZ > 0.0001) {
    z = (maxZ + minZ) / 2.0;
    if (cdf(z, 0, 1) > p) {
      maxZ = z;
    } else {
      minZ = z;
    }
  }
  return z;
}

export const calculateBinarySampleSize = (
  mde: number, 
  baselineConversion: number, 
  alpha: number, 
  power: number
): number => {
  const decimalMde = mde / 100; // Convert MDE from percentage to decimal
  const decimalBaselineConversion = baselineConversion / 100; // Convert baseline conversion from percentage to decimal
  const deltaSquared = decimalBaselineConversion * (1 - decimalBaselineConversion);

  // Z-scores for Alpha and Power
  const Za = calculateZScore(1 - alpha / 2); // For two-tailed test
  const Zb = calculateZScore(power);

  // Adjust sample size calculation
  return 2 * Math.pow(Za + Zb, 2) * deltaSquared / Math.pow(decimalMde, 2);
};

export function calculateSampleSize(delta: number, avg: number, sd: number, alpha: number, beta: number): number {
  const Za = calculateZScore(1 - alpha / 2);
  const Zb = calculateZScore(1 - beta);
  const absDel = delta * avg;
 
  return 2 * Math.pow(Za + Zb, 2) * Math.pow(sd, 2) / Math.pow(absDel, 2);
}

