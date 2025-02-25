import express from "express"
import dotenv from "dotenv";
import authRouther from "./scr/routers/auth.router.js";
import dbConnection from "./scr/db/db.js";
import messageRouth from "./scr/routers/message.route.js";
import cookieParser from "cookie-parser";
import cors from"cors"
import {app,server} from "./scr/utils/socket.js"

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRouther);
app.use("/api/message", messageRouth);

server.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
  dbConnection();
});
