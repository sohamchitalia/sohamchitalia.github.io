import { useState } from 'react'

interface Project {
  cat: string
  name: string
  desc: string
  href: string
}

const ALL_PROJECTS: Project[] = [
  {
    cat: 'Web Dev', name: 'ReactJS News Website',
    desc: 'Full-stack news aggregator built with React and Flask, featuring real-time feeds and category filtering.',
    href: 'https://github.com/sohamchitalia/CSCI571_FlaskNewsApp',
  },
  {
    cat: 'Android', name: 'Android News App',
    desc: 'Native Android application for on-the-go news consumption with offline reading mode.',
    href: 'https://github.com/sohamchitalia',
  },
  {
    cat: 'AI', name: 'Halma Game Playing Agent',
    desc: 'Adversarial search agent using minimax + alpha-beta pruning to beat human players in the Halma board game.',
    href: 'https://sohamchitalia.github.io/CSCI561_HalmaGameAgent/',
  },
  {
    cat: 'AI', name: 'Rod Balancing Agent',
    desc: 'Reinforcement learning agent trained to balance a rod using policy gradient methods.',
    href: 'https://github.com/sohamchitalia/RodBalancingAI',
  },
  {
    cat: 'AI', name: 'Resolution: FOL',
    desc: 'First-order logic theorem prover using resolution refutation with unification and CNF conversion.',
    href: 'https://github.com/sohamchitalia/CSCI561_SearchAlgorithms',
  },
  {
    cat: 'ML', name: 'Taxi Revenue Optimization',
    desc: 'ML pipeline to predict high-value zones for taxi drivers using NYC trip data and clustering.',
    href: 'https://github.com/sohamchitalia',
  },
  {
    cat: 'ML', name: 'Twitter Sentiment Analysis',
    desc: 'NLP model classifying tweet sentiment using TF-IDF features and ensemble classifiers.',
    href: 'https://github.com/sohamchitalia/TwitterSentimentAnalysis',
  },
  {
    cat: 'ML', name: 'Bully Detection',
    desc: 'Text classification system detecting cyberbullying in social media posts using deep NLP features.',
    href: 'https://github.com/sohamchitalia/Bullying-detection',
  },
  {
    cat: 'Web Dev', name: 'ASM Art Gallery',
    desc: 'Digital art gallery web application built for showcasing local Mumbai artist work online.',
    href: 'https://github.com/sohamchitalia/art-ASM',
  },
]

export default function ProjectsSection() {
  const [filter, setFilter] = useState('All')
  const tabs = ['All', 'Web Dev', 'Android', 'AI', 'ML']
  const shown = filter === 'All' ? ALL_PROJECTS : ALL_PROJECTS.filter(p => p.cat === filter)

  return (
    <section id="projects">
      <div className="section-label fade-in">Projects</div>
      <h2 className="section-title fade-in delay-1">Things I've<br /><em>shipped &amp; explored</em></h2>
      <div className="divider fade-in delay-2" />
      <div className="filter-tabs fade-in delay-2">
        {tabs.map(t => (
          <button key={t} className={`filter-tab ${filter === t ? 'active' : ''}`} onClick={() => setFilter(t)}>{t}</button>
        ))}
      </div>
      <div className="projects-grid">
        {shown.map((p, i) => (
          <a
            key={p.name}
            className="project-card fade-in"
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            style={{ transitionDelay: `${i * 0.05}s` }}
          >
            <div className="project-cat">{p.cat}</div>
            <div className="project-name">{p.name}</div>
            <p className="project-desc">{p.desc}</p>
            <div className="project-arrow">View project <span>→</span></div>
          </a>
        ))}
      </div>
    </section>
  )
}
