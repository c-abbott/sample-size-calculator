import React, { useState, useEffect } from "react";
import ParameterInputCard from "./ParameterInputCard";
import SampleSizeDisplay from "./SampleSizeDisplay";
import { formatNumber } from "../utils/formatNumber";

const BinarySampleSizeCalculator: React.FC = () => {
  const [mde, setMde] = useState<string>("");
  const [baselineConversion, setBaselineConversion] = useState<string>("");
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  useEffect(() => {
    if (!mde || !baselineConversion) {
      setSampleSize(null);
      return;
    }

    const numMde = parseFloat(mde) / 100 || NaN; // Convert percentage to decimal
    const numBaselineConversion = parseFloat(baselineConversion) / 100 || NaN; // Convert percentage to decimal
    const deltaSquared = numBaselineConversion * (1 - numBaselineConversion);

    if (!isNaN(numMde) && !isNaN(deltaSquared)) {
      const size = 16 * Math.pow(numMde, 2) / deltaSquared;
      setSampleSize(size);
    } else {
      setSampleSize(null);
    }
  }, [mde, baselineConversion]);

  return (
    <div className="space-y-6 px-8 py-10 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-6 shadow-md rounded-md">
        <ParameterInputCard
          label="MDE (%)"
          value={mde}
          onChange={(e) => setMde(e.target.value)}
          parameterContext="Minimum Detectable Effect (as a percentage)."
        />
        <ParameterInputCard
          label="Baseline Conversion Rate (%)"
          value={baselineConversion}
          onChange={(e) => setBaselineConversion(e.target.value)}
          parameterContext="Baseline conversion rate (as a percentage)."
        />
        <SampleSizeDisplay
          sampleSize={sampleSize !== null ? formatNumber(sampleSize) : "-"}
        />
      </div>
    </div>
  );
};

export default BinarySampleSizeCalculator;
