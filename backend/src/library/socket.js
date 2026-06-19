import { Server } from "socket.io"
import http from "http"
import express from "express"
import { socketAuthMiddleware } from "../middlewares/socket.auth.middleware.js"

const app = express()
const server = http.createServer(app)

const FRONTEND_URL = process.env.FRONTEND_URL

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        credentials: true, 
    }
})

io.use(socketAuthMiddleware)

// storing online users
const userSocketMap = {}

export const getReceiverSocketId = (userId) => userSocketMap[userId.toString()]

io.on("connection", (socket) => {
    console.log("A user connected: ", socket.user.fullName)

    const userId = socket.userId
    userSocketMap[userId] = socket.id

    // io.emit used to send events to all connected clients
    io.emit("getOnlineUsers", Object.keys(userSocketMap))

    socket.on("disconnect", () => {
        console.log("A user disconnected: ", socket.user.fullName)
        delete userSocketMap[userId]
        io.emit("getOnlineUsers", Object.keys(userSocketMap))
    })
})


export { io, app, server}