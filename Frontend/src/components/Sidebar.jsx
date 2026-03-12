import { useDispatch, useSelector } from "react-redux"

import {
  createNewChat,
  setCurrentChat,
  deleteChat
} from "../redux/slices/chatSlice"

import { deleteChat as deleteChatAPI } from "../api/chatApi"

function Sidebar(){

const dispatch = useDispatch()

const { chats, currentChat } = useSelector((state)=>state.chat)

return(

<div className="w-64 bg-slate-900 border-r border-slate-800 p-4 flex flex-col">

{/* New Chat */}

<button
onClick={()=>dispatch(createNewChat())}
className="bg-indigo-600 p-2 rounded-lg mb-4 hover:bg-indigo-500 transition text-white"
>
+ New Chat
</button>


{/* Chat List */}

<div className="flex-1 overflow-y-auto space-y-2">

{chats.length === 0 && (

<p className="text-gray-400 text-sm">
No chats yet
</p>

)}

{chats.map((chat)=>{

const active = String(chat.id) === String(currentChat)

return(

<div
key={chat.id}
onClick={()=>dispatch(setCurrentChat(chat.id))}
className={`flex justify-between items-center p-2 rounded-lg cursor-pointer text-sm transition

${active
? "bg-slate-700"
: "hover:bg-slate-800"
}
`}
>

{/* Chat Title */}

<span className="truncate text-white">

{chat.title || "New Chat"}

</span>


{/* Delete Button */}

<button
onClick={async(e)=>{

e.stopPropagation()

try{

await deleteChatAPI(chat.id)

dispatch(deleteChat(chat.id))

}catch(err){

console.log("Delete error:",err)

}

}}
className="text-red-400 hover:text-red-500 ml-2"
>

❌

</button>

</div>

)

})}

</div>

</div>

)

}

export default Sidebar