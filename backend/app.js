import express from "express";
import authRouther from "./scr/routers/auth.router.js";
import dbConnection from "./scr/db/db.js";
import messageRouth from "./scr/routers/message.route.js";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dbConnection();

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());

app.use("/api/auth", authRouther);
app.use("/api/message", messageRouth);

app.listen(4000, () => {
  console.log("4000");
});
