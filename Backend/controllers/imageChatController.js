import { analyzeImage } from "../services/visionService.js"

export const imageChat = async (req, res) => {

  try {

    const file = req.file
    const question = req.body.question

    if (!file) {

      return res.status(400).json({
        error: "No image uploaded"
      })

    }

    const answer = await analyzeImage(file.buffer, question)

    res.json({
      answer
    })

  }

  catch (error) {

    console.log("IMAGE ERROR:", error)

    res.status(500).json({
      error: "Image AI error"
    })

  }

}