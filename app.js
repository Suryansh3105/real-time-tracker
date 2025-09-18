const express = require("express");
const app = express();
const http=require("http");
const path=require("path");
const server= http.createServer(app); // passing app into http.createServer() gives you a server that can handle both Express routes and Socket.IO connections. when we attah it server later
const socketio=require("socket.io");
const io=socketio(server); // attacking socket.io to server so that server can perform websocket communication
//app.set is used to set value of configurartion in express
app.set("view engine","ejs"); //here we are telling express to set veiw engine as ejs note ejs is automically imported by default by the express only thing we have to do is to set veiw engine as ejs to tell express that to load veiw(template) we will be using ejs
app.use(express.static(path.join(__dirname,"public"))); // this tell use express.static to a particular path -  express.static is a middleware used to serve(give) static file like html , css, js , img etc to the server
// sso this tells whenever the client is looking for static file search in the path mentioned if found then serve it \
//dirname is gobal varibale that store absolute dir name where the js file is running example since app.js is the realtime tracker it will get the abosulte path till realtime tracker then using path.jion add public to the path 

io.on("connection",(socket)=>{
    socket.on("send-location",(data)=>{
        io.emit("receive-location",{id: socket.id, ...data})
    })
    console.log("connected");
})

app.get("/",(req,res)=>{
    res.render("index.ejs");
})

server.listen(3000,()=>{
    console.log("the app is listtening");
});