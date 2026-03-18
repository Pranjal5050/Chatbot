import express from "express"

import { chatController, getChats } from "../controllers/chatController.js"
import { imageChat } from "../controllers/imageChatController.js"

import { protect } from "../middlewares/authMiddlewares.js"
import upload from "../middlewares/upload.js"
import { deleteChat } from "../controllers/chatController.js"

const router = express.Router()

// normal chat
router.post("/chat", protect, chatController)

// get chats
router.get("/chats", protect, getChats)

// image chat
router.post(
  "/chat-image",
  protect,
  upload.single("image"),
  imageChat
)





// delete chat
router.delete("/chat/:id", protect, deleteChat)

export default router