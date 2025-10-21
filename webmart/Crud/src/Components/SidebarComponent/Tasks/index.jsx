import React from "react";
import AddTask from "./AddTask";
import { useState, useEffect } from "react";
import ApiClient from "../../ApiClient/ApiClient";
import getFormatedDate from "../../Global/FormatedDate";
import getdayDate from "../../Global/Daydate";
import TaskTable from "./TaskTable";
import getTodayDate from "../../Global/TodayDate";
import HeaderLayout from "../../Common/HeaderLayout";
import { title } from "./shared";
import StatusDropdown from "../../Global/DropDown";
import { dropdownoption } from "./shared";
const index = () => {
  const [tasks, setTask] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [count, setCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 8;
  //for the Search and Filter by date options
  const [filter, setFilter] = useState({
    search: "",
    order: "Newest",
  });

  useEffect(() => {
    getExpenses();
  }, [filter.search, filter.order]);

  // to get all Expenses List
  const getExpenses = async () => {
    try {
      const res = await ApiClient.get("/getalltask", {
        params: {
          search: filter.search.trim(),
          order: filter.order,
          page: currentPage,
          limit: limit,
        },
      });
      console.log(res.data);
      setTask(res.data.data);
      setCount(res.data.count);
      console.log("Activityy:", res.data.data);
    } catch (err) {
      console.error("Error fetching expenses:", err);
    }
  };

  const deletetask = async (e) => {
    try {
      console.log(e);
      const res = await ApiClient.delete("/deletetask", { data: { id: e._id } })
        .then(() => {
          getExpenses();
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.error("Error in Deleteing expenses:", err);
    }
  };
  const updateStatus = async (e) => {
    try {
      const res = ApiClient.put("/updatetask", { tasks: e })
        .then(() => {
          getExpenses();
        })
        .catch((err) =>
          console.log(`error in Put request ${err.message} `, err.message)
        );
    } catch (err) {
      console.error("Error in Updating expenses:", err);
    }
  };

  return (
    <div className="min-h-screen  flex  flex-col xl:flex-row gap-4 xl:gap-0 bg-[#f8f9fb] p-2 sm:px-4 md:px-6 ">
      {/* Left - Main Content */}
      <div
        className="w-full xl:w-[70%]  rounded-2xl   flex  flex-col gap-5"
        style={{
          boxShadow:
            "0 8px 8px -4px rgba(0,0,0,0.15), 0 4px 6px -4px rgba(0,0,0,0.1)",
        }}
      >
        {/* Header */}
        <HeaderLayout title={title} setShowModal={setShowModal} />

        {/* Transaction List */}
        <div className="hidden sm:block flex-1 overflow-y-auto bg-white rounded-[30px]">
          {tasks && (
            <TaskTable
              tasks={tasks}
              handleStatus={(e) => updateStatus(e)}
              handlefilter={deletetask}
              count={count}
              filter={filter}
              setFilter={setFilter}
            />
          )}
        </div>
        <div className="flex flex-col sm:hidden gap-4">
          {tasks &&
            tasks.length > 0 &&
            tasks.map((task, index) => (
              <div className=" w-full  bg-white rounded-2xl shadow-md p-4 flex flex-col justify-between mx-auto ">
                {/* Tag and Dot */}

                <div className="flex items-center justify-between ">
                  <p className="text-base font-semibold ">{task.title}</p>
                  <span className="flex items-center">
                    <span
                      className={`w-2 h-2  rounded-full items-center ${
                        task.status === "Completed"
                          ? "bg-[#16C098] "
                          : task.status === "Pending"
                          ? "bg-[#FFC5C5] "
                          : task.status === "Ongoing" ||
                            task.status === "Started"
                          ? "bg-[#EEEEEE] "
                          : ""
                      } `}
                    ></span>
                  </span>
                </div>

                {/* Description */}
                <p className="text-[12px]  ">{task.description}</p>

                <div className="w-full flex justify-between mt-4 items-center">
                  <StatusDropdown
                    option={dropdownoption}
                    initalvalue={task.status}
                    handlefilter={(e) => updateStatus({ ...task, status: e })}
                    classprop={`px-2 py-1  w-[100px]  items-center text-center bg-gray-100  border-0 rounded-md text-xs font-medium `}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    width="16"
                    height="16"
                    fill="currentColor"
                    onClick={() => deletetask(task)}
                    aria-hidden="true"
                    className="transition-all duration-200 ease-in-out text-gray-400 hover:text-red-600 hover:scale-110 cursor-pointer"
                  >
                    <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                  </svg>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Right - Sidebar */}
      <div className="w-full lg:w-[30%] flex flex-col gap-6 bg-[#F9FAFC] overflow-hidden">
        {/* Spending Summary */}
        <div className=" p-4 sm:p-8 ">
          <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#273240]  mb-4">
            Where your money go?
          </h3>
        </div>
        {/* Tip Card */}
        <div className="bg-[#F9FAFC]  p-4 sm:p-6  text-center">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto mb-4" />
          <h4 className="text-sm sm:text-md font-bold text-gray-800 mb-2">
            Save more money
          </h4>
          <p className="text-xs sm:text-sm text-gray-500 mb-4">
            Elusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim.
          </p>
          <button className="bg-black text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg">
            VIEW TIPS
          </button>
        </div>
      </div>
      {showModal && (
        <AddTask
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            getExpenses();
          }}
        />
      )}
    </div>
  );
};

export default index;
