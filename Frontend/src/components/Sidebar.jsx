import { useDispatch, useSelector } from "react-redux"
import { setCurrentChat, createNewChat } from "../redux/slices/chatSlice"
import { RiCloseLargeLine } from "@remixicon/react"
import { RiCloseLine } from "@remixicon/react"
import { deleteChatApi } from "../api/chatApi"

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {

  const { chats } = useSelector((state) => state.chat)

  const dispatch = useDispatch()
  const handleNewChat = () => {

    dispatch(createNewChat())
    setSidebarOpen(false)

  }

  // Delete chat
  const handleDelete = async (e, id) => {

    e.stopPropagation() // prevent chat open

    const confirmDelete = window.confirm("Delete this chat?")

    if (!confirmDelete) return

    try {

      await deleteChatApi(id)

      dispatch(deleteChat(id))

    } catch (error) {

      console.log("DELETE ERROR:", error)

    }

  }
  return (

    <div
      className={`fixed top-0 left-0 h-full w-full md:w-64 bg-[#020617] p-4 z-50 transition-transform duration-300
      ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      {/* Close button */}
      <button
        onClick={() => setSidebarOpen(false)}
        className="mb-4 text-gray-400 cursor-pointer"
      >
        <RiCloseLargeLine />
      </button>

      {/* New chat */}
      <button
        className="w-full bg-zinc-800 py-2 rounded mb-4 cursor-pointer hover:bg-zinc-700"
        onClick={handleNewChat}
      >
        + New Chat
      </button>

      {chats.length === 0 && (
        <p className="text-gray-400">No chats yet</p>
      )}

      {/* Chat list */}
      {chats.map((chat) => (

        <div
          key={chat._id}
          onClick={() => {
            dispatch(setCurrentChat(chat))
            setSidebarOpen(false)
          }}
          className="flex justify-between items-center p-2 hover:bg-gray-800 rounded cursor-pointer font-bold"
        >

          <span className="truncate">
            {chat.title}
          </span>

          {/* Delete button */}
          <button
            onClick={(e) => handleDelete(e, chat._id)}
            className="text-red-400 text-sm ml-2"
          >
            <RiCloseLine />
          </button>

        </div>

      ))}

      {/* Logout */}
      <button
        className="text-red-600 px-8 py-2 rounded cursor-pointer absolute top-2 right-0 z-50"
        onClick={() => {
          localStorage.removeItem("token")
          window.location.reload()
        }}
      >
        Logout
      </button>

    </div>

  )

}

export default Sidebar