import React from "react";

interface SampleSizeDisplayProps {
  sampleSize: number;
}

const SampleSizeDisplay: React.FC<SampleSizeDisplayProps> = ({ sampleSize }) => {
  return (
    <div className="mt-3 text-center p-4 bg-dark-700 shadow-md rounded-md">
      <strong className="text-lg font-bold text-accent">Sample Size</strong>
      <div className="text-5xl font-extrabold text-primary">
        {Math.round(sampleSize)}
      </div>
    </div>
  );
};

export default SampleSizeDisplay;
