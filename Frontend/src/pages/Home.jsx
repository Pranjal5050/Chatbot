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
    //test
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

        <div className="flex h-screen bg-[#0f172a] text-white">

            <Sidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <div
                className={`flex flex-col flex-1 transition-all duration-300
                ${sidebarOpen ? "ml-64" : "ml-0"}`}
            >

                {/* Top Bar */}
                <div className="p-3 border-b border-gray-700">

                    {!sidebarOpen && (
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="text-white text-xl"
                        >
                            ☰
                        </button>
                    )}

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