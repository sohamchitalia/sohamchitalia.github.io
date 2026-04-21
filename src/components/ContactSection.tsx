import { useState } from 'react'

interface Fields { name: string; email: string; message: string }
interface Errors { name?: string; email?: string; message?: string }

function ContactForm() {
  const [fields, setFields] = useState<Fields>({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState<Errors>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  const validate = (): Errors => {
    const e: Errors = {}
    if (!fields.name.trim()) e.name = 'Name is required'
    if (!fields.email.trim()) e.email = 'Email is required'
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) e.email = 'Enter a valid email'
    if (!fields.message.trim()) e.message = 'Message is required'
    return e
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setErrors({})
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          access_key: '0957afd0-4b58-4245-bb7c-705671fd101b',
          name: fields.name,
          email: fields.email,
          message: fields.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
      } else {
        setStatus('idle')
        setErrors({ message: 'Something went wrong. Please try again.' })
      }
    } catch {
      setStatus('idle')
      setErrors({ message: 'Something went wrong. Please try again.' })
    }
  }

  const set = (k: keyof Fields) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFields(f => ({ ...f, [k]: e.target.value }))
    setErrors(er => ({ ...er, [k]: undefined }))
  }

  if (status === 'sent') return (
    <div className="contact-form">
      <div style={{ fontSize: '1.1rem', color: '#faf8f4', fontFamily: 'var(--font-display)', fontStyle: 'italic', marginBottom: 8 }}>Message sent ✦</div>
      <div className="form-success">Thanks for reaching out — I'll get back to you soon.</div>
    </div>
  )

  return (
    <form className="contact-form" onSubmit={submit} noValidate>
      <div className="form-grid">
        <div className="form-field">
          <label className="form-label">Name</label>
          <input className="form-input" placeholder="Your name" value={fields.name} onChange={set('name')} />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>
        <div className="form-field">
          <label className="form-label">Email</label>
          <input className="form-input" type="email" placeholder="your@email.com" value={fields.email} onChange={set('email')} />
          {errors.email && <span className="form-error">{errors.email}</span>}
        </div>
        <div className="form-field full">
          <label className="form-label">Message</label>
          <textarea className="form-textarea" placeholder="What's on your mind?" value={fields.message} onChange={set('message')} />
          {errors.message && <span className="form-error">{errors.message}</span>}
        </div>
      </div>
      <button className="form-submit" type="submit" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : 'Send message →'}
      </button>
    </form>
  )
}

const CONTACT_LINKS = [
  { label: 'Email', val: 'sohamjig@usc.edu', href: 'mailto:sohamjig@usc.edu' },
  { label: 'GitHub', val: 'github.com/sohamchitalia', href: 'https://github.com/sohamchitalia' },
  { label: 'LinkedIn', val: 'linkedin.com/in/sohamchitalia', href: 'https://linkedin.com/in/sohamchitalia' },
  { label: 'Location', val: 'Sydney, Australia', href: null },
]

export default function ContactSection() {
  return (
    <section id="contact">
      <div className="section-label fade-in">Get in touch</div>
      <h2 className="section-title fade-in delay-1" style={{ color: '#faf8f4' }}>Let's build<br /><em>something great</em></h2>
      <div className="divider fade-in delay-2" />
      <div className="contact-grid fade-in delay-2">
        <div>
          <div className="contact-tagline">
            I'm always up for interesting conversations about systems, scale, and <em>creative technology</em>.
          </div>
          <div className="contact-links" style={{ marginTop: 32 }}>
            {CONTACT_LINKS.map(l => (
              <a
                key={l.label}
                className="contact-link"
                href={l.href ?? '#'}
                target={l.href && !l.href.startsWith('mailto') ? '_blank' : undefined}
                rel={l.href && !l.href.startsWith('mailto') ? 'noopener noreferrer' : undefined}
              >
                <div><span className="label">{l.label}</span>{l.val}</div>
                {l.href && <span style={{ marginLeft: 'auto', opacity: 0.4 }}>→</span>}
              </a>
            ))}
          </div>
        </div>
        <ContactForm />
      </div>
      <div className="footer-note">
        <span>© 2026 Soham Chitalia</span>
        <span>Mumbai · Los Angeles · Seattle · Sydney</span>
      </div>
    </section>
  )
}
