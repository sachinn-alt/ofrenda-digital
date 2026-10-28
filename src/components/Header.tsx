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
    <header className="fixed top-0 w-full z-50 bg-[#161020]/90 backdrop-blur-xl border-b border-[#ffc174]/15 shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
      {/* Traditional Scalloped Papel Picado Ribbon */}
      <div className="w-full flex items-center justify-between px-3 overflow-hidden h-3 bg-[#110b1b] border-b border-[#ffc174]/10 select-none">
        <div className="flex items-center gap-2 w-full justify-around opacity-85">
          <div className="w-8 h-3 rounded-b-sm bg-[#be0062] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#f59e0b] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#5f258e] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#be0062] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#f59e0b] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#5f258e] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#be0062] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#f59e0b] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#5f258e] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#be0062] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#f59e0b] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
          <div className="w-8 h-3 rounded-b-sm bg-[#5f258e] relative flex items-center justify-center">
            <div className="w-1.5 h-1.5 rounded-full bg-[#110b1b]"></div>
          </div>
        </div>
      </div>

      {/* Main Sanctuary Navigation Bar */}
      <div className="h-16 w-full px-4 md:px-8 flex items-center justify-between gap-4">
        {/* Brand & Emblem */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#f59e0b] via-[#be0062] to-[#ffc174] p-0.5 shadow-[0_0_16px_rgba(245,158,11,0.4)] flex items-center justify-center">
            <div className="w-full h-full rounded-[10px] bg-[#161020] flex items-center justify-center text-lg">
              🕯️
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-lg md:text-xl font-bold tracking-wide leading-tight text-[#ffc174]">
              Ofrenda Digital
            </span>
            <span className="text-[10px] md:text-xs text-[#c9c2b5] uppercase tracking-widest font-medium">
              Local AI Día de los Muertos Sanctuary
            </span>
          </div>
        </div>

        {/* Centered Navigation Pills (Desktop) */}
        <nav className="hidden lg:flex items-center gap-1 p-1 rounded-xl bg-[#1f1929] border border-[#ffc174]/15">
          <button 
            className="px-3.5 py-1.5 rounded-lg text-xs font-semibold bg-[#2e2738] text-[#ffc174] shadow-sm flex items-center gap-1.5 transition-all"
            type="button"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
            <span>Main Altar</span>
          </button>
          <button 
            onClick={onOpenNewMemorial}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#c9c2b5] hover:text-[#ffc174] hover:bg-[#231d2d] transition-all flex items-center gap-1.5"
            type="button"
          >
            <span>+ Place Loved One</span>
          </button>
          <button 
            onClick={onOpenWhyOpenMatters}
            className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-[#c9c2b5] hover:text-[#ffc174] hover:bg-[#231d2d] transition-all flex items-center gap-1.5"
            type="button"
          >
            <span>Gemma AI Sanctuary</span>
          </button>
        </nav>

        {/* Right Sensory & Action Controls */}
        <div className="flex items-center gap-2 md:gap-3">
          {/* Ambient Guitar Toggle Pill */}
          <button 
            onClick={handleToggleMusic}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
              isAudioPlaying 
                ? 'bg-[#2e2738] text-[#ffc174] border-[#f59e0b]/50 shadow-[0_0_14px_rgba(245,158,11,0.25)]' 
                : 'bg-[#1f1929] text-[#c9c2b5] border-[#ffc174]/15 hover:text-[#ffc174]'
            }`}
            title="Toggle meditative Spanish acoustic guitar & ambient strings"
            type="button"
          >
            <Music size={14} className={isAudioPlaying ? 'animate-bounce text-[#f59e0b]' : ''} />
            <span className="hidden sm:inline">
              {isAudioPlaying ? 'Ambient Guitar' : 'Play Strings'}
            </span>
          </button>

          {/* Sound Mute Toggle */}
          <button
            onClick={handleToggleMute}
            className="p-1.5 rounded-full bg-[#1f1929] text-[#c9c2b5] hover:text-[#ffc174] border border-[#ffc174]/15 transition-colors"
            title={isMuted ? 'Unmute sounds' : 'Mute sound effects'}
            type="button"
          >
            {isMuted ? <VolumeX size={15} /> : <Volume2 size={15} />}
          </button>

          {/* Gemma 2B Offline Status Badge */}
          <button
            onClick={onOpenGemmaConfig}
            className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#1f1929] text-[#ffc174] text-xs font-medium border border-[#ffc174]/20 shadow-[0_0_12px_rgba(245,158,11,0.15)] hover:border-[#f59e0b]/60 transition-all cursor-pointer"
            title="Click to configure local Ollama endpoint"
            type="button"
          >
            <span className={`w-2 h-2 rounded-full ${isOllamaConnected ? 'bg-emerald-400' : 'bg-[#f59e0b]'} animate-pulse`}></span>
            <span>{isOllamaConnected ? `Gemma (${activeModelName})` : 'Gemma 2B Offline • 100% Private'}</span>
          </button>

          {/* Export Capsule Button */}
          <button 
            onClick={onOpenCapsuleModal}
            className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#ffc174] text-[#161020] font-semibold text-xs hover:bg-[#f59e0b] transition-all shadow-[0_0_18px_rgba(255,193,116,0.3)]"
            title="Export or import offline Memory Capsule"
            type="button"
          >
            <Download size={14} />
            <span className="hidden md:inline">Export Capsule</span>
          </button>
        </div>
      </div>
    </header>
  )
}
