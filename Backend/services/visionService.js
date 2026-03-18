import axios from "axios"

export const analyzeImage = async (imageBuffer, question) => {
  console.log(process.env.HUGGINGFACE_API_KEY)

  const response = await axios.post(

    "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large",

    imageBuffer,

    {
      headers: {
        Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
        "Content-Type": "application/octet-stream"
      }
    }

  )

  const caption = response.data[0].generated_text

  return `Image description: ${caption}. Question: ${question}`
}