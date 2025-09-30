import React from 'react'
import { useEffect, useState } from 'react';
import ApiClient from '../../ApiClient/ApiClient';
import BarChart from './Barchart';
import CSVImporter from './Addexpense';
import getFormatedDate from '../../Global/FormatedDate';



const dummyprogressData = {
  "Food and Drinks": 872400,
  "Shopping": 1378200,
  "Housing": 928500,
  "Transportation": 420700,
  "Vehicle": 520000
}



const icons = {
    "Grocery": <svg width="40" height="40" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#32A7E2" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M20.8 28.8C19.92 28.8 19.208 29.52 19.208 30.4C19.208 31.28 19.92 32 20.8 32C21.68 32 22.4 31.28 22.4 30.4C22.4 29.52 21.68 28.8 20.8 28.8ZM16 16V17.6H17.6L20.48 23.672L19.4 25.632C19.272 25.856 19.2 26.12 19.2 26.4C19.2 27.28 19.92 28 20.8 28H30.4V26.4H21.136C21.024 26.4 20.936 26.312 20.936 26.2L20.96 26.104L21.68 24.8H27.64C28.24 24.8 28.768 24.472 29.04 23.976L31.904 18.784C31.968 18.672 32 18.536 32 18.4C32 17.96 31.64 17.6 31.2 17.6H19.368L18.616 16H16ZM28.8 28.8C27.92 28.8 27.208 29.52 27.208 30.4C27.208 31.28 27.92 32 28.8 32C29.68 32 30.4 31.28 30.4 30.4C30.4 29.52 29.68 28.8 28.8 28.8Z" fill="white" />
    </svg>,
    "Transport": <svg width="40" height="40"  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#B548C6" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M17 27.7895C17 28.5305 17.3284 29.1958 17.8421 29.6589V31.1579C17.8421 31.6211 18.2211 32 18.6842 32H19.5263C19.9895 32 20.3684 31.6211 20.3684 31.1579V30.3158H27.1053V31.1579C27.1053 31.6211 27.4842 32 27.9474 32H28.7895C29.2526 32 29.6316 31.6211 29.6316 31.1579V29.6589C30.1453 29.1958 30.4737 28.5305 30.4737 27.7895V19.3684C30.4737 16.4211 27.4589 16 23.7368 16C20.0147 16 17 16.4211 17 19.3684V27.7895ZM19.9474 28.6316C19.2484 28.6316 18.6842 28.0674 18.6842 27.3684C18.6842 26.6695 19.2484 26.1053 19.9474 26.1053C20.6463 26.1053 21.2105 26.6695 21.2105 27.3684C21.2105 28.0674 20.6463 28.6316 19.9474 28.6316ZM27.5263 28.6316C26.8274 28.6316 26.2632 28.0674 26.2632 27.3684C26.2632 26.6695 26.8274 26.1053 27.5263 26.1053C28.2253 26.1053 28.7895 26.6695 28.7895 27.3684C28.7895 28.0674 28.2253 28.6316 27.5263 28.6316ZM28.7895 23.5789H18.6842V19.3684H28.7895V23.5789Z" fill="white" />
    </svg>
    ,
    "Rent": <svg width="40" height="40"  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#FF8700" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M22.4 30.6V25.8H25.6V30.6H29.6V24.2H32L24 17L16 24.2H18.4V30.6H22.4Z" fill="white" />
    </svg>

    ,
    "Shopping": <svg width="40" height="40"  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#4BA83D" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M24 15C19.032 15 15 19.032 15 24C15 28.968 19.032 33 24 33C28.968 33 33 28.968 33 24C33 19.032 28.968 15 24 15ZM22.2 28.05V19.95L27.6 24L22.2 28.05Z" fill="white" />
    </svg>
    ,
    "Food": <svg width="40" height="40"  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#DC3434" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4013 28.7446H31.9798C31.4686 28.7446 31.4883 28.2573 31.4883 28.2573C31.4883 28.2573 31.485 28.2585 31.4841 28.2585C31.1996 25.3973 29.3357 23.0069 26.7749 21.9657C26.7676 21.9621 26.7625 21.9584 26.7552 21.955C26.3399 21.7734 26.3301 21.3666 26.3301 21.3666V20.2745C26.3301 19.571 25.7602 19 25.0558 19H22.7719C22.0682 19 21.4974 19.571 21.4974 20.2745V21.5288C21.4859 21.6339 21.4238 21.8086 21.1522 21.9235C21.1347 21.9311 21.1215 21.9385 21.1075 21.9449C18.525 22.972 16.6389 25.3661 16.3451 28.2385L16.3417 28.2374C16.3417 28.2374 16.2995 28.7446 15.8148 28.7446H15.4993C15.3993 28.7469 15 28.782 15 29.1936V29.5229C15.0059 29.664 15.0672 30 15.5294 30H32.2781C32.7361 30 32.8157 29.7037 32.8275 29.5552V29.22C32.8275 28.8242 32.5447 28.7544 32.4013 28.7446ZM25.4098 21.028C25.4073 21.1298 25.3685 21.5057 24.897 21.4619C24.8711 21.4593 24.854 21.4602 24.8365 21.461C24.5334 21.4236 24.2275 21.3986 23.9138 21.3986C23.557 21.3986 23.208 21.4332 22.8639 21.4818C22.84 21.4807 22.8124 21.4818 22.7784 21.4861C22.4042 21.5305 22.3387 21.296 22.3297 21.1757V20.595C22.3297 20.1463 22.6929 19.7825 23.142 19.7825H24.5978C25.0466 19.7825 25.4101 20.1463 25.4101 20.595V21.028H25.4098ZM28.8949 28.7384H28.2513C27.922 28.7384 27.8383 28.5616 27.8191 28.4378C27.8191 28.4083 27.8177 28.3678 27.816 28.32C27.7941 27.6739 27.6288 25.4567 26.4029 23.7028L26.4088 23.7025L26.2671 23.4624C26.2519 23.3741 26.2573 23.2456 26.4738 23.4258C27.5363 24.3413 29.1069 26.0848 29.1971 28.4648C29.1912 28.568 29.1454 28.7384 28.8949 28.7384Z" fill="white" />
    </svg>,
    "Friend": <svg width="40" height="40"  viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="24" cy="24" r="24" fill="#DC3434" />
        <path fill-rule="evenodd" clip-rule="evenodd" d="M32.4013 28.7446H31.9798C31.4686 28.7446 31.4883 28.2573 31.4883 28.2573C31.4883 28.2573 31.485 28.2585 31.4841 28.2585C31.1996 25.3973 29.3357 23.0069 26.7749 21.9657C26.7676 21.9621 26.7625 21.9584 26.7552 21.955C26.3399 21.7734 26.3301 21.3666 26.3301 21.3666V20.2745C26.3301 19.571 25.7602 19 25.0558 19H22.7719C22.0682 19 21.4974 19.571 21.4974 20.2745V21.5288C21.4859 21.6339 21.4238 21.8086 21.1522 21.9235C21.1347 21.9311 21.1215 21.9385 21.1075 21.9449C18.525 22.972 16.6389 25.3661 16.3451 28.2385L16.3417 28.2374C16.3417 28.2374 16.2995 28.7446 15.8148 28.7446H15.4993C15.3993 28.7469 15 28.782 15 29.1936V29.5229C15.0059 29.664 15.0672 30 15.5294 30H32.2781C32.7361 30 32.8157 29.7037 32.8275 29.5552V29.22C32.8275 28.8242 32.5447 28.7544 32.4013 28.7446ZM25.4098 21.028C25.4073 21.1298 25.3685 21.5057 24.897 21.4619C24.8711 21.4593 24.854 21.4602 24.8365 21.461C24.5334 21.4236 24.2275 21.3986 23.9138 21.3986C23.557 21.3986 23.208 21.4332 22.8639 21.4818C22.84 21.4807 22.8124 21.4818 22.7784 21.4861C22.4042 21.5305 22.3387 21.296 22.3297 21.1757V20.595C22.3297 20.1463 22.6929 19.7825 23.142 19.7825H24.5978C25.0466 19.7825 25.4101 20.1463 25.4101 20.595V21.028H25.4098ZM28.8949 28.7384H28.2513C27.922 28.7384 27.8383 28.5616 27.8191 28.4378C27.8191 28.4083 27.8177 28.3678 27.816 28.32C27.7941 27.6739 27.6288 25.4567 26.4029 23.7028L26.4088 23.7025L26.2671 23.4624C26.2519 23.3741 26.2573 23.2456 26.4738 23.4258C27.5363 24.3413 29.1069 26.0848 29.1971 28.4648C29.1912 28.568 29.1454 28.7384 28.8949 28.7384Z" fill="white" />
    </svg>


}

const index = () => {

    const [transactions, setTransactions] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [progressData, setprogressData] = useState(dummyprogressData)

    useEffect(() => {
        getExpenses()
        getexpensebyCat()
    }, [showModal])




    // to get all Expenses List
    const getExpenses = async () => {
        try {
            const res = await ApiClient.get("/getallexpense");
            setTransactions(res.data.data);



        } catch (err) {
            console.error("Error fetching expenses:", err);
        }
    };

    const getexpensebyCat = async (req, res) => {
        try {
            const res = await ApiClient.get('/getallexpensebyCat')
            if (res.data.success) {
                setprogressData(res.data.data)
                console.log(res.data.data, "databyCat")
            }


        } catch (err) {
            console.log(`Error in fetching All Expense by Cat ${err}`)
        }
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
                <div className='flex-1 overflow-y-auto mt-4 scrollbar-none scrollbar-hide [&::-webkit-scrollbar]:hidden'>
                    {transactions && Object.entries(transactions).map(([date, section]) => (
                        <div key={date} className="mt-6  ">
                            <h3 className="text-xs sm:text-[18px] text-[#273240] font-bold mb-2 border-b py-2 border-[#DEDEDE]">{getFormatedDate(date)}</h3>
                            <div className="space-y-4 mt-6 overflow-auto scrollbar-none scrollbar-hide">
                                {section.map((item, j) => (

                                    <div key={j} className="flex items-start justify-between ">

                                        <div className="flex items-start gap-4">

                                            <div className="w-10 h-10 rounded-full">
                                                
                                                    {icons[item.category] || <span>No Icon</span>}
                                                
                                                
                                            </div>

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
                        {Object.entries(progressData).map(([label, value]) => {
                            const percent = Math.min((value / 1500) * 100, 100);

                            return (
                                <div key={label} className='mt-8'>
                                    <div className="flex justify-between text-xs sm:text-sm">
                                        <span className='text-[#273240]'>{label}</span>
                                        <span>{value}</span>
                                    </div>
                                    <div className="w-full bg-gray-200 h-2 rounded-full mt-1">
                                        <div
                                            className="bg-[#31BA96] h-full rounded-full"
                                            style={{ width: `${percent}%` }}
                                        />
                                    </div>
                                </div>
                            );
                        })}


                    </div>
                </div>
                {/* Tip Card */}
                <div className="bg-[#F9FAFC]  p-4 sm:p-6  text-center">
                    {/* <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-full mx-auto mb-4" /> */}
                    
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