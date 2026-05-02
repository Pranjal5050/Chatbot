// import express from "express"
// import dotenv from "dotenv"
// dotenv.config()
// import mongoose from "mongoose"
// const helmet = require("helmet");
// const rateLimit = require("express-rate-limit");
// import cors from "cors"


// import authRoutes from "./routes/authRoutes.js"
// import chatRoutes from "./routes/chatRoutes.js"

// const app = express()

// // Security headers
// app.use(helmet());
// app.set("trust proxy", 1);
// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000,
//   max: 100,
//   message: "Too many requests, try again later"
// });
// app.use(limiter);

// // CORS (IMPORTANT: apna frontend URL daalna)
// app.use(cors({
//   origin: "https://devchatai.netlify.app",
//   methods: ["GET", "POST"],
//   credentials: true
// }));

// app.options("*", cors({
//   origin: "https://devchatai.netlify.app",
//   credentials: true
// }));
// app.use(express.json())

// mongoose.connect(process.env.MONGO_URI)

// app.use("/api/auth", authRoutes)

// app.use("/api", chatRoutes)

// app.listen(5000, () => {
//   console.log("Server running on port 5000")
// })

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

// 🌐 CORS (FIXED)
const corsOptions = {
  origin: "https://devchatai.netlify.app", // exact frontend URL
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // preflight fix

// 📦 Body parser
app.use(express.json());

// 🔗 Routes
app.use("/api/auth", authRoutes);
app.use("/api", chatRoutes);

// 🛢️ MongoDB connect (with logs)
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch((err) => console.error("MongoDB Error ❌", err));

// 🧪 Test route (important for debugging)
app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// 🚀 Server start
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});