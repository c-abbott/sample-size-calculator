import React from 'react';

export interface PercentageSliderProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PercentageSlider: React.FC<PercentageSliderProps> = ({ label, value, onChange }) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={onChange}
        className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
      />
      <div className="text-right text-sm">{value}%</div>
    </div>
  );
};

export default PercentageSlider;
