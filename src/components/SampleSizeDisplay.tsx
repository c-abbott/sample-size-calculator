import React from "react";
import { formatNumber } from "../utils/formatNumber";

interface SampleSizeDisplayProps {
  sampleSize: number | string;
}

const SampleSizeDisplay: React.FC<SampleSizeDisplayProps> = ({
  sampleSize,
}) => {
  // Check if sampleSize is a number before formatting
  const displaySize =
    typeof sampleSize === "number" ? formatNumber(sampleSize) : sampleSize;

  return (
    <div className="bg-dark-700 shadow-md rounded-md flex flex-col justify-center items-center p-24">
      <strong className="text-lg font-bold text-accent mb-2 overflow-clip">
        Sample Size
      </strong>
      <div className="text-5xl font-extrabold text-primary overflow-clip">
        {displaySize}
      </div>
    </div>
  );
};

export default SampleSizeDisplay;
