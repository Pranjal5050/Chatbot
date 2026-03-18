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
    "http://localhost:5000/api/chats",
    {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    }
  )

  return res.data
}


// delete chat

export const deleteChatApi = async (id) => {

  const token = localStorage.getItem("token")

  const res = await axios.delete(
    `http://localhost:5000/api/chat/${id}`,
    {
      headers: {
        Authorization: token
      }
    }
  )

  return res.data

}






// export const deleteChat = async (id) => {

//   const res = await axios.delete(
//     `http://localhost:5000/api/chat/${id}`
//   )

//   return res.data
// }



export const signupUser = async (userData) => {

  const res = await axios.post(
    "http://localhost:5000/api/auth/signup",
    userData
  )

  return res.data

}

export const loginUser = async (userData) => {

  const res = await axios.post(
    "http://localhost:5000/api/auth/login",
    userData
  )

  return res.data

}