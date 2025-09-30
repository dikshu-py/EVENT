
import React from "react";

const BarChart = ({ data }) => {
  if (!data || Object.keys(data).length === 0) {
    return <div>No data available</div>;
  }

  // Step 1: Calculate total amount per day
  const dailyTotals = Object.entries(data).map(([date, transactions]) => {
    const total = transactions.reduce((sum, t) => {
      return t.check === "Send" ? sum + t.amount : sum - t.amount;
    }, 0);
    return { date, total };
  }).sort((a,b)=> b.total -  a.total);
  

  // Step 2: Get maxAmount (avoid divide-by-zero)
  const maxAmount = Math.max(...dailyTotals.map((item) => Math.abs(item.total)), 1) ;

  return (
    <div className="flex items-end gap-1 h-40 ">
      {dailyTotals.map(({ date, total }) => {
        const heightPercent = Math.max((Math.abs(total) / maxAmount  ) * 100, 5); // min 5%

        return (
          <div key={date} className="flex flex-col justify-end items-center h-full w-6">
            <div
              style={{ height: `${heightPercent/2}%` }}
              className={`w-full rounded-sm transition-all duration-300   ${
                total === maxAmount ? "bg-blue-500" : "bg-blue-300"
              }`}
              title={`₹${total} on ${date}`}
            ></div>
          </div>
        );
      })}
    </div>
  );
};

export default BarChart;
