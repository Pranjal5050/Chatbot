import express from "express"
import dotenv from "dotenv"
dotenv.config()
import mongoose from "mongoose"
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");
import cors from "cors"


import authRoutes from "./routes/authRoutes.js"
import chatRoutes from "./routes/chatRoutes.js"

const app = express()

// Security headers
app.use(helmet());
app.set("trust proxy", 1);
// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later"
});
app.use(limiter);

// CORS (IMPORTANT: apna frontend URL daalna)
app.use(cors({
  origin: "https://devchatai.netlify.app",
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(express.json())

mongoose.connect(process.env.MONGO_URI)

app.use("/api/auth", authRoutes)

app.use("/api", chatRoutes)

app.listen(5000, () => {
  console.log("Server running on port 5000")
})