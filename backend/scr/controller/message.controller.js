import  Message  from "../model/message.model.js";
import User from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiSuccess } from "../utils/apiSuccess.js";
import { handler } from "../utils/handler.js";


export const users=handler(async (req,res)=>{
    const loginId= req.user._id
    const filterId = await User.find({_id:{$ne:loginId}}).select("-password")

    res.status(200).json({
        message:filterId
    }
    )
})

export const getMessage= handler(async (req,res)=>{
 try {
       const {id:chatId}=req.params
       const myId = req.user;
   
       const message = await Message.find({
           $or:[{receiverId:chatId,senderId:myId},
               {receiverId:myId,senderId:chatId}
           ]
       })
      
        res.status(200).json({
           message
        }
        )
 } catch (error) {
    console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
 }

})

export const sendMessage= handler(async (req,res)=>{
    const text =req.body;
    const {id:receiverId}= req.params;
    const myId=req.user;
    if(!text){
        throw new apiError(401,"enter somthing")
    }

    const message=await Message.create({
        receiverId,
        senderId:myId,
        text
    })

    if(!message){
        throw new apiError(500),"somthing went wrong"
    }

    res.status(201).json(new apiSuccess(201,message))
})
