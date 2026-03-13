import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: [],
  chatId: null,
  chats: [],
  messageCount: 0,
  isLoggedIn: false
}

const chatSlice = createSlice({
  messages:[],
  name: "chat",
  initialState,
  reducers: {

    // ADD MESSAGE
    addMessage: (state, action) => {
      state.messages.push(action.payload)
    },

    // SET CHAT ID
    setChatId: (state, action) => {
      state.chatId = action.payload
    },

    // MESSAGE LIMIT
    incrementMessageCount: (state) => {
      state.messageCount += 1
    },

    // LOGIN STATE
    setLogin: (state, action) => {
      state.isLoggedIn = action.payload
    },

    // NEW CHAT
    createNewChat: (state) => {
      state.messages = []
      state.chatId = null
    },

    // LOAD SIDEBAR CHATS
    setChats: (state, action) => {
      state.chats = action.payload
    },

    // SAME AS setChats (HOME USE)
    loadChats: (state, action) => {
      state.chats = action.payload
    },

    // OPEN CHAT
    setCurrentChat: (state, action) => {
      state.messages = action.payload.messages
      state.chatId = action.payload._id
    },

    // DELETE CHAT
    deleteChat: (state, action) => {
      state.chats = state.chats.filter(
        (chat) => chat._id !== action.payload
      )
    }

  }
})

export const {
  addMessage,
  setChatId,
  incrementMessageCount,
  setLogin,
  createNewChat,
  setChats,
  setCurrentChat,
  deleteChat,
  loadChats
} = chatSlice.actions

export default chatSlice.reducer