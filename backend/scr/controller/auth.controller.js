import User from "../model/user.model.js";
import { apiError } from "../utils/apiError.js";
import { apiSuccess } from "../utils/apiSuccess.js";
import { handler } from "../utils/handler.js";
import jwt from "jsonwebtoken";

export const signin = handler(async (req, res) => {
  const { username, email, password } = req.body;

  if (!{ $or: [{ username }, { email }, { password }] }) {
    throw new Error("enter all detail");
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
    throw new apiError(401, "Enter all detail");
  }

  const loginUser = await User.findOne({ $or: [{ username }, { email }] });

  if (!loginUser) {
    throw new apiError(401, "user not found ");
  }

  const PasswordCorrect = await loginUser.isPasswordCorrect(password);

  if (!PasswordCorrect) {
    throw new apiError(400, "incorrect Password");
  }

  const token = await loginUser.refreshToken();

  return res
    .status(200)
    .cookie("token", token)
    .json(
      new apiSuccess(200, {
        message: "login",
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
         new apiSuccess(200,req.user)
     )
   
})