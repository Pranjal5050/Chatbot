import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { addMessage, setChatId } from "../redux/slices/chatSlice"

const InputBox = () => {

  const [input, setInput] = useState("")
  const dispatch = useDispatch()

  const { messages, chatId } = useSelector((state) => state.chat)

  const sendMessage = async () => {

    if (!input.trim()) return

    const userMessage = {
      role: "user",
      text: input
    }

    dispatch(addMessage(userMessage))

    const updatedMessages = [...messages, userMessage]

    setInput("")

    const token = localStorage.getItem("token")

    const res = await axios.post(
      "http://localhost:5000/api/chat",
      {
        messages: updatedMessages,
        chatId
      },
      {
        headers: {
          Authorization: token
        }
      }
    )

    const aiMessage = {
      role: "ai",
      text: res.data.reply
    }

    dispatch(addMessage(aiMessage))

    if (!chatId) {
      dispatch(setChatId(res.data.chatId))
    }

  }

  return (

    <div className="p-4 border-t border-gray-700 bg-[#0f172a]">

      <div className="flex gap-2 max-w-3xl mx-auto">

        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything..."
          className="flex-1 bg-[#020617] border border-gray-700 p-3 rounded-lg"
        />

        <button
          onClick={sendMessage}
          className="bg-black px-6 rounded-lg"
        >
          Send
        </button>

      </div>

    </div>

  )

}

export default InputBox