import { useSelector } from "react-redux"
import InputBox from "./InputBox"

function ChatWindow() {

  const { chats, currentChat } = useSelector((state) => state.chat)

  // active chat find
  const chat = chats.find(
    (c) => String(c.id) === String(currentChat)
  )

  // fallback empty messages
  const messages = chat ? chat.messages : []

  return (

    <div className="flex flex-col flex-1 bg-slate-950">

      {/* Messages area */}

      <div className="flex-1 overflow-y-auto p-6 space-y-4">

        {messages.length === 0 && (

          <p className="text-gray-400 text-center">
            Start a conversation
          </p>

        )}

        {messages.map((msg, index) => (

          <div
            key={index + msg.text}
            className={`flex ${
              msg.role === "user"
                ? "justify-end"
                : "justify-start"
            }`}
          >

            <div
              className={`px-4 py-3 rounded-xl max-w-md text-sm

              ${
                msg.role === "user"
                  ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white"
                  : "bg-slate-800 text-gray-200"
              }

              `}
            >

              {msg.text}

            </div>

          </div>

        ))}

      </div>

      {/* Input box */}

      <InputBox />

    </div>

  )

}

export default ChatWindow