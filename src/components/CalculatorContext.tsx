import React from "react";

const CalculatorContext: React.FC<{ title: string; text: string }> = ({ title, text }) => {
  return (
    <div>
      <h2 className="text-left text-3xl font-semibold text-accent my-4">{title}</h2>
      <p className="text-smbase text-gray-500">{text}</p>
    </div>
  );
};

export default CalculatorContext;
