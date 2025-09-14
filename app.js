const express = require("express");
const app = express();
const http=require("http");
const server= http.createServer(app);
const socketio=require("socket.io");
const io=socketio(server);
app.get("/",(req,res)=>{
    res.send("hey");
})

server.listen(3000,()=>{
    console.log("the app is listtening");
});