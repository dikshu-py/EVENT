import React, { useState } from 'react';
import StatusDropdown from '../../Global/DropDown';
import ApiClient from '../../ApiClient/ApiClient';








export default function AddTask({ onClose }) {
    const [form, setFormData] = useState({
        title: '',
        status: 'Pending',
        desctiption: ''
    })

    const handleClear = () => {
        setFormData({
            title: '',
            status: 'Pending',
            desctiption: '',
            description: ''
        });
    };


    const handleSubmit = async () => {
        console.log(form)
        const res = await ApiClient.post('/addtask', form)
        
        if (res.data.success) {
            
            onClose();
        }
    }
    const statusOptions = [
        { label: "Pending", value: "Pending" },
        { label: "Ongoing", value: "Ongoing" },
        { label: "Completed", value: "Completed" },
    ]

    return (
        <div className="fixed inset-0 bg-[#ABABAB]/10 backdrop-blur-[3px] bg-opacity-40 flex items-center justify-center z-50 px-2 md:px-0">
            <div className="relative w-full max-w-lg bg-white rounded-xl border border-purple-200 p-6 sm:p-8 shadow-md text-center ">

                <button
                    onClick={onClose}
                    className="absolute top-2 right-4 text-gray-500 hover:text-black text-3xl"
                >
                    &times;
                </button>


                {/* Title */}
                <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-1">
                    Add Activity
                </h1>

                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Title </p>
                <input typeof='text' value={form.title} className=' py-[5px] px-2 w-full border border-[#ABABAB] rounded-lg ' onChange={(e) => setFormData({ ...form, title: e.target.value })} />
                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Status </p>
                <StatusDropdown option={statusOptions} initalvalue={form.status} handlefilter={(e) => setFormData({ ...form, status: e })} />
                <p className='text-left text-[14px] font-semibold mb-2  mt-2'>Description </p>
                <textarea typeof='text' value={form.description} className="h-[220px] w-full border border-[#ABABAB] rounded-lg px-2 py-[5px] text-start align-top overflow-auto focus:outline-none" onChange={(e) => setFormData({ ...form, description: e.target.value })} />

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 justify-between mt-4">
                    <button
                        onClick={handleClear}
                        className="w-full sm:w-auto bg-white border border-gray-300 text-gray-700 text-sm font-semibold px-4 py-2 rounded-md hover:bg-gray-100 transition"
                    >
                        Clear Data
                    </button>

                    <button
                        onClick={() => handleSubmit()}
                        // disabled={!csvData}
                        className={`w-full sm:w-auto px-4 py-2 text-sm font-semibold rounded-md transition ${form.amount != 0
                            ? 'bg-purple-600 text-white hover:bg-purple-700'
                            : 'bg-gray-300 text-white cursor-not-allowed'
                            }`}
                    >
                        Create Table
                    </button>
                </div>

            </div>

        </div>
    );
}
