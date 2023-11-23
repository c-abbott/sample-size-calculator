import React, { useState, useEffect } from "react";
import { calculateSampleSize } from "../utils/calculations";

const ZTestSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>("5"); // MDE as percentage
  const [avg, setAvg] = useState<string>("100");
  const [sd, setSd] = useState<string>("5");
  const [alpha, setAlpha] = useState<string>("5"); 
  const [power, setPower] = useState<string>("80"); 
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  useEffect(() => {
    const numDelta = parseFloat(delta) / 100 || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN; // Convert alpha to decimal
    const numBeta = 1 - (parseFloat(power) / 100) || NaN; // Convert beta to decimal
    console.log(numDelta, numAvg, numSd, numAlpha, numBeta)
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
      setSampleSize(null);
    }
  }, [delta, avg, sd, alpha, power]);

  return (
    <div className="space-y-4">
      <div>
        <label className="block">
          Delta (Minimum Detectable Effect as %):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
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
          Significance Level (alpha as %):
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
          Power (1 - beta as %):
          <input
            type="text"
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </label>
      </div>

      {/* Display Calculated Sample Size */}
      {sampleSize !== null && (
        <div className="mt-3">
          <strong>Calculated Sample Size:</strong> {sampleSize.toFixed(2)}
        </div>
      )}
    </div>
  );
};

export default ZTestSampleSizeCalculator;