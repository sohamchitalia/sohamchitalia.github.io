import { useState, useEffect } from 'react'

interface Props {
  onTerminal: () => void
}

export default function Navbar({ onTerminal }: Props) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <nav className={scrolled ? 'scrolled' : ''}>
      <div className="nav-logo">S<span>.</span>Chitalia</div>
      <div className="nav-links">
        {['timeline', 'projects', 'skills', 'contact'].map(s => (
          <a key={s} href={`#${s}`}>{s}</a>
        ))}
      </div>
      <button className="nav-terminal-btn" onClick={onTerminal}>&gt; _</button>
    </nav>
  )
}
