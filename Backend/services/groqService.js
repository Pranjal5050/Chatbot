import Groq from "groq-sdk"

export const askGroq = async (messages) => {

  const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
  })

  const formattedMessages = messages.map(msg => ({
    role: msg.role === "ai" ? "assistant" : "user",
    content: msg.text
  }))

  const completion = await groq.chat.completions.create({
    messages: formattedMessages,
    model: "llama-3.1-8b-instant"
  })

  return completion.choices[0].message.content
}