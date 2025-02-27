import {Server} from "socket.io"
import http from "http"
import express, { query } from "express"

const app =express();
const server = http.createServer(app)

const io = new Server(server , {
    cors:{
        origin:["http://localhost:5173"]
    }
});
 
const userSocketMap={}

io.on("connection",(socket)=>{
 console.log("A user Connected",socket.id);



 const userId= socket.handshake.query.userId
 if(userId) userSocketMap[userId]=socket.id;



 //io.emit() is used to send events to all clients
 io.emit("getOnlineUsers",Object.keys(userSocketMap))


 
 socket.on("disconnect",()=>{
    console.log("user Disconnected",socket.id);
    delete userSocketMap[userId];

    io.emit("getOnlineUsers",Object.keys(userSocketMap))
 })
 
})

export {io,server, app}