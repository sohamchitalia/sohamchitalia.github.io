import { useState, useEffect, useRef } from 'react'

type LineType = { type: 'input'; text: string } | { type: 'output'; html: string }

const CMDS: Record<string, () => string> = {
  help: () => `<span style="color:#4ec94e">Available commands:</span>\n  whoami    — about Soham\n  journey   — the cities trail\n  skills    — tech stack\n  contact   — get in touch\n  clear     — clear terminal\n  exit      — close`,
  whoami: () => `<span style="color:#d4601a">Soham Chitalia</span> — Software Engineer\nCurrently: Joining <span style="color:#d4601a">Canva</span> in Sydney 🎨\nPreviously: Amazon (Seattle + Sydney), USC grad, DJ Sanghvi alum\n"Building scalable systems powering real customer experiences worldwide"`,
  journey: () => `📍 <span style="color:#d4601a">Mumbai, India</span>     — grew up, DJ Sanghvi College (BE Comp Eng)\n✈  <span style="color:#d4601a">Los Angeles, USA</span>  — USC Master's in Computer Science (2021)\n☁  <span style="color:#d4601a">Seattle, USA</span>      — Amazon SDE, Alexa Video Multimodal (→ Apr 2024)\n🦘 <span style="color:#d4601a">Sydney, Australia</span> — Amazon SDE, then Canva (joining soon 🎉)`,
  skills: () => `Languages:  <span style="color:#d4601a">Python, Java, C++, TypeScript</span>\nCloud:      <span style="color:#d4601a">AWS (Lambda, DynamoDB, S3, SQS)</span>\nFrontend:   <span style="color:#d4601a">React, Angular, HTML/CSS</span>\nBackend:    <span style="color:#d4601a">Distributed systems, REST, Microservices</span>\nML/AI:      <span style="color:#d4601a">PyTorch, scikit-learn, NLP</span>`,
  contact: () => `Email:    <span style="color:#d4601a">sohamjig@usc.edu</span>\nGitHub:   <span style="color:#d4601a">github.com/sohamchitalia</span>\nLinkedIn: <span style="color:#d4601a">linkedin.com/in/sohamchitalia</span>`,
  clear: () => '__clear__',
}

interface Props {
  onClose: () => void
}

export default function Terminal({ onClose }: Props) {
  const [lines, setLines] = useState<LineType[]>([
    { type: 'output', html: '<span style="color:#4ec94e">soham@portfolio</span> ~ % type <span style="color:#d4601a">help</span> to get started' },
  ])
  const [input, setInput] = useState('')
  const [history, setHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const bodyRef = useRef<HTMLDivElement>(null)

  const run = (cmd: string) => {
    const c = cmd.trim().toLowerCase()
    if (c === 'exit') { onClose(); return }
    const fn = CMDS[c]
    const result = fn ? fn() : `<span style="color:#e55">command not found: ${c}</span> — try 'help'`
    if (result === '__clear__') { setLines([]); return }
    setLines(l => [...l, { type: 'input', text: cmd }, { type: 'output', html: result }])
    setHistory(h => [cmd, ...h])
    setHistIdx(-1)
  }

  const onKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') { if (input.trim()) run(input); setInput('') }
    else if (e.key === 'ArrowUp') { const i = Math.min(histIdx + 1, history.length - 1); setHistIdx(i); setInput(history[i] || ''); e.preventDefault() }
    else if (e.key === 'ArrowDown') { const i = Math.max(histIdx - 1, -1); setHistIdx(i); setInput(i < 0 ? '' : history[i]); e.preventDefault() }
    else if (e.key === 'Escape') onClose()
  }

  useEffect(() => { if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight }, [lines])

  return (
    <div className="terminal-overlay" onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div className="terminal-window">
        <div className="terminal-bar">
          <div className="t-btn" style={{ background: '#ff5f56', cursor: 'pointer' }} onClick={onClose} />
          <div className="t-btn" style={{ background: '#ffbd2e' }} />
          <div className="t-btn" style={{ background: '#27c93f' }} />
          <span className="terminal-title">soham@portfolio — bash</span>
        </div>
        <div className="terminal-body" ref={bodyRef}>
          {lines.map((l, i) =>
            l.type === 'input'
              ? <div key={i}><span className="t-prompt">soham@portfolio % </span>{l.text}</div>
              : <div key={i} className="t-output" dangerouslySetInnerHTML={{ __html: l.html }} />
          )}
        </div>
        <div className="terminal-input-row">
          <span className="t-prompt">soham@portfolio % </span>
          <input
            className="terminal-input"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={onKey}
            autoFocus
          />
          <button className="terminal-close" onClick={onClose}>esc</button>
        </div>
      </div>
    </div>
  )
}
