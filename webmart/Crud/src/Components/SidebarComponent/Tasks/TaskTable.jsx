import React, { useState } from 'react'
import StatusDropdown from '../../Global/DropDown';


const TaskTable = ({ tasks, handlefilter,count , filter , setFilter,handleStatus}) => {
  console.log(tasks)
  const dropdownoption = [
    { label: "Pending", value: "Pending" },
    { label: "Ongoing", value: "Ongoing" },
    { label: "Completed", value: "Completed" },

  ]

  const filterOptions = [
    {
      label: "Newest", value: "Newest"

    },
    {
      label: "Oldest", value: "Oldest"

    }
  ]


  const handleStatusUpdate = (task,e) => {
    
    handleStatus({...task, status : e})
  }
 
 

  return (
    <div className="pt-2  px-4 md:px-4 flex flex-col h-full  justify-between">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
        <div>
          <h2 className="text-xl font-bold">All Customers</h2>
          <a href="#" className="text-sm text-blue-500 hover:underline">Active Members</a>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search"
            onChange={(e)=>setFilter((prev)=>({...prev,search:e.target.value}))}
            className="px-3 py-2 bg-[#F9FBFF]  rounded-lg text-sm w-full md:w-64 shadow-b"
          />
          <StatusDropdown option={filterOptions} initalvalue={filter.order} handlefilter={(e)=>setFilter((prev)=> ({...prev ,order: e}))} classprop={"px-3 py-2 bg-[#F9FBFF] rounded-md text-sm border-0 shadow-none"} />

        </div>
      </div>

      <div className="overflow-x-auto flex flex-col flex-1">
        <table className="min-w-full max-h-full  rounded-md overflow-visible">
          <thead className=" text-[#B5B7C0] text-sm">
            <tr>
              <th className="text-left px-4 py-2">Index</th>
              <th className="text-left px-4 py-2">Name</th>

              <th className="text-left px-4 py-2">Created</th>
              <th className="text-left px-4 py-2">Description</th>

              <th className="text-left px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody className="text-sm text-gray-800">
            {console.log(tasks)}
            {tasks && tasks.length > 0 && tasks.map((task, index) => (
              <tr
                key={index}
                className="border-t border-[#EEEEEE] hover:bg-gray-50 transition py-2 font-semibold"
              >
                <td className="px-4 py-3">{index + 1}</td>
                <td className="px-4 py-3">{task.title}</td>
                <td className="px-4 py-3">{new Date(task.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit' })}</td>
                <td className="px-4 py-3">{task.description}</td>

                <td className="px-4 py-3 ">


                  <StatusDropdown option={dropdownoption} initalvalue={task.status} handlefilter={(e) => handleStatusUpdate(task,e)} classprop={`px-2 py-1  w-[100px]  items-center text-center rounded-sm  text-xs font-medium ${task.status === "Completed"
                    ? "bg-[#16C098]/40 text-[#008767] border-[#00B087] border-1"
                    : task.status === "Pending"
                      ? "bg-[#FFC5C5] text-[#DF0404] border-[#DF0404] border-1"
                      : task.status === "Ongoing" || task.status === "Started"
                        ? "bg-[#EEEEEE] text-[#ABABAB] border-[#ABABAB] border-1"
                        : ""
                    }`} />


                </td>
                <td className="px-4 py-3">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                    onClick={() => handlefilter(task)}
                    aria-hidden="true"
                    className="transition-all duration-200 ease-in-out text-gray-600 hover:text-red-600 hover:scale-110 cursor-pointer"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>


                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
      </div>
      <div className="w-full flex flex-col sm:flex-row justify-between items-center gap-4 py-2 px-2   ">
          {/* Left summary */}
          <div className="text-sm text-gray-400 whitespace-nowrap ">
            Showing data {(1 - 1) * 8 + 1} to {Math.min(count,1 * 8, 256000)} of {count} entries
          </div>








        </div>
    </div>
  );
}

export default React.memo(TaskTable)