import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { RiFileUploadLine } from "@remixicon/react";
import { RiMicLine } from "@remixicon/react";

import { addMessage, setChatId } from "../redux/slices/chatSlice"
import { startVoiceInput } from "../utils/voiceInput"

const InputBox = () => {

  const [input, setInput] = useState("")
  const [image, setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  const dispatch = useDispatch()

  const { messages, chatId } = useSelector((state) => state.chat)

  if (!message || message.trim() === "") {
    alert("Please enter a message");
    return;
  }

  if (message.length > 200) {
    alert("Message too long");
    return;
  }

  // Image Upload
  const handleImage = (e) => {

    const file = e.target.files[0]

    if (file) {
      setImage(file)
    }

  }

  // Remove Image
  const removeImage = () => {
    setImage(null)
  }

  // Send Message
  const sendMessage = async () => {

    if ((!input.trim() && !image) || loading) return

    setLoading(true)

    const userMessage = {
      role: "user",
      text: input,
      image: image ? URL.createObjectURL(image) : null
    }

    dispatch(addMessage(userMessage))

    const token = localStorage.getItem("token");



    try {

      let res

      // IMAGE CHAT
      if (image) {

        const formData = new FormData()

        formData.append("image", image)
        formData.append("question", input)

        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/chat-image`,
          formData,
          {
            headers: {
              Authorization: token
            }
          }
        )

        setImage(null)

      }

      // TEXT CHAT
      else {

        const updatedMessages = [...messages, userMessage]

        res = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/chat`,
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

      }

      const aiMessage = {
        role: "ai",
        text: res.data.reply || res.data.answer
      }

      dispatch(addMessage(aiMessage))

      if (!chatId && res.data.chatId) {
        dispatch(setChatId(res.data.chatId))
      }

    }

    catch (error) {

      console.log("CHAT ERROR:", error)

    }

    finally {

      setLoading(false)
      setInput("")

    }

  }

  // Enter key send
  const handleKeyDown = (e) => {

    if (e.key === "Enter" && !e.shiftKey) {

      e.preventDefault()
      sendMessage()

    }

  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-[#0f172a] p-1 md:p-4 z-40">
      <div className="flex items-center gap-2 md:gap-3 max-w-3xl mx-auto">

        {/* Image Upload */}
        <label className="cursor-pointer  px-3 py-2 rounded-lg hover:bg-gray-800">

          <RiFileUploadLine />

          <input
            type="file"
            accept="image/*"
            onChange={handleImage}
            className="hidden"
          />

        </label>

        {/* Input */}
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything..."
          className="resize-none flex-1 bg-[#020617] border border-gray-700 p-3 rounded-lg text-white text-sm md:text-base outline-none"
        />

        {/* Voice */}
        <button
          onClick={() => startVoiceInput(setInput)}
          className=" px-3 md:px-4 py-2 rounded-lg hover:bg-gray-800 cursor-pointer"
        >
          <RiMicLine />
        </button>

        {/* Send */}
        <button
          onClick={sendMessage}
          className="bg-black px-4 md:px-6 py-2 rounded-lg hover:bg-gray-800 cursor-pointer border border-gray-700"
        >

          {loading ? "Sending..." : "Send"}

        </button>

      </div>

      {/* Image Preview */}
      {image && (

        <div className="flex justify-center mt-3 relative">

          <img
            src={URL.createObjectURL(image)}
            alt="preview"
            className="w-24 md:w-32 rounded-lg"
          />

          <button
            onClick={removeImage}
            className="absolute top-0 right-[40%] bg-red-500 text-white text-xs px-2 py-1 rounded-full"
          >
            ✕
          </button>

        </div>

      )}

    </div>

  )

}

export default InputBox