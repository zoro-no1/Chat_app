import React from 'react'
import { authStore } from '../store/authAxios'
import { Link } from 'react-router-dom'

const LogoutPage = () => {

  const {logout}=authStore()



  return (
    <>
    <div className='flex justify-around'>

    <button onClick={logout}>Logout</button>

    <Link to={"/login"}>
    <button>login</button>
    </Link>
    
    </div>
    </>
  )
}

export default LogoutPage