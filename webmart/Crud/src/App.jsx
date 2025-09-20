import { Suspense, lazy, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PrivateRoutes from './Components/PRotectedRoute';

// Lazy loaded components
const Login = lazy(() => import('./Components/Auth/Login'));
const Register = lazy(() => import('./Components/Auth/Register'));
const Expense = lazy(() => import('./Components/SidebarComponent/Expense'));
const Activity = lazy(() => import('./Components/SidebarComponent/Activity'));
const Task = lazy(() => import('./Components/SidebarComponent/Tasks'));


function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="text-center p-4">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Protected Routes */}
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={< Expense/>} />
            <Route path="/expenses" element={< Expense/>} />
            <Route path="/activity" element={< Activity/>} />
            <Route path="/tasks" element={< Task/>} />
           
            
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
