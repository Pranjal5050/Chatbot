import axios from "axios"

export const sendMessageToAI = async (messages, chatId) => {

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/chat`,
    {
      messages,
      chatId
    }
  )

  return res.data
}

export const getChats = async () => {

  const res = await axios.get(
    `${import.meta.env.VITE_API_URL}/api/chats`,
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }
  )

  return res.data
}

export const deleteChatApi = async (id) => {

  const token = localStorage.getItem("token")

  const res = await axios.delete(
    `${import.meta.env.VITE_API_URL}/api/chat/${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )

  return res.data

}

export const signupUser = async (userData) => {

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/signup`,
    userData
  )

  return res.data

}

export const loginUser = async (userData) => {

  const res = await axios.post(
    `${import.meta.env.VITE_API_URL}/api/auth/login`,
    userData
  )

  return res.data

}