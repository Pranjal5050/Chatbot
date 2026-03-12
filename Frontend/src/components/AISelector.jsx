import { useDispatch, useSelector } from "react-redux"
import { setModel } from "../redux/slices/chatSlice"

function AISelector(){

const dispatch = useDispatch()

const model = useSelector((state)=>state.chat.model)

const models = ["chatgpt","openai","gemini"]

return(

<div className="flex gap-3">

{models.map((m)=>(
<button
key={m}
onClick={()=>dispatch(setModel(m))}
className={`px-4 py-2 rounded-lg capitalize
transition

${model===m
? "bg-gradient-to-r from-indigo-500 to-purple-600"
: "bg-slate-800 hover:bg-slate-700"}

`}
>

{m}

</button>
))}

</div>

)

}

export default AISelector