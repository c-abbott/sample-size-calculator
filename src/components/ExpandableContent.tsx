import React, { useState } from "react";

const ExpandableContent: React.FC<{ title: string, content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-dark-800 rounded-md">
      <button
        className="text-sm px-4 py-4 text-gray-500"
        onClick={() => setIsOpen(!isOpen)}
      >
        {title}
      </button>
      {isOpen && <p className="mt-2 px-4 py-4 text-sm text-gray-500">{content}</p>}
    </div>
  );
};

export default ExpandableContent;