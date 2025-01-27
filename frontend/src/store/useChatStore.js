import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../util/axios";


export const useChatStore = create((set,get)=>({
    message:[],
    users:[],
    selectUser:null,
    isUserLoading:false,
    isMessageLoading:false,


    getUsers: async()=>{
        set({isUserLoading:true})
        try {
            const res = await axiosInstance.get("/message/users");
            
            set({users:res.data.message});
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isUserLoading:false})
        }
    },

    getMessage: async (id)=>{
        set({isMessageLoading:true});
        try {
            const res = await axiosInstance.get(`/message/${id}`);
            console.log(res);
            
            set({message:res.data});
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoading:false})
        }
    },
        /*funcation for sending Messages*/
        
    sendMessage: async(messageData)=>{
        const {selectUser,message}=get();
        try {
            const res= await axiosInstance.post(`/message/send/${selectUser._id}`,messageData);
            set({message:[...message,res.data.message]})
        } catch (error) {
            toast.error(error.response.data)
        }
    },
    setSelectUser: async(user)=>{
        set({selectUser:user})
    }
}))