import Chat from "../models/Chat.js";
import { askGroq } from "../services/groqService.js";
import sanitizeHtml from "sanitize-html";

// 🧠 Helper function to sanitize messages array
const sanitizeMessages = (messages) => {
  return messages.map((msg) => ({
    role: msg.role,
    text: sanitizeHtml(msg.text || "", {
      allowedTags: [],
      allowedAttributes: {}
    })
  }));
};

export const chatController = async (req, res) => {
  try {
    let { messages, chatId } = req.body;
    const userId = req.user;

    // ❌ Validation
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({
        error: "Invalid messages format"
      });
    }

    // 🧹 Sanitize all messages
    messages = sanitizeMessages(messages);

    const userMessage = messages[messages.length - 1];

    if (!userMessage.text || userMessage.text.trim() === "") {
      return res.status(400).json({
        error: "Message cannot be empty"
      });
    }

    // 🤖 Get AI reply
    const aiReply = await askGroq(messages);

    // 🧹 Sanitize AI reply (extra safety)
    const cleanReply = sanitizeHtml(aiReply, {
      allowedTags: [],
      allowedAttributes: {}
    });

    const aiMessage = {
      role: "ai",
      text: cleanReply
    };

    let chat;

    if (chatId) {
      chat = await Chat.findById(chatId);

      if (!chat) {
        return res.status(404).json({
          error: "Chat not found"
        });
      }

      chat.messages.push(userMessage);
      chat.messages.push(aiMessage);

      await chat.save();
    } else {
      chat = new Chat({
        userId,
        title: userMessage.text.substring(0, 40),
        messages: [userMessage, aiMessage]
      });

      await chat.save();
    }

    res.json({
      reply: cleanReply,
      chatId: chat._id
    });

  } catch (error) {
    console.error("Chat Error:", error);

    res.status(500).json({
      error: "Something went wrong"
    });
  }
};


// ✅ GET CHATS
export const getChats = async (req, res) => {
  try {
    const userId = req.user;

    const chats = await Chat.find({ userId }).sort({ createdAt: -1 });

    res.json(chats);

  } catch (error) {
    console.error("GetChats Error:", error);

    res.status(500).json({
      error: "Failed to fetch chats"
    });
  }
};


// ❌ DELETE CHAT
export const deleteChat = async (req, res) => {
  try {
    const chatId = req.params.id;

    const chat = await Chat.findByIdAndDelete(chatId);

    if (!chat) {
      return res.status(404).json({
        error: "Chat not found"
      });
    }

    res.json({
      message: "Chat deleted successfully"
    });

  } catch (error) {
    console.error("DeleteChat Error:", error);

    res.status(500).json({
      error: "Failed to delete chat"
    });
  }
};