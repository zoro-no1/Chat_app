import mongoose from "mongoose";
const dbConnection= async()=>{


  try {
   await mongoose.connect("mongodb://localhost:27017/chat")
    console.log("data base connected");
    
} catch (error) {
    throw new Error("data base not connected");
    
}
}
export default dbConnection