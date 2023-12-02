import React from "react";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";

export interface PercentageSliderProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  max?: number;
  tooltipText?: string;
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  tooltipText = "Information about this slider",
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const percentage = ((parseFloat(value) - min) / (max - min)) * 100;

  return (
    <div className="relative p-4 bg-dark-800 shadow-custom rounded-md border border-gray-500 focus-within:border-focusWithin">
      <label className="text-base text-primary mb-2 flex justify-between items-center">
        {label}
        <span
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <FontAwesomeIcon icon={faInfoCircle} className="cursor-pointer" />
        </span>
        {showTooltip && (
          <div className="absolute top-0 right-0 mt-2 mr-12 p-2 bg-dark-800 text-gray-500 text-sm rounded-md shadow-lg">
            {tooltipText}
          </div>
        )}
      </label>
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
