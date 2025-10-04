import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate();
  const [active, setActive] = useState("");

  const content = {

    "Organization": ["Expenses", "Tasks", "Learning", "Activity"],

  }
  const icons = {
    "Expenses": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.5 9.16659H6.66667M4.58333 11.2499V7.08325M12.0833 11.6666C15.0903 11.6666 16.6951 12.6733 17.2609 14.6867C17.5598 15.75 16.6046 16.6666 15.5 16.6666H8.66666C7.56209 16.6666 6.60687 15.75 6.90573 14.6867C7.47159 12.6733 9.07637 11.6666 12.0833 11.6666ZM12.0833 8.33325C13.4722 8.33325 14.1667 7.61897 14.1667 5.83325C14.1667 4.04754 13.4722 3.33325 12.0833 3.33325C10.6944 3.33325 10 4.04754 10 5.83325C10 7.61897 10.6944 8.33325 12.0833 8.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Tasks": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.4209 15.8334H16.6667C17.5871 15.8334 18.3891 15.0634 18.0967 14.1906C17.651 12.8605 16.5546 12.0561 14.6273 11.7775M12.0834 9.05382C12.3259 9.13047 12.6037 9.16675 12.9167 9.16675C14.3056 9.16675 15 8.45246 15 6.66675C15 4.88103 14.3056 4.16675 12.9167 4.16675C12.6037 4.16675 12.3259 4.20303 12.0834 4.27968M7.91667 11.6667C10.7363 11.6667 12.323 12.4044 12.9763 13.8796C13.4236 14.8896 12.4379 15.8334 11.3333 15.8334H4.5C3.39543 15.8334 2.40976 14.8896 2.85702 13.8796C3.51034 12.4044 5.09706 11.6667 7.91667 11.6667ZM7.91667 9.16675C9.30556 9.16675 10 8.45246 10 6.66675C10 4.88103 9.30556 4.16675 7.91667 4.16675C6.52778 4.16675 5.83333 4.88103 5.83333 6.66675C5.83333 8.45246 6.52778 9.16675 7.91667 9.16675Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Learning": <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6.33301 5.33333C6.33301 4.78105 6.78072 4.33333 7.33301 4.33333H8.66634C9.21863 4.33333 9.66634 4.78105 9.66634 5.33333V11.6667C9.66634 12.219 9.21863 12.6667 8.66634 12.6667H7.33301C6.78072 12.6667 6.33301 12.219 6.33301 11.6667V5.33333Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M1.33301 8.66667C1.33301 8.11438 1.78072 7.66667 2.33301 7.66667H3.66634C4.21863 7.66667 4.66634 8.11438 4.66634 8.66667V11.6667C4.66634 12.219 4.21863 12.6667 3.66634 12.6667H2.33301C1.78072 12.6667 1.33301 12.219 1.33301 11.6667V8.66667Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M11.333 2C11.333 1.44772 11.7807 1 12.333 1H13.6663C14.2186 1 14.6663 1.44772 14.6663 2V11.6667C14.6663 12.219 14.2186 12.6667 13.6663 12.6667H12.333C11.7807 12.6667 11.333 12.219 11.333 11.6667V2Z" stroke="#4D007D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,
    "Activity": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33301 3.33325C8.33301 6.09468 6.09443 8.33325 3.33301 8.33325C6.09443 8.33325 8.33301 10.5718 8.33301 13.3333C8.33301 10.5718 10.5716 8.33325 13.333 8.33325C10.5716 8.33325 8.33301 6.09468 8.33301 3.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.583 12.4999C14.583 13.6505 13.6503 14.5833 12.4997 14.5833C13.6503 14.5833 14.583 15.516 14.583 16.6666C14.583 15.516 15.5157 14.5833 16.6663 14.5833C15.5157 14.5833 14.583 13.6505 14.583 12.4999Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>,
    "Discussion": <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8.33301 3.33325C8.33301 6.09468 6.09443 8.33325 3.33301 8.33325C6.09443 8.33325 8.33301 10.5718 8.33301 13.3333C8.33301 10.5718 10.5716 8.33325 13.333 8.33325C10.5716 8.33325 8.33301 6.09468 8.33301 3.33325Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
      <path d="M14.583 12.4999C14.583 13.6505 13.6503 14.5833 12.4997 14.5833C13.6503 14.5833 14.583 15.516 14.583 16.6666C14.583 15.516 15.5157 14.5833 16.6663 14.5833C15.5157 14.5833 14.583 13.6505 14.583 12.4999Z" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
    ,



  }


  const handleClick = (item) => {
    setActive(item);
    if (item == "Logout") {
      localStorage.removeItem('token')
      navigate("/login")
    }
    else if (item == "Candidates") {
      navigate('/')

    } else {
      navigate(`/${item.toLowerCase()}`)
    }
  }
  return (
    <div className="w-[64px] lg:w-[280px]   text-white space-y-4 border-r border-[#D6D6D6] transition-all ease-in-out duration-300 flex flex-col justify-between">
      <div>
        <div className='text-5xl font-medium text-black mt-8 text-center flex gap-2 px-2 lg:px-8'>
          {<svg width="47" height="47" viewBox="0 0 37 37" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18.5003 34.8876C17.4674 34.8876 16.419 34.6564 15.602 34.1784L7.12284 29.2914C3.66951 26.9634 3.45367 26.6089 3.45367 22.9551V14.0443C3.45367 10.3905 3.65409 10.0359 7.04576 7.73887L15.5865 2.80553C17.2053 1.86512 19.749 1.86512 21.3678 2.80553L29.8778 7.70803C33.3311 10.0359 33.547 10.3905 33.547 14.0443V22.9397C33.547 26.5934 33.3465 26.948 29.9549 29.2451L21.414 34.1784C20.5815 34.6564 19.5332 34.8876 18.5003 34.8876ZM18.5003 4.42428C17.8528 4.42428 17.2207 4.54762 16.7736 4.8097L8.29451 9.7122C5.78159 11.408 5.78159 11.408 5.78159 14.0443V22.9397C5.78159 25.5759 5.78159 25.5759 8.35617 27.318L16.7736 32.1743C17.6832 32.6984 19.3328 32.6984 20.2424 32.1743L28.7215 27.2718C31.219 25.5759 31.219 25.5759 31.219 22.9397V14.0443C31.219 11.408 31.219 11.408 28.6445 9.66595L20.227 4.8097C19.7799 4.54762 19.1478 4.42428 18.5003 4.42428Z" fill="black" />
            <path d="M18.5 24.2812C15.3088 24.2812 12.7188 21.6912 12.7188 18.5C12.7188 15.3088 15.3088 12.7188 18.5 12.7188C21.6912 12.7188 24.2812 15.3088 24.2812 18.5C24.2812 21.6912 21.6912 24.2812 18.5 24.2812ZM18.5 15.0312C16.5883 15.0312 15.0312 16.5883 15.0312 18.5C15.0312 20.4117 16.5883 21.9688 18.5 21.9688C20.4117 21.9688 21.9688 20.4117 21.9688 18.5C21.9688 16.5883 20.4117 15.0312 18.5 15.0312Z" fill="black" />
          </svg>
          }
          <h1 className='hidden lg:block'>Event<span className='text-[10px] text-[#ABABAB] ml-2'>V<span className='text-[16px]'>.01</span></span></h1>
          </div>
        {Object.entries(content).map(([section, items], index) => (
          <div key={index} className='mt-20'>
            {/* <h2 className="font-bold hidden lg:block text-sm text-[#A4A4A4] uppercase mb-2 mx-4">{section}</h2> */}

            <div >
              <ul className="mt-[16px]">
                {items.map((item, i) => (
                  <li key={i} onClick={() => handleClick(item)} className={` relative px-3 lg:px-5 py-2 font-semibold     cursor-pointer text-[#9197B3]`}>
                    <div className={`${active === item ? "block" : "hidden"} absolute -left-1 h-9 lg:h-10 w-2 rounded-xl bg-[#87CEFA] `}></div>
                    <div className={`flex items-center justify-center lg:justify-start   h-9 w-full lg:w-full lg:h-full gap-4 ${active === item ? "bg-[#87CEFA] text-black" : ""} rounded  lg:mt-0 lg:px-5 lg:py-2`}>
                      {icons[item]}
                      <p className="hidden lg:block">{item}</p>
                    </div>
                  </li>
                ))}
              </ul>

            </div>

          </div>

        ))}

      </div>

      <div className={`flex items-center gap-4 ${active === "Logout" ? "bg-[#87CEFA]/40 text-black" : ""} rounded px-5 py-2 mb-10`}>
        {
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.6663 16.6667H5.33301C4.22844 16.6667 3.33301 15.7713 3.33301 14.6667L3.33301 5.33341C3.33301 4.22884 4.22844 3.33342 5.33301 3.33342H11.6663M8.33301 10.0001H17.4997M17.4997 10.0001L14.9997 12.5001M17.4997 10.0001L14.9997 7.50008" stroke="#121212" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        }
        <p className="hidden lg:block text-black">Logout</p>
      </div>
    </div>
  )
}

export default Sidebar