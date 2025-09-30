import React from 'react'
import  {customers}  from './shared'

const TaskTable = () => {

    const data = customers
   return (
    <div className="p-4 md:p-8">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">All Customers</h2>
          <a href="#" className="text-sm text-blue-500 hover:underline">Active Members</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            className="px-3 py-2 border rounded-md text-sm w-full md:w-64"
          />
          <select className="px-3 py-2 border rounded-md text-sm">
            <option>Newest</option>
            <option>Oldest</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-md overflow-hidden">
          <thead className=" text-[#B5B7C0] text-sm">
            <tr>
              <th className="text-left px-4 py-2">Customer Name</th>
              <th className="text-left px-4 py-2">Company</th>
              <th className="text-left px-4 py-2">Phone Number</th>
              <th className="text-left px-4 py-2">Email</th>
              <th className="text-left px-4 py-2">Country</th>
              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {data.map((customer, index) => (
              <tr
                key={index}
                className="border-t border-[#EEEEEE] hover:bg-gray-50 transition py-2 font-semibold"
              >
                <td className="px-4 py-3">{customer.name}</td>
                <td className="px-4 py-3">{customer.company}</td>
                <td className="px-4 py-3">{customer.phone}</td>
                <td className="px-4 py-3">{customer.email}</td>
                <td className="px-4 py-3">{customer.country}</td>
                <td className="px-4 py-3 ">
                  <div className={`px-2 py-1 rounded w-[80px]  items-center text-center  text-xs font-medium ${
                    customer.status === "Active"
                      ? "bg-[#16C098]/40 text-[#008767] border-[#00B087] border-1"
                      : "bg-[#FFC5C5] text-[#DF0404] border-[#DF0404] border-1"
                  }`}>
                    {customer.status}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default TaskTable