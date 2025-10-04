import React, { useState } from 'react';
import { twMerge } from 'tailwind-merge';

const StatusDropdown = ({ option, handlefilter, command, initalvalue, classprop }) => {
  const [isOpen, setIsOpen] = useState(false);

  

  // useEffect(() => {
  //   setSelectedStatus(initalvalue);
  // }, [initalvalue]);

  const handleSelect = (status) => {
   
   

    setIsOpen(false);
    handlefilter(status.value);
    
  };

  return (
    <div className="relative inline-block text-left w-full">

      <button
        onClick={() => setIsOpen(!isOpen)}
        className={twMerge(
          "inline-flex justify-between w-full rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50",
          classprop
        )}
      >
        
        {initalvalue}
        <svg
          className="ml-2 -mr-1 h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>


      {isOpen && (
        <div className="absolute z-10 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-[#ABABAB] ring-opacity-5">
          <div className="py-1">
            {option.map((status) => (
              <button
                key={status.value}
                onClick={() => handleSelect(status)}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default StatusDropdown;
