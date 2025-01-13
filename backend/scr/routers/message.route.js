import express from "express"
import { isLogin } from "../../middleware/islogin.middlerware.js";
import { getMessage, sendMessage, users } from "../controller/message.controller.js";

const router = express.Router();

router.get("/users",isLogin,users)
router.get("/:id",isLogin,getMessage)
router.post("/send/:id",isLogin,sendMessage)


export default router