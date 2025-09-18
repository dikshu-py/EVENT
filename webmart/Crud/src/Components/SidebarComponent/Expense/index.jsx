import React from 'react'
import { useEffect, useState } from 'react';
import ApiClient from '../../ApiClient/ApiClient';
import BarChart from './Barchart';
import CSVImporter from './Addexpense';



const progressData = [
    { label: "Food and Drinks", value: 872400 },
    { label: "Shopping", value: 1378200 },
    { label: "Housing", value: 928500 },
    { label: "Transportation", value: 420700 },
    { label: "Vehicle", value: 520000 },
];

const icon = 'https://media.gettyimages.com/id/1468746784/vector/shopping-cart-icon-on-blue-background-flat-design-with-long-shadow.jpg?s=612x612&w=0&k=20&c=rRBS_sLJ1cblPUpLWQF93bV8uOaQPSNaURitzM6_RM4='

const index = () => {

    const [transactions, setTransactions] = useState([])
    const [showModal, setShowModal] = useState(false);


    useEffect(() => {
        getExpenses()
    }, [showModal])



    // to get all Expenses List
    // to get all Expenses List
    const getExpenses = async () => {
        try {
            const res = await ApiClient.get("/getallexpense");
            setTransactions(res.data.data);
            console.log("Expenses:", res.data.data);

            
        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    //to get the Date Data in Desired Format
    const getFormatedDate = (date) => {

        const day = new Date(date).toLocaleDateString('en-GB', { weekday: 'long' });
        const formattedDate = new Date(date).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' });
        const result = `${day}, ${formattedDate}`;
        return result
    }

    return (
        <div className="h-screen  flex  flex-col lg:flex-row bg-[#f8f9fb] p-2 sm:p-4 md:p-6 ">

            {/* Left - Main Content */}
            <div className="w-full lg:w-[70%] bg-white rounded-2xl p-8 sm:px-20 md:px-[80px] lg:px-[120px] shadow-md flex  flex-col ">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">Expenses</h1>
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

                <BarChart data={transactions} />



                {/* Transaction List */}
                <div className='flex-1 overflow-y-auto mt-4'>
                    {transactions && Object.entries(transactions).map(([date, section]) => (
                        <div key={date} className="mt-6  ">
                            <h3 className="text-xs sm:text-[18px] text-[#273240] font-bold mb-2 border-b py-2 border-[#DEDEDE]">{getFormatedDate(date)}</h3>
                            <div className="space-y-4 mt-6 overflow-auto">
                                {section.map((item, j) => (

                                    <div key={j} className="flex items-start justify-between ">

                                        <div className="flex items-start gap-4">

                                            <img src={icon} className="w-10 h-10 rounded-full" />
                                            <div>
                                                <p className="font-semibold text-[#273240] md:text-xl  text-base">{item.category}</p>
                                                <p className="text-xs sm:text-sm text-[#273240] break-words">{item.check}  •  {item.description}</p>
                                            </div>
                                        </div>
                                        <p className={`font-bold ${item.check === 'Send' ? "text-[#273240]" : "text-[#273240]"} text-sm md:text-lg `} >{item.amount !== 0 ? (item.check === 'Send' ? '-' : '+') : ''}   {item.amount}</p>

                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>

            </div>


            {/* Right - Sidebar */}
            <div className="w-full lg:w-[30%] flex flex-col gap-6 bg-[#F9FAFC] overflow-hidden">
                {/* Spending Summary */}
                <div className=" p-4 sm:p-8 ">
                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#273240]  mb-4">Where your money go?</h3>
                    <div className="space-y-4">
                        {progressData.map((item, i) => {
                            const percent = Math.min((item.value / 1500000) * 100, 100);
                            return (
                                <div key={i} className='mt-8'>
                                    <div className="flex justify-between text-xs sm:text-sm ">
                                        <span className='text-[#273240]'>{item.label}</span>
                                        <span>{item.value.toLocaleString()}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                        <div className="bg-[#31BA96] h-full rounded-full" style={{ width: `${percent}%` }} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
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
                showModal && <CSVImporter isOpen={showModal} onClose={() => setShowModal(false)} />
            }
        </div>
    )
}

export default index