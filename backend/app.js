import express from "express"
import dotenv from "dotenv";
import authRouther from "./scr/routers/auth.router.js";
import dbConnection from "./scr/db/db.js";
import messageRouth from "./scr/routers/message.route.js";
import cookieParser from "cookie-parser";
import cors from"cors"
import {app,server} from "./scr/utils/socket.js"
import path from "path";

dotenv.config();
const __dirname = path.resolve();

app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({limit: '10mb',extended:true}))
app.use(cookieParser());
app.use(cors({
  origin:"http://localhost:5173",
  credentials:true
}))

app.use("/api/auth", authRouther);
app.use("/api/message", messageRouth);

if (process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname,"../frontend/dist")))

  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
  });

}

server.listen(process.env.PORT, () => {
  console.log(process.env.PORT);
  dbConnection();
});
