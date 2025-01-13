import React from 'react'
import { authStore } from '../store/authAxios'

const LogoutPage = () => {

  const {logout}=authStore()



  return (
    <>
    <button onClick={logout}>Logout</button>
    </>
  )
}

export default LogoutPage