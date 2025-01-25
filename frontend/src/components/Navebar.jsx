import { Link } from "react-router-dom"
import { authStore } from "../store/authAxios"

export const Navebar = () => {
  return (
    <div className="flex justify-center items-center w-full overflow-hidden">
      <div className="w-full ">

      <div className=" flex justify-between items-center px-4 h-20 p-auto ">
        <Link to={"/"}>
        <div>chat</div>
        </Link>
        <div className="flex w-28 sm:w-52 justify-between ">
       
       <Link to={"/setting"}>
       <div>Setting</div></Link>
         <Link to={"/profile"} className="hidden sm:block">
          <div>profile</div>
          </Link> 
          <Link to={"/logout"}>
          <div>logout</div>
          </Link>
        </div>
      </div>
      </div>
    </div>
  )
}
