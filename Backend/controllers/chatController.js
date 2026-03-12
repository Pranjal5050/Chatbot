import Chat from "../models/Chat.js"
import { askGroq } from "../services/groqService.js"

// send message + save chat
export const chatController = async (req, res) => {
  console.log("REQUEST BODY:", req.body);   // <-- add this
  try {

    const { messages, chatId } = req.body

    const userMessage = messages[messages.length - 1]

    const aiReply = await askGroq(messages)

    const aiMessage = {
      role: "ai",
      text: aiReply
    }

    let chat

    if (chatId) {

      chat = await Chat.findById(chatId)

      if (chat) {
        chat.messages.push(userMessage)
        chat.messages.push(aiMessage)
        await chat.save()
      }

    } else {

      chat = new Chat({
        title: userMessage.text,
        messages: [userMessage, aiMessage]
      })

      await chat.save()

    }

    res.json({
      reply: aiReply,
      chatId: chat._id
    })

  } catch (error) {

    console.log("AI ERROR:", error)

    res.status(500).json({
      error: "AI error"
    })

  }
}


// get all chats
export const getChats = async (req, res) => {

  try {

    const chats = await Chat.find().sort({ createdAt: -1 })

    res.json(chats)

  } catch (error) {

    res.status(500).json({
      error: error.message
    })

  }

}