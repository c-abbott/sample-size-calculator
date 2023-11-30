import React from "react";

export interface ParameterInputCardProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parameterContext?: string;
  mdeType?: 'absolute' | 'relative';
  onMdeTypeChange?: (type: 'absolute' | 'relative') => void;
}

const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  onChange,
  parameterContext,
  mdeType,
  onMdeTypeChange,
}) => {
  return (
    <div className="bg-dark-800 p-4 rounded-md shadow-custom border border-gray-500 focus-within:border-focusWithin">
      <label className="block text-base font-semibold text-primary mb-4">
        {" "}
        {/* Increased spacing */}
        {label}
      </label>
      <input
        type="text"
        className="py-4 px-4 text-center text-lg block w-full rounded-md border-gray-500 shadow-sm focus:border-accent focus:ring focus:ring-accent-400 focus:ring-opacity-50 bg-dark-700 text-primary placeholder-gray-500" // Increased padding
        value={value}
        onChange={onChange}
      />
      {label === "MDE (%)" && (
        <div className="mt-2">
          <label className="text-sm font-light text-primary mr-2">
            Absolute
            <input
              type="radio"
              value="absolute"
              checked={mdeType === 'absolute'}
              onChange={() => onMdeTypeChange?.('absolute')}
            />
          </label>
          <label className="text-sm font-light text-primary ml-4">
            Relative
            <input
              type="radio"
              value="relative"
              checked={mdeType === 'relative'}
              onChange={() => onMdeTypeChange?.('relative')}
            />
          </label>
        </div>
      )}
      {parameterContext && (
        <p className="text-sm font-light text-left mt-4 text-gray-500 line-clamp-2">
          {" "}
          {/* Adjusted style and color */}
          {parameterContext}
        </p>
      )}
    </div>
  );
};

export default ParameterInputCard;
