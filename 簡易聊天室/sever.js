const path = require("path");
const http = require("http");
const express = require("express")
const { env } = require("process");
const socketio = require("socket.io");
const app = express();
const sever = http.createServer(app);
const io = socketio(sever);

io.on("connection",socket=>{
    console.log("New WS Connection...");
})



const PORT = 3000;
app.use(express.static(path.join(__dirname,"public")));



sever.listen(PORT,()=>{console.log("sever running on " + PORT);});

