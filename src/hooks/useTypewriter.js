import { useState, useCallback } from 'react'

export const useTypewriter = (text, speed = 40) => {
  const [typedText, setTypedText] = useState('')
  const [showCaret, setShowCaret] = useState(false)

  const start = useCallback(() => {
    setTypedText('')
    setShowCaret(true)
    let i = 0
    const interval = setInterval(() => {
      if (i < text.length) {
        setTypedText(text.substring(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setTimeout(() => setShowCaret(false), 2000)
      }
    }, speed)

    return () => clearInterval(interval)
  }, [text, speed])

  const reset = useCallback(() => {
    setTypedText('')
    setShowCaret(false)
  }, [])

  return { typedText, showCaret, start, reset }
}
