import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  messages: [],
  chatId: null,
  chats: [],
  messageCount: 0,
  isLoggedIn: false,
}

const chatSlice = createSlice({

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

    // LOGOUT
    logout: (state) => {
      state.messages = []
      state.chatId = null
      state.chats = []
      state.isLoggedIn = false
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

    // SAME AS setChats
    loadChats: (state, action) => {
      state.chats = action.payload
    },

    // OPEN CHAT
    setCurrentChat: (state, action) => {
      state.messages = action.payload.messages
      state.chatId = action.payload._id
    },
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
  loadChats,
  logout,
} = chatSlice.actions

export default chatSlice.reducer