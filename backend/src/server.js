import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import authRoutes from "./routes/auth.routes.js"
import messageRoutes from "./routes/message.routes.js"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3001
const FRONTEND_URL = process.env.FRONTEND_URL

if (FRONTEND_URL) {
    app.use(cors({
        origin: FRONTEND_URL,
        credentials: true,
    }))
}

app.use(express.json())

app.use("/api/auth", authRoutes)
app.use("/api/message", messageRoutes)

app.listen(PORT, () => {
    console.log(`Server running: http://localhost:${PORT}`)
})