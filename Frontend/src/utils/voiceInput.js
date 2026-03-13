export const startVoiceInput = (setInput) => {

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition

  const recognition = new SpeechRecognition()

  recognition.lang = "en-US"
  recognition.interimResults = false

  recognition.start()

  recognition.onresult = (event) => {

    const transcript = event.results[0][0].transcript

    setInput(transcript)

  }

}