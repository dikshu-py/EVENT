import React, { useState } from 'react';
import getdayDate from '../../Global/Daydate';

const GroceryCard = ({ date, description }) => {

    const [expand, setExpand] = useState(false)

   
    //to get the first line or the first 50 words 
    const getPreview = (description) => {
        const firstLine = description.split('\n')[0]; // Get first line before newline
        return firstLine.slice(0, 40);                // Slice up to 20 characters
    };

    return (
        <div className="max-w-3xl w-full bg-white flex justify-between  rounded-lg shadow-md p-4 hover:shadow-md transition ">
            <div className="flex items-start space-x-4">
                {/* Date Box */}
                <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-md text-sm font-semibold text-gray-800">
                    {getdayDate(date)}
                </div>

                {/* Text Content */}
                <div className='w-1/2 md:w-full overflow-x-hidden'>
                    <h3 className="text-gray-900 font-semibold  text-sm md:text-xl">Grocery list</h3>
                    <p className="text-gray-600 text-[12px] md:text-sm truncate w-full sm:w-64 md:w-72 whitespace-pre-line transition-transform duration-900 ease-in-out">
                        {!expand ? getPreview(description) : description}
                    </p>
                </div>

            </div>
            <div className=' h-full flex items-end justify-end   mt-4 ' onClick={() => {
                console.log(expand)
                setExpand((prev) => !prev)
            }}>

                <svg
                    data-accordion-icon
                    className={`w-3 h-3 transition-transform duration-900 ease-in-out ${!expand ? 'rotate-180' : ''
                        }`}
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                >
                    <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                    />
                </svg>
            </div>

        </div>
    );
};

export default GroceryCard;
