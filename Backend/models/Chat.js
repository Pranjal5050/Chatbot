import mongoose from "mongoose"

const chatSchema = new mongoose.Schema({

  title: String,

  messages: [
    {
      role: String,
      text: String
    }
  ]

}, { timestamps: true })

export default mongoose.model("Chat", chatSchema)