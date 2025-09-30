import React, { useState } from 'react';
import StatusDropdown from '../../Global/DropDown';
import ApiClient from '../../ApiClient/ApiClient';




const CategoryOption = [
    { label: "Grocery", value: "Grocery" },
    { label: "Rent", value: "Rent" },
    { label: "Shopping", value: "Shopping" },
    { label: "Transport", value: "Transport" },
    { label: "Food", value: "Food" },
    { label: "Friend", value: "Friend" },
    

]
const subCategoryOption = [
    { label: "Arvind", value: "Arvind" },
    { label: "Niranjan", value: "Niranjan" },
    { label: "Akshay", value: "Akshay" },
    { label: "Tanuj", value: "Tanuj" },
    { label: "Aryan", value: "Aryan" },
    { label: "Sahil", value: "Sahil" },

]





export default function CSVImporter({ onClose }) {
    const [form, setFormData] = useState({
        category: 'Grocery',
        subcategory: '',
        check: 'Send',
        amount: 0,
        description: ''
    })

    const handleClear = () => {
        setFormData({
            category: 'Grocery',
            subcategory: '',
            check: 'Send',
            amount: 0,
            description: ''
        });
    };

    const modeOption = [
        { label: "Send", value: "Send" },
        { label: "Received", value: "Received" },

    ]
     const handleSubmit = async ()=>{
        console.log(form)
        const res = await ApiClient.post('/addexpense', form)
        console.log(res)
        if(res.data.success){
           
            onClose()
        }
     }

    return (
        <div className="fixed inset-0 bg-[#ABABAB]/10 backdrop-blur-[3px] bg-opacity-40 flex items-center justify-center z-50 px-2 md:px-0">
            <div className="relative w-full max-w-md bg-white rounded-xl border border-purple-200 p-6 sm:p-8 shadow-md text-center ">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl"
                >
                    &times;
                </button>


                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                    Add Expense
                </h1>

                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Category</p>
                <StatusDropdown option={CategoryOption} handlefilter={(e) => setFormData({ ...form, category: e })} />
                {
                    form.category == "Friend" &&
                    <div>
                        <p className='text-left text-[14px] font-semibold mb-2  mt-2'>SubCategory</p>
                        <StatusDropdown option={subCategoryOption} handlefilter={(e) => setFormData({ ...form, subcategory: e })} />
                    </div>
                }


                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Amount</p>
                <input type='Number' value={form.amount} onChange={(e) => setFormData({ ...form, amount: e.target.value })} className=' py-[5px] px-2 w-full border border-[#ABABAB] rounded-lg ' />

                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Type</p>
                <StatusDropdown option={modeOption} handlefilter={(e) => setFormData({ ...form, check: e })} />
                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Description </p>
                <textarea typeof='text' value={form.description} className="h-20 w-full border border-[#ABABAB] rounded-lg px-2 py-[5px] text-start align-top overflow-auto focus:outline-none" onChange={(e) => setFormData({ ...form, description: e.target.value })} />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
                    <button
                        onClick={handleClear}
                        className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                        Clear Data
                    </button>

                    <button
                        onClick={()=> handleSubmit()}
                        // disabled={!csvData}
                        className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition ${form.amount != 0
                                ? 'bg-purple-600 text-white hover:bg-purple-700'
                                : 'bg-gray-300 text-white cursor-not-allowed'
                            }`}
                    >
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}
