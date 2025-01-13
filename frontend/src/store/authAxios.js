import {create} from "zustand"
import { axiosInstance } from "../util/axios.js"
import toast from "react-hot-toast";

export const authStore= create((set)=>({
    authUser:null,
    signin:false,
    login:false,


    isCheckingAuth:true,

    checkingAuth:async ()=>{
        try {
            const res= await axiosInstance.get("/auth/check");
            set({authUser:res.data})
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
        console.log(authUser);
        toast.success("Accouth created")
     } catch (error) {
        console.log("pata nhi kya ho raha hai");
        console.log(authUser);
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
        } catch (error) {
            toast.error("somthing went wrong")
        }
    },
    login: async (data)=>{
        try {
            await axiosInstance.post("/auth/login",data)
        } catch (error) {
            
        }
    }
}))