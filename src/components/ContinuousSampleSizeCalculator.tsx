import React, { useState, useEffect } from "react";

import { calculateSampleSize } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";
import SampleSizeDisplay from "./SampleSizeDisplay";

const ContinuousSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>("");
  const [avg, setAvg] = useState<string>("");
  const [sd, setSd] = useState<string>("");
  const [alpha, setAlpha] = useState<string>("5");
  const [power, setPower] = useState<string>("80");
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
    if (!delta || !avg || !sd || !alpha || !power) {
      setSampleSize(null);
      return; // Exit the effect if any field is empty
    }
  
    const numDelta = parseFloat(delta) / 100 || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN;
    const numBeta = 1 - parseFloat(power) / 100 || NaN;
  
    // Check if any of the parsed values is NaN (not a number)
    if (isNaN(numDelta) || isNaN(numAvg) || isNaN(numSd) || isNaN(numAlpha) || isNaN(numBeta)) {
      setSampleSize(null);
    } else {
      // Perform the sample size calculation
      const size = calculateSampleSize(numDelta, numAvg, numSd, numAlpha, numBeta);
      setSampleSize(size);
    }
  }, [delta, avg, sd, alpha, power]); // Dependencies array

  return (
    <div className="space-y-6 px-8 py-10 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-6 shadow-md rounded-md">
        {/* First Row: ParameterInputCards */}
        <div className="flex justify-center gap-4 mb-4">
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
              label="MDE"
              value={delta !== "" ? formatNumber(parseFloat(delta)) : ""}
              onChange={(e) => handleDeltaChange(e.target.value)}
              parameterContext="The change in the mean you're trying to measure, also known as the minimum detectable effect."
            />
          </div>
        </div>
        {/* Second Row: SampleSizeDisplay and PercentageSliders */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            <PercentageSlider
              label="Alpha"
              value={alpha}
              onChange={(e) => setAlpha(e.target.value)}
              min={1}
              max={20}
            />
            <PercentageSlider
              label="Power"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              min={50}
              max={100}
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