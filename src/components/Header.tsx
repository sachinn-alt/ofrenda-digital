import React, { useState, useEffect } from 'react'
import { soundService } from '../services/soundService'
import { Volume2, VolumeX, Sparkles, Flame, Plus, ShieldCheck, Settings, Download, Music } from 'lucide-react'

interface HeaderProps {
  onOpenNewMemorial: () => void
  onOpenWhyOpenMatters: () => void
  onOpenGemmaConfig: () => void
  onOpenCapsuleModal: () => void
  onLightAllCandles: () => void
  onExtinguishAllCandles: () => void
  petalsActive: boolean
  onTogglePetals: () => void
  allCandlesLit: boolean
  activeModelName: string
  isOllamaConnected: boolean
}

export const Header: React.FC<HeaderProps> = ({
  onOpenNewMemorial,
  onOpenWhyOpenMatters,
  onOpenGemmaConfig,
  onOpenCapsuleModal,
  onLightAllCandles,
  onExtinguishAllCandles,
  petalsActive,
  onTogglePetals,
  allCandlesLit,
  activeModelName,
  isOllamaConnected
}) => {
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false)
  const [isMuted, setIsMuted] = useState<boolean>(false)

  useEffect(() => {
    setIsMuted(soundService.getIsMuted())
    setIsAudioPlaying(soundService.getIsAmbientPlaying())
  }, [])

  const handleToggleMusic = () => {
    const next = soundService.toggleAmbientMusic()
    setIsAudioPlaying(next)
  }

  const handleToggleMute = () => {
    const nextMute = !isMuted
    soundService.setMuted(nextMute)
    setIsMuted(nextMute)
  }

  // Traditional papel picado patterns & colors
  const papelItems = [
    { bg: 'var(--papel-pink)', symbol: '💀' },
    { bg: 'var(--papel-orange)', symbol: '🏵️' },
    { bg: 'var(--papel-cyan)', symbol: '🕯️' },
    { bg: 'var(--papel-purple)', symbol: '🎸' },
    { bg: 'var(--papel-yellow)', symbol: '🕊️' },
    { bg: 'var(--papel-pink)', symbol: '✨' },
    { bg: 'var(--papel-cyan)', symbol: '💀' },
    { bg: 'var(--papel-orange)', symbol: '🏵️' },
    { bg: 'var(--papel-purple)', symbol: '🕯️' },
    { bg: 'var(--papel-yellow)', symbol: '🍷' },
    { bg: 'var(--papel-pink)', symbol: '💀' },
    { bg: 'var(--papel-cyan)', symbol: '🎸' }
  ]

  return (
    <header style={{ width: '100%', position: 'relative', zIndex: 20 }}>
      {/* Fluttering Papel Picado String Banner */}
      <div className="papel-banner" aria-hidden="true">
        {papelItems.map((item, idx) => (
          <div
            key={idx}
            className="papel-flag"
            style={{
              backgroundColor: item.bg,
              animationDelay: `${idx * 0.18}s`
            }}
          >
            <span>{item.symbol}</span>
          </div>
        ))}
      </div>

      {/* Main Glassmorphic Navigation Bar */}
      <div 
        className="glass-panel" 
        style={{
          margin: '18px 24px 0 24px',
          padding: '18px 26px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16
        }}
      >
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16
          }}
        >
          {/* Brand & Theme Title */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
              <h1 
                className="font-display text-gold-gradient" 
                style={{ 
                  fontSize: '1.9rem', 
                  letterSpacing: '0.04em',
                  fontWeight: 900
                }}
              >
                OFRENDA DIGITAL
              </h1>
              <span className="badge-gold">
                <Flame size={13} /> Día de los Muertos
              </span>
              <span className="badge-gemma" title="Powered by Google Gemma open-weight models">
                <Sparkles size={13} /> Gemma 2 ({activeModelName})
              </span>
              <span className="badge-offline" title="Zero cloud telemetry - your family stories remain 100% on your machine">
                <ShieldCheck size={13} /> {isOllamaConnected ? 'Local Ollama' : 'Offline Sanctuary'}
              </span>
            </div>
            <p 
              style={{ 
                color: 'var(--text-secondary)', 
                fontSize: '0.88rem', 
                marginTop: 4,
                fontStyle: 'italic'
              }}
            >
              "Ghost in the Machine" — A private, candlelit sanctuary preserving ancestral voices, memories, and calaveritas without cloud lock-in.
            </p>
          </div>

          {/* Action Callouts */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
            <button 
              className="btn-primary" 
              onClick={onOpenNewMemorial}
              title="Add a beloved departed family member or friend to the altar"
            >
              <Plus size={16} /> Add to Ofrenda
            </button>

            <button 
              className="btn-secondary" 
              onClick={onOpenWhyOpenMatters}
              style={{
                borderColor: 'rgba(255, 170, 0, 0.45)',
                background: 'linear-gradient(135deg, rgba(255, 170, 0, 0.12), rgba(156, 39, 176, 0.12))'
              }}
              title="Read why open-source AI is critical for intimate memorials"
            >
              <ShieldCheck size={16} color="var(--cempasuchil-gold)" /> Why Open Matters
            </button>
          </div>
        </div>

        {/* Altar Quick Control Toolbar */}
        <div 
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: 12,
            flexWrap: 'wrap',
            gap: 12
          }}
        >
          {/* Sensory toggles (Audio & Ambient Petals) */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
            <button 
              className="btn-ghost" 
              onClick={handleToggleMusic}
              style={{
                color: isAudioPlaying ? 'var(--text-gold)' : 'var(--text-muted)',
                backgroundColor: isAudioPlaying ? 'rgba(255, 170, 0, 0.12)' : 'transparent'
              }}
              title="Toggle meditative Spanish acoustic guitar & altar chimes"
            >
              <Music size={15} />
              <span>{isAudioPlaying ? 'Playing Ambient Strings' : 'Play Altar Ambience'}</span>
            </button>

            <button 
              className="btn-ghost" 
              onClick={handleToggleMute}
              title={isMuted ? 'Unmute chimes and bell sounds' : 'Mute all sounds'}
            >
              {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
              <span>{isMuted ? 'Muted' : 'Sound On'}</span>
            </button>

            <button 
              className="btn-ghost" 
              onClick={onTogglePetals}
              style={{
                color: petalsActive ? 'var(--cempasuchil-gold)' : 'var(--text-muted)'
              }}
              title="Toggle falling golden marigold (cempasúchil) petals"
            >
              <Sparkles size={15} />
              <span>Petals: {petalsActive ? 'Drifting' : 'Paused'}</span>
            </button>
          </div>

          {/* Candle & Capsule Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
            {allCandlesLit ? (
              <button 
                className="btn-ghost" 
                onClick={onExtinguishAllCandles}
                title="Extinguish all altar candles"
              >
                <Flame size={15} color="var(--text-muted)" />
                <span>Extinguish All</span>
              </button>
            ) : (
              <button 
                className="btn-ghost" 
                onClick={onLightAllCandles}
                style={{ color: 'var(--cempasuchil-gold)' }}
                title="Light all candles across the 3 tiers"
              >
                <Flame size={15} color="var(--cempasuchil-gold)" />
                <span>Light All Candles</span>
              </button>
            )}

            <button 
              className="btn-ghost" 
              onClick={onOpenCapsuleModal}
              title="Export or Import offline Memory Capsules (JSON)"
            >
              <Download size={15} />
              <span>Memory Capsule</span>
            </button>

            <button 
              className="btn-ghost" 
              onClick={onOpenGemmaConfig}
              title="Configure local Ollama endpoint or Gemma model parameters"
            >
              <Settings size={15} />
              <span>AI Engine</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}
