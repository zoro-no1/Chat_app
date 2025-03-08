import User from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiSuccess } from "../utils/apiSuccess.js";
import cloudinary from "../utils/cloudinary.js";
import { handler } from "../utils/handler.js";


export const signin = handler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
  //  throw new Error("enter all detail");
   return res.status(401).json({message:"Enter all detail"})
  }

  const existUser = await User.findOne({ $or: [{ username }, { email }] });

  if (existUser) {
    throw new apiError(500, "user alrady exist");
  }
  const createUser = await User.create({
    username,
    email,
    password,
  });

  const token = await createUser.refreshToken()

  res
    .status(201)
    .cookie("token", token)
    .json( { message: "user Created successfully"});
});

export const login = handler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!{ $or: [{ username }, { email }, { password }] }) {
   // throw new apiError(401, "Enter all detail");
   return res.status(401).json({message:"Enter all detail"})
  }

  const loginUser = await User.findOne({ $or: [{ username }, { email }] });

  if (!loginUser) {
   // throw new apiError(401, "user not found ");
   return res.status(401).json({message:"user not found "})
  }

  const PasswordCorrect = await loginUser.isPasswordCorrect(password);

  if (!PasswordCorrect) {
   // throw new apiError(400, "incorrect Password");
    res.status(401).json({message: "incorrect Password"})
  }

  const token = await loginUser.refreshToken();

   res
    .status(200)
    .cookie("token", token)
    .json(
      new apiSuccess(200, {
        message:"login"
      })
    );
});

export const logout = handler(async (req, res) => {
  return res
    .status(200)
    .clearCookie("token")
    .json(new apiSuccess(200, "logout "));
});

export const check= handler(async (req,res)=>{

  
     res.status(200).json(
         {
          message:req.user,
         }
     )
   
})

export const uploadImg=handler(async(req,res)=>{
 try {
   const {profileImg}= req.body;
   const userId= req.user;
   if(!profileImg){
     res.status(401).json({message:"image not found"})
 };
 const uploadCloudinary= await cloudinary.uploader.upload(profileImg)
 const updateUser= await User.findByIdAndUpdate(userId._id,{profileImg:uploadCloudinary.secure_url},{new:true});
 console.log(updateUser);
 
 res.status(201).json({message:"image upload successfully"})
 } catch (error) {
  res.status(401).json({message:"server problem while uploading profile"})
};
 }
)