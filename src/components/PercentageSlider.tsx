import React from "react";

export interface PercentageSliderProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({
  label,
  value,
  onChange,
  min = 0, // Default to 0 if not provided
  max = 100, // Default to 100 if not provided
}) => {
  // Calculate the percentage of the value within the range
  const percentage = ((parseFloat(value) - min) / (max - min)) * 100;

  return (
    <div className="p-4 bg-dark-800 shadow-custom rounded-md border border-gray-500 focus-within:border-focusWithin">
      <label className="block text-base text-primary mb-2">{label}</label>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        className="slider-thumb w-full h-2 bg-slider-track rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-accent-400"
        style={{
          background: `linear-gradient(to right, #bcfd49 ${percentage}%, #333 ${percentage}%)`,
        }}
      />
      <div className="text-right text-base mt-1 text-primary">{value}%</div>
    </div>
  );
};

export default PercentageSlider;
