import React, { useEffect, useState } from 'react'
import AddTask from './AddActivity'
import ApiClient from '../../ApiClient/ApiClient';
import getFormatedDate from '../../Global/FormatedDate';
import GroceryCard from './card';
import Calendar from 'react-calendar';
import DateSlideshow from './DateSlideshow';






const index = () => {
    const [showModal, setShowModal] = useState(false);
    const today = new Date().toString()
    const [tasks, setTask] = useState([])

    useEffect(() => {
        getActivityList();
    }, [showModal])
    const getActivityList = async () => {
        try {
            const res = await ApiClient.get('/getactivity')
            console.log(res.data)
            if (res.data.success) {
                setTask(res.data.data)
                console.log("sucess")
            }

        } catch (err) {
            console.log(`Error in Fething All activity list ${err}`)
        }
    }


    return (
        <div className="h-screen  flex  flex-col lg:flex-row bg-[#f8f9fb] p-2 sm:px-4 md:px-6 ">
            <div className="w-full  xl:w-[70%]   bg-white rounded-2xl p-8 sm:px-20 md:px-[80px] lg:px-[120px] shadow-md flex  flex-col ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 max-w-5xl">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Activity</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">{today}</p>
                    </div>
                    <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                        {/* Avatars */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="w-8 h-8 bg-gray-300 rounded-full border-2 border-white -ml-2" />
                        ))}
                        <button onClick={() => setShowModal(true)} className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">+ </button>
                    </div>

                </div>




                <div>
                     <DateSlideshow />
                </div>
                {/* Transaction List */}
                <div className='flex-1 overflow-y-auto mt-4 w-full [&::-webkit-scrollbar]:hidden'>
                    {tasks && Object.entries(tasks).map(([date, section]) => (
                        <div key={date} className="mt-2 ">



                            {console.log(section)}
                            <GroceryCard date={getFormatedDate(date)}  description={section[0].description} />


                        </div>
                    ))}

                </div>

            </div>

            {
                showModal && <AddTask isOpen={showModal} onClose={() => setShowModal(false)} />
            }

        </div>

    )
}

export default index