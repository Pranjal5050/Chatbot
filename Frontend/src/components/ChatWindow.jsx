import { useSelector } from "react-redux"

const ChatWindow = () => {

  const { messages = [] } = useSelector((state) => state.chat)

  return (

    <div className="flex-1 overflow-y-auto p-6">

      {messages.length === 0 && (
        <p className="text-center text-gray-400">
          Start a conversation
        </p>
      )}

      {messages.map((msg, index) => (

        <div key={index} className="mb-4">

          {msg.role === "user" && (
            <div className="text-right">
              <span className="bg-blue-600 px-3 py-2 rounded">
                {msg.text}
              </span>
            </div>
          )}

          {msg.role === "ai" && (
            <div className="text-left">
              <span className="bg-gray-700 px-3 py-2 rounded">
                {msg.text}
              </span>
            </div>
          )}

        </div>

      ))}

    </div>

  )

}

export default ChatWindow