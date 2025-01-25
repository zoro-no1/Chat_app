import User from "../scr/model/user.model.js"
import { apiError } from "../scr/utils/apiError.js"
import { handler } from "../scr/utils/handler.js"
import jwt from "jsonwebtoken"

export const isLogin= handler(async (req,res,next)=>{
   try {
     const token = req.cookies.token

     if(!token){
     
      res.status(401).clearCookie("token").json({message:"not login"})
      // throw new apiError(401,"not login")
     }
     
   const refreshToken= jwt.verify(token,"token")
 
     const user= await User.findById(refreshToken._id).select("_password")
 
     if (!user) {
      res.status(401).clearCookie("token").json({message:"token not vailde"})
        // throw new apiError(404,"token invalid")
     }
      req.user=refreshToken;
 
     next()
   } catch (error) {
    throw new apiError(401,error.message)
   }
    
})