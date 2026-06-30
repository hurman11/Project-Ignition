import { motion } from 'framer-motion'

const LetterHover = ({ text, className = '', style = {} }) => {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span 
          key={i} 
          className={`hero-letter inline-block pointer-events-auto ${className}`}
          style={{ opacity: 0, transform: 'translateY(60px)', color: 'var(--text-color)', ...style }}
          whileHover={{ scale: 1.25, y: -20 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          {char === ' ' ? '\u00A0' : char}
        </motion.span>
      ))}
    </>
  )
}

export default LetterHover
