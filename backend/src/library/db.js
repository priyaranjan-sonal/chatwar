import mongoose from "mongoose"

const connectDB = async () => {
    try {
        const connectionString = await mongoose.connect(process.env.MONGODB_URI)
        console.log("✅ MongoDB connected successfully: ", connectionString.connection.host)
    } catch (error) {
        console.log("❌ Error connecting MongoDB: ", error)
        process.exit(1)     // 1 status code --> fail
    }
}

export default connectDB
