import React from "react";

export interface ParameterInputCardProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isMDE?: boolean;
  mdeType?: string;
  setMdeType?: React.Dispatch<React.SetStateAction<string>>;
  mdeTypeOptions?: {
    uplift: string;
    exactValue: string;
  };
}

const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  onChange,
  isMDE,
  mdeType,
  setMdeType,
  mdeTypeOptions,
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
        {isMDE && mdeTypeOptions && (
          <div className="mt-2">
            <span className="text-sm font-medium text-gray-700">
              MDE Type:{" "}
            </span>
            {Object.entries(mdeTypeOptions).map(([key, text]) => (
              <label key={key} className="inline-flex items-center ml-2">
                <input
                  type="radio"
                  name="mdeType"
                  value={key}
                  checked={mdeType === key}
                  onChange={() => setMdeType && setMdeType(key)}
                />
                <span className="ml-1 text-sm text-gray-700">{text}</span>
              </label>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ParameterInputCard;
