import dotenv from "dotenv"
dotenv.config()
import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"
import connectDB from "./library/db.js"

const app = express()

const PORT = process.env.PORT || 8001
const FRONTEND_URL = process.env.FRONTEND_URL

if (FRONTEND_URL) {
    app.use(cors({
        origin: FRONTEND_URL,
        credentials: true,
    }))
}

app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server running: http://localhost:${PORT}`)
    })
}

startServer()
