import React, { useEffect } from "react";
import { Navebar } from "./components/Navebar";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signin from "./pages/Signin";
import LoginPage from "./pages/LoginPage";
import LogoutPage from "./pages/LogoutPage";
import { authStore } from "./store/authAxios.js";
import ProfilePage from "./pages/ProfilePage.jsx";
import {Toaster} from "react-hot-toast"
import SettingPage from "./pages/SettingPage.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

const App = () => {
  const {theme}= useThemeStore();
  const {authUser,checkingAuth,isCheckingAuth,onlineUsers}= authStore();
  useEffect(() => {
    checkingAuth()
    
  }, [checkingAuth,onlineUsers]);

 // console.log(onlineUsers);
  
 // console.log({authUser});

  if(isCheckingAuth && !authUser){
    return <span className="loading loading-spinner loading-md"></span>
  }
  
  return (
    <div data-theme={theme}>
      <Navebar />
      <Routes>

        <Route path="/" element={authUser?<Home/>:<Navigate to="/signin"/>}/>
        <Route path="/signin" element={!authUser?<Signin/>:<Navigate to="/"/>}/>
        <Route path="/login" element={authUser?<Navigate to="/"/>:<LoginPage/>}/>
        <Route path="/logout" element={authUser?<LogoutPage/>:<Navigate to="/signin"/>}/>
        <Route path="/profile" element={authUser?<ProfilePage/>:<Navigate to="/signin"/>}/>
        <Route path="/setting" element={<SettingPage/>}/>

      </Routes>

      <Toaster
  position="top-center"
  reverseOrder={false}
/>
    </div>
  );
};

export default App;
