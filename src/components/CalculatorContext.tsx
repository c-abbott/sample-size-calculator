import React from "react";

const CalculatorContext: React.FC<{ title: string; text: string }> = ({
  title,
  text,
}) => {
  // Split the text into two parts: before and after "Examples:"
  const [preExamplesText, examplesText] = text.includes("Examples:")
    ? text.split("Examples:")
    : [text, ""];

  return (
    <div>
      <h2 className="text-left text-3xl font-semibold text-accent my-4">
        {title}
      </h2>
      <p className="text-smbase text-gray-500">
        {preExamplesText}
        {examplesText && (
          <>
            <br />
            <span>Examples:{examplesText}</span>
          </>
        )}
      </p>
    </div>
  );
};

export default CalculatorContext;
