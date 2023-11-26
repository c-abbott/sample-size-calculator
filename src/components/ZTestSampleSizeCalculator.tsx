import React, { useState, useEffect } from "react";

import { calculateSampleSize } from "../utils/calculations";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";
import SampleSizeDisplay from "./SampleSizeDisplay";

const ZTestSampleSizeCalculator: React.FC = () => {
  const [delta, setDelta] = useState<string>("5");
  const [avg, setAvg] = useState<string>("10000");
  const [sd, setSd] = useState<string>("902");
  const [alpha, setAlpha] = useState<string>("5");
  const [power, setPower] = useState<string>("80");
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  useEffect(() => {
    const numDelta = parseFloat(delta) / 100 || NaN;
    const numAvg = parseFloat(avg) || NaN;
    const numSd = parseFloat(sd) || NaN;
    const numAlpha = parseFloat(alpha) / 100 || NaN;
    const numBeta = 1 - parseFloat(power) / 100 || NaN;

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
  }, [delta, avg, sd, alpha, power]); // Include mdeType in dependency array

  return (
    <div className="space-y-6 px-8 py-10 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-6 shadow-md rounded-md">
        {/* First Row: ParameterInputCards */}
        <div className="flex justify-center gap-4 mb-4">
          <div className="flex-1">
            <ParameterInputCard
              label="MDE"
              value={delta}
              onChange={(e) => setDelta(e.target.value)}
              parameterContext="The change in the mean you're trying to measure, also known as the minimum detectable effect"
            />
          </div>
          <div className="flex-1">
            <ParameterInputCard
              label="Mean"
              value={avg}
              onChange={(e) => setAvg(e.target.value)}
              parameterContext="The baseline mean of the metric you're trying to measure"
            />
          </div>
          <div className="flex-1">
            <ParameterInputCard
              label="SD"
              value={sd}
              onChange={(e) => setSd(e.target.value)}
              parameterContext="The baseline standard deviation of the metric you're trying to measure"
            />
          </div>
        </div>

        {/* Second Row: SampleSizeDisplay and PercentageSliders */}
        <div className="flex justify-between gap-4">
          <div className="flex-1 flex flex-col gap-4">
            <PercentageSlider
              label="Alpha"
              value={alpha}
              onChange={(e) => setAlpha(e.target.value)}
              min={1}
              max={10}
            />

            <PercentageSlider
              label="Power"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              min={50}
              max={100}
            />
          </div>
          {sampleSize !== null && <SampleSizeDisplay sampleSize={sampleSize} />}
        </div>
      </div>
    </div>
  );
};

export default ZTestSampleSizeCalculator;
