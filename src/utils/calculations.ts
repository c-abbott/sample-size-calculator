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

export function calculateSampleSize(delta: number, avg: number, sd: number, alpha: number, beta: number, mdeType: string): number {
  const Za = calculateZScore(1 - alpha / 2);
  const Zb = calculateZScore(1 - beta);
  let absDel;

  if (mdeType === 'uplift') {
    absDel = delta * avg;
  } else {
    absDel = delta;
  }

  return 2 * Math.pow(Za + Zb, 2) * Math.pow(sd, 2) / Math.pow(absDel, 2);
}

