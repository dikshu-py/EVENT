//utils/PrivateRoutes.js

import {
  Outlet,
  Navigate
} from 'react-router-dom'
import Header from '../Global/Header'
import Sidebar from '../Global/Sidebar'
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  // let auth = localStorage.getItem('token')
  let Reduxauth = useSelector((state)=>state.user.id) // Managing State wit redux  
  console.log(Reduxauth)

  if (!Reduxauth) {
    // Not authenticated, redirect to login
    return <Navigate to="/login" />
  }

  // Authenticated: render layout + child routes
  return (
    <div className="flex flex-col min-h-screen max-w-screen ">
      {/* <Header /> */}

      <div className="flex flex-1 overflow-hidden  ">
        <Sidebar />

        <main className="flex-1 bg-gray-100  overflow-auto">
          <Outlet />
        </main>
      </div>
    </div>

  )
}



export default PrivateRoutes