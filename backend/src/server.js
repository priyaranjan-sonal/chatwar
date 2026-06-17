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

app.use(express.json({ limit: "10mb" }))
app.use(cookieParser())

app.use("/api/auth", authRoutes)
app.use("/api/messages", messageRoutes)

app.use((err, req, res, next) => {
    if (err.type === "entity.too.large") {
        return res.status(413).json({ message: "Image is too large. Please choose a file under 5MB." })
    }

    console.error(err)
    res.status(err.status || 500).json({ message: err.message || "Internal server error" })
})

const startServer = async () => {
    await connectDB()
    app.listen(PORT, () => {
        console.log(`Server running: http://localhost:${PORT}`)
    })
}

startServer()
