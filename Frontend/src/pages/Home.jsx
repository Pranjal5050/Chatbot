// import ChatWindow from "../components/ChatWindow"
// import InputBox from "../components/InputBox"
// import Sidebar from "../components/Sidebar"

// const Home = ({ sidebarOpen, setSidebarOpen }) => {

//   return (

//     <div className="flex flex-col flex-1 h-screen">

//       {/* Top Bar */}
//       <div className="p-3 border-b border-gray-700">

//         <button
//           onClick={() => setSidebarOpen(true)}
//           className="text-white"
//         >
//           ☰
//         </button>

//       </div>

//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       {/* Chat messages */}
//       <ChatWindow />

//       {/* Input */}
//       <InputBox />

//     </div>

//   )

// }

// export default Home

import { useState } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import InputBox from "../components/InputBox"

//test
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setChats, setCurrentChat } from "../redux/slices/chatSlice"
import { getChats } from "../api/chatApi"


const Home = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    //test
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchChats = async () => {

            const chats = await getChats()

            dispatch(setChats(chats))

            // ⭐ refresh hone par latest chat open
            if (chats.length > 0) {
                dispatch(setCurrentChat(chats[0]))
            }

        }

        fetchChats()

    }, [])

    return (

        <div className="flex h-screen bg-[#0f172a] text-white">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div className="flex flex-col flex-1">

                {/* Top Bar */}
                <div className="p-3 border-b border-gray-700">

                    <button
                        onClick={() => setSidebarOpen(true)}
                        className="text-white"
                    >
                        ☰
                    </button>

                </div>

                {/* Chat area */}
                <ChatWindow />

                {/* Input */}
                <InputBox />

            </div>

        </div>

    )

}

export default Home