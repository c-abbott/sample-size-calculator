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
  const [mdeType, setMdeType] = useState<string>("uplift");
  const mdeTypeOptions = {
    uplift: "Uplift",
    exactValue: "Exact Value Increase"
  };

  useEffect(() => {
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN; // Convert alpha to decimal
    const numBeta = 1 - parseFloat(power) / 100 || NaN; // Convert beta to decimal
    let numDelta;

    switch (mdeType) {
      case 'uplift':
        // Delta as a percentage of the mean
        numDelta = (parseFloat(delta) / 100) || NaN;
        break;
      case 'exactValue':
        // Delta as an exact value increase
        numDelta = (parseFloat(delta) / numAvg) * 100 || NaN;
        break;
      default:
        numDelta = NaN; // Fallback case
    }

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
  }, [delta, avg, sd, alpha, power, mdeType]); // Include mdeType in dependency array

  return (
    <div className="space-y-4">
      <ParameterInputCard
        label="Delta (Minimum Detectable Effect):"
        value={delta}
        onChange={(e) => setDelta(e.target.value)}
        isMDE
        mdeType={mdeType}
        setMdeType={setMdeType}
        mdeTypeOptions={mdeTypeOptions}
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
