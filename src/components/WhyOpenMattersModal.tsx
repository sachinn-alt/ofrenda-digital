import React, { useState } from 'react'
import { X, ShieldCheck, Flame, WifiOff, Lock, HeartHandshake, Copy, Check, Sparkles } from 'lucide-react'

interface WhyOpenMattersModalProps {
  onClose: () => void
}

export const WhyOpenMattersModal: React.FC<WhyOpenMattersModalProps> = ({ onClose }) => {
  const [copied, setCopied] = useState<boolean>(false)

  const devArticleSnippet = `## Why Does Open Innovation Matter?

When we remember those we love, our data is not telemetry, engagement metrics, or training fodder. It is sacred.

A virtual ofrenda is home to our grandmother’s secret kitchen recipes, our father’s laughter recorded on a quiet porch, and heartfelt eulogies read by candlelight on Día de los Muertos. Trusting these intimate family artifacts to closed corporate APIs creates an unacceptable tension:

1. **Privacy & Sanctity:** Closed cloud LLMs route personal memories and voice transcripts through remote servers where they may be stored, analyzed, or incorporated into proprietary training weights. With open-weight Gemma running locally, our memories never leave local memory.
2. **Works With the Lights (and Internet) Off:** A real ofrenda is celebrated at midnight, often in places where connectivity is unreliable or by candlelight. Because open-weight Gemma runs directly on consumer laptops (via local Ollama or lightweight offline synthesis), Ofrenda Digital functions flawlessly with the internet severed.
3. **Immunity from Bit-Rot & Subscriptions:** Closed AI services get acquired, pivot, change pricing tiers, or deprecate endpoints. Memory should not expire when a SaaS startup shuts down. Open innovation ensures that this memory capsule (stored in open JSON) will remain readable and runnable decades into the future.
4. **Cultural Freedom:** Traditional Mexican *Calaveritas Literarias* involve playful, humorous dialogues between Death ("La Catrina") and the departed. Closed commercial APIs often flag benign discussions of mortality as policy violations; open-weight models let us honor authentic cultural traditions without corporate censorship.`

  const handleCopy = () => {
    navigator.clipboard.writeText(devArticleSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 2500)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{ maxWidth: 740 }}
      >
        {/* Header */}
        <div 
          style={{
            padding: '22px 28px 16px 28px',
            borderBottom: '1px solid rgba(255, 170, 0, 0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.12), rgba(156, 39, 176, 0.12))'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <div 
              style={{
                width: 40,
                height: 40,
                borderRadius: '50%',
                background: 'rgba(255, 170, 0, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(255, 170, 0, 0.4)'
              }}
            >
              <ShieldCheck size={22} color="var(--cempasuchil-gold)" />
            </div>
            <div>
              <h2 className="font-serif text-gold-gradient" style={{ fontSize: '1.35rem' }}>
                Why Open Innovation Matters
              </h2>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                Ghost in the Machine • Hacktoberfest 2026 Core Theme
              </div>
            </div>
          </div>
          <button className="btn-ghost" onClick={onClose}>
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div style={{ padding: '26px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
          {/* Lede Highlight */}
          <div 
            style={{
              padding: '16px 20px',
              background: 'rgba(255, 170, 0, 0.08)',
              borderLeft: '4px solid var(--cempasuchil-gold)',
              borderRadius: '0 10px 10px 0'
            }}
          >
            <p style={{ fontSize: '1rem', lineHeight: 1.6, color: 'var(--text-primary)', fontStyle: 'italic' }}>
              "Does running your own model mean your project works with the lights (and the internet) off? Keep your family's photos and stories private on your own machine? Make sure what you build isn't locked inside a service that might disappear someday?"
            </p>
            <div style={{ fontSize: '0.8rem', color: 'var(--cempasuchil-gold)', marginTop: 8, fontWeight: 600 }}>
              — Hacktoberfest DEV Challenge Prompt
            </div>
          </div>

          {/* 4 Pillars of Open AI for Remembrance */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16 }}>
            {/* Pillar 1 */}
            <div className="glass-panel" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Lock size={18} color="var(--cempasuchil-gold)" />
                <h4 style={{ color: 'var(--text-gold)', fontSize: '0.98rem' }}>1. Unconditional Privacy</h4>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                A grandmother's whispered kitchen recipes and dying words should never be sent to a corporate cloud API to be harvested for ad profiles or telemetry. Open-weight Gemma runs entirely inside your device's memory.
              </p>
            </div>

            {/* Pillar 2 */}
            <div className="glass-panel" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <WifiOff size={18} color="#81c784" />
                <h4 style={{ color: '#81c784', fontSize: '0.98rem' }}>2. Works with the Internet Off</h4>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Día de los Muertos occurs by real candlelight in homes, cemeteries, and quiet rooms. A memorial that fails when the Wi-Fi drops is a broken promise. Open AI grants true offline independence.
              </p>
            </div>

            {/* Pillar 3 */}
            <div className="glass-panel" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <HeartHandshake size={18} color="#80d8ff" />
                <h4 style={{ color: '#80d8ff', fontSize: '0.98rem' }}>3. Zero Bit-Rot & Longevity</h4>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Proprietary cloud startups get acquired, change pricing tiers, or shut down their servers. Our open JSON Memory Capsules and open-weight Gemma weights will remain bootable and readable in 2046.
              </p>
            </div>

            {/* Pillar 4 */}
            <div className="glass-panel" style={{ padding: '18px 20px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <Flame size={18} color="#ff4081" />
                <h4 style={{ color: '#ff4081', fontSize: '0.98rem' }}>4. Cultural Authenticity</h4>
              </div>
              <p style={{ fontSize: '0.84rem', color: 'var(--text-secondary)', lineHeight: 1.55 }}>
                Mexican folk traditions embrace playful dialogues with *La Muerte* through Calaveritas. Closed commercial models often flag harmless discussions of death as safety violations. Open models allow genuine cultural reverence.
              </p>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="glass-panel" style={{ padding: '18px 22px' }}>
            <h4 style={{ fontSize: '0.95rem', color: 'var(--text-gold)', marginBottom: 12 }}>
              Closed Cloud API vs. Open-Source Gemma Sanctuary
            </h4>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', fontSize: '0.84rem', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.15)', color: 'var(--text-muted)' }}>
                    <th style={{ padding: '8px 12px' }}>Feature</th>
                    <th style={{ padding: '8px 12px' }}>Closed Cloud Model</th>
                    <th style={{ padding: '8px 12px', color: 'var(--cempasuchil-gold)' }}>Open-Weight Gemma</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Family Data Location</td>
                    <td style={{ padding: '8px 12px', color: '#ff8a80' }}>Third-party remote servers</td>
                    <td style={{ padding: '8px 12px', color: '#b9f6ca', fontWeight: 600 }}>100% On your device</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Offline Operation</td>
                    <td style={{ padding: '8px 12px', color: '#ff8a80' }}>Impossible (needs active internet)</td>
                    <td style={{ padding: '8px 12px', color: '#b9f6ca', fontWeight: 600 }}>Flawless (runs offline)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.05)' }}>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Operating Cost</td>
                    <td style={{ padding: '8px 12px' }}>Per-token API fees & credit cards</td>
                    <td style={{ padding: '8px 12px', color: '#b9f6ca', fontWeight: 600 }}>$0.00 Forever</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '8px 12px', fontWeight: 600 }}>Longevity (20 Years)</td>
                    <td style={{ padding: '8px 12px', color: '#ff8a80' }}>Subject to vendor sunsetting</td>
                    <td style={{ padding: '8px 12px', color: '#b9f6ca', fontWeight: 600 }}>Immortal (Open weights + JSON)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Copy Snippet for DEV Submission Post */}
          <div 
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '14px 18px',
              background: 'rgba(255, 255, 255, 0.04)',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              flexWrap: 'wrap',
              gap: 12
            }}
          >
            <div>
              <div style={{ fontSize: '0.86rem', color: 'var(--text-primary)', fontWeight: 600 }}>
                Ready to submit to DEV?
              </div>
              <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                Copy the pre-formatted "Why Open Innovation Matters" section for your submission article.
              </div>
            </div>

            <button 
              className="btn-secondary" 
              onClick={handleCopy}
              style={{
                borderColor: copied ? '#4caf50' : 'rgba(255, 170, 0, 0.4)',
                color: copied ? '#81c784' : 'var(--text-gold)'
              }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? 'Copied to Clipboard!' : 'Copy DEV Post Section'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
