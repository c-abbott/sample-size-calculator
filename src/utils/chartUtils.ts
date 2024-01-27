import * as d3 from "d3";

export const margin = { top: 16, right: 48, bottom: 24, left: 48 };
export const height = 500 - margin.top - margin.bottom;

export interface DataPoint {
  x: number;
  y: number;
}

export interface ChartData {
  data: DataPoint[];
  altData: DataPoint[];
}

export const generateData = (
  mean: number,
  standardDeviation: number,
  xRange: number
): DataPoint[] => {
  return d3
    .range(mean - xRange, mean + xRange, standardDeviation / 100)
    .map((xVal) => ({
      x: xVal,
      y:
        (1 / (standardDeviation * Math.sqrt(2 * Math.PI))) *
        Math.exp(-0.5 * ((xVal - mean) / standardDeviation) ** 2),
    }));
};

export const normalizeData = (
  data: DataPoint[],
  height: number
): DataPoint[] => {
  const maxY = d3.max(data, (d) => d.y) || 1;
  return data.map((d) => ({
    x: d.x,
    y: (d.y / maxY) * height * 0.95,
  }));
};

export const calculateCriticalZAlpha = (
  alpha: number,
  mean: number,
  sd: number
): number[] | undefined => {
  try {
    const zAlpha = d3.quantile(d3.range(-3, 3, 0.001), 1 - alpha);
    if (typeof zAlpha !== "number") {
      throw new Error("Failed to calculate critical z-values");
    }
    return[
      mean + zAlpha * sd
    ]
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
export const calculateCriticalZBeta = (
  beta: number,
  mean: number,
  sd: number
): number[] | undefined => {
  try {
    // Calculate the z-score for beta. This is for a one-tailed test.
    // For a two-tailed test, you might use beta / 2.
    const zBeta = d3.quantile(d3.range(-3, 3, 0.001), 1 - beta);

    if (typeof zBeta !== "number") {
      throw new Error("Failed to calculate zBeta");
    }

    return [
      mean + zBeta * sd
    ];
  } catch (error) {
    console.error(error);
    return undefined;
  }
};
