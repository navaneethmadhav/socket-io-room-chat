const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

const roomUsers = {};

io.on("connection", (socket) => {
  console.log(`User Connected: ${socket.id}`);

  socket.on("join_room", (data) => {

    const { room, username } = data;

    socket.join(room);

    if (!roomUsers[room]) {
      roomUsers[room] = [];
    }

    roomUsers[room].push(username);

    io.to(room).emit("update_users", roomUsers[room]);

    console.log(`User with ID: ${socket.id} username:${username} , joined room: ${room}`);
  });

  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
  });

  socket.on("disconnect", () => {
    // // Remove the disconnected user from roomUsers
    for (const room in roomUsers) {
      const index = roomUsers[room].indexOf(socket.id);
      if (index !== -1) {
        roomUsers[room].splice(index, 1);
        io.to(room).emit("update_users", roomUsers[room]);
        console.log(`User with ID: ${socket.id} disconnected from room: ${room}`);
        break; // Assuming a user can only be in one room, so break once found
      }
    }

    console.log("User Disconnected", socket.id);
  });
});

server.listen(3001, () => {
  console.log("SERVER RUNNING");
});