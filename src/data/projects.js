import nexusQuizImg from '../assets/nexus_quiz_engine.png'

export const projects = [
  {
    id: 1,
    title: 'AI QUIZ GENERATOR',
    description: 'An AI-powered interface that generates intelligent quizzes from any topic — fast, fluid, and frictionless.',
    tags: ['React', 'AI Integration', 'Vercel'],
    image: nexusQuizImg,
    link: 'https://ai-quiz-generaor.vercel.app',
    github: 'https://github.com/hurman11'
  },
  {
    id: 2,
    title: 'KIRITO',
    subtitle: '⚔️',
    description: 'WhatsApp AI agent that manages servers, writes code, runs OSINT, and generates media — all through natural conversation. $0/month cloud cost.',
    tags: ['Node.js', 'SQLite', 'Groq', 'Puppeteer', 'Ollama'],
    link: null,
    github: 'https://github.com/hurman11/Whatsapp-AI-Agent',
    isChatMockup: true,
    hasCaseStudy: true,
  },
  {
    id: 3,
    title: 'COMING SOON',
    description: 'Next machine is being engineered in the garage. Stay tuned.',
    tags: ['—'],
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    link: null,
    github: null,
    isLocked: true
  }
]

