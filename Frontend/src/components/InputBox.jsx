import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"

import {
  addUserMessage,
  addAIMessage,
  setCurrentChat
} from "../redux/slices/chatSlice"

import { sendMessageToAI } from "../api/chatApi"

function InputBox() {

  const [message, setMessage] = useState("")

  const dispatch = useDispatch()

  const { chats, currentChat } = useSelector(state => state.chat)

  const chat = chats.find(
    c => String(c.id) === String(currentChat)
  )

  const messages = chat ? chat.messages : []

  const handleSend = async () => {

    if (!message.trim()) return

    const userMessage = message
    setMessage("")

    // show user message instantly
    dispatch(addUserMessage(userMessage))

    const updatedMessages = [
      ...messages,
      { role: "user", text: userMessage }
    ]

    try {

      const data = await sendMessageToAI(
        updatedMessages,
        currentChat || null
      )

      // set backend chat id
      if (data?.chatId) {
        dispatch(setCurrentChat(data.chatId))
      }

      // show AI reply
      if (data?.reply) {
        dispatch(addAIMessage(data.reply))
      }

    } catch (error) {

      console.log("AI ERROR:", error)

      dispatch(addAIMessage("AI Error"))

    }

  }

  return (

    <div className="p-4 border-t border-slate-800">

      <div className="flex gap-2">

        <input
          className="flex-1 bg-slate-900 text-white p-2 rounded"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask anything..."
        />

        <button
          onClick={handleSend}
          className="bg-indigo-600 px-4 rounded text-white"
        >
          Send
        </button>

      </div>

    </div>

  )

}

export default InputBox