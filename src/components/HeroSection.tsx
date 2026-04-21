import { useState, useEffect } from 'react'
import ParticleCanvas from './ParticleCanvas'

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0)
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <section id="hero" style={{ padding: 0 }}>
      <ParticleCanvas enabled={true} />
      <div style={{ position: 'relative', zIndex: 1, padding: '0 10vw', transform: `translateY(${scrollY * 0.18}px)` }}>
        <div className="hero-tag fade-in">Senior Software Engineer · Canva</div>
        <h1 className="hero-name fade-in delay-1">Soham<br /><em>Chitalia</em></h1>
        <p className="hero-sub fade-in delay-2">
          Building scalable systems powering real customer experiences worldwide
        </p>
        <div className="hero-cities fade-in delay-3">
          <div className="dot" />Sydney, Australia
        </div>
      </div>
      <div className="hero-photo-wrap">
        <img src="/img/myimg.jpeg" alt="Soham Chitalia" />
      </div>
      <div className="scroll-hint">
        <div className="scroll-line" />
        <span>Scroll to explore</span>
      </div>
    </section>
  )
}
