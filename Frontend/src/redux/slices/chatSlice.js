import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  chats: [],
  currentChat: null
}

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {

    setCurrentChat: (state, action) => {
      state.currentChat = action.payload
    },

    loadChats: (state, action) => {
      state.chats = action.payload
      if (action.payload.length > 0) {
        state.currentChat = action.payload[0].id
      }
    },

 addUserMessage: (state, action) => {

  let chat = state.chats.find(
    c => String(c.id) === String(state.currentChat)
  )

  // अगर chat नहीं है → new chat create
  if (!chat) {

    const newChat = {
      id: Date.now().toString(),
      title: action.payload,
      messages: [
        { role: "user", text: action.payload }
      ]
    }

    state.chats.unshift(newChat)
    state.currentChat = newChat.id

  } else {

    chat.messages.push({
      role: "user",
      text: action.payload
    })

    if (chat.messages.length === 1) {
      chat.title = action.payload
    }

  }

},

    addAIMessage: (state, action) => {

      const chat = state.chats.find(
        c => String(c.id) === String(state.currentChat)
      )

      if (chat) {

        chat.messages.push({
          role: "ai",
          text: action.payload
        })

      }

    },

    createNewChat: (state) => {

      const newChat = {
        id: null,
        title: "New Chat",
        messages: []
      }

      state.chats.unshift(newChat)
      state.currentChat = null

    },

    deleteChat: (state, action) => {

      state.chats = state.chats.filter(
        chat => String(chat.id) !== String(action.payload)
      )

      if (state.chats.length > 0) {
        state.currentChat = state.chats[0].id
      } else {
        state.currentChat = null
      }

    }

  }
})

export const {
  setCurrentChat,
  loadChats,
  addUserMessage,
  addAIMessage,
  createNewChat,
  deleteChat
} = chatSlice.actions

export default chatSlice.reducer