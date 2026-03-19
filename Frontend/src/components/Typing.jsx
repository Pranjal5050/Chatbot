import { useState, useEffect } from "react"

const TypingText = ({ text }) => {

  const [displayText, setDisplayText] = useState("")

  useEffect(() => {

    let i = 0

    const interval = setInterval(() => {

      setDisplayText((prev) => prev + text[i])

      i++

      if (i >= text.length) {
        clearInterval(interval)
      }

    }, 15) // speed

    return () => clearInterval(interval)

  }, [text])

  return <span>{displayText}</span>

}

export default TypingText