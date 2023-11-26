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
    <div className="bg-dark-800 p-4 rounded-md shadow-custom border border-gray-500 hover:border-accent">
      <label className="block text-center text-base font-semibold text-primary mb-2">
        {label}
      </label>
      <input
        type="text"
        className="mt-1 text-lg block w-full rounded-md border-gray-500 shadow-sm focus:border-accent focus:ring focus:ring-accent-400 focus:ring-opacity-50 bg-dark-700 text-primary placeholder-gray-500"
        value={value}
        onChange={onChange}
      />
      {parameterContext && (
        <p className="text-sm italic font-light text-left mt-2 text-primary">
          {parameterContext}
        </p>
      )}
    </div>
  );
};

export default ParameterInputCard;
