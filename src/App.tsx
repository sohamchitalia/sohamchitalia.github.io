import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import TimelineSection from './components/TimelineSection'
import ProjectsSection from './components/ProjectsSection'
import SkillsSection from './components/SkillsSection'
import ContactSection from './components/ContactSection'
import Terminal from './components/Terminal'

function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.fade-in')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible') }),
      { threshold: 0.12 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function App() {
  const [terminal, setTerminal] = useState(false)
  useScrollReveal()

  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if (e.key === '`') setTerminal(t => !t)
      if (e.key === 'Escape') setTerminal(false)
    }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [])

  return (
    <>
      {terminal && <Terminal onClose={() => setTerminal(false)} />}
      <Navbar onTerminal={() => setTerminal(true)} />
      <HeroSection />
      <TimelineSection />
      <ProjectsSection />
      <SkillsSection />
      <ContactSection />
    </>
  )
}
