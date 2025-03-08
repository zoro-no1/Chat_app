import { Link } from "react-router-dom"
import { authStore } from "../store/authAxios"
import {User,Settings,LogOut,MessageSquare} from "lucide-react"

export const Navebar = () => {
  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="w-full ">

      <div className=" flex justify-between items-center px-4 h-20 p-auto mx-4 ">
        <Link to={"/"}>
        <MessageSquare/>
        </Link>
        <div className="flex w-28 sm:w-52 justify-between ">
       
       <Link to={"/setting"}>
       <Settings className="sm:hidden"/>
       <div className="hidden sm:block">Setting</div></Link>
         <Link to={"/profile"} >
         <User className="sm:hidden"/>
          <div className="hidden sm:block">profile</div>
          </Link> 
          <Link to={"/logout"}>
          <LogOut className="sm:hidden"/>
          <div className="hidden sm:block">logout</div>
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
