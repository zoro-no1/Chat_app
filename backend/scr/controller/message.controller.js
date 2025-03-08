import  Message  from "../model/message.model.js";
import User from "../model/user.model.js";
import { handler } from "../utils/handler.js";
import { getReceiverSocketId, io } from "../utils/socket.js";


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
   // console.log("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
 }

})

export const sendMessage= handler(async (req,res)=>{
    const {text} =req.body;
    const {id:receiverId}= req.params;
    const myId=req.user;
    if(!text){
       res.status(404).json({data:"empty Text"})
    }

    const message=await Message.create({
        receiverId,
        senderId:myId,
        text
    })
    await message.save();
//realtime message 
    const getreceiverId = getReceiverSocketId(receiverId)

    if(getreceiverId){
        io.to(getreceiverId).emit("newMessage",message)
    }

    if(!message){
        res.status(404).json({data:"Message Not Found"})
    }

    res.status(201).json({message:message.text})
})
