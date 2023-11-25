import React, { useState, useEffect } from "react";

import { calculateSampleSize } from "../utils/calculations";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";

const ZTestSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>("5");
  const [avg, setAvg] = useState<string>("10000");
  const [sd, setSd] = useState<string>("902");
  const [alpha, setAlpha] = useState<string>("5");
  const [power, setPower] = useState<string>("80");
  const [sampleSize, setSampleSize] = useState<number | null>(null);
  const [mdeType, setMdeType] = useState<string>("uplift");
  const mdeTypeOptions = {
    uplift: "Uplift",
    exactValue: "Exact Value Increase",
  };

  useEffect(() => {
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN;
    const numBeta = 1 - parseFloat(power) / 100 || NaN;
    let numDelta;

    switch (mdeType) {
      case "uplift":
        // Delta as a percentage of the mean
        numDelta = parseFloat(delta) / 100 || NaN;
        break;
      case "exactValue":
        // Delta as an exact value increase
        numDelta = (parseFloat(delta) / numAvg) || NaN;
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
    <div className="space-y-6 px-24 py-16">
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <div className="flex justify-center space-x-4">
          {/* ParameterInputCard components in a row */}
          <ParameterInputCard
            label="MDE"
            value={delta}
            onChange={(e) => setDelta(e.target.value)}
            isMDE
            mdeType={mdeType}
            setMdeType={setMdeType}
            mdeTypeOptions={mdeTypeOptions}
          />
          <ParameterInputCard
            label="Mean"
            value={avg}
            onChange={(e) => setAvg(e.target.value)}
          />
          <ParameterInputCard
            label="Standard Deviation"
            value={sd}
            onChange={(e) => setSd(e.target.value)}
          />
        </div>

        <div className="flex justify-center space-x-4 mt-4">
          {/* PercentageSlider components in a row */}
          <PercentageSlider
            label="Alpha"
            value={alpha}
            onChange={(e) => setAlpha(e.target.value)}
          />
          <PercentageSlider
            label="Power"
            value={power}
            onChange={(e) => setPower(e.target.value)}
          />
        </div>
      </div>

      {sampleSize !== null && (
      <div className="mt-3 text-center p-4 bg-white shadow-lg rounded-lg">
        <strong className="text-lg font-bold">Calculated Sample Size:</strong>
        <div className="text-3xl font-bold">{Math.round(sampleSize)}</div>
      </div>
    )}
    </div>
  );
};

export default ZTestSampleSizeCalculator;
