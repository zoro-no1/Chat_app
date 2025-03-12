import {create} from "zustand";
import toast from "react-hot-toast";
import { axiosInstance } from "../util/axios";
import { authStore } from "./authAxios";



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
         
            
            set({message:res.data.message});
            
        } catch (error) {
            toast.error(error.response.data.message)
        }finally{
            set({isMessageLoading:false})
        }
    },
        /*funcation for sending Messages*/
        
    sendMessage: async(text)=>{
        const {selectUser,message}=get();
       
        
        try {
            const res= await axiosInstance.post(`/message/send/${selectUser._id}`,text);
           
            
            set({message:[...message,res.data.message]})
        } catch (error) {
            toast.error("Send Message Error")
        }
    },

    listenToMessage:()=>{
        const {selectUser}= get();
        if(!selectUser) return;

        const socket = authStore.getState().socket;
        socket.on("newMessage",(message)=>{

        if(message.senderId !== selectUser._id) return

            set({
                message:[...get().message,message]
            })
        })
    },
    unListenToMessage:()=>{
        const socket=authStore.getState().socket;
        socket.off("newMessage")
    },

    setSelectUser: async(user)=>{
        set({selectUser:user})
    },
    deleteMessages:async(messageId)=>{
        try {
            const res= await axiosInstance.get(`/message/delete/${messageId}`)
            console.log(res);
            
            toast.success("message Delete")
        } catch (error) {
             toast.error(error.response.data)
        }
    }
}))