import React from "react";

export interface ParameterInputCardProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  onChange,
}) => {
  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      <div className="bg-gray-100 p-3 rounded-md">
        <label className="block text-sm font-medium text-gray-700">
          {label}
        </label>
        <input
          type="text"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-400 focus:ring-opacity-50"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

export default ParameterInputCard;
