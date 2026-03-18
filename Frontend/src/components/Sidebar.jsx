import { useDispatch, useSelector } from "react-redux"
import { setCurrentChat } from "../redux/slices/chatSlice"
import { createNewChat } from "../redux/slices/chatSlice"
import { RiCloseLargeLine } from "@remixicon/react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const { chats } = useSelector((state) => state.chat)

  const dispatch = useDispatch()

  const handleNewChat = () => {

    dispatch(createNewChat())

    setSidebarOpen(false)

  }
  return (

    <div
      className={`fixed top-0 left-0 h-full w-full md:w-64 bg-[#020617] p-4 z-50 transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      <button
        onClick={() => setSidebarOpen(false)}
        className="mb-4 text-gray-400 cursor-pointer"
      >
        <RiCloseLargeLine />
      </button>

      <button className="w-full bg-zinc-800 py-2 rounded mb-4 cursor-pointer hover:bg-zinc-700"
        onClick={handleNewChat}
      >
        + New Chat
      </button>

      {chats.length === 0 && (
        <p className="text-gray-400">No chats yet</p>
      )}

      {chats.map((chat) => (

        <div
          key={chat._id}
          onClick={() => dispatch(setCurrentChat(chat))}
          className="p-2 hover:bg-gray-800 rounded cursor-pointer font-bold"
        >
          {chat.title}
        </div>

      ))}
      <button className=" text-red-600 px-8 py-2 rounded cursor-pointer  absolute top-2 right-0">Logout</button>
    </div>

  )

}

export default Sidebar