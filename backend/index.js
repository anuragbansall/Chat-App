const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("node:http");
const cors = require("cors");

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.get("/", (req, res) => {
  res.send("<h1>Chat Server Running</h1>");
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("newMessage", ({ username, message, room }) => {
    console.log(`${username} in ${room}: ${message}`);
    io.to(room).emit("newMessage", { username, message });
  });

  socket.on("disconnect", () => {
    console.log("a user disconnected");
  });
});

server.listen(4000, () => {
  console.log("server running at http://localhost:4000");
});
