import axios from "axios"

// send message to AI
export const sendMessageToAI = async (messages, chatId) => {

  const res = await axios.post(
    "http://localhost:5000/api/chat",
    {
      messages,
      chatId
    }
  )

  return res.data
}


// get all chats
export const getChats = async () => {

  const res = await axios.get(
    "http://localhost:5000/api/chat"
  )

  return res.data
}


// delete chat
export const deleteChat = async (id) => {

  const res = await axios.delete(
    `http://localhost:5000/api/chat/${id}`
  )

  return res.data
}