import { Server } from "socket.io";
import http from "http";
import express from "express";
import { ENV } from "./env.lib.js";
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js";


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [ENV.CLIENT_URL],
        credentials: true,
    }
});

//apply auth middleware to socket connection
io.use(socketAuthMiddleware);
// online user
const userSocketMap = {};
io.on("connection", (socket) => {
    console.log("A User Connected", socket.user.fullName);
    const userId = socket.userId;
    userSocketMap[userId] = socket.id;

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
    socket.on("disconnect", () => {
        console.log("A User Disconnected", socket.user.fullName);
        delete userSocketMap[userId];
        io.emit("getOnlineUsers", Object.keys(userSocketMap));
    });
});

export { io, app, server };

