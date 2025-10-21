import React, { useEffect, useState } from "react";
import AddTask from "./AddActivity";
import ApiClient from "../../ApiClient/ApiClient";
import getFormatedDate from "../../Global/FormatedDate";
import GroceryCard from "./card";
import Calendar from "react-calendar";
import DateSlideshow from "./DateSlideshow";
import HeaderLayout from "../../Common/HeaderLayout";
import { title } from "./shared";

const index = () => {
  const [showModal, setShowModal] = useState(false);
  const today = new Date().toString();
  const [tasks, setTask] = useState([]);

  useEffect(() => {
    getActivityList();
  }, [showModal]);
  const getActivityList = async () => {
    try {
      const res = await ApiClient.get("/getactivity");
      console.log(res.data);
      if (res.data.success) {
        setTask(res.data.data);
        console.log("sucess");
      }
    } catch (err) {
      console.log(`Error in Fething All activity list ${err}`);
    }
  };

  return (
    <div className="h-screen  flex  flex-col lg:flex-row bg-[#f8f9fb] p-2 sm:px-4 md:px-6 ">
      <div className="w-full  xl:w-[70%]   bg-white rounded-2xl  shadow-md flex  flex-col ">
        {/* Header */}
        <HeaderLayout title={title} setShowModal={setShowModal} />

        <div className="mx-auto">
          <DateSlideshow />
        </div>
        {/* Transaction List */}
        <div className="flex-1 overflow-y-auto mt-4 w-full [&::-webkit-scrollbar]:hidden ">
          {tasks &&
            Object.entries(tasks).map(([date, section]) => (
              <div key={date} className="mt-2 ">
                {console.log(section)}
                <GroceryCard
                  date={getFormatedDate(date)}
                  description={section[0].description}
                />
              </div>
            ))}
        </div>
      </div>

      {showModal && (
        <AddTask isOpen={showModal} onClose={() => setShowModal(false)} />
      )}
    </div>
  );
};

export default index;
