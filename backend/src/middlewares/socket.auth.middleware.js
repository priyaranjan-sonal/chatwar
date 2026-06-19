import jwt from "jsonwebtoken"
import User from "../models/user.model.js"

export const socketAuthMiddleware = async (socket, next) => {
    try {
        // extract the tocken from http-only cookies
        const token = socket.handshake.headers.cookie
            ?.split("; ")
            .find((row) => row.startsWith("jwt="))
            ?.split("=")[1]

        if (!token) {
            console.log("Socket connection rejected: No token provided")
            return next(new Error("Unauthorized - No token provided"))
        }

        // verify the token
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        if (!decodedToken) {
            console.log("Socket connection rejected: Invalid token")
            return next(new Error("Unauthorized - Invalid token"))
        }

        // find user from db
        const user = await User.findById(decodedToken.userId).select("-password")
        if (!user) {
            console.log("Socket connection rejected: User not found")
            return next(new Error("User not found"))
        }

        // attach user info to socket
        socket.user = user
        socket.userId = user._id.toString()

        console.log(`Socket authenticated for user: ${user.fullName} (${user._id})`)

        next()

    } catch (error) {
        console.log("Error in socket authentication: ", error.message)
        next(new Error("Unauthorized - Authentication Failed"))
        
    }
}