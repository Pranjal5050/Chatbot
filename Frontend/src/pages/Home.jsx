import Sidebar from "../components/Sidebar"
import ChatWindow from "../components/ChatWindow"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { loadChats } from "../redux/slices/chatSlice"
import { getChats } from "../api/chatApi"

function Home() {

    const dispatch = useDispatch()

    const { chats } = useSelector(state => state.chat)

    useEffect(() => {

        // if chats already loaded → skip
        if (chats.length > 0) return

        const fetchChats = async () => {

            const data = await getChats()

            const formattedChats = data.map(chat => ({
                id: chat._id,
                title: chat.title,
                messages: chat.messages
            }))

            dispatch(loadChats(formattedChats))

        }

        fetchChats()

    }, [dispatch, chats.length])

    return (

        <div className="flex h-screen overflow-hidden">

            <Sidebar />

            <ChatWindow />

        </div>

    )

}

export default Home