import express from "express"
import mongoose from "mongoose"
import cors from "cors"

import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoute.js"

const app = express()

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.use("/api/auth", authRoutes)

app.use("/api", chatRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})