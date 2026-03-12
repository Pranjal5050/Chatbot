import express from "express"

import {
  chatController,
  getChats
} from "../controllers/chatController.js"

const router = express.Router()

router.post("/", chatController)

router.get("/", getChats)

export default router