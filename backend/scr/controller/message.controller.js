import  Message  from "../model/message.model.js";
import User from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiSuccess } from "../utils/apiSuccess.js";
import { handler } from "../utils/handler.js";


export const users=handler(async (req,res)=>{
    const loginId= req.user._id
    const filterId = await User.find({_id:{$ne:loginId}}).select("_password")

    res.status(200).json(
        new apiSuccess(200,filterId)
    )
})

export const getMessage= handler(async (req,res)=>{
    const {id:chatId}=req.params
    const myId = req.user;

    const message = await Message.find({
        $ro:[{receiverId:chatId,senderId:myId},
            {receiverId:myId,senderId:chatId}
        ]
    })
    if(!message){
        throw new apiError(500,"message not found")
    }
     res.status(200).json(
        new apiSuccess(200,message)
     )

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
