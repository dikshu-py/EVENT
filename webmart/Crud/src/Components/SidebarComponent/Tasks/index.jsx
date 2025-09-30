import React from 'react'
import AddTask from './AddTask';
import { useState, useEffect } from 'react'
import ApiClient from '../../ApiClient/ApiClient';
import getFormatedDate from '../../Global/FormatedDate';
import getdayDate from '../../Global/Daydate';
import TaskTable from './TaskTable';

const index = () => {
    const [tasks, setTask] = useState([])
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getExpenses()
    }, [showModal])




    // to get all Expenses List
    const getExpenses = async () => {
        try {
            const res = await ApiClient.get("/getalltask");
            setTask(res.data.data);
            console.log("Activityy:", res.data.data);


        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    //to get the Date Data in Desired Format

    return (
        <div className="h-screen  flex  flex-col lg:flex-row bg-[#f8f9fb] p-2 sm:p-4 md:p-6 ">

            {/* Left - Main Content */}
            <div className="w-full lg:w-[70%]  rounded-2xl  shadow-b-md flex  flex-col gap-8">
                {/* Header */}
                <div className="flex flex-col bg-white rounded-[30px] sm:flex-row sm:items-center sm:justify-between gap-2  p-4 sm:px-20 md:px-[80px] lg:px-[120px]">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Tasks</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">01 – 25 March, 2020</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                        {/* Avatars */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white -ml-2" />
                        ))}
                        <button onClick={() => setShowModal(true)} className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">+ </button>
                    </div>

                </div>





                {/* Transaction List */}
                <div className='flex-1 overflow-y-auto bg-white rounded-[30px] '>
                    {/* 
{tasks && Object.values(tasks).map((item) => (
    <div key={item._id} className="mt-6">
        <h3 className="text-xs sm:text-[18px] text-[#273240] font-bold mb-2 border-b py-2 border-[#DEDEDE]">{getFormatedDate(date)}</h3>
        <div className="space-y-4 mt-6 overflow-auto">
            {console.log(item)}
            <div key={item._id} className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                    <img src='https://cdn-icons-png.flaticon.com/512/906/906334.png' className="w-10 h-10 rounded-full" alt='logo' />
                    <div>
                        <p className="font-semibold text-[#273240] md:text-xl text-base">{item.title}</p>
                        <p className="text-xs sm:text-sm text-[#273240] break-words">{item.status}  •  {item.description}</p>
                    </div>
                </div>
                <p>{getdayDate(getFormatedDate(item.createdAt))}</p>
            </div>
        </div>
    </div>
))} 
*/}
                 <TaskTable />

                </div>

            </div>


            {/* Right - Sidebar */}
            <div className="w-full lg:w-[30%] flex flex-col gap-6 bg-[#F9FAFC] overflow-hidden">
                {/* Spending Summary */}
                <div className=" p-4 sm:p-8 ">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#273240]  mb-4">Where your money go?</h3>


                </div>
                {/* Tip Card */}
                <div className="bg-[#F9FAFC]  p-4 sm:p-6  text-center">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto mb-4" />
                    <h4 className="text-sm sm:text-md font-bold text-gray-800 mb-2">Save more money</h4>
                    <p className="text-xs sm:text-sm text-gray-500 mb-4">
                        Elusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim.
                    </p>
                    <button className="bg-black text-white text-xs sm:text-sm font-semibold px-4 py-2 rounded-lg">
                        VIEW TIPS
                    </button>
                </div>
            </div>
            {
                showModal && <AddTask isOpen={showModal} onClose={() => setShowModal(false)} />
            }
           
        </div>
    )
}

export default index