import express from "express"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL

app.use((req, res, next) => {
    if (FRONTEND_URL) {
        res.setHeader("Access-Control-Allow-Origin", FRONTEND_URL)
        res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization")
        res.setHeader("Access-Control-Allow-Credentials", "true")
    }
    if (req.method === "OPTIONS") {
        return res.sendStatus(204)
    }
    next()
})

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
})