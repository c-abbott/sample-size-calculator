import React, { useState, useEffect } from "react";
import ParameterInputCard from "./ParameterInputCard";
import PercentageSlider from "./PercentageSlider";
import SampleSizeDisplay from "./SampleSizeDisplay";
import { calculateBinarySampleSize } from "../utils/calculations";
import { formatNumber } from "../utils/formatNumber";

const BinarySampleSizeCalculator: React.FC = () => {
  const [mde, setMde] = useState<string>("5");
  const [baselineConversion, setBaselineConversion] = useState<string>("20");
  const [mdeType, setMdeType] = useState<"absolute" | "relative">("absolute");
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

    let adjustedMde = parseFloat(mde) / 100; // Convert to decimal

    if (mdeType === "relative") {
      adjustedMde *= parseFloat(baselineConversion) / 100; // Adjust for relative MDE
    }

    const numBaselineConversion = parseFloat(baselineConversion) / 100; // Convert to decimal
    const numAlpha = parseFloat(alpha) / 100; // Convert to decimal
    const numPower = parseFloat(power) / 100; // Convert to decimal

    const size = calculateBinarySampleSize(
      adjustedMde,
      numBaselineConversion,
      numAlpha,
      numPower
    );
    setSampleSize(size);
  }, [mde, baselineConversion, mdeType, alpha, power]);

  return (
    <div className="py-4 px-1 md:px-2 bg-dark-900 text-primary">
      <div className="bg-dark-800 p-2 md:p-4 shadow-md rounded-md">
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-4">
          <div className="flex-1">
            <ParameterInputCard
              label="Baseline Conversion Rate (%)"
              value={
                baselineConversion !== ""
                  ? formatNumber(parseFloat(baselineConversion))
                  : ""
              }
              onChange={(e) => handleBaselineConversionChange(e.target.value)}
              parameterContext="The baseline conversion rate of the metric you're trying to measure prior to running the experiment."
            />
          </div>
          <div className="flex-1">
            <ParameterInputCard
              label="MDE (%)"
              value={mde !== "" ? formatNumber(parseFloat(mde)) : ""}
              onChange={(e) => handleMdeChange(e.target.value)}
              parameterContext="The change in the metric you're trying to measure, also known as the minimum detectable effect."
              mdeType={mdeType}
              onMdeTypeChange={setMdeType}
              showRadioButtons={true}
            />
          </div>
        </div>
        {/* SampleSizeDisplay and PercentageSliders */}
        <div className="flex flex-col md:grid md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-4">
            <PercentageSlider
              label="Alpha (α)"
              value={alpha}
              onChange={(e) => setAlpha(e.target.value)}
              min={1}
              max={20}
              tooltipText="The probability of a Type I error, or false positive. This is the probability that you will detect a difference when one does not actually exist."
            />
            <PercentageSlider
              label="Power (1-β)"
              value={power}
              onChange={(e) => setPower(e.target.value)}
              min={50}
              max={100}
              tooltipText="The probability of a Type II error, or false negative. This is the probability that you will fail to detect a difference when one actually exists."
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
