import React from "react";

export interface ParameterInputCardProps {
  label: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  parameterContext?: string;
  mdeType?: "absolute" | "relative";
  onMdeTypeChange?: (type: "absolute" | "relative") => void;
  showRadioButtons?: boolean;
}

const ParameterInputCard: React.FC<ParameterInputCardProps> = ({
  label,
  value,
  onChange,
  parameterContext,
  mdeType,
  onMdeTypeChange,
  showRadioButtons,
}) => {
  return (
    <div className="bg-dark-800 p-4 rounded-md shadow-custom border border-gray-500 focus-within:border-focusWithin">
      <div className="flex justify-between items-center mb-4">
        <label className="block text-base text-primary">{label}</label>
        {showRadioButtons && (
          <div className="flex items-center">
            <div className="flex items-center mr-2">
              <label className="text-sm font-light text-primary flex items-center">
                <span className="mr-2">Absolute</span>
                <input
                  type="radio"
                  name="mdeType"
                  value="absolute"
                  checked={mdeType === "absolute"}
                  onChange={() => onMdeTypeChange?.("absolute")}
                  className="form-radio h-4 w-4 text-accent"
                />
              </label>
            </div>
            <div className="flex items-center">
              <label className="text-sm font-light text-primary flex items-center">
                <span className="mr-2">Relative</span>
                <input
                  type="radio"
                  name="mdeType"
                  value="relative"
                  checked={mdeType === "relative"}
                  onChange={() => onMdeTypeChange?.("relative")}
                  className="form-radio h-4 w-4 text-accent"
                />
              </label>
            </div>
          </div>
        )}
      </div>
      <input
        type="text"
        className="py-4 px-4 text-center text-lg block w-full rounded-md border-gray-500 shadow-sm focus:border-accent focus:ring focus:ring-accent-400 focus:ring-opacity-50 bg-dark-700 text-primary placeholder-gray-500"
        value={value}
        onChange={onChange}
      />
      {parameterContext && (
        <p className="text-sm font-light text-left mt-4 text-gray-500 line-clamp-2">
          {parameterContext}
        </p>
      )}
    </div>
  );
};

export default ParameterInputCard;
