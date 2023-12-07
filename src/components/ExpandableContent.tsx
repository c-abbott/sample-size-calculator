import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const ExpandableContent: React.FC<{
  title: string;
  children: React.ReactNode;
}> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-dark-800 mx-2 p-2 md:p-4 shadow-md rounded-md"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <button
        className="flex items-center text-sm text-gray-500 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex-shrink-0 mr-2" style={{ width: '24px' }}> 
          <FontAwesomeIcon
            icon={isOpen ? faChevronDown : faChevronRight}
            className={`text-accent ${
              isHovered ? "opacity-100" : "opacity-50"
            }`}
          />
        </div>
        {title}
      </button>
      {isOpen && (
        <div className="px-4 py-4 text-sm text-gray-400">
          {children}
        </div>
      )}
    </div>
  );
};

export default ExpandableContent;
