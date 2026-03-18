// function Typing() {

//     return (

//         <div className="flex">

//             <div className="bg-slate-800 px-4 py-3 rounded-xl">

//                 <div className="flex gap-1">

//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
//                     <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-300"></div>

//                 </div>

//             </div>

//         </div>

//     )

// }

// export default Typing


import { useState, useEffect } from "react"

const TypingText = ({ text }) => {

  const [displayText, setDisplayText] = useState("")

  useEffect(() => {

    let i = 0

    const interval = setInterval(() => {

      setDisplayText((prev) => prev + text[i])

      i++

      if (i >= text.length) {
        clearInterval(interval)
      }

    }, 15) // speed

    return () => clearInterval(interval)

  }, [text])

  return <span>{displayText}</span>

}

export default TypingText