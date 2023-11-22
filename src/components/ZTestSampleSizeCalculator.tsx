import React, { useState, useEffect } from "react";
import { calculateSampleSize } from "../utils/calculations";

const ZTestSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>("0.2");
  const [avg, setAvg] = useState<string>("50");
  const [sd, setSd] = useState<string>("15");
  const [alpha, setAlpha] = useState<string>("0.05");
  const [beta, setBeta] = useState<string>("0.2");
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  useEffect(() => {
    const numDelta = parseFloat(delta) || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) || NaN;
    const numBeta = parseFloat(beta) || NaN;

    // Check if all values are numbers before calling calculateSampleSize
    if (
      !isNaN(numDelta) &&
      !isNaN(numAvg) &&
      !isNaN(numSd) &&
      !isNaN(numAlpha) &&
      !isNaN(numBeta)
    ) {
      const size = calculateSampleSize(
        numDelta,
        numAvg,
        numSd,
        numAlpha,
        numBeta
      );
      setSampleSize(size);
    } else {
      setSampleSize(null); // Reset sample size if any value is not a number
    }
  }, [delta, avg, sd, alpha, beta]); // Recalculate whenever these values change

  return (
    <div className="space-y-4">
      <div>
        <label className="block">
          Delta (Minimum Detectable Effect):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={delta}
            onChange={(e) => setDelta(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="block">
          Average Value (avg):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={avg}
            onChange={(e) => setAvg(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="block">
          Standard Deviation (sd):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={sd}
            onChange={(e) => setSd(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="block">
          Significance Level (alpha):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
          />
        </label>
      </div>

      <div>
        <label className="block">
          Power (1 - beta):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={beta}
            onChange={(e) => setBeta(e.target.value)}
          />
        </label>
      </div>

      {sampleSize !== null && (
        <div className="mt-3">
          <strong>Calculated Sample Size:</strong> {sampleSize.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ZTestSampleSizeCalculator;
