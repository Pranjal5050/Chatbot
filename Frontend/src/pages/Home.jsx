import { useState } from "react"

import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import InputBox from "../components/InputBox"

import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setChats, setCurrentChat } from "../redux/slices/chatSlice"
import { getChats } from "../api/chatApi"


const Home = () => {

    const [sidebarOpen, setSidebarOpen] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {

        const fetchChats = async () => {

            const chats = await getChats()

            dispatch(setChats(chats))

            if (chats.length > 0) {
                dispatch(setCurrentChat(chats[0]))
            }

        }

        fetchChats()

    }, [])

    return (

        <div className="flex bg-[#0f172a] text-white min-h-screen flex-col flex-1 overflow-hidden relative">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div
                className={`flex flex-col flex-1 transition-all duration-300
                ${sidebarOpen ? "ml-64" : "ml-0"}`}
            >

                {/* Top Bar */}
                <div className="p-3 border-b bg-black fixed flex w-full z-50">

                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-white text-xl"
                        >
                            ☰
                        </button>
                    )}
                    {/* Title */}
                    <h1 className="text-lg font-semibold text-center flex-1">
                        Chatbot
                    </h1>
                </div>

                {/* Chat area */}
                <div className="pt-14 flex-1 overflow-y-auto">
                    <ChatWindow />
                </div>

                {/* Input */}
                <InputBox />

            </div>

        </div>

    )

}

export default Home