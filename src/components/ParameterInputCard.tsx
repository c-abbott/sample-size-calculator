import React from "react";

export interface ParameterInputCardProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parameterContext?: string;
}

const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  onChange,
  parameterContext,
}) => {
  return (
    <div className="bg-dark-800 p-4 rounded-md shadow-custom border border-gray-500 focus-within:border-focusWithin">
      <label className="block text-base font-semibold text-primary mb-4"> {/* Increased spacing */}
        {label}
      </label>
      <input
        type="text"
        className="py-4 px-4 text-center text-lg block w-full rounded-md border-gray-500 shadow-sm focus:border-accent focus:ring focus:ring-accent-400 focus:ring-opacity-50 bg-dark-700 text-primary placeholder-gray-500" // Increased padding
        value={value}
        onChange={onChange}
      />
      {parameterContext && (
        <p className="text-sm font-light text-left mt-4 text-gray-500 line-clamp-3"> {/* Adjusted style and color */}
          {parameterContext}
        </p>
      )}
    </div>
  );
};

export default ParameterInputCard;
