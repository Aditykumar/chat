const express = require("express");
// const chats = require("./data/data");
const path =require('path')
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes.js");
const chatRoutes = require("./routes/chatRoutes.js");
const messageRoutes = require("./routes/messageRoutes.js");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const cors = require('cors'); 
const app = express();
dotenv.config();
connectDB();
app.use(cors())
app.use(express.json()); //accept json


app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);

// ---------------deployment your backend---------------
const __dirname1=path.resolve()
if(process.env.NODE_ENV==="production"){
app.use(express.static(path.join(__dirname1,'/groupchat/build')))
app.get('*',(req,res)=>{
  res.sendFile(path.resolve(__dirname1,'groupchat','build','index.html'))
})
}else{
  app.get("/", (req, res) => {
    res.send("api running");
  });
  
}
// ---------------deployment your backend---------------



app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, console.log(`server started`.yellow.bold));
const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "https://chatapp-loh5.onrender.com",
  },
});


io.on("connection", (socket) => {
  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);

    socket.emit("connected");
  });
  socket.on("join chat", (room) => {
    socket.join(room);
    // console.log("user joined:" + room);
  });
  socket.on("typing", (room) => {
    socket.in(room).emit("typing");
  });
  socket.on("stop typing", (room) => {
    socket.in(room).emit("stop typing");
  });
  socket.on("new message", (newMessageRecieved) => {
    var chat = newMessageRecieved.chat;
    if (!chat.users) {
      return console.log("chat.users not defined");
    }
    chat.users.forEach((user) => {
      if (user._id == newMessageRecieved.sender._id) return;
      socket.in(user._id).emit("message recieved", newMessageRecieved);
    });
  });


  socket.off("setup",()=>{
    console.log("user disconnected")
    socket.leave(userData._id)
  })
});
