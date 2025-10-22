import React, { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";

const daysShort = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];

const WeeklyCalendar = () => {
  const today = dayjs();
  const scrollContainerRef = useRef(null);
  const dateRefs = useRef({});
  const [weeks, setWeeks] = useState([]);

  useEffect(() => {
    const startOfMonth = today.startOf("month");
    const endOfMonth = today.endOf("month");
    const totalDays = endOfMonth.date();

    const allWeeks = [];
    let currentWeek = [];

    for (let i = 1; i <= totalDays; i++) {
      const currentDate = startOfMonth.date(i);
      currentWeek.push(currentDate);

      if (currentWeek.length === 7 || i === totalDays) {
        allWeeks.push([...currentWeek]);
        currentWeek = [];
      }
    }

    setWeeks(allWeeks);
  }, []);

  // Scroll to today's date on mount
  useEffect(() => {
    const todayKey = today.format("YYYY-MM-DD");
    const todayRef = dateRefs.current[todayKey];

    if (todayRef && scrollContainerRef.current) {
      scrollContainerRef.current.scrollTo({
        left: todayRef.offsetLeft - 166,
        behavior: "smooth",
      });
    }
  }, [weeks]);

  return (
    <div
      ref={scrollContainerRef}
      className="flex sm:hidden overflow-x-auto no-scrollbar w-full py-4"
    >
      <div className="flex w-max gap-2 px-4">
        {weeks.map((week, weekIndex) => (
          <div key={weekIndex} className="flex gap-2">
            {week.map((date) => {
              const isToday = date.isSame(today, "day");
              const dateKey = date.format("YYYY-MM-DD");
              const current = new Date();
              
              return (
                <div
                  key={dateKey}
                  ref={(el) => (dateRefs.current[dateKey] = el)}
                  className={`min-w-[50px] h-[70px] flex flex-col items-center justify-center rounded-2xl text-sm font-semibold ${
                    isToday
                      ? "bg-black text-white"
                      : date.date() > current.getDate() && date.month() <= current.getMonth()
                      ? "bg-white text-black border-1 "
                      : "bg-pink-200 text-black"
                  }`}
                >
                  <span
                    className={`text-sm ${
                      isToday ? "text-white" : "text-gray-400"
                    }`}
                  >
                    {daysShort[date.day()]}
                  </span>
                  <span
                    className={`font-medium ${isToday ? "text-white" : ""}`}
                  >
                    {date.date()}
                  </span>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeeklyCalendar;
