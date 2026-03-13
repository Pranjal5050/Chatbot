function Message({ role, text }) {

  const isUser = role === "user"

  return (

    <div className={`flex ${isUser ? "justify-end" : "justify-start"}`}>

      <div
        className={`px-4 py-3 rounded-xl max-w-md text-sm text-white
        ${isUser
            ? "bg-gradient-to-r from-indigo-500 to-purple-600"
            : "bg-slate-800"}`}
      >

        {text}

      </div>

    </div>

  )

}

export default Message