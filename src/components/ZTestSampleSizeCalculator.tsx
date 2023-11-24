import React, { useState, useEffect } from "react";

import { calculateSampleSize } from "../utils/calculations";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";

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
    const numBeta = 1 - parseFloat(power) / 100 || NaN; // Convert beta to decimal
    console.log(numDelta, numAvg, numSd, numAlpha, numBeta);
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
      <ParameterInputCard
        label="Delta (Minimum Detectable Effect as %):"
        value={delta}
        onChange={(e) => setDelta(e.target.value)}
      />
      <ParameterInputCard
        label="Average Value (avg):"
        value={avg}
        onChange={(e) => setAvg(e.target.value)}
      />
      <ParameterInputCard
        label="Standard Deviation (sd):"
        value={sd}
        onChange={(e) => setSd(e.target.value)}
      />
      <PercentageSlider
        label="Significance Level (alpha as %):"
        value={alpha}
        onChange={(e) => setAlpha(e.target.value)}
      />
      <PercentageSlider
        label="Power (1 - beta as %):"
        value={power}
        onChange={(e) => setPower(e.target.value)}
      />

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
