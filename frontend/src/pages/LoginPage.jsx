import React, { useState } from 'react'
import { authStore } from '../store/authAxios.js'
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';

const LoginPage = () => {
const [showPassword,setShowPassword]=useState(false)
  const [formData,setFormData]=useState({
    username:"",
    password:""
  })

  const {islogin,login}=authStore();
  const validateForm=()=>{
    if(!formData.username.trim())return toast.error("enter Username");
    if(!formData.password.trim())return toast.error("enter password")

      return true
  }

  const submit=(e)=>{
    e.preventDefault()
    if(validateForm()) login(formData)
  }
  return (
    <div>
      <form onSubmit={submit} className=' w-2/5 h-screen m-auto '>

      <label className="input input-bordered flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 16 16"
            fill="currentColor"
            className="h-4 w-4 opacity-70"
            >
            <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
          </svg>
          <input
            type="text"
            className="grow"
            placeholder="username"
            value={formData.username}
            onChange={(e) =>
              setFormData({ ...formData, username: e.target.value })
            }
            />
        </label>

        
        <label className="input input-bordered flex items-center gap-2 mt-1">
          <button   type="button" onClick={()=>{
            showPassword?setShowPassword(false):setShowPassword(true)
          }}>

          <svg
           
           xmlns="http://www.w3.org/2000/svg"
           viewBox="0 0 16 16"
           fill="currentColor"
           className="h-4 w-4 opacity-70"
           >
            <path
              fillRule="evenodd"
              d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
              clipRule="evenodd"
              />
          </svg>
              </button>
          <input
           type={showPassword?"text":"password"}
            className="grow "
            value={formData.password}
            placeholder="password"
            onChange={(e) =>
              setFormData({ ...formData, password: e.target.value })
            }
            
          />
         
        </label>
        <div className='flex justify-between mt-1'>
        <button className="btn btn-primary " type='submit'>Login</button>
            <Link  to= {"/signin"}>
            <button className="btn btn-active "> Signin</button></Link>
        </div>
            </form>
    </div>
  )
}

export default LoginPage