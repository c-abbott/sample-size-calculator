import React from "react";

export interface PercentageSliderProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="p-4 bg-dark-800 shadow-custom rounded-md border border-gray-500 opacity-80 hover:border-hover">
      <label className="block text-sm font-medium text-primary mb-2">
        {label}
      </label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="slider-thumb w-full h-2 bg-slider-track rounded-lg appearance-none cursor-pointer focus:outline-none focus:ring focus:ring-accent-400"
        style={{
          backgroundSize: `${value}% 100%`,
          background: `linear-gradient(to right, #bcfd49 ${value}%, #333 ${value}%)`,
        }}
      />

      <div className="text-right text-sm mt-1 text-primary">{value}%</div>
    </div>
  );
};

export default PercentageSlider;
