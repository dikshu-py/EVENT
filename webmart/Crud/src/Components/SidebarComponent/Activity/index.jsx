import React, { useEffect, useState } from 'react'
import AddTask from './AddActivity'






const index = () => {
    const [showModal, setShowModal] = useState(false);
    const today = new Date().toString()

    useEffect(()=>{
        getActivityList();
    },[showModal])



    return (
        <div className="h-screen  flex  flex-col lg:flex-row bg-[#f8f9fb] p-2 sm:p-4 md:p-6 ">
            <div className="w-full lg:w-[70%] bg-white rounded-2xl p-8 sm:px-20 md:px-[80px] lg:px-[120px] shadow-md flex  flex-col ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
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





                {/* Transaction List */}
                <div className='flex-1 overflow-y-auto mt-4'>
                    Hello

                </div>

            </div>

            {
                showModal && <AddTask isOpen={showModal} onClose={() => setShowModal(false)} />
            }

        </div>

    )
}

export default index