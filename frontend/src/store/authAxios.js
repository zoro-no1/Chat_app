import {create} from "zustand"
import { axiosInstance } from "../util/axios.js"
import toast from "react-hot-toast";
import {io} from "socket.io-client"
export const authStore= create((set,get)=>({
    authUser:null,
    signin:false,
    islogin:false,
    isFileUpload:false,
    socket:null,
    isCheckingAuth:true,

    checkingAuth:async ()=>{
        try {
            const res= await axiosInstance.get("/auth/check"); 
            set({authUser:res.data.message})
            get().connectSocket()
        } catch (error) {
            console.log(error);
         
            set({authUser:null})
        }finally{
            set({isCheckingAuth:false})
        }
    },

    signup: async (data)=>{
        set({signin:true})
     try {
       const res= await axiosInstance.post("/auth/signin",data)
         set({authUser:res.data});
        toast.success("Accouth created")
        get().connectSocket()
     } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message)
     }finally{
        set({signin:false})
     }
    },

    logout:async()=>{
        try {
            await axiosInstance.post("/auth/logout");
            set({authUser:null})
            toast.success("Logout")
            get().disconnectSocket()
        } catch (error) {
            toast.error("somthing went wrong")
        }
    },
    login: async (data)=>{
        try {
           const res= await axiosInstance.post("/auth/login",data)  
            set({authUser:res});
            set({islogin:true})
            toast.success("login")
            get().connectSocket()
        } catch (error) {
            set({islogin:false})
            toast.error(error)
        }
    },

    updatePic:async(data)=>{
        set({isFileUpload:true});
try {
    const res=await axiosInstance.put("/auth/uploadImg",data);
    set({authUser:res.data})
    toast.success("uploaded")
} catch (error) {
    set({isFileUpload:false})
    toast.error(error.response.data.error)
}finally{
    set({isFileUpload:false})
}
    },

    connectSocket:()=>{
        const {authUser}=get()
        if(!authUser || get().socket?.connected())return;
        const socket=io("http://localhost:4000")
        socket.connect();
        
    },
    disconnectSocket:()=>{
       if(get().socket?.connected()) get().socket.disconnect();
    }
}))