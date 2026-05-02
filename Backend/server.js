import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";

dotenv.config();

const app = express();

// 🔒 Trust proxy (important for cookies on Render)
app.set("trust proxy", 1);

// 🔐 Security headers
app.use(helmet());

// 🚫 Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests, try again later"
});
app.use(limiter);

// 🌐 CORS CONFIG (FIXED PROPERLY)
const corsOptions = {
  origin: "https://devchatai.netlify.app",
  credentials: true
};

app.use(cors(corsOptions));

// 🔥 HANDLE PREFLIGHT (NO MORE "*")
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://devchatai.netlify.app");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");

  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }

  next();
});

// 📦 Body parser
app.use(express.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

// 🧪 Test route
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🛢️ MongoDB connect
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err));

// 🚀 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});