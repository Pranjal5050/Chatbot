import Chat from "../models/Chat.js"
import { askGroq } from "../services/groqService.js"

export const chatController = async (req, res) => {

  try {

    const { messages, chatId } = req.body

    const userId = req.user

    const userMessage = messages[messages.length - 1]

    const aiReply = await askGroq(messages)

    const aiMessage = {
      role: "ai",
      text: aiReply
    }

    let chat

    if (chatId) {

      chat = await Chat.findById(chatId)

      chat.messages.push(userMessage)
      chat.messages.push(aiMessage)

      await chat.save()

    }

    else {

      chat = new Chat({
        userId,
        title: userMessage.text.substring(0, 40),
        messages: [userMessage, aiMessage]
      })

      await chat.save()

    }

    res.json({
      reply: aiReply,
      chatId: chat._id
    })

  }

  catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}


export const getChats = async (req, res) => {

  const userId = req.user

  const chats = await Chat.find({ userId }).sort({ createdAt: -1 })

  res.json(chats)

}


export const deleteChat = async (req, res) => {

  try {

    const chatId = req.params.id

    const chat = await Chat.findByIdAndDelete(chatId)

    if (!chat) {

      return res.status(404).json({
        error: "Chat not found"
      })

    }

    res.json({
      message: "Chat deleted successfully"
    })

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}