import { useState } from 'react'

interface TimelineEntry {
  id: number
  year: string
  org: string
  role: string
  location: string
  type: 'work' | 'education'
  desc: string
  tags: string[]
  current?: boolean
}

const TIMELINE_DATA: TimelineEntry[] = [
  {
    id: 1, year: '2015 – 2019', org: 'DJ Sanghvi College of Engineering',
    role: 'BE in Computer Engineering', location: 'Mumbai, India', type: 'education',
    desc: "Completed my undergraduate degree at one of Mumbai's top engineering colleges, building a strong foundation in algorithms, data structures, operating systems, and web development. This is where the engineer in me was forged.",
    tags: ['Algorithms', 'Data Structures', 'Operating Systems', 'Python', 'Java', 'Web Dev'],
  },
  {
    id: 2, year: '2019 – 2021', org: 'University of Southern California',
    role: 'MS in Computer Science · Viterbi School of Engineering', location: 'Los Angeles, USA', type: 'education',
    desc: "Pursued a master's at USC's Viterbi School of Engineering — moved across the world for it. Deepened expertise in AI, machine learning, cloud computing, and distributed systems while working on research projects and interning at Amazon.",
    tags: ['AI', 'Machine Learning', 'Cloud Computing', 'Distributed Systems', 'NLP'],
  },
  {
    id: 3, year: '2021 – Apr 2024', org: 'Amazon',
    role: 'Software Development Engineer · Alexa Video Multimodal', location: 'Seattle, USA', type: 'work',
    desc: "Built scalable back-end systems for Alexa's short-form video experience on Echo Show devices. Designed distributed pipelines serving millions of daily requests across AWS Lambda, DynamoDB, and SQS. Shipped from Seattle — rain included.",
    tags: ['AWS', 'Java', 'Python', 'DynamoDB', 'Lambda', 'Distributed Systems', 'Microservices'],
  },
  {
    id: 4, year: 'Apr 2024 – May 2026', org: 'Amazon',
    role: 'Software Development Engineer', location: 'Sydney, Australia', type: 'work',
    desc: "Relocated to Amazon's Sydney office, building high-scale cloud infrastructure to serve the APAC region. Traded Seattle grey for Sydney sunshine without missing a deploy.",
    tags: ['AWS', 'System Design', 'Cloud Infrastructure', 'Java', 'Python'],
  },
  {
    id: 5, year: 'May 2026 – Present', org: 'Canva',
    role: 'Senior Software Engineer', location: 'Sydney, Australia', type: 'work', current: true,
    desc: 'Joining Canva to help build tools that empower hundreds of millions of people to design anything, anywhere. Building at the intersection of engineering and creativity.',
    tags: ['Upcoming'],
  },
]

export default function TimelineSection() {
  const [openId, setOpenId] = useState<number | null>(5)
  const toggle = (id: number) => setOpenId(prev => prev === id ? null : id)

  return (
    <section id="timeline">
      <div className="section-label fade-in">Journey &amp; Experience</div>
      <h2 className="section-title fade-in delay-1">The full<br /><em>story so far</em></h2>
      <div className="divider fade-in delay-2" />
      <div className="tl-wrap fade-in delay-2">
        {TIMELINE_DATA.map(entry => {
          const isOpen = openId === entry.id
          const isEdu = entry.type === 'education'
          return (
            <div key={entry.id} className={`tl-entry ${isOpen ? 'open' : ''} ${isEdu ? 'edu-entry' : ''}`}>
              <div className="tl-left">
                <div className="tl-year">{entry.year}</div>
                <div className={`tl-type ${entry.type}`}>{entry.type === 'education' ? 'Education' : 'Work'}</div>
              </div>
              <div style={{ display: 'flex', gap: 0 }}>
                <div className="tl-dot-col" style={{ width: 40, flexShrink: 0 }}>
                  <div className={`tl-dot ${isEdu ? 'edu' : ''}`} />
                </div>
                <div style={{ flex: 1, paddingBottom: 4 }}>
                  <div className="tl-card" onClick={() => toggle(entry.id)}>
                    <div className="tl-header">
                      <div>
                        <div className="tl-org">{entry.org}</div>
                        <div className="tl-role">{entry.role}</div>
                        <div className={`tl-loc ${isEdu ? 'edu' : ''}`}>{entry.location}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexShrink: 0 }}>
                        {entry.current && <div className="tl-current-badge">Current</div>}
                        <div className="tl-chevron">▼</div>
                      </div>
                    </div>
                    <div className="tl-body">
                      <p className="tl-desc">{entry.desc}</p>
                      <div className="tl-tags">{entry.tags.map(t => <span key={t} className="tl-tag">{t}</span>)}</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}
