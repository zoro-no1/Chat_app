import React, { useEffect } from "react";
import { Navebar } from "./components/Navebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import { authStore } from "./store/authAxios.js";
import ProfilePage from "./pages/profilePage.jsx";
import {Toaster} from "react-hot-toast"

const App = () => {
  const {authUser,checkingAuth,isCheckingAuth}= authStore();
  useEffect(() => {
    checkingAuth()
  
  }, [checkingAuth]);

  console.log({authUser});

  if(isCheckingAuth && !authUser){
    return <span className="loading loading-spinner loading-md"></span>
  }
  
  return (
    <div>
      <Navebar />
      <Routes>

        <Route path="/" element={authUser?<Home/>:<Navigate to="/login"/>}/>
        <Route path="/signin" element={!authUser?<Signin/>:<Navigate to="/"/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/logout" element={authUser?<LogoutPage/>:<Navigate to="/login"/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/login"/>}/>

      </Routes>

      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default App;
