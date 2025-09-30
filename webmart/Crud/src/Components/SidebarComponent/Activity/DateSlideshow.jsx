import React, { useRef } from "react";

const DateSlideshow = () => {
  const currentDate = new Date();
  const current = currentDate.getDate();
  const currentDay = currentDate.getDay();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();

  

 

  // Generate 10 days starting from Monday
  const weekDates = [];
  for (let i = 0; i < 101; i++) {
    const d = new Date(currentDate);
    d.setDate(currentDate.getDate() + i -21);
    weekDates.push(d);
  }

  const visibleDates = ()=>{


  }



  const dayLabels = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  // Ref for the scroll container
  const scrollRef = useRef(null);

  // Width of one date item + gap (50px width + 16px gap)
  const scrollAmount = 66; // adjust if you change sizes or gaps

  // Scroll left by one date box
  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  // Scroll right by one date box
  const scrollRight = () => {
    console.log()
  if (scrollRef.current) {
    scrollRef.current.scrollLeft += scrollAmount;
  }
};

  // Helper to check if date is today
  const isToday = (date) => date === current;

  return (
    <div className="flex items-center gap-2 max-w-3xl">
      {/* Left arrow */}
      <button
        onClick={scrollLeft}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Scroll Left"
      >
        &#8592;
      </button>

      {/* Scroll container */}
      <div
        ref={scrollRef}
        className="flex gap-4 py-4 flex-nowrap overflow-x-auto overflow-y-hidden  min-w-0 h-[110px] scrollbar-hide [&::-webkit-scrollbar]:hidden"
        style={{ scrollBehavior: "smooth" }}
      >
        {weekDates.map((dateObj) => {
          const date = dateObj.getDate();
          const month = dateObj.getMonth();
          const dayName = dayLabels[dateObj.getDay()];

          return (
            <div
              key={dateObj.toISOString()}
              className={`min-w-[50px] h-[70px] flex flex-col items-center justify-center rounded-2xl text-sm font-semibold ${
                isToday(date)
                  ? "bg-black text-white"
                  : (date >  current &&   (currentMonth <=  month))
                  ? "bg-white text-black border-1 "
                  : "bg-pink-200 text-black"
              }`}
            >
              <div>{date}</div>
              <div>{dayName}</div>
            </div>
          );
        })}
      </div>

      {/* Right arrow */}
      <button
        onClick={scrollRight}
        className="p-2 rounded-full bg-gray-200 hover:bg-gray-300"
        aria-label="Scroll Right"
      >
        &#8594;
      </button>
    </div>
  );
};

export default DateSlideshow;
