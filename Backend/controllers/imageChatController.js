import { analyzeImage } from "../services/visionService.js";
import sanitizeHtml from "sanitize-html";

export const imageChat = async (req, res) => {
  try {
    const file = req.file;
    let { question } = req.body;

    // ❌ Check image exists
    if (!file) {
      return res.status(400).json({
        error: "No image uploaded"
      });
    }

    // ❌ File type validation (important)
    const allowedTypes = ["image/jpeg", "image/png", "image/webp"];

    if (!allowedTypes.includes(file.mimetype)) {
      return res.status(400).json({
        error: "Only JPG, PNG, WEBP images are allowed"
      });
    }

    // ❌ File size limit (5MB)
    const MAX_SIZE = 5 * 1024 * 1024;

    if (file.size > MAX_SIZE) {
      return res.status(400).json({
        error: "Image size should be less than 5MB"
      });
    }

    // 🧹 Sanitize question
    question = sanitizeHtml(question || "", {
      allowedTags: [],
      allowedAttributes: {}
    });

    // ❌ Optional: empty question handle
    if (!question.trim()) {
      question = "Describe this image";
    }

    // 🤖 AI processing
    const answer = await analyzeImage(file.buffer, question);

    // 🧹 Sanitize AI output
    const cleanAnswer = sanitizeHtml(answer, {
      allowedTags: [],
      allowedAttributes: {}
    });

    res.json({
      answer: cleanAnswer
    });

  } catch (error) {
    console.error("IMAGE ERROR:", error);

    res.status(500).json({
      error: "Image AI error"
    });
  }
};