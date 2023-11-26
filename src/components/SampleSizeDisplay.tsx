import React from "react";

interface SampleSizeDisplayProps {
  sampleSize: number;
}

const SampleSizeDisplay: React.FC<SampleSizeDisplayProps> = ({ sampleSize }) => {
  return (
    <div className="bg-dark-700 shadow-md rounded-md flex flex-col justify-center items-center p-24">
      <strong className="text-lg font-bold text-accent mb-2 overflow-clip">Sample Size</strong>
      <div className="text-5xl font-extrabold text-primary overflow-clip">
        {Math.round(sampleSize)}
      </div>
    </div>
  );
};

export default SampleSizeDisplay;
