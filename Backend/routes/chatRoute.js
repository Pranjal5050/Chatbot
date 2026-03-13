import express from "express"

import { chatController, getChats } from "../controllers/chatController.js"

import { protect } from "../middlewares/authMiddlewares.js"

const router = express.Router()

router.post("/chat", protect, chatController)

router.get("/chats", protect, getChats)

export default router