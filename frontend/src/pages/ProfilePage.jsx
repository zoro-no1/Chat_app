import React, { useState } from 'react'
import { authStore } from '../store/authAxios'
import {Camera} from "lucide-react"

const profilePage = () => {
  const {authUser,updatePic,isFileUpload}=authStore();

  const [selectImg,setSelectImg]=useState(null)

  const hanldelUpload=(e)=>{
    const file=e.target.files[0];
    if(!file)return
    const reader=new FileReader();
    reader.readAsDataURL(file);
    reader.onload= async ()=>{
      const base64Image=reader.result;
      setSelectImg(base64Image)
      await updatePic({profileImg:base64Image})
    } 
  }
  return (
    <div>
      <div className=' w-4/6 h-3/4  m-auto'>
    <h1 className=' text-center'>Profile</h1>
    <img className=' rounded-full max-w-[33%] m-auto object-contain' src={selectImg||authUser.profileImg||"/avatar.webp"} alt="error" />

    <label className=''>
    <Camera className=''/>
    <input type="file" className='hidden' accept='image/*' onChange={hanldelUpload}  />
    </label>
    <div>
      <p>{isFileUpload?"Updating.....":"click to Upload"}</p>
    </div>
    <div className='p-4'>
      <label className='pl-3'>Username</label>
        <p className=' rounded-full border-2 pl-3'>{authUser?.username||"user"}</p>
    </div>
    <div className='p-4 pt-1'>
      <label className='pl-3' >Email </label>
        <p className=' rounded-full border-2 pl-3'>{authUser.email||"email"}</p>
    </div>
      </div>
    </div>
  )
}

export default profilePage