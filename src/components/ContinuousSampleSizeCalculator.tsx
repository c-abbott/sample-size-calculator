import React, { useState, useEffect } from "react";

import { calculateSampleSize } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";
import SampleSizeDisplay from "./SampleSizeDisplay";

interface ContinuousSampleSizeCalculatorProps {
  avg: string;
  setAvg: (value: string) => void;
  sd: string;
  setSd: (value: string) => void;
  delta: string;
  setDelta: (value: string) => void;
  alpha: string;
  setAlpha: (value: string) => void;
  beta: string;
  setBeta: (value: string) => void;
}

const ContinuousSampleSizeCalculator: React.FC<
  ContinuousSampleSizeCalculatorProps
> = ({ avg, setAvg, sd, setSd, delta, setDelta, alpha, setAlpha, beta, setBeta }) => {
  const [sampleSize, setSampleSize] = useState<number | null>(null);
  const handleDeltaChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    setDelta(isNaN(numericValue) ? "" : numericValue.toString());
  };

  const handleAvgChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    setAvg(isNaN(numericValue) ? "" : numericValue.toString());
  };

  const handleSdChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    setSd(isNaN(numericValue) ? "" : numericValue.toString());
  };

  useEffect(() => {
    // Check if any of the required fields is empty
    if (!delta || !avg || !sd || !alpha || !beta) {
      setSampleSize(null);
      return; // Exit the effect if any field is empty
    }

    const numDelta = parseFloat(delta) / 100 || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN;
    const numBeta = parseFloat(beta) / 100 || NaN;

    // Check if any of the parsed values is NaN (not a number)
    if (
      isNaN(numDelta) ||
      isNaN(numAvg) ||
      isNaN(numSd) ||
      isNaN(numAlpha) ||
      isNaN(numBeta)
    ) {
      setSampleSize(null);
    } else {
      // Perform the sample size calculation
      const size = calculateSampleSize(
        numDelta,
        numAvg,
        numSd,
        numAlpha,
        numBeta
      );
      setSampleSize(size);
    }
  }, [delta, avg, sd, alpha, beta]); // Dependencies array

  return (
    <div className="py-4 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-4 shadow-md rounded-md">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <div className="flex-1">
            <ParameterInputCard
              label="Mean"
              value={avg !== "" ? formatNumber(parseFloat(avg)) : ""}
              onChange={(e) => handleAvgChange(e.target.value)}
              parameterContext="The mean of the metric you're trying to measure. We will use this a baseline."
            />
          </div>
          <div className="flex-1">
            <ParameterInputCard
              label="SD"
              value={sd !== "" ? formatNumber(parseFloat(sd)) : ""}
              onChange={(e) => handleSdChange(e.target.value)}
              parameterContext="The baseline standard deviation of the metric you're trying to measure."
            />
          </div>
          <div className="flex-1">
            <ParameterInputCard
              label="MDE (%)"
              value={delta !== "" ? formatNumber(parseFloat(delta)) : ""}
              onChange={(e) => handleDeltaChange(e.target.value)}
              parameterContext="The absolute % change in the mean you're trying to detect."
            />
          </div>
        </div>
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <PercentageSlider
              label="Alpha (α)"
              value={alpha}
              onChange={(e) => setAlpha(e.target.value)}
              min={1}
              max={40}
              tooltipText="The probability of a Type I error, or false positive. This is the probability that you will detect a difference when one does not actually exist."
            />
            <PercentageSlider
              label="Beta (β)"
              value={beta}
              onChange={(e) => setBeta(e.target.value)}
              min={1}
              max={40}
              tooltipText="The probability of a Type II error, or false negative. This is the probability that you will fail to detect a difference when one actually exists."
            />
          </div>
          <SampleSizeDisplay
            sampleSize={sampleSize !== null ? sampleSize : "-"}
          />
        </div>
      </div>
    </div>
  );
};

export default ContinuousSampleSizeCalculator;
