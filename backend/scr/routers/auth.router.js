import express from "express"
import { login, logout, signin ,check, uploadImg} from "../controller/auth.controller.js"
import { isLogin } from "../../middleware/islogin.middlerware.js";


const router=express.Router()

router.post("/signin",signin);
router.post("/login",login);
router.post("/logout",isLogin,logout)
router.get("/check",isLogin,check)
router.put("/uploadImg",isLogin,uploadImg)


export default router