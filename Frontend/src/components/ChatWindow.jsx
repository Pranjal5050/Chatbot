import { useSelector } from "react-redux"
import { speakText } from "../utils/typeText/"
import { RiVolumeUpLine } from "@remixicon/react";


const ChatWindow = () => {
  const { messages = [] } = useSelector((state) => state.chat)

  return (
    // flex-1 overflow-y-auto
    <div className="p-4 md:p-6 flex-1 pb-32 md:pb-32 flex justify-center">
      <div className="w-full md:w-full max-w-3xl">

        {messages.length === 0 && (
          <p className="text-center text-gray-400">
            Start a conversation
          </p>
        )}

        {messages.map((msg, index) => (

          <div key={index} className="mb-6">

            {msg.role === "user" && (
              <div className="flex justify-end">
                <div className="bg-zinc-800 text-lg sm:text-base text-white px-4 py-3 rounded-xl max-w-[85%] lg:max-w-[70%] wrap-break-word break-all">
                  {msg.text}
                </div>
              </div>
            )}

            {/* {msg.role === "ai" && (
              <div className="flex justify-start relative">
                <div className="bg-[#1e293b99] text-white px-4 py-3 rounded-xl max-w-[70%] whitespace-pre-wrap">
                  <h1 className="">{msg.text}</h1>

                  <button
                    onClick={() => speakText(msg.text)}
                    className="ml-3 text-sm text-gray-300"
                  >
                   
                    < RiVolumeUpLine className="w-5 absolute bottom-3"/>
                   
                  </button>
                </div>
              </div>
            )} */}
            {msg.role === "ai" && (
              <div className="flex justify-start w-full">

                <div className=" 
      relative
      bg-[#1e293b46]
      text-white
      rounded-xl
      text-lg sm:text-base
      max-w-full
      sm:max-w-[85%] 
      md:max-w-[70%]
      whitespace-pre-wrap
    ">

                  <h1 className="pr-8">{msg.text}</h1>

                  <button
                    onClick={() => speakText(msg.text)}
                    className="absolute bottom-2 right-2 text-gray-300 hover:text-white"
                  >
                    <RiVolumeUpLine className="w-4 h-4 sm:w-5 sm:h-5" />
                  </button>

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

















// import { useSelector } from "react-redux"

// const ChatWindow = () => {

//   const { messages } = useSelector((state) => state.chat)

//   return (

//     <div className="flex-1 overflow-y-auto p-4 md:p-6 flex justify-center">

//       <div className="w-full max-w-3xl">

//         {messages.length === 0 && (
//           <p className="text-center text-gray-400">
//             Start a conversation
//           </p>
//         )}

//         {messages.map((msg, index) => (

//           <div key={index} className="mb-6">

//             {/* USER MESSAGE */}
//             {msg.role === "user" && (

//               <div className="flex justify-end">

//                 <div className="bg-blue-600 text-white px-4 py-3 rounded-xl max-w-[85%] md:max-w-[70%] break-words">

//                   {msg.image && (
//                     <img
//                       src={msg.image}
//                       className="w-full max-w-[200px] rounded-lg mb-2"
//                     />
//                   )}

//                   {msg.text}

//                 </div>

//               </div>

//             )}

//             {/* AI MESSAGE */}
//             {msg.role === "ai" && (

//               <div className="flex justify-start">

//                 <div className="bg-[#1e293b] text-white px-4 py-3 rounded-xl max-w-[85%] md:max-w-[70%] break-words whitespace-pre-wrap">

//                   {msg.text}

//                 </div>

//               </div>

//             )}

//           </div>

//         ))}

//       </div>

//     </div>

//   )

// }

// export default ChatWindow