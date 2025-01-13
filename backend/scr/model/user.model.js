import mongoose from "mongoose";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
},
{timestamps:true}

)

userSchema.pre("save",async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    this.password=await bcrypt.hash(this.password,10);
    next()
})

userSchema.methods.isPasswordCorrect = async function(password) {
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.refreshToken= async function () {
   return jwt.sign({
        _id:this._id
    },"token",{expiresIn:"7d"})
}

const User = mongoose.model("User",userSchema)

export default User