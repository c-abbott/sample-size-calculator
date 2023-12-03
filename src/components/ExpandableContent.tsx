import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faChevronDown } from '@fortawesome/free-solid-svg-icons';

const ExpandableContent: React.FC<{ title: string, content: string }> = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); // New state to track hover

  return (
    <div 
      className="bg-dark-800 rounded-md"
      onMouseEnter={() => setIsHovered(true)} // Set hover state
      onMouseLeave={() => setIsHovered(false)} // Unset hover state
    >
      <button
        className="flex items-center text-sm px-4 py-4 text-gray-500 w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <FontAwesomeIcon 
          icon={isOpen ? faChevronDown : faChevronRight} 
          className={`text-accent mr-4 ${isHovered ? 'opacity-100' : 'opacity-50'}`} // Conditional class for opacity
        />
        {title}
      </button>
      {isOpen && <p className="mt-2 ml-8 px-4 py-4 text-sm text-gray-500">{content}</p>}
    </div>
  );
};

export default ExpandableContent;
