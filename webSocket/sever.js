const express = require('express');
const http = require('http');
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.json());


app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});



io.on('connection', (socket) => {
  console.log(socket.id);
  socket.on('chat message',msg=>{
    console.log(msg);
  })
});
 
  
  
server.listen(3000, () => {
  console.log('listening on *:3000');
});