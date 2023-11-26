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
    <div className="bg-dark-800 p-4 rounded-md shadow-custom border border-gray-500 opacity-80 hover:border-hover">
      <label className="block text-center text-sm font-medium text-primary mb-2">
        {label}
      </label>
      <input
        type="text"
        className="mt-1 block w-full rounded-md border-gray-500 shadow-sm focus:border-accent focus:ring focus:ring-accent-400 focus:ring-opacity-50 bg-dark-700 text-primary placeholder-gray-500"
        value={value}
        onChange={onChange}
      />
      {isMDE && mdeTypeOptions && (
        <div className="mt-2 flex justify-center">
          <span className="text-sm font-medium text-primary mr-2">
            MDE Type:
          </span>
          {Object.entries(mdeTypeOptions).map(([key, text]) => (
            <label key={key} className="inline-flex items-center ml-2 text-primary">
              <input
                type="radio"
                name="mdeType"
                value={key}
                checked={mdeType === key}
                onChange={() => setMdeType && setMdeType(key)}
              />
              <span className="ml-1 text-sm">{text}</span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default ParameterInputCard;
