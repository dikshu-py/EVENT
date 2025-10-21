import React from 'react'
import getTodayDate from '../Global/TodayDate'

const HeaderLayout = ({title,setShowModal}) => {
  return (
    <div className="flex  bg-white rounded-[20px] sm:rounded-[30px] sm:flex-row sm:items-center justify-between gap-2  p-4 sm:px-8">
                    <div>
                        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-800">{title}</h1>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">01 – {getTodayDate()}</p>
                    </div>
                    <div className="sm:mt-4 sm:mt-0 flex  space-x-2">
                        {/* Avatars */}
                        {[1, 2, 3].map((_, i) => (
                            <div key={i} className="hidden sm:block w-8 h-8 bg-gray-300 rounded-full border-2 border-white -ml-2" />
                        ))}
                        <button onClick={() => setShowModal(true)} className="w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-lg font-bold">+ </button>
                    </div>

                </div>
  )
}

export default HeaderLayout