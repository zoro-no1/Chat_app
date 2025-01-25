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
    },
    profileImg:{
        type:String,
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

userSchema.methods.refreshToken=  function () {
   return jwt.sign({
        _id:this._id,
        username:this.username,
        email:this.email,
        profileImg:this.profileImg
    },"token",{expiresIn:"7d"})
}

const User = mongoose.model("User",userSchema)

export default User