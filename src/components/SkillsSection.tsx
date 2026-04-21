import { useState, useEffect, useRef } from 'react'

const SKILL_GROUPS = [
  {
    title: 'Languages & Frameworks',
    items: [
      ['Python', 92], ['Java', 88], ['JavaScript / TypeScript', 84],
      ['C / C++', 72], ['React / Angular', 85],
    ] as [string, number][],
  },
  {
    title: 'Cloud & Systems',
    items: [
      ['AWS (Lambda, DDB, SQS, S3)', 88], ['Distributed Systems', 85],
      ['System Design', 82], ['Microservices & APIs', 86], ['ML / AI (PyTorch, sklearn)', 75],
    ] as [string, number][],
  },
]

export default function SkillsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [animated, setAnimated] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setAnimated(true) }, { threshold: 0.3 })
    if (sectionRef.current) obs.observe(sectionRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="skills" ref={sectionRef}>
      <div className="section-label fade-in">Skills</div>
      <h2 className="section-title fade-in delay-1">The <em>toolkit</em></h2>
      <div className="divider fade-in delay-2" />
      <div className="skills-grid fade-in delay-2">
        {SKILL_GROUPS.map(g => (
          <div key={g.title}>
            <div className="skill-group-title">{g.title}</div>
            {g.items.map(([name, pct]) => (
              <div key={name} className="skill-item">
                <span className="skill-name">{name}</span>
                <div className="skill-bar-wrap">
                  <div
                    className={`skill-bar ${animated ? 'animate' : ''}`}
                    style={{ width: `${pct}%`, transitionDuration: `${0.8 + pct / 200}s` }}
                  />
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
