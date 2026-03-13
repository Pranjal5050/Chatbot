// import { useSelector } from "react-redux"

// const ChatWindow = () => {

//   const { messages = [] } = useSelector((state) => state.chat)

//   return (

//     <div className="flex-1 overflow-y-auto p-6">

//       {messages.length === 0 && (
//         <p className="text-center text-gray-400">
//           Start a conversation
//         </p>
//       )}

//       {messages.map((msg, index) => (

//         <div key={index} className="mb-4">

//           {msg.role === "user" && (
//             <div className="text-right">
//               <span className="bg-zinc-700 text-white px-4 py-3 rounded-xl max-w-[70%]">
//                 {msg.text}
//               </span>
//             </div>
//           )}

//           {msg.role === "ai" && (
//             <div className=" bg-zinc-800 text-white px-4 py-3 rounded-xl max-w-[70%] whitespace-pre-wrap">
//               <span className=" px-3 py-2 rounded">
//                 {msg.text}
//               </span>
//             </div>
//           )}

//         </div>

//       ))}

//     </div>

//   )

// }

// export default ChatWindow





import { useSelector } from "react-redux"

const ChatWindow = () => {

  const { messages = [] } = useSelector((state) => state.chat)

  return (

    <div className="flex-1 overflow-y-auto px-6 py-8 flex justify-center">

      <div className="w-full max-w-3xl">

        {messages.length === 0 && (
          <p className="text-center text-gray-400">
            Start a conversation
          </p>
        )}

        {messages.map((msg, index) => (

          <div key={index} className="mb-6">

            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-zinc-700 text-white px-4 py-3 rounded-xl max-w-[70%]">
                  {msg.text}
                </div>
              </div>
            )}

            {msg.role === "ai" && (
              <div className="flex justify-start">
                <div className="bg-[#1e293b] text-white px-4 py-3 rounded-xl max-w-[70%] whitespace-pre-wrap">
                  {msg.text}
                </div>
              </div>
            )}

          </div>

        ))}

      </div>

    </div>

  )

}

export default ChatWindow