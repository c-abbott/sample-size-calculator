import React, { useState, useEffect } from "react";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";
import SampleSizeDisplay from "./SampleSizeDisplay";
import { calculateBinarySampleSize } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

const BinarySampleSizeCalculator: React.FC = () => {
  const [mde, setMde] = useState<string>("");
  const [baselineConversion, setBaselineConversion] = useState<string>("");
  const [alpha, setAlpha] = useState<string>("5");
  const [power, setPower] = useState<string>("80");
  const [sampleSize, setSampleSize] = useState<number | null>(null);

  const handleMdeChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    setMde(isNaN(numericValue) ? "" : numericValue.toString());
  };

  const handleBaselineConversionChange = (value: string) => {
    const numericValue = parseFloat(value.replace(/,/g, ""));
    setBaselineConversion(isNaN(numericValue) ? "" : numericValue.toString());
  };

  useEffect(() => {
    if (!mde || !baselineConversion) {
      setSampleSize(null);
      return;
    }

    const numMde = parseFloat(mde) / 100; // Convert to decimal
    const numBaselineConversion = parseFloat(baselineConversion) / 100; // Convert to decimal
    const numAlpha = parseFloat(alpha) / 100; // Convert to decimal
    const numPower = parseFloat(power) / 100; // Convert to decimal

    if (!isNaN(numMde) && !isNaN(numBaselineConversion)) {
      const size = calculateBinarySampleSize(
        numMde,
        numBaselineConversion,
        numAlpha,
        numPower
      );
      setSampleSize(size);
    } else {
      setSampleSize(null);
    }
  }, [mde, baselineConversion, alpha, power]);

  return (
    <div className="space-y-6 px-8 py-10 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-6 shadow-md rounded-md">
        <div className="flex justify-center gap-4 mb-4">
          <ParameterInputCard
            label="MDE (%)"
            value={mde !== "" ? formatNumber(parseFloat(mde)) : ""}
            onChange={(e) => handleMdeChange(e.target.value)}
            parameterContext="Minimum Detectable Effect (as a percentage)."
          />
          <ParameterInputCard
            label="Baseline Conversion Rate (%)"
            value={
              baselineConversion !== ""
                ? formatNumber(parseFloat(baselineConversion))
                : ""
            }
            onChange={(e) => handleBaselineConversionChange(e.target.value)}
            parameterContext="Baseline conversion rate (as a percentage)."
          />
        </div>
        {/* SampleSizeDisplay and PercentageSliders */}
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-2 flex flex-col gap-4">
            {/* Alpha and Power Sliders */}
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
          {/* Sample Size Display */}
          <SampleSizeDisplay
            sampleSize={sampleSize !== null ? sampleSize : "-"}
          />
        </div>
      </div>
    </div>
  );
};

export default BinarySampleSizeCalculator;
