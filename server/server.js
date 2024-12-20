require("dotenv").config();

const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");
const app = express();

const port = process.env.PORT || 5000;
const path = path.join(__dirname, "server", "dist");
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  socket.on("sendMessage", (data) => {
    io.emit("new_message", data);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log("client disconnected");
  });
});

server.listen(port, () => console.log(`server listening on port ${port}`));
